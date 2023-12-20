const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const server = express();

const db = new sqlite3.Database('./gik339-labb2.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Ansluten till gik339-labb2.db-databasen.');
  }
});

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});

// Definiera GET-route för '/users'
server.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            // Hantera eventuella fel
            res.status(500).send('Serverfel: ' + err.message);
        } else {
            // Skicka tillbaka dataraderna som respons
            res.send(rows);
        }
    });
});

// Starta servern på port 3000
server.listen(3000, () => {
    console.log('Servern körs på port 3000');
});
