(function(window) {
  function postEvent(eventData, responseCallback) {
    this._ensureConfig();
    var data = JSON.stringify({
      "event": {
        "name": eventData.name,
        "starts_at": eventData.startsAt
      }
    });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var callback = responseCallback || function() {};
        callback(JSON.parse(this.responseText));
      }
    });

    xhr.open("POST", this.baseURL + "/events.json");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  }

  function getEvents(responseCallback) {
    this._ensureConfig();
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var callback = responseCallback || function() {};
        callback(JSON.parse(this.responseText));
      }
    });

    xhr.open("GET", this.baseURL + "/events.json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  }

  function getEventSlots(responseCallback) {
    this._ensureConfig();
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var callback = responseCallback || function() {};
        callback(JSON.parse(this.responseText));
      }
    });

    xhr.open("GET", this.baseURL + "/events/slots.json");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
  }

  var Client = {
    baseURL: null,
    postEvent: postEvent,
    getEvents: getEvents,
    getEventSlots: getEventSlots,
    _ensureConfig: function() {
      if (!this.baseURL) {
        throw new Error('You muest set LunchAndLearn.baseURL');
      }
    }
  };

  function EventSlots(slotsData) {
    this.data = slotsData.weeks;

    this.isWeekAvailable = function(week) {
      var weekData = this.data[week];
      if (!weekData) return false;

      return weekData.available;
    }
  };

  var LaL = {
    Client: Client,
    EventSlots: EventSlots
  };

  window.LaL = LaL;
})(window);
