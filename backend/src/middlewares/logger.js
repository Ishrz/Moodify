const logger = (req, res, next) => {
  // Capture the start time
  const start = Date.now();

  console.log("_________Logger middleware__________")
    console.log(`coming request method : ${req.method}`)
    console.log(`base Url of request : ${req.baseUrl}`)
    console.log(`request Path Name : ${req._parsedUrl.pathname}`)
    console.log(`request URL : ${req.url}`)
    console.log(`orignal URL: ${req.originalUrl}`)
    console.log("_______Logger middleware end_____")


  // The 'finish' event triggers when the response has been sent to the client
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { method, originalUrl, ip } = req;
    const { statusCode } = res;

    // Determine color coding based on status (optional)
    const statusColor = statusCode >= 400 ? '\x1b[31m' : '\x1b[32m'; // Red for errors, Green for success
    const reset = '\x1b[0m';



    
    console.log(
      `[${new Date().toISOString()}] ${method} ${originalUrl} ` +
      `${statusColor}${statusCode}${reset} - ${duration}ms | IP: ${ip}`
    );
  });

  next();
};

module.exports = logger;