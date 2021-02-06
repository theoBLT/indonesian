exports.handler = (event, context, callback) => {

    // Setting headers to prevent CORS issue with localhost
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
      };

    const response = {
        statusCode: 200,
        headers,
        body: JSON.stringify({
            message: 'Hi there!',
            event: event,
        }),
    }
    return callback(null,response)
}