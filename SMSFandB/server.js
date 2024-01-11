const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());

//mysql connection
const connection = mysql.createConnection({
  host: 'your_mysql_host',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_mysql_database'
});

//connect to mysql database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.post('/api/send-message', (req, res) => {
  //fetch the phone number
  const query = 'SELECT phone_number FROM users WHERE id = ?';
  const userId = req.body.userId; 

  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send(err);
      return;
    }

    if (results.length === 0) {
      res.status(404).send('User not found');
      return;
    }

    const phoneNumber = results[0].phone_number;

    const accountSid = 'AC78fe17e1bab7d5ff49c67e3e1e1fd527';
    const authToken = 'c0f2b23f6b7c01b0b1b0fc9fc44df6e0';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
        body: 'Payment Successful',
        from: '+14159156595',
        to: phoneNumber
      })
      .then(message => res.send(message))
      .catch(error => res.status(500).send(error));
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});