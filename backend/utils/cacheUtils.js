const supabase = require('../config/db');

async function cacheData(key, value, ttlSeconds) {
  const expiresAt = new Date();
  expiresAt.setSeconds(expiresAt.getSeconds() + ttlSeconds);

  const { data, error } = await supabase
    .from('cache')
    .upsert({
      key,
      value,
      expires_at: expiresAt.toISOString()
    }, {
      onConflict: 'key'
    });

  if (error) {
    console.error('Cache storage error:', error);
  }

  return data;
}

async function getCachedData(key) {
  const { data, error } = await supabase
    .from('cache')
    .select('value, expires_at')
    .eq('key', key)
    .single();

  if (error || !data) {
    return null;
  }

  // Check if cache has expired
  if (new Date(data.expires_at) < new Date()) {
    return null;
  }

  return data.value;
}

module.exports = {
  cacheData,
  getCachedData
}; 