const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const config = require("./config")
const { S3Client } = require('@aws-sdk/client-s3');


let s3 = new S3Client({
    region: config.s3Client.region,
    credentials: {
      accessKeyId: config.s3Client.AWSKEYACCESSID,
      secretAccessKey: config.s3Client.AWSSECRETKEY
    }
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
                let ext = file.mimetype.split('/')[1];
                var newFileName = Date.now() + "-" + file.originalname;
              var fullPath = `products/${req.params.id}/images/${newFileName}`
              console.log(fullPath,"pppppppppppppppppppppppp")
                cb(null, fullPath);
            }
        }
  })
  
 

})