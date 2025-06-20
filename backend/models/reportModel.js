const supabase = require('../config/db');

async function createReport(report) {
  return await supabase
    .from('reports')
    .insert(report)
    .select();
}

async function getReportsByDisaster(disaster_id) {
  return await supabase
    .from('reports')
    .select('*')
    .eq('disaster_id', disaster_id);
}

async function updateReport(id, updateData) {
  return await supabase
    .from('reports')
    .update(updateData)
    .eq('id', id)
    .select();
}

async function deleteReport(id) {
  return await supabase
    .from('reports')
    .delete()
    .eq('id', id);
}

module.exports = {
  createReport,
  getReportsByDisaster,
  updateReport,
  deleteReport
}; 