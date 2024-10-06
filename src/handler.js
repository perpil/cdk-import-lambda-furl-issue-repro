const { version } = require("@aws-sdk/client-s3/package.json");

exports.handler = async () => ({ version });
