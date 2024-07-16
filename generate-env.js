const fs = require('fs');
require('dotenv').config();

const envVariables = `
const ENV = {
  WEATHER_API_KEY: "${process.env.WEATHER_API_KEY}"
};
`;

fs.writeFileSync('./env.js', envVariables);