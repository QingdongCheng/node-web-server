const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

//This helper take one arguement.
//to pass the arguement in, provide the arguement after a blank
hbs.registerHelper('upperCase', (text) => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  const now = new Date().toString();
  var log = `${now} ${req.method} ${req.url}`;
  fs.appendFile('sever.log', log, (err) => {
    if (err) {
      console.log('unable to append to the file.');
    }
  });
  next();
});

// app.use((req,res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Hi there. Welcome to our website.',
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/object', (req, res) => {
  res.send({
    name: 'Qingdong',
    address: 'Brown Street, West Lafayette.'
  });
});


app.listen(3000, () => {
  console.log("The server is running on port 3000.");
});
