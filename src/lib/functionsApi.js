function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL;
  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }
  return '';
}

async function readJsonSafely(response) {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    return {
      error: 'API returned an unexpected response.',
    };
  }
}

export async function postFunction(functionName, payload) {
  const endpoint = `${getApiBaseUrl()}/api/${functionName}`;

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(
      error instanceof Error && error.message
        ? error.message
        : 'Cannot reach the API server. Start the backend with `npm run dev:server`.'
    );
  }

  const data = await readJsonSafely(response);

  if (!response.ok) {
    throw new Error(data?.error || `Request failed with status ${response.status}.`);
  }

  return data || { success: true };
}
