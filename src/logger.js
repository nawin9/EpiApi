import bunyan from 'bunyan';
import config from './config/logger';

const logger = bunyan.createLogger(config);

export default logger;
