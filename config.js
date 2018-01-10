'use strict';
exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost/blogs-app';
//'mongodb://ds247587.mlab.com:47587/node-blogs-app';
exports.PORT = process.env.PORT || 8080;
