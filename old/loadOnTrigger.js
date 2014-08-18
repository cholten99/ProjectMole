// Initialise function
function initialiseTimeTrigger(triggerName) {
  // Connect to Firebase
  FirebaseRef = new Firebase("https://blazing-fire-4598.firebaseio.com/ProjectMole/");        

  var projectName = getProjectName();

  var cookieName = "ProjectMole_" + projectName + "_" + triggerName;

  var testRef = FirebaseRef.child(projectName).child(triggerName);

  testRef.on('value', function(snapshot) {
    var timeTest = GetCookie(cookieName);
    var firebaseTest = snapshot.val();

    if (timeTest == "null") {
      SetCookie(cookieName, firebaseTest, 1);
    } else if (firebaseTest > timeTest) {
      SetCookie(cookieName, firebaseTest, 1);
      triggerUpdated();
    }

  });

}

// Work out the project name
function getProjectName() {
  var docURL = document.URL;
  var start = docURL.indexOf("ProjectMole") + 12;
  var end = docURL.indexOf("/", start);
  var projectName = docURL.substring(start, end);
  return projectName;
}

// Cookie code more-or-less cribbed from : http://www.w3schools.com/js/js_cookies.asp
function SetCookie(cookieName, value, days) {
  var expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + days);
  var cookieValue = escape(value) + ((days==null) ? "" : "; expires=" + expireDate.toUTCString() + "; path=/");
  document.cookie = cookieName + "=" + cookieValue;
}

// Get cookie function
function GetCookie(cookieName) {
  var allCookies = document.cookie;
     
  // Check if it's in the list but not the first
  var start = allCookies.indexOf(" " + cookieName + "=");
  if (start == -1) {
    // Check if it's the first
    start = allCookies.indexOf(cookieName + "=");
  }
  var value = null;
  // If we've still not found it it's not in there
  if (start != -1) {
    start = allCookies.indexOf("=", start) + 1;
    var end = allCookies.indexOf(";", start);
    if (end == -1) {
      end = allCookies.length;
    }
    value = unescape(allCookies.substring(start, end));
  }
  return value;
}
