export default {
  jwt: {
    secret: process.env.SECRET_JWT,
    expiresIn: '1d',
  },
};
