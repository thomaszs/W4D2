const settings = require("./settings"); // settings.json
const knex = require('knex')({
  client: 'pg', 
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});  


let input = process.argv.slice(2)

let first = input[0];
let last = input[1];
let date = input[2];


knex('famous_people').insert({
  first_name: first,
  last_name: last,
  birthdate: date
})
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  })

  .finally(function() {
    knex.destroy();
  })  

