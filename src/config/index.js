import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const configs = {
    base: {
        env,
        name: process.env.APP_NAME || 'epiapi',
        host: process.env.APP_HOST || '0.0.0.0',
        port: 3000,
    },
    production: {
        port: process.env.APP_PORT || 3001,
    },
    development: {},
    test: {
        port: 3002,
    },
};

export default Object.assign(configs.base, configs[env]);
