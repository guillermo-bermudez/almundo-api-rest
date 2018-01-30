'use strict'

const debug = require('debug')('api_rest:api:routes')
const express = require('express')
const asyncify = require('express-asyncify')
const chalk = require('chalk')
const db = require('api_db')

const config = require('./config')

const api = asyncify(express.Router())

let services, Hotel

api.use('*', async (req, res, next) => {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (!services) {
    debug(`${chalk.blue('Connecting to database')}`)
    try {
      services = await db(config.db)
    } catch (e) {
      return next(e)
    }
    Hotel = services.Hotel
  }
  next()
})

api.get('/hotels', async (req, res, next) => {
  debug(`A request has come to /hotels`)

  let hotels = []
  try {
    hotels = await Hotel.findAll()
  } catch (e) {
    return next(e)
  }

  res.send(hotels)
})

api.get('/hotel/id/:id', async (req, res, next) => {
  const { id } = req.params

  debug(`A request has come to /hotel/id/${id}`)

  let hotel
  try {
    hotel = await Hotel.findById(id)
  } catch (e) {
    return next(e)
  }

  if (!hotel) {
    return next(new Error(`Hotel not found with id: ${id}`))
  }

  res.send(hotel)
})

api.get('/hotel/name/:name', async (req, res, next) => {
  const { name } = req.params

  debug(`A request has come to /hotel/name/${name}`)

  let hotels = []

  try {
    hotels = await Hotel.containsByName(name)
  } catch (e) {
    return next(e)
  }

  if (!hotels) {
    return next(new Error(`Hotel not found with name: ${name}`))
  }

  res.send(hotels)
})

module.exports = api
