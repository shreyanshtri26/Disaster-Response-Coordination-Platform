const mockPosts = require('../mock/socialMediaData');

class SocialMediaService {
  // Fetch mock posts filtered by disasterType, tag, or location
  async fetchReports({ disasterType, tag, location }) {
    let results = mockPosts;
    if (disasterType) {
      results = results.filter(post => post.disasterType === disasterType);
    }
    if (tag) {
      results = results.filter(post => post.tags.includes(tag));
    }
    if (location) {
      results = results.filter(post => post.location && post.location.includes(location));
    }
    return results;
  }
}

module.exports = new SocialMediaService(); 