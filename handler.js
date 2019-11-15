const db = require('./db_connect');

module.exports.getAllEvents = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('event')
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      console.log(e);
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Error: Could not find Events: ' + e
      });
    });
};

module.exports.createEvent = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  db.insert('event', data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not create Event ' + e
      });
    });
};

module.exports.deleteEvent = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  db.deleteById('event', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: 'Event Deleted!'
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not delete Event ' + e
      });
    });
};

module.exports.updateEvent = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const data = JSON.parse(event.body);
  db.updateById('event', event.pathParameters.id, data)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not update Event ' + e
      });
    });
};

module.exports.getEvent = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getById('event', event.pathParameters.id)
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        body: 'Could not find Event: ' + e
      });
    });
};
