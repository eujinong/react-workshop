// eslint-disable-next-line import/prefer-default-export
export const env = {
  apiLocation: process.env.API_LOCATION || '/',
  production: process.env.NODE_ENV === 'production',
  environment: process.env.NODE_ENV || 'development',
  mainUrl: process.env.MAIN_URL || '/launch'
};
