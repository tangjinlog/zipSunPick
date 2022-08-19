const chatSchema = require('./models/sample');

exports.chatSchema = async (sample) => {
  if ( typeof sample === 'undefined' || sample === {}) {
    throw new TypeError(`sample(${sample}) is empty`);
  }

  const samples = await chatSchema.chatSchema(sample);
  return samples;
}