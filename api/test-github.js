/**
 * Test GitHub API connectivity and file operations
 * Tests on Vercel where GITHUB_TOKEN is available
 */
export default async (req, res) => {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return res.status(400).json({
      error: "GITHUB_TOKEN not configured in Vercel"
    });
  }

  const owner = "Padrinhotech";
  const repo = "padrinho-marketing";
  const filePath = "DATA/agent-state.json";
  const testFilePath = "DATA/test-github-api.json";
  
  const results = {
    timestamp: new Date().toISOString(),
    tests: []
  };

  try {
    // Test 1: GET existing file
    console.log("[GitHub Test] Testing GET on existing file...");
    const getResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
          "User-Agent": "Padrinho-Test",
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    
    let getResult = {
      test: "GET existing file",
      status: getResponse.status,
      ok: getResponse.ok,
    };

    let sha = null;
    if (getResponse.ok) {
      const data = await getResponse.json();
      sha = data.sha;
      getResult.sha = sha.substring(0, 8) + "...";
    } else {
      const errData = await getResponse.json();
      getResult.error = errData.message;
    }
    results.tests.push(getResult);

    // Test 2: CREATE/UPDATE test file
    console.log("[GitHub Test] Testing PUT to create/update file...");
    const testData = {
      test_run: new Date().toISOString(),
      verified: true
    };
    const content = Buffer.from(JSON.stringify(testData, null, 2)).toString("base64");

    // First GET the test file to see if it exists
    const testGetResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${testFilePath}`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
          "User-Agent": "Padrinho-Test",
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    let testSha = null;
    if (testGetResponse.ok) {
      const data = await testGetResponse.json();
      testSha = data.sha;
    }

    const putBody = {
      message: "test: GitHub API connectivity test",
      content: content,
      branch: "main",
    };

    if (testSha) {
      putBody.sha = testSha;
    }

    const putResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${testFilePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
          "User-Agent": "Padrinho-Test",
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify(putBody),
      }
    );

    let putResult = {
      test: "PUT create/update file",
      status: putResponse.status,
      ok: putResponse.ok,
    };

    if (putResponse.ok) {
      const data = await putResponse.json();
      putResult.created = !!data.content;
    } else {
      try {
        const errData = await putResponse.json();
        putResult.error = errData;
      } catch {
        putResult.error = await putResponse.text();
      }
    }
    results.tests.push(putResult);

  } catch (error) {
    results.error = error.message;
  }

  res.status(200).json(results);
};
