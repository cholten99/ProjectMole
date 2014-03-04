// Global variables
var myElementList = new Array();


// My widget classes

function HeaderWidget() {
  this.widgetType = "HeaderWidget";
  this.data = "Header!";
}

function FooterWidget() {
  this.widgetType = "FooterWidget";
  this.data = "Footer!";
}

function TextWidget() {
  this.widgetType = "TextWidget";
  this.data = "Text!";
}

function TextBoxWidget() {
  this.widgetType = "TextBoxWidget";
  this.data = "TextBox!";
}

function DropboxWidget() {
  this.widgetType = "DropboxWidget";
  this.data = "Dropbox!";
}

// jQuery trigger handling

function doToggleButton() {
  window.open("http://www.fish.com", "mole_render");
}

function doLoadButton() {
  var projectName = $("#project_name").val();
  if (projectName === "") {
    alert("Project name is empty");
  } else {
    my_array = {};
    my_array['Action'] = "Get";
    my_array['UID'] = $("#project_name").val();
    data_out = JSON.stringify(my_array);

    $.post("database.php", { Data:data_out },
    function(dataBack,status){
      myElementList = jQuery.parseJSON(dataBack);
      redrawElementBox();
    });
  }
}

function doSaveButton() {
  var projectName = $("#project_name").val();
  if (projectName === "") {
    var alertString = "Project name is empty";
    if ($("#autosave_checkbox").is(':checked')) {
      alertString += " (tried to autosave)"
    }
    alert(alertString);
  } else {
    my_array = {};
    my_array['Action'] = "Set";
    my_array['UID'] = $("#project_name").val();
    my_array['NewData'] = JSON.stringify(myElementList);
    data_out = JSON.stringify(my_array);

    $.post("database.php", { Data:data_out },
    function(data_back,status){
      $("#save_text").fadeIn("slow");
      $("#save_text").fadeOut("slow");
    });
  }
}

function autoSave() {
  if ($("#autosave_checkbox").is(':checked')) {
    doSaveButton();
  }
}

function doAddWidgetButton() {
  myElementList.splice((myElementList.length - 1), 0, new window[$("#widget_dropbox").val()]);
  autoSave();
  redrawElementBox();
}

function deleteWidget(index) {
  myElementList.splice(index, 1);
  autoSave();
  redrawElementBox();
}

function doDragEvent(event) {
  event.dataTransfer.setData("Text", event.target.id);
}

function doDropEvent(event) {
  event.preventDefault();
  var dragged = event.dataTransfer.getData("Text");
  var dragged_num = dragged.charAt(dragged.length - 1);
  var dropped_on = event.target.id;
  var dropped_on_num = dropped_on.charAt(dragged.length - 1);

  var tempObjectHandle = myElementList[dragged_num];
  myElementList.splice(dragged_num, 1);
  myElementList.splice(dropped_on_num, 0, tempObjectHandle);
  autoSave();
  redrawElementBox();
//  console.log("Number " + dragged_num + " was dragged and dropped on number " + dropped_on_num);
}

function doBlockDropHoverEvent(event) {
  event.preventDefault();
}

function redrawElementBox() {
  var contents = "";
  var listLength = myElementList.length
 
  for(i = 0; i < listLength; i++) {
    var notHeadOrFoot = false;
    if ((i != 0) && (i != (listLength - 1))) {
      notHeadOrFoot = true;
    }
  
    contents += "<div class='widget_elements' id='element_list_" + i + "'";
    if (notHeadOrFoot) { contents += "draggable='true' onDragStart='doDragEvent(event)' onDragOver='doBlockDropHoverEvent(event)' onDrop='doDropEvent(event)'"; }
    contents += ">";
    contents += myElementList[i].data + "<br/>";
    if (notHeadOrFoot) {
      contents += "[<a href='javascript:deleteWidget(" + i + ")'>Delete</a>]<br/>";
    }
    contents += "</div>";
  }
  $("#element_box").html(contents);
}

// Initialisation function run on document load
$(document).ready(function() {

  // Initialise up global array
  myElementList.push(new HeaderWidget());
  myElementList.push(new FooterWidget());

  // Initialise the widget list
  redrawElementBox();

  // Register trigger for Load button
  $("#toggle_button").click(function() {
    doToggleButton();
  });

  // Register trigger for Load button
  $("#load_button").click(function() {
    doLoadButton();
  });

  // Register trigger for Save button
  $("#save_button").click(function(){
    doSaveButton();
  });
  
  // Register trigger for Add Widget button
  $("#add_widget_button").click(function(){
    doAddWidgetButton();
  });
});