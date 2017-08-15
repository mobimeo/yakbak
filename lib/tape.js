var path = require("path");

module.exports = function (req, res, recorded, filename) {
  const { status, headers, body } = recorded;

  const content = body;
  const response = Buffer.from(content);

  res.statusCode = status;

  Object.keys(headers).forEach(header => {
    res.setHeader(header, headers[header]);
  });

  res.setHeader("content-length", response.length);
  res.setHeader("x-yakbak-tape", path.basename(filename, ".json"));

  res.write(response);

  res.end();
};
