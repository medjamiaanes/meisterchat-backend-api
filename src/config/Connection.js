const development = {
  database: process.env.DEVELOP_DB_NAME,
  host: process.env.DEVELOP_DB_HOST,
  port: process.env.DEVELOP_DB_PORT || 27017,
}

const staging = {
  database: process.env.STAGING_DB_NAME,
  host: process.env.STAGING_DB_HOST,
  port: process.env.STAGING_DB_PORT || 27017,
}

const production = {
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.PRODUCTION_DB_PORT || 27017,
}

module.exports = {
  development,
  staging,
  production,
}
