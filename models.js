'use strict';

const mongoose = require('mongoose');

// schema to represent a blog
const blogSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	author: {
		firstName: String,
		lastName: String 
	},
	created: {type: Date, required: false}
});

blogSchema.virtual('authorName').get(function() {
	return `${this.author.firstName} ${this.author.lastName}`.trim();
});

// instance method
blogSchema.methods.serialize = function() {
	return {
		id: this._id,
		title: this.title,
		content: this.content,
		author: this.authorName,
		created: this.created
	};
}

const Blog = mongoose.model('Blog', blogSchema);
module.exports = {Blog};

