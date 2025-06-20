const supabase = require('../config/db');

async function createResource(resource) {
  return await supabase
    .from('resources')
    .insert(resource)
    .select();
}

async function getResourcesByDisaster(disaster_id) {
  return await supabase
    .from('resources')
    .select('*')
    .eq('disaster_id', disaster_id);
}

async function updateResource(id, updateData) {
  return await supabase
    .from('resources')
    .update(updateData)
    .eq('id', id)
    .select();
}

async function deleteResource(id) {
  return await supabase
    .from('resources')
    .delete()
    .eq('id', id);
}

module.exports = {
  createResource,
  getResourcesByDisaster,
  updateResource,
  deleteResource
}; 