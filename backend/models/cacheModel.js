const supabase = require('../config/db');

async function setCache(key, value, expires_at) {
  return await supabase
    .from('cache')
    .upsert({ key, value, expires_at }, { onConflict: 'key' });
}

async function getCache(key) {
  return await supabase
    .from('cache')
    .select('value, expires_at')
    .eq('key', key)
    .single();
}

async function deleteCache(key) {
  return await supabase
    .from('cache')
    .delete()
    .eq('key', key);
}

module.exports = {
  setCache,
  getCache,
  deleteCache
}; 