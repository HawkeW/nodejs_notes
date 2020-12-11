const express = require('express');
const app = express();
var router = express.Router()
const birds = require('./docs/birds.js')

function route(name) {
  router.use(name, routes(name))
}

const routes = [
	{'/birds': birds}
]

exports.route = route;