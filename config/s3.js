const { S3 } = require("aws-sdk");
const {
    S3ACCESSKEYID,
    S3SECRETACCESSKEY,
    S3SESSIONTOKEN,
    S3REGION,
} = require("./enviroment");

const s3 = new S3({
    accessKeyId: S3ACCESSKEYID,
    secretAccessKey: S3SECRETACCESSKEY,
    sessionToken: S3SESSIONTOKEN,
    region: S3REGION,
});

module.exports = { s3 };
