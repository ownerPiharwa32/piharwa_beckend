const config = {
    server: {
      port: 3000,
      hostname: "127.0.0.1"
    },
    database: {
      //  url: `mongodb://localhost:27017/piharwaDB`,
      url: `mongodb+srv://piharwaDB:piharwaDBpass@cluster0.mx6skd3.mongodb.net/piharwaDB?retryWrites=true&w=majority`,
    },

  whitelist: { whitelist_url: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:8080', 'http://18.217.243.189:3000'] },
    
  jwt: {
    jwtSecret: 'SEVCEPiharwaAWDVEDDVECVC',
    refreshTokenSecret: 'ACXDDCEDefvgrEFCDCFFDFRVRV',
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
    
  }

module.exports = config;