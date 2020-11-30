export default () => ({
  port: process.env.PORT || 8080,
  env: process.env.NODE_ENV,
  database: {
    url: process.env.POSTGRES_URL,
    synchronize: process.env.NODE_ENV === 'development',
  },
});
