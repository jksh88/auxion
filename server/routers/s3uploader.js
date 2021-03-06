const AWS = require('aws-sdk');
const { v4 } = require('uuid');

let s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const s3uploader = (file) =>
  new Promise((resolve, reject) => {
    console.log('FILE argument: ', file);
    const [fileExtension] = file.originalname.split('.').slice(-1);
    const filename = `${v4()}.${fileExtension}`;
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    //this whole file will from multer with its propertiers(buffer and mimetype, filename)
    s3bucket.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });

module.exports = s3uploader;
//this 'err' object comes from AWS. AWS will respond with either error or data
