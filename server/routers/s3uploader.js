const AWS = require('aws-sdk');
const { v4 } = require('uuid');

let s3bucket = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_DEFAULT_REGION,
});

const s3uploader = (file) => {
  //s3bucket.upload does not natively provide promise, but uploading pics is an asynchronous operation between node backend and aws bucket. So, it has been promisified with 'new Promise()' syntax here.
  return new Promise((resolve, reject) => {
    console.log('FILE argument: ', file);
    const [fileExtension] = file.originalname.split('.').slice(-1);
    //destructure only the file extentions from the photos. split it by '.' delimiter first into array of filename and extention combination. and then just take the last part using Array.protoptype.slice, which gives you only the extension
    const filename = `${v4()}.${fileExtension}`;
    //randomize the filename to avoid file name collisions. (ie, some pics might have same file names)
    // https://paulrohan.medium.com/file-upload-to-aws-s3-bucket-in-a-node-react-mongo-app-and-using-multer-72884322aada
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: filename,
      ACL: 'public-read',
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    // https://www.npmjs.com/package/multer
    //this whole file in the argument passed into this s3uploader function will come from multer with its properties(buffer and mimetype, filename)
    s3bucket.upload(params, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
};

module.exports = s3uploader;
//this 'err' object comes from AWS. AWS will respond with either error or data
