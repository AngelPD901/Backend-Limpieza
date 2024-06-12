export const EnvConfiguration = () => ({
  evironment: process.env.ENV || 'dev',
  port: parseInt(process.env.PORT, 10) || 3000,
  jwtkey: process.env.JWT_KEY,
  database: {
    host: process.env.BD_HOST,
    port: parseInt(process.env.BD_PORT, 10) || 5432,
    name: process.env.BD_NAME,
    password: process.env.BD_PASSWORD,
    username: process.env.BD_USERNAME,
  },
});

