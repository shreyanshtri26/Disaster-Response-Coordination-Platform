const axios = require('axios');
const cheerio = require('cheerio');
const { cacheData, getCachedData } = require('../utils/cacheUtils');

async function scrapeOfficialUpdates(disasterType) {
  const cacheKey = `official_updates:${disasterType}`;
  const cachedData = await getCachedData(cacheKey);

  if (cachedData) {
    return cachedData;
  }

  try {
    const sources = getOfficialSourcesForDisasterType(disasterType);
    const updates = [];

    for (const source of sources) {
      const response = await axios.get(source.url);
      const $ = cheerio.load(response.data);

      $(source.selector).each((i, el) => {
        updates.push({
          title: $(el).find(source.titleSelector).text().trim(),
          content: $(el).find(source.contentSelector).text().trim(),
          source: source.name,
          url: source.url,
          timestamp: new Date().toISOString()
        });
      });
    }

    // Cache the results
    await cacheData(cacheKey, updates, 3600); // 1 hour TTL

    return updates;
  } catch (error) {
    console.error('Error scraping official updates:', error);
    throw error;
  }
}

function getOfficialSourcesForDisasterType(disasterType) {
  // Return appropriate sources based on disaster type
  const sources = {
    flood: [
      {
        name: 'FEMA Flood Updates',
        url: 'https://www.fema.gov/disaster/updates',
        selector: '.disaster-update',
        titleSelector: 'h3',
        contentSelector: '.content'
      },
      {
        name: 'Red Cross Flood Response',
        url: 'https://www.redcross.org/about-us/news-and-events/news.html',
        selector: '.news-item',
        titleSelector: 'h2',
        contentSelector: '.description'
      }
    ],
    earthquake: [
      {
        name: 'USGS Earthquake Updates',
        url: 'https://www.usgs.gov/news/all',
        selector: '.usa-card',
        titleSelector: '.usa-card__heading',
        contentSelector: '.usa-card__body'
      }
    ],
    // Add more disaster types and sources as needed
  };

  return sources[disasterType] || [];
}

module.exports = {
  scrapeOfficialUpdates
}; 