'use strict'

const debug = require('debug')('api_rest:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'almundo',                             //  almundo
    username: process.env.DB_USER || 'admin@calipso',                       //  admin
    password: process.env.DB_PASS || 'almundo123$',                         //  almundo123
    host: process.env.BD_HOST || 'calipso.postgres.database.azure.com',     //  localhost
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    logging: s => debug(s)
  }
}
