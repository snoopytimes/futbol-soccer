const express = require('express');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from api' });
});

app.get('/leagues', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/leagues',
    params: {
      id: req.query.id,
      code: req.query.code,
      current: req.query.current,
      season: req.query.season,
    },
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': process.env.REACT_APP_SPORTS_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.response);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/fixtures', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/fixtures',
    params: {
      date: req.query.date,
    },
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': process.env.REACT_APP_SPORTS_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.response);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get('/standings', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://v3.football.api-sports.io/standings',
    params: {
      league: req.query.league,
      season: req.query.season,
    },
    headers: {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-apisports-key': process.env.REACT_APP_SPORTS_API_KEY,
    },
  };

  axios
    .request(options)
    .then((response) => {
      res.json(response.data.response);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
