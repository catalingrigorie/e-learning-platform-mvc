const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "D3fYAIhulGHs7rAvU7WO2lhwbHXgPKwL",
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
