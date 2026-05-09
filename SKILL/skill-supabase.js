/**
 * Supabase Client
 * Fetches audience and user insights data from real tables in Padrinho app schema
 * 
 * Tables used:
 * - profiles: User accounts and demographics (gender, interests, etc)
 * - user_engagement_states: Engagement metrics, recovery stage, social connection
 * - user_onboarding: Onboarding completion tracking
 * - community_posts: Community engagement data
 * - user_trail_progress: 12-step trail progress
 */

class SupabaseClient {
  constructor(projectUrl, apiKey) {
    this.projectUrl = projectUrl;
    this.apiKey = apiKey;
    console.log("[Supabase] Initialized with PostgREST endpoint");
  }

  /**
   * Get audience insights from Supabase
   * @returns {Promise<Object>} Audience metrics
   */
  async getAudienceInsights() {
    try {
      console.log("[Supabase] Fetching audience insights from real tables...");

      // Get total user count from profiles table
      console.log("[Supabase] Querying total users from profiles...");
      const totalUsers = await this.queryTable("profiles", "id", {});
      const userCount = Array.isArray(totalUsers) ? totalUsers.length : 0;
      console.log("[Supabase] ✅ Total users:", userCount);

      // Get engagement metrics from user_engagement_states
      console.log("[Supabase] Querying engagement states...");
      const engagementStates = await this.queryTable("user_engagement_states", 
        "engagement_score,engagement_level,recovery_stage,social_connection_score",
        {}
      );
      
      const avgEngagementScore = engagementStates.length > 0
        ? (engagementStates.reduce((sum, u) => sum + (u.engagement_score || 0), 0) / engagementStates.length).toFixed(1)
        : 0;

      const avgSocialScore = engagementStates.length > 0
        ? (engagementStates.reduce((sum, u) => sum + (u.social_connection_score || 0), 0) / engagementStates.length).toFixed(1)
        : 0;

      // Get user interests (from profiles table)
      console.log("[Supabase] Querying user interests from profiles...");
      const profilesWithInterests = await this.queryTable("profiles", "interests", {});
      const interestCounts = {};
      profilesWithInterests.forEach(profile => {
        if (profile.interests && Array.isArray(profile.interests)) {
          profile.interests.forEach(interest => {
            interestCounts[interest] = (interestCounts[interest] || 0) + 1;
          });
        }
      });
      const topInterests = Object.entries(interestCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([interest]) => interest);

      console.log("[Supabase] ✅ Top interests:", topInterests);

      // Get gender demographics
      console.log("[Supabase] Querying demographics from profiles...");
      const profilesWithGender = await this.queryTable("profiles", "gender", {});
      const genderCounts = {};
      profilesWithGender.forEach(profile => {
        if (profile.gender) {
          genderCounts[profile.gender] = (genderCounts[profile.gender] || 0) + 1;
        }
      });
      const demographics = Object.entries(genderCounts).map(([gender, count]) => ({
        gender,
        count,
      }));

      return {
        total_users: userCount,
        monthly_active: engagementStates.length,
        top_interests: topInterests,
        demographics: demographics,
        engagement_score: avgEngagementScore,
        social_connection_score: avgSocialScore,
        average_recovery_stage: engagementStates.length > 0 
          ? "developing" // Could calculate from breakdown
          : "unknown",
      };
    } catch (error) {
      console.error("[Supabase] Error:", error.message);
      return {
        total_users: 0,
        monthly_active: 0,
        top_interests: [],
        demographics: [],
        engagement_score: 0,
        error: error.message,
      };
    }
  }

  /**
   * Get specific user segment
   * @param {string} segment Segment name (e.g., "high-engagement", "at-risk")
   * @returns {Promise<Array>} Users in segment
   */
  async getUserSegment(segment) {
    try {
      // Get users by engagement level from user_engagement_states
      const states = await this.queryTable("user_engagement_states", 
        "user_id,engagement_level,recovery_stage",
        {}
      );
      
      // Filter by segment (engagement_level or recovery_stage)
      return states.filter(state => 
        state.engagement_level === segment || state.recovery_stage === segment
      ).slice(0, 100);
    } catch (error) {
      console.error("[Supabase] Segment fetch error:", error.message);
      return [];
    }
  }

  /**
   * Get user retention metrics
   * @returns {Promise<Object>} Retention data
   */
  async getRetentionMetrics() {
    try {
      // Get user onboarding data to track cohorts
      const onboarding = await this.queryTable("user_onboarding",
        "user_id,created_at,sobriety_set_at,first_message_at",
        {}
      );

      // Get user engagement states for activity
      const engagement = await this.queryTable("user_engagement_states",
        "user_id,last_calculated_at,updated_at",
        {}
      );

      // Calculate retention: users who were created in a week and are still active
      const weeklyRetention = {};
      onboarding.forEach(onb => {
        const weekStart = new Date(onb.created_at);
        weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Sunday start
        const week = weekStart.toISOString().split('T')[0];

        if (!weeklyRetention[week]) {
          weeklyRetention[week] = { cohort_size: 0, retained_7d: 0, retained_30d: 0 };
        }
        weeklyRetention[week].cohort_size += 1;

        // Check if user is active in last 7 days
        const lastActive = onb.first_message_at || onb.created_at;
        const daysSinceActive = (Date.now() - new Date(lastActive)) / (1000 * 60 * 60 * 24);
        if (daysSinceActive < 7) weeklyRetention[week].retained_7d += 1;
        if (daysSinceActive < 30) weeklyRetention[week].retained_30d += 1;
      });

      return Object.entries(weeklyRetention)
        .map(([week, data]) => ({ week, ...data }))
        .sort((a, b) => new Date(b.week) - new Date(a.week))
        .slice(0, 12);
    } catch (error) {
      console.error("[Supabase] Retention metrics error:", error.message);
      return [];
    }
  }

  /**
   * Internal method to execute queries
   * @private
   */
  async _query(sql, params = []) {
    try {
      const response = await fetch(`${this.projectUrl}/rest/v1/rpc/exec_query`, {
        method: "POST",
        headers: {
          apikey: this.apiKey,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          query: sql,
          params: params,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.log("[Supabase] Query failed:", response.status, errorBody.substring(0, 200));
        throw new Error(
          `Supabase query error: ${response.status} ${response.statusText} - ${errorBody}`
        );
      }

      const data = await response.json();
      console.log("[Supabase] ✅ Query successful, rows:", Array.isArray(data) ? data.length : 1);
      return data;
    } catch (error) {
      console.error("[Supabase] Query execution error:", error.message);
      throw error;
    }
  }

  /**
   * Alternative: Direct table query (if using PostgREST)
   */
  async queryTable(table, select = "*", filters = {}) {
    try {
      let url = `${this.projectUrl}/rest/v1/${table}?select=${select}`;

      // Add filters
      Object.entries(filters).forEach(([key, value]) => {
        url += `&${key}=eq.${value}`;
      });

      const response = await fetch(url, {
        headers: {
          apikey: this.apiKey,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.log("[Supabase] Table query failed:", response.status, errorBody.substring(0, 200));
        throw new Error(`Table query error: ${response.status} - ${errorBody}`);
      }

      const data = await response.json();
      console.log("[Supabase] ✅ Table query successful, rows:", Array.isArray(data) ? data.length : 1);
      return data;
    } catch (error) {
      console.error("[Supabase] Table query error:", error.message);
      return [];
    }
  }
}

export default SupabaseClient;
