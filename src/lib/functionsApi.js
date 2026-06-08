const LOCAL_FUNCTIONS_ORIGIN = 'http://localhost:8888';

function getFunctionsBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL;

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }

  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocalHost) {
      return `${LOCAL_FUNCTIONS_ORIGIN}/.netlify/functions`;
    }
  }

  return '/.netlify/functions';
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
      error: import.meta.env.DEV
        ? 'API returned a non-JSON response. Start local functions with `npm run dev:netlify`.'
        : 'API returned an unexpected response.',
    };
  }
}

export async function postFunction(functionName, payload) {
  const endpoint = `${getFunctionsBaseUrl()}/${functionName}`;

  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const isLocalDev = import.meta.env.DEV && typeof window !== 'undefined';
    if (isLocalDev) {
      throw new Error('Cannot reach local functions. Start Netlify dev with `npm run dev:netlify`.');
    }
    throw error;
  }

  const data = await readJsonSafely(response);

  if (!response.ok) {
    throw new Error(data?.error || `Request failed with status ${response.status}.`);
  }

  return data || { success: true };
}
