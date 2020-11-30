export default () => ({
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV,
  auth: {
    expires: process.env.JWT_EXPIRES,
    secret: process.env.JWT_SECRET,
  },
});
