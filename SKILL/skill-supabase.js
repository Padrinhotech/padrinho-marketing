/**
 * Supabase Client
 * Fetches audience and user insights data
 */

class SupabaseClient {
  constructor(projectUrl, apiKey) {
    this.projectUrl = projectUrl;
    this.apiKey = apiKey;
  }

  /**
   * Get audience insights from Supabase
   * @returns {Promise<Object>} Audience metrics
   */
  async getAudienceInsights() {
    try {
      console.log("[Supabase] Fetching audience insights...");

      // Get user count
      const usersResponse = await this._query(
        "SELECT COUNT(*) as total FROM users WHERE deleted_at IS NULL"
      );
      const totalUsers = usersResponse[0]?.total || 0;

      // Get monthly active users
      const activeResponse = await this._query(
        `SELECT COUNT(DISTINCT user_id) as monthly_active FROM user_sessions 
         WHERE created_at > NOW() - INTERVAL '30 days'`
      );
      const monthlyActive = activeResponse[0]?.monthly_active || 0;

      // Get top interests
      const interestsResponse = await this._query(
        `SELECT interest, COUNT(*) as count FROM user_interests 
         GROUP BY interest ORDER BY count DESC LIMIT 5`
      );
      const topInterests = interestsResponse.map((r) => r.interest) || [];

      // Get demographic summary
      const demoResponse = await this._query(
        `SELECT 
           age_group, gender, COUNT(*) as count 
         FROM user_profiles 
         GROUP BY age_group, gender`
      );

      return {
        total_users: totalUsers,
        monthly_active: monthlyActive,
        top_interests: topInterests,
        demographics: demoResponse || [],
        engagement_score:
          monthlyActive > 0
            ? ((monthlyActive / totalUsers) * 100).toFixed(1)
            : 0,
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
      return await this._query(
        `SELECT * FROM users 
         WHERE segment = $1 AND deleted_at IS NULL
         ORDER BY created_at DESC LIMIT 100`,
        [segment]
      );
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
      const response = await this._query(
        `SELECT 
           DATE_TRUNC('week', created_at) as week,
           COUNT(DISTINCT user_id) as cohort_size,
           COUNT(DISTINCT CASE WHEN last_active > NOW() - INTERVAL '7 days' THEN user_id END) as retained_week_1,
           COUNT(DISTINCT CASE WHEN last_active > NOW() - INTERVAL '30 days' THEN user_id END) as retained_month_1
         FROM user_sessions
         GROUP BY DATE_TRUNC('week', created_at)
         ORDER BY week DESC
         LIMIT 12`
      );

      return response || [];
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
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({
          query: sql,
          params: params,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Supabase query error: ${response.status} ${response.statusText}`
        );
      }

      return await response.json();
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
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Table query error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("[Supabase] Table query error:", error.message);
      return [];
    }
  }
}

export default SupabaseClient;
