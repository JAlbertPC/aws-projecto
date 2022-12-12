const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3BUCKET, S3ACL } = require("./enviroment");
const { s3 } = require("./s3");

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: S3BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: S3ACL,
        key: function (req, file, cb) {
            let ext;
            if (file.originalname.includes(".png")) ext = ".png";
            if (file.originalname.includes(".jpg")) ext = ".jpg";
            if (file.originalname.includes(".jpeg")) ext = ".jpeg";
            if (file.originalname.includes(".gif")) ext = ".gif";
            cb(null, `alumno_${req.params.id}${ext}`);
        },
    }),
});

module.exports = { upload };
