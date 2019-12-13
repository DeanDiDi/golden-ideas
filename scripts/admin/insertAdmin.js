/* eslint-disable */

// create the goldenIdeas database and connect to it
conn = new Mongo('localhost:27017');
db = conn.getDB('goldenIdeas');
print('* database goldenIdeas connected');

// drop existing admin collection
db.admin.drop();
print('* dropped admin collection');

// create the admin collection
// add default (username, password) = (admin, password) document
// password is salted hash of string 'password' using bcryptjs library
db.admin.insert({
  'username': 'admin',
  'password': '$2a$10$MjADcBfi2x.IJ3SWjAT7geIeYCuVJVI0jiOZRrR6AD5ye3jbNt1N6',
});
print('* default admin user inserted');
