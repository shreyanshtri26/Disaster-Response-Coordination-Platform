const axios = require('axios');
const { cacheData, getCachedData } = require('../utils/cacheUtils');

async function geocodeLocation(locationName) {
  const cacheKey = `geocode:${locationName}`;
  const cachedData = await getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(locationName)}.json`,
      {
        params: {
          access_token: process.env.MAPBOX_API_KEY,
          limit: 1
        }
      }
    );

    if (response.data.features.length > 0) {
      const [longitude, latitude] = response.data.features[0].center;
      const result = { longitude, latitude };

      // Cache the result
      await cacheData(cacheKey, result, 86400); // 24 hours TTL

      return result;
    }

    throw new Error(`Location not found: ${locationName}`);
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}

module.exports = {
  geocodeLocation
}; 