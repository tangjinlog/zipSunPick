const schema = require('./schema');


//내가 이해한 sample = mongoose model sampleSchema
exports.addSample = async (sample) => {
  const ret = await schema.create({...sample});
  return ret || {};
}