
const Env = require('./next.config.js');

const isProd = process.env.NODE_ENV === 'production';

const Setting = {
  title: '🐟 エネがえる サンプル 🐟',
  isProd,
  basePath: Env.basePath,
  apiPath: isProd ? '' : 'http://localhost:80',
  api_key: process.env.API_KEY,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
};

export default Setting;
