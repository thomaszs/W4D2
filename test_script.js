const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

let input = process.argv.slice(2)

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

function getUsersByName(name, cb) {
  client.query('SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = ($1) OR last_name = ($1)', input, (err, result) => {
    cb(err, result.rows)
  })
}

getUsersByName(input, (err, users) => {
  if (err) {
      console.log('ERR:', err)
  } else {
    for (key in users) {
  let date = users[key].birthdate;
      console.log("- " + (Number(key) + 1) + " : " + users[key].first_name + " " + users[key].last_name + ", " + "born " + date.getFullYear() + "-" + (date.getMonth()+1)+ "-"+ date.getDate());
      client.end()
    }
  }
})

});