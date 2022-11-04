const express = require('express')
const app = express()

const config = {
    host: 'mysql',
    user: 'user',
    password: 'user',
    database: 'people'
}
const mysql = require('mysql')
const conn = mysql.createConnection(config)
const people = []
conn.connect(function(err) {
    if (err) throw err;
    conn.query("SELECT * FROM people", function (err, result, fields) {
        if (err) throw err;
        result.forEach(person => {people.push(person.name)});
    });
});

app.get('/', (req, res) => {
    const response = '<h1>Full Cycle Rocks!</h1>';
    var list = '';
    people.forEach(p => list = list + '<li>' + p + '</li>' )
    res.send(response + list)
})

app.listen(3000, () => (console.log('Server is running...')))
