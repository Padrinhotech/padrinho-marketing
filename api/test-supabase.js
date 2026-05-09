/**
 * Test Supabase connectivity and schema discovery
 */

export default async (req, res) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  const results = {
    timestamp: new Date().toISOString(),
    env_vars: {
      url_set: !!supabaseUrl,
      key_set: !!supabaseKey,
    },
    tests: [],
  };

  if (!supabaseUrl || !supabaseKey) {
    return res.json({
      ...results,
      error: "SUPABASE_URL or SUPABASE_ANON_KEY not set",
    });
  }

  // Test 1: Try to query 'profiles' table (actual user data)
  try {
    const url = `${supabaseUrl}/rest/v1/profiles?select=id,full_name,gender&limit=5`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.tests.push({
        test: "Query 'profiles' table",
        status: 200,
        ok: true,
        rows_found: data.length,
        sample: data.length > 0 ? data[0] : null,
      });
    } else {
      const errorText = await response.text();
      results.tests.push({
        test: "Query 'profiles' table",
        status: response.status,
        ok: false,
        error: errorText.substring(0, 200),
      });
    }
  } catch (error) {
    results.tests.push({
      test: "Query 'profiles' table",
      error: error.message,
    });
  }

  // Test 2: Try to query 'user_engagement_states' table
  try {
    const url = `${supabaseUrl}/rest/v1/user_engagement_states?select=user_id,engagement_score,engagement_level&limit=5`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.tests.push({
        test: "Query 'user_engagement_states' table",
        status: 200,
        ok: true,
        rows_found: data.length,
        sample: data.length > 0 ? data[0] : null,
      });
    } else {
      const errorText = await response.text();
      results.tests.push({
        test: "Query 'user_engagement_states' table",
        status: response.status,
        ok: false,
        error: errorText.substring(0, 200),
      });
    }
  } catch (error) {
    results.tests.push({
      test: "Query 'user_engagement_states' table",
      error: error.message,
    });
  }

  // Test 3: Try to query 'user_onboarding' table
  try {
    const url = `${supabaseUrl}/rest/v1/user_onboarding?select=user_id,sobriety_set,first_message&limit=5`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.tests.push({
        test: "Query 'user_onboarding' table",
        status: 200,
        ok: true,
        rows_found: data.length,
        sample: data.length > 0 ? data[0] : null,
      });
    } else {
      const errorText = await response.text();
      results.tests.push({
        test: "Query 'user_onboarding' table",
        status: response.status,
        ok: false,
        error: errorText.substring(0, 200),
      });
    }
  } catch (error) {
    results.tests.push({
      test: "Query 'user_onboarding' table",
      error: error.message,
    });
  }

  // Test 4: Try to query 'community_posts' table (social engagement)
  try {
    const url = `${supabaseUrl}/rest/v1/community_posts?select=id,user_id,support_count&limit=5`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      results.tests.push({
        test: "Query 'community_posts' table",
        status: 200,
        ok: true,
        rows_found: data.length,
        sample: data.length > 0 ? data[0] : null,
      });
    } else {
      const errorText = await response.text();
      results.tests.push({
        test: "Query 'community_posts' table",
        status: response.status,
        ok: false,
        error: errorText.substring(0, 200),
      });
    }
  } catch (error) {
    results.tests.push({
      test: "Query 'community_posts' table",
      error: error.message,
    });
  }

  res.json(results);
};
