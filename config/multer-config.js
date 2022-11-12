
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require("./config")
const path = require("path")

let s3 = new aws.S3({
      region: config.s3Client.region,
      accessKeyId: config.s3Client.AWSKEYACCESSID,
      secretAccessKey: config.s3Client.AWSSECRETKEY

  });


module.exports.uploadFile = multer({
    dest: "products/",
    storage: multerS3({
        s3: s3,
        bucket: config.s3Client.bucket,
        ACL: 'public-read',
        metadata: function (req, file, cb) {
          cb(null, { fieldName: file.originalname });
        },
    key: function (req, file, cb) { 
            let extType = file.mimetype.split('/')[0];
            if (extType == "image") { 
              const ext = file.mimetype.split('/')[1];
              const newFileName = Date.now() + "-" + file.originalname;
              const fullPath = `products/${req.params.productId}/images/${newFileName}`
              cb(null, fullPath);
            }
        }
  })
  
 

})