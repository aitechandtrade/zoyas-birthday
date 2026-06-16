let handler;

export default async (req, res) => {
  try {
    // Dynamically import the server on first request
    if (!handler) {
      const mod = await import('../dist/server/server.js');
      handler = mod.default || mod;
    }

    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url, `${protocol}://${host}`);

    // Create a Request object
    const request = new Request(url, {
      method: req.method,
      headers: req.headers,
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : req,
    });

    // Call the handler
    const response = await handler.fetch(request);

    // Send response
    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

    res.end(await response.text());
  } catch (error) {
    console.error('Server error:', error);
    res.statusCode = 500;
    res.setHeader('content-type', 'text/plain');
    res.end('Internal Server Error: ' + (error.message || 'Unknown error'));
  }
};
