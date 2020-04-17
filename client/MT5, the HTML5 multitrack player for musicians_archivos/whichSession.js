var queryStringUtility = {};

queryStringUtility.parseQueryString = function( queryString ) {
  var params = {}, queries, temp, i, l;

  if (queryString.charAt(0) === '?') {
    queryString = queryString.substring(1);
  }

  // Split into key/value pairs
  queries = queryString.split("&");

  // Convert the array of strings into an object
  for ( i = 0, l = queries.length; i < l; i++ ) {
    temp = queries[i].split('=');
    params[temp[0]] = temp[1];
  }

  return params;
};

queryStringUtility.buildQueryString = function (queryArray) {
  // Create start string.
  var output = '?';

  // Cycle elements in array.
  jQuery.each(queryArray, function (key, val) {
    if (typeof key !== 'undefined' && key) {
      // If we have a key, append it to the string.
      output += key;

      if (typeof val !== 'undefined' && val) {
        // If we have a value, append an '=' followed by the value.
        output += ('=' + val);
      }

      // Append an ampersand.
      output += '&';
    }
  });

  // Remove the last character in the string (this will be the question mark 
  // if we have no query parameters, or the trailing ampersand).
  output = output.substr(0, output.length-1);

  return output;
};

;(function (window, $) {

  var queryString = window.location.search;
  var queryArray = queryStringUtility.parseQueryString(queryString);
  var session = queryArray.session || null;

  window.whichSession = {};

  whichSession.whichDefault = function () {
    if (!session) return null;
    if (!sessionsData[session]) return null;

    return sessionsData[session]['default'];
  };

  whichSession.whichList = function () {
    if (!session) return null;
    if (!sessionsData[session]) return null;

    return sessionsData[session]['list'];
  };

  whichSession.whichInfo = function (i) {
    if (!session) return null;
    if (!sessionsData[session]) return null;
    if (!sessionsData[session]['info']) return null;

    return sessionsData[session]['info'][i];
  };


})(window, jQuery);

