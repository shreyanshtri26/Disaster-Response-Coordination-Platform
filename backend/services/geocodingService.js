const axios = require('axios');
require('dotenv').config();
const logger = require('../utils/logger');
const { MAPBOX_ACCESS_TOKEN } = process.env;

if (!MAPBOX_ACCESS_TOKEN) {
  throw new Error('Missing MAPBOX_ACCESS_TOKEN in .env');
}

class GeocodingService {
  async geocodeLocation(locationName) {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`;
      const { data } = await axios.get(url);
      if (!data.features || !data.features.length) {
        throw new Error('No geocoding result from Mapbox');
      }
      const feature = data.features[0];
      return {
        latitude: feature.center[1],
        longitude: feature.center[0],
        place_name: feature.place_name,
        raw: feature
      };
    } catch (err) {
      logger.error('Mapbox geocoding error:', err.message);
      throw err;
    }
  }

  async reverseGeocode(lat, lng) {
    try {
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_ACCESS_TOKEN}&limit=1`;
      const { data } = await axios.get(url);
      if (!data.features || !data.features.length) {
        throw new Error('No reverse geocoding result from Mapbox');
      }
      const feature = data.features[0];
      return {
        place_name: feature.place_name,
        raw: feature
      };
    } catch (err) {
      logger.error('Mapbox reverse geocoding error:', err.message);
      throw err;
    }
  }
}

module.exports = new GeocodingService(); 