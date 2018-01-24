'use strict'

const debug = require('debug')('api_rest:api')
const http = require('http')
const express = require('express')
const asyncify = require('express-asyncify')
const chalk = require('chalk')

const api = require('./api')

const app = asyncify(express())
const server = http.createServer(app)
const port = process.env.PORT || 3000

app.use('/api', api)

//  Express Error Handler
app.use((error, req, res, next) => {
  debug(`Error: ${error.message}`)

  if (error.message.match(/not found/)) {
    return res.status(404).send({ error: error.message })
  }
  res.status(500).send({ error: error.message })
})

function handleFatalError (error) {
  console.error(`${chalk.red('[fatal error]')} ${error.message}`)
  console.error(error.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.blue('\n[almundo-api-rest]:')} server listening on port ${port}`)
  })
}

module.exports = server
