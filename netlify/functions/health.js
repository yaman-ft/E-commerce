const { response } = require('./utils');

exports.handler = async (event, context) => {
  try {
    if (event.httpMethod === 'OPTIONS') {
      return response(200, {});
    }

    return response(200, { status: 'ok', message: 'API is running' });
  } catch (error) {
    console.error('Error:', error);
    return response(500, { message: 'Something went wrong!' });
  }
};
