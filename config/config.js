const config = {
    server: {
    port: process.env.PORT || 3001,
    hostname: "127.0.0.1",
    swaggerHostname: process.env.SWAGGER_HOSTNAME
  },
  database: {
      //  url: `mongodb://localhost:27017/piharwaDB`,
       url: `mongodb+srv://piharwaDB:piharwaDBpass@cluster0.mx6skd3.mongodb.net/piharwaDB?retryWrites=true&w=majority`
  },
  // whitelist: { whitelist_url: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:4200', 'http://localhost:8080', 'http://piharwa.co.in', 'http://3.22.167.33:3000', 'http://www.piharwa.com', 'http://piharwa.com'] },

  whitelist: { whitelist_url: ['http://piharwa.com', 'http://www.piharwa.com','https://piharwa.com' ] },
    
  jwt: {
    jwtSecret: process.env.JWT_SECRET_TOKEN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN,
    jwtSession: {
      session: false,
    },
    web_timeout: 1 * 24 * 60 * 60, // in seconds (expires after 1 day),
  },
  s3Client: {
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET_NAME,
    AWSKEYACCESSID: process.env.AWSKEYACCESSID,
    AWSSECRETKEY: process.env.AWSSECRETKEY
  },
  emailSecret: {
    SES_HOST_NAME : process.env.SES_HOST_NAME,
    SES_EMAIL_PORT : process.env.SES_PORT,
    SES_USER_NAME : process.env.SES_USER_NAME,
    SES_USER_PASSWORD : process.env.SES_USER_PASSWORD,
    SES_USER_EMAIL : process.env.SES_USER_EMAIL,
  }
    
  }

module.exports = config;