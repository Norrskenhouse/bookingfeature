function postEvent(eventData, responseCallback) {
  var data = JSON.stringify({
    "event": {
      "name": eventData.name,
      "starts_at": eventData.starts_at
    }
  });

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var callback = responseCallback || function() {};
      callback(this.responseText);
    }
  });

  xhr.open("POST", this.base_url + "/events.json");
  xhr.setRequestHeader("content-type", "application/json");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}

function getEvents(responseCallback) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var callback = responseCallback || function() {};
      callback(this.responseText);
    }
  });

  xhr.open("GET", this.base_url + "/events.json");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}

function getBookings(responseCallback) {
  var data = null;

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      var callback = responseCallback || function() {};
      callback(this.responseText);
    }
  });

  xhr.open("GET", this.base_url + "/events/bookings.json");
  xhr.setRequestHeader("cache-control", "no-cache");

  xhr.send(data);
}

var LunchAndLearn = {
  base_url: "https://norrsken-lunch-and-learn.herokuapp.com",
  postEvent: postEvent,
  getEvents: getEvents,
  getBookings: getBookings
};
