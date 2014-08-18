function getSortedKeys(obj) {
  var keys = []; for(var key in obj) keys.push(key);
  return keys.sort(function(a,b){return obj[a]-obj[b]});
}

function updateTable() {
  // Reusing code from time trigger library
  var projectName = getProjectName();

  // Connect to Firebase
  FirebaseRef = new Firebase("https://blazing-fire-4598.firebaseio.com/ProjectMole/" + projectName);

  headingsRef = FirebaseRef.child("structure");
  headingsRef.once('value', function(data) {

    var fetched = data.val();
    var structureKeys = Object.keys(fetched);
    var myArray = new Array();
    $.each(structureKeys, function(index, value) {
myArray[value] = fetched[value].position;
    });
    var sortedArray = getSortedKeys(myArray);

    var tableHTML = "<table class='table table-striped'>\n<thead>\n<tr>\n";
    $.each(sortedArray, function(index, value) {
tableHTML += "<th>" + value + "</th>\n";
    });
    tableHTML += "</tr>\n</thead>\n";

    dataRef = FirebaseRef.child("data");
    dataRef.once('value', function(data) {
var fetched = data.val();
var dataKeys = Object.keys(fetched);
$.each(dataKeys, function(outerIndex, outerValue) {
  tableHTML += "<tr>";
  $.each(sortedArray, function(innerIndex, innerValue) {
    tableHTML += "<td>" + fetched[outerValue][innerValue] + "</td>\n";
  });
  tableHTML += "</tr>\n";
});

tableHTML += "</table>\n";
$("#theTable").html(tableHTML);

    });

  });

}

