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

  // Test 1: Health check - fetch from information_schema
  try {
    const url = `${supabaseUrl}/rest/v1/information_schema.tables?select=table_name&limit=10`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      results.tests.push({
        test: "Schema discovery",
        status: response.status,
        statusText: response.statusText,
        error: errorText.substring(0, 200),
      });
    } else {
      const tables = await response.json();
      results.tests.push({
        test: "Schema discovery",
        status: 200,
        ok: true,
        tables_found: tables.length,
        tables: tables.map((t) => t.table_name),
      });
    }
  } catch (error) {
    results.tests.push({
      test: "Schema discovery",
      error: error.message,
    });
  }

  // Test 2: Try to query 'users' table
  try {
    const url = `${supabaseUrl}/rest/v1/users?select=*&limit=1`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    results.tests.push({
      test: "Query 'users' table",
      status: response.status,
      ok: response.ok,
      error: !response.ok ? await response.text() : null,
    });
  } catch (error) {
    results.tests.push({
      test: "Query 'users' table",
      error: error.message,
    });
  }

  // Test 3: Try to query 'user_sessions' table
  try {
    const url = `${supabaseUrl}/rest/v1/user_sessions?select=*&limit=1`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    results.tests.push({
      test: "Query 'user_sessions' table",
      status: response.status,
      ok: response.ok,
      error: !response.ok ? await response.text() : null,
    });
  } catch (error) {
    results.tests.push({
      test: "Query 'user_sessions' table",
      error: error.message,
    });
  }

  // Test 4: Try to query 'user_profiles' table
  try {
    const url = `${supabaseUrl}/rest/v1/user_profiles?select=*&limit=1`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: supabaseKey,
        "Content-Type": "application/json",
      },
    });

    results.tests.push({
      test: "Query 'user_profiles' table",
      status: response.status,
      ok: response.ok,
      error: !response.ok ? await response.text() : null,
    });
  } catch (error) {
    results.tests.push({
      test: "Query 'user_profiles' table",
      error: error.message,
    });
  }

  res.json(results);
};
