exports.handler = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: 'Hi there!',
            event: event,
        }),
    }
    return callback(null,response)
}