
const Env = require('./next.config.js');

const isProd = process.env.NODE_ENV === 'production';

const Setting = {
  title: '🐟 エネがえる サンプル 🐟',
  isProd,
  basePath: Env.basePath,
  apiPath: 'https://api.enegaeru.com',
  api_key: process.env.NEXT_PUBLIC_ENEGAERU_API_KEY,
  username: process.env.NEXT_PUBLIC_ENEGAERU_USERNAME,
  password: process.env.NEXT_PUBLIC_ENEGAERU_PASSWORD,
};

export default Setting;
