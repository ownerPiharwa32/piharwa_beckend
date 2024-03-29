const config = {
  server: {
    port: process.env.PORT || 3001,
    hostname: "127.0.0.1",
    swaggerHostname: process.env.SWAGGER_HOSTNAME
  },
  database: {
    //  url: `mongodb://localhost:27017/piharwaDB`,
    //  url: `mongodb+srv://piharwaDB:piharwaDBpass@cluster0.mx6skd3.mongodb.net/piharwaDB?retryWrites=true&w=majority`
    url: `mongodb+srv://piharwaDB:piharwaDBpass@cluster0.fbzvdso.mongodb.net/piharwaDB?retryWrites=true&w=majority`
      // url: `mongodb://18.191.113.44/piharwaDB`
  },

  whitelist: { whitelist_url: ['http://piharwa.com', 'http://www.piharwa.com', 'https://piharwa.com',"http://admin.piharwa.com","https://admin.piharwa.com", "http://localhost:4200"] },

  jwt: {
    jwtSecret: process.env.JWT_SECRET_TOKEN,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN,
    jwtSession: {
      session: false,
    },
    web_timeout: 30 * 24 * 60 * 60, // in seconds (expires after 1 day),
  },
  s3Client: {
    region: process.env.S3_REGION,
    bucket: process.env.S3_BUCKET_NAME,
    AWSKEYACCESSID: process.env.AWSKEYACCESSID,
    AWSSECRETKEY: process.env.AWSSECRETKEY
  },
  emailSecret: {
    SES_HOST_NAME: process.env.SES_HOST_NAME,
    SES_EMAIL_PORT: process.env.SES_PORT,
    SES_USER_NAME: process.env.SES_USER_NAME,
    SES_USER_PASSWORD: process.env.SES_USER_PASSWORD,
    SES_USER_EMAIL: process.env.SES_USER_EMAIL,
  }

}

module.exports = config;