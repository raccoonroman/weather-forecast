function getEndpoint(req) {
  const route = req.query.route;

  if (Array.isArray(route)) {
    return route.join('/');
  }

  if (typeof route === 'string') {
    return route;
  }

  const requestUrl = req.url || '';
  const [pathname] = requestUrl.split('?');
  const prefix = '/api/weather/';

  if (pathname.startsWith(prefix)) {
    return pathname.slice(prefix.length);
  }

  return '';
}

function isSafeEndpoint(endpoint) {
  return Boolean(endpoint) && !endpoint.includes('..') && !endpoint.startsWith('/');
}

function buildUpstreamUrl(req, endpoint, baseUrl, apiKey) {
  const upstream = new URL(`${baseUrl.replace(/\/+$/, '')}/${endpoint}`);

  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'route') {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((item) => upstream.searchParams.append(key, item));
      continue;
    }

    if (typeof value === 'string') {
      upstream.searchParams.set(key, value);
    }
  }

  upstream.searchParams.set('key', apiKey);
  return upstream;
}

export default async function handler(req, res) {
  const apiKey = process.env.WEATHER_API_KEY;
  const baseUrl = process.env.WEATHER_API_BASE_URL || 'https://api.weatherapi.com/v1';

  if (!apiKey) {
    res.status(500).json({ error: 'Missing WEATHER_API_KEY env variable' });
    return;
  }

  const endpoint = getEndpoint(req);

  if (!isSafeEndpoint(endpoint)) {
    res.status(400).json({ error: 'Invalid endpoint' });
    return;
  }

  const upstream = buildUpstreamUrl(req, endpoint, baseUrl, apiKey);

  try {
    const upstreamResponse = await fetch(upstream, {
      headers: {
        Accept: 'application/json',
      },
    });

    const payload = await upstreamResponse.text();
    const contentType = upstreamResponse.headers.get('content-type') || 'application/json';

    res.status(upstreamResponse.status);
    res.setHeader('content-type', contentType);
    res.send(payload);
  } catch {
    res.status(502).json({ error: 'Weather upstream request failed' });
  }
}
