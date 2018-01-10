'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const { PORT, DATABASE_URL } = require('./config');
const { Blog } = require('./models');

const app = express();
app.use(bodyParser.json());

// Get
app.get('/posts', (req, res) => {
	Blog
		.find()
		.limit(10)
		.then(blogs => {
			res.json({
				blogs: blogs.map(
					(blog) => blog.serialize())
			});
		})
		.catch(
			err => {
				console.log(err);
				res.status(500).json({
					message: 'Internal server error'
			});
		});
});
	
let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
			})
			.on('error', err => {
				mongoose.disconnect();
				reject(err);
			});
		});
	});
}




