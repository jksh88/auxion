const HerokuCaffeine = require('heroku-caffeine');
const herokuCaffeine = new HerokuCaffeine({
  urls: ['https://axn.herokuapp.com/'],
});

module.exports = herokuCaffeine;
