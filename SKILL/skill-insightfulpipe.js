/**
 * Meta Instagram Graph API Client
 * Fetches Instagram organic analytics data using Meta's official API
 * https://developers.facebook.com/docs/instagram-api
 */

class InsightfulpipeClient {
  constructor(accessToken, businessAccountId) {
    this.accessToken = accessToken;
    this.businessAccountId = businessAccountId;
    // Using Meta's official Instagram Graph API
    this.baseUrl = "https://graph.instagram.com/v19.0";
  }

  /**
   * Get Instagram organic metrics using Meta's official API
   * @returns {Promise<Object>} Instagram metrics object
   */
  async getInstagramOrganic() {
    try {
      // Meta API endpoint for Instagram insights
      const metricsUrl = `${this.baseUrl}/${this.businessAccountId}/insights`;
      console.log("[Instagram] Fetching organic metrics from Meta API");
      console.log("  Account ID:", this.businessAccountId?.substring(0, 8) + "...");
      console.log("  Access Token set:", !!this.accessToken);

      // Request multiple metrics from Meta API
      const metrics = [
        "follower_count",
        "profile_views",
        "reach",
        "impressions",
        "engagement_rate",
      ];

      const response = await fetch(
        `${metricsUrl}?metric=${metrics.join(",")}&period=day&access_token=${this.accessToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Meta API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("[Instagram] ✅ Received data from Meta API");

      // Transform Meta API response to our data structure
      const metricsData = {};
      if (data.data && Array.isArray(data.data)) {
        data.data.forEach((item) => {
          if (item.name && item.values && item.values[0]) {
            metricsData[item.name] = item.values[0].value;
          }
        });
      }

      return {
        followers_current: metricsData.follower_count || 0,
        followers_gain_month: 0, // Meta doesn't provide monthly gain in basic metrics
        avg_daily_reach: metricsData.reach || 0,
        avg_daily_impressions: metricsData.impressions || 0,
        engagement_rate: `${(metricsData.engagement_rate || 0).toFixed(1)}%`,
        profile_views: metricsData.profile_views || 0,
        top_posts: [], // Would need separate API call to get top posts
      };
    } catch (error) {
      console.error("[Instagram] ❌ Meta API error:", error.message);
      console.error("[Instagram] Error type:", error.constructor.name);
      // Return fallback structure on error
      return {
        followers_current: 0,
        followers_gain_month: 0,
        avg_daily_reach: 0,
        avg_daily_impressions: 0,
        profile_views: 0,
        engagement_rate: "0%",
        top_posts: [],
        error: `Meta API error: ${error.message}`,
      };
    }
  }

  /**
   * Get historical Instagram data (optional)
   * Meta API returns aggregated metrics - historical granular data requires higher access
   * @param {string} startDate YYYY-MM-DD
   * @param {string} endDate YYYY-MM-DD
   * @returns {Promise<Array>} Daily metrics array
   */
  async getInstagramHistory(startDate, endDate) {
    try {
      // Meta's insights API returns aggregated data
      // For detailed historical analysis, you may need Instagram Insights API with TIME_SERIES breakdowns
      const response = await fetch(
        `${this.baseUrl}/${this.businessAccountId}/insights?metric=impressions,reach,profile_views&period=day&access_token=${this.accessToken}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Meta API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("[Instagram] History fetch error:", error.message);
      return [];
    }
  }
}

export default InsightfulpipeClient;
