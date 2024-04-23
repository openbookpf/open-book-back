const { auth } = require("express-oauth2-jwt-bearer");
require("dotenv").config;

if (
  !process.env.DOMAIN ||
  !process.env.AUDIENCE ||
  process.env.AUDIENCE === "YOUR_API_IDENTIFIER"
) {
  console.log(
    "Exiting: Please make sure that auth_config.json is in place and populated with valid domain and audience values"
  );

  process.exit();
}

const checkJwt = auth({
  audience: process.env.AUDIENCE,
  issuerBaseURL: `https://${process.env.DOMAIN}/`,
  algorithms: ["RS256"],
});

module.exports = checkJwt;
