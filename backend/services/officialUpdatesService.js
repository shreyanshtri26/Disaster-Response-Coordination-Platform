const mockUpdates = require('../mock/officialUpdates');

class OfficialUpdatesService {
  async fetchUpdates({ disasterType, location }) {
    let results = mockUpdates;
    if (disasterType) {
      results = results.filter(update => update.disasterType === disasterType);
    }
    if (location) {
      results = results.filter(update => update.location && update.location.includes(location));
    }
    return results;
  }
}

module.exports = new OfficialUpdatesService(); 