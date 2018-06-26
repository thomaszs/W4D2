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

knex.select('first_name','last_name','birthdate').from('famous_people').where('first_name', input[0]).orWhere('last_name', input[0])
.asCallback(function(err, rows) {
  if (err) return console.error(err);
  for (key in rows) {
    let date = rows[key].birthdate;
    console.log("- " + (Number(key) + 1) + " : " + rows[key].first_name + " " + rows[key].last_name + ", " + "born " + date.getFullYear() + "-" + (date.getMonth()+1)+ "-"+ date.getDate())
  }
})

.finally(function() {
  knex.destroy();
})
