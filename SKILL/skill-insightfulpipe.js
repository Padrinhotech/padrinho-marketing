/**
 * Insightfulpipe API Client
 * Fetches Instagram organic analytics data
 */

class InsightfulpipeClient {
  constructor(apiKey, businessAccountId) {
    this.apiKey = apiKey;
    this.businessAccountId = businessAccountId;
    this.baseUrl = "https://api.insightfulpipe.com/v1";
  }

  /**
   * Get Instagram organic metrics
   * @returns {Promise<Object>} Instagram metrics object
   */
  async getInstagramOrganic() {
    try {
      console.log(
        "[Insightfulpipe] Fetching Instagram organic data for account:",
        this.businessAccountId
      );

      // Fetch from Insightfulpipe API
      const response = await fetch(
        `${this.baseUrl}/instagram/account/${this.businessAccountId}/metrics`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Insightfulpipe API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Transform to our data structure
      return {
        followers_current: data.followers || 0,
        followers_gain_month: data.followers_gain_month || 0,
        avg_daily_reach: data.avg_daily_reach || 0,
        avg_daily_impressions: data.avg_daily_impressions || 0,
        engagement_rate: `${(data.engagement_rate || 0).toFixed(1)}%`,
        top_posts: (data.top_posts || []).map((post) => ({
          id: post.id,
          title: post.caption?.substring(0, 30) || "Post",
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0,
        })),
      };
    } catch (error) {
      console.error("[Insightfulpipe] Error:", error.message);
      // Return fallback structure on error
      return {
        followers_current: 0,
        followers_gain_month: 0,
        avg_daily_reach: 0,
        avg_daily_impressions: 0,
        engagement_rate: "0%",
        top_posts: [],
        error: error.message,
      };
    }
  }

  /**
   * Get historical Instagram data (optional)
   * @param {string} startDate YYYY-MM-DD
   * @param {string} endDate YYYY-MM-DD
   * @returns {Promise<Array>} Daily metrics array
   */
  async getInstagramHistory(startDate, endDate) {
    try {
      const response = await fetch(
        `${this.baseUrl}/instagram/account/${this.businessAccountId}/history`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ start_date: startDate, end_date: endDate }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("[Insightfulpipe] History fetch error:", error.message);
      return [];
    }
  }
}

module.exports = InsightfulpipeClient;
