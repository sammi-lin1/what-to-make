const app = require("./app");

if (require.main === module) {
  const http = require("http");

  const PORT = process.env.PORT || 8000;

  http.createServer(app).listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}

module.exports = app;