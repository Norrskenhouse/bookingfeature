# README - Norrsken Lunch & Learn

Stupid simple, super tiny API that lets you book events on certain days. To auth and no fuss.

## Dependencies

* Rails 5.1
* Ruby 2.4.1
* PostgreSQL > 9.0

## API Client

You can fetch the API-client at `/lunch-and-learn.js`.

```js
// Post event
var eventData = { name: 'buren' };
LunchAndLearn.postEvent(eventData, function(responseData) {
  console.log(responseData);
});

// Get events
LunchAndLearn.getEvents(function(responseData) {
  console.log(responseData);
});

// Get bookings
LunchAndLearn.getBookings(function(responseData) {
  console.log(responseData);
});
```

## API documentation

`GET /events.json`:

```json
[{
  "id": 1,
  "name": "buren",
  "weekday_name": "Tuesday",
  "week_number": 29,
  "starts_at": "2017-07-18T00:10:15.000Z",
  "created_at": "2017-07-13T15:19:02.794Z"
},
{
  "id": 2,
  "name": "buren",
  "weekday_name": "Tuesday",
  "week_number": 30,
  "starts_at": "2017-07-25T00:10:15.000Z",
  "created_at": "2017-07-25T15:19:04.844Z"
}]
```

`GET /events/bookings.json`:

```json
{
  "weeks": [{
    "28": {
      "available": true,
      "name": null
    },
    "29": {
      "available": false,
      "name": "buren"
    }
  }]
}
```

_It returns entries ~12 weeks to the future, the above example has been clipped for brevity._

`POST /events.json`:

_Request_

```json
{
	"event": {
		"name": "Hi",
		"starts_at": "2017-07-11"
	}
}
```

_Successful response_:

```json
{
  "status": 201,
  "message": "Successfully created event!"
}
```

_Error response_:

```json
{
    "status": 422,
    "errors": [
        "Starts at there is already an event planned for this day"
    ]
}
```

## Deploy

The easiest way to get this app deployed is to put on Heroku:

```
# cd into the applications root folder
$ heroku create <your_name>
$ heroku run rails db:migrate
```
