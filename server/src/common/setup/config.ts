import { promises as fsPromises } from 'fs';
import { isIP } from 'net';



export const readFile = async (path?: string | null) => {
  try {
    return path ? (await fsPromises.readFile(path)).toString() : null;
  } catch (err) {}
  return null;
};

export const readMandatorySecret = async (
  secret: string,
  isFileSecret = false,
  altFilePath?: string | null
) => {
  const value = await readSecret(secret, isFileSecret, altFilePath);
  if (!value) {
    throw Error(`Secret ${secret} value not set.`);
  }
  return value;
};

export const readSecret = async (
  secret: string,
  isFileSecret = false,
  altFilePath?: string | null
) => {
  const value =
    process.env[secret] ||
    (await readFile(`/run/secrets/${secret}`)) ||
    (await readFile(altFilePath));

  // tslint:disable-next-line
  if (!value) console.warn(`WARNING: Failed to read secret ${secret}`);
  return value;
};

const useClientCert = process.env.DATABASE_SSL_CLIENT_CERT_ENABLED === 'true';
const useServerCert = process.env.DATABASE_SSL_SERVER_CERT_ENABLED === 'true';

const config = {
  // Environment
  COMMON_PROJECT: process.env.COMMON_PROJECT,
  COMMON_COMPANY: process.env.COMMON_COMPANY,
  COMMON_FAMILY: process.env.COMMON_FAMILY,
  COMMON_APPLICATION: process.env.COMMON_APPLICATION,
  COMMON_SUFFIX: process.env.COMMON_SUFFIX,
  COMMON_DOMAIN: process.env.COMMON_DOMAIN,
  COMMON_IMAGE_TAG: process.env.COMMON_IMAGE_TAG,
  COMMON_ENV: process.env.COMMON_ENV, // dev / test / stag / prod
  COMMON_PUBLIC_PORT: process.env.COMMON_PUBLIC_PORT
    ? parseInt(process.env.COMMON_PUBLIC_PORT as string, 10)
    : null,
  NODE_ENV: process.env.NODE_ENV, // development / production
  RUN_AS_FUNCTION: process.env.RUN_AS_FUNCTION === 'true',

  // Basic
  ROOT_PATH: __dirname,
  APP_NAME: 'golf-bogeybuddies-server',
  DEBUG: Boolean(process.env.COMMON_DEBUG),
  APP_VERSION: !process.env.BUILD_IMAGE_TAG
    ? `${process.env.BUILD_VERSION}+local`
    : `${process.env.BUILD_VERSION}+${process.env.BUILD_IMAGE_TAG}`,
  API_PORT: process.env.API_PORT
    ? parseInt(process.env.API_PORT as string, 10)
    : 4000,
  API_BINDADDR: process.env.API_BINDADDR || '127.0.0.1',
  BASE_PATH: process.env.BASE_PATH || '/api',
  API_DOCS_ENABLED: process.env.API_DOCS_ENABLED?.toString() === 'true',
  API_PLAYGROUND_ENABLED:
    process.env.API_PLAYGROUND_ENABLED?.toString() === 'true',

  // Cache
  CACHE_HOST: process.env.CACHE_HOST as string,
  CACHE_PORT: parseInt(process.env.CACHE_PORT as string, 10),

  // Sentry
  SENTRY_DSN: process.env.SENTRY_DSN,

  // Database
  DATABASE_HOST: process.env.DATABASE_HOST,
  DATABASE_PORT: process.env.DATABASE_PORT
    ? parseInt(process.env.DATABASE_PORT, 10)
    : 5432,
  DATABASE_NAME: process.env.DATABASE_NAME,
  DATABASE_USER: process.env.DATABASE_USER,
  DATABASE_POOL_MAX: process.env.DATABASE_POOL_MAX
    ? parseInt(process.env.DATABASE_POOL_MAX, 10)
    : 10,
  DATABASE_STATEMENT_TIMEOUT: process.env.DATABASE_STATEMENT_TIMEOUT
    ? parseInt(process.env.DATABASE_STATEMENT_TIMEOUT, 10)
    : 1 * 60 * 1000, // 1 min by default
  DATABASE_SSL_ENABLED: process.env.DATABASE_SSL_ENABLED !== 'false',
  DATABASE_SSL_CLIENT_CERT_ENABLED: useClientCert,
  DATABASE_SSL_SERVER_CERT_ENABLED: useServerCert,
  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
    ? parseInt(process.env.REDIS_PORT, 10)
    : 6379,

  // Locale
  DEFAULT_LOCALE: process.env.DEFAULT_LOCALE || 'fi',

  // Logging
  COMMON_LOG_LEVEL: process.env.COMMON_LOG_LEVEL,
  COMMON_LOG_FORMAT: process.env.COMMON_LOG_FORMAT as 'text' | 'stackdriver',
};

let secrets: any = null;

export const getSecrets = async () => {
  if (secrets) {
    return secrets;
  }

  // Secrets
  const s = {
    SERVICE_ACCOUNT_KEY: await readSecret(
      'SERVICE_ACCOUNT_KEY',
      true,
      '/serviceaccount/key'
    ),
    DATABASE_PASSWORD: await readSecret('DATABASE_PASSWORD'),
    DATABASE_SSL_CA:
      useClientCert || useServerCert
        ? await readSecret('DATABASE_SSL_CA', true)
        : undefined,
    DATABASE_SSL_CERT: useClientCert
      ? await readSecret('DATABASE_SSL_CERT', true)
      : undefined,
    DATABASE_SSL_KEY: useClientCert
      ? await readSecret('DATABASE_SSL_KEY', true)
      : undefined,
    REDIS_PASSWORD: await readSecret('REDIS_PASSWORD'),
    SESSION_SECRET: await readMandatorySecret('SESSION_SECRET'),
    EXAMPLE_SECRET: await readMandatorySecret('EXAMPLE_SECRET'),
  };

  if (!secrets) {
    secrets = s;
  }
  return secrets;
};

export const getDatabaseSSL = (config: any, secrets: any) => {
  const ssl =
    config.DATABASE_SSL_ENABLED && config.DATABASE_SSL_CLIENT_CERT_ENABLED
      ? {
          ca: secrets.DATABASE_SSL_CA,
          cert: secrets.DATABASE_SSL_CERT,
          key: secrets.DATABASE_SSL_KEY,
        }
      : config.DATABASE_SSL_ENABLED && config.DATABASE_SSL_SERVER_CERT_ENABLED
        ? {
            ca: secrets.DATABASE_SSL_CA,
          }
        : config.DATABASE_SSL_ENABLED
          ? { rejectUnauthorized: false } // TODO: remove once AWSCA check works
          : false;

  // Skip hostname check if SSL is enabled but HOST is IP or proxy
  return ssl !== false &&
    (isIP(config.DATABASE_HOST) || config.DATABASE_HOST.indexOf('proxy') !== -1)
    ? {
        ...ssl,
        checkServerIdentity: () => undefined,
      }
    : ssl;
};

export default config;
