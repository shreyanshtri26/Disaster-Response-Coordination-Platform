const supabase = require('../config/db');

async function createDisaster(disaster) {
  return await supabase
    .from('disasters')
    .insert(disaster)
    .select();
}

async function getDisasters(filters = {}) {
  let query = supabase.from('disasters').select('*');
  if (filters.tag) query = query.contains('tags', [filters.tag]);
  if (filters.owner_id) query = query.eq('owner_id', filters.owner_id);
  // Add more filters as needed
  return await query;
}

async function getDisasterById(id) {
  return await supabase
    .from('disasters')
    .select('*')
    .eq('id', id)
    .single();
}

async function updateDisaster(id, updateData) {
  return await supabase
    .from('disasters')
    .update(updateData)
    .eq('id', id)
    .select();
}

async function deleteDisaster(id) {
  return await supabase
    .from('disasters')
    .delete()
    .eq('id', id);
}

module.exports = {
  createDisaster,
  getDisasters,
  getDisasterById,
  updateDisaster,
  deleteDisaster
}; 