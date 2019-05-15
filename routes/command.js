const command = require('express').Router();

// Controllers
const searchMove = require('../controllers/command');

command.route('/')
	.get(searchMove);

module.exports = command;
