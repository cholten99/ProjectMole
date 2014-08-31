
// Global variable for Firebase access
FirebaseRef = null;

function initialise_firebase() {
  // Connect to Firebase
  FirebaseRef = new Firebase("https://blazing-fire-4598.firebaseio.com/ProjectMole/");
}

function get_all_under_node(path) {
  var ref = FirebaseRef.child(path);
  ref.once('value', get_all_under_node_callback);
}

function get_all_under_node_callback(dataSnapshot) {
  return($.map(dataSnapshot, function(data) { return data; }));
}

function register_for_node_change(path, callback_function) {
  var ref = FirebaseRef.child(path).on('value', callback_function);
}

function add_node(path, data_array) {
  var ref = FirebaseRef.child(path);
  ref.set(JSON.stringify(data_array));
}

function remove_node(path) {
  var ref = FirebaseRed.child(path);
  ref.remove();
}

function update_node(path, data_array) {
  remove_node(path);
  add_node(path, data_array);
}

function update_attribute() {

}
