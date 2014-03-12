<?php

  include ("utilities.php");

  function db_get($dbHandle, $uid) {
    $result = $dbHandle->query("SELECT Data FROM Mole WHERE UID='" . $uid . "'");
    if ($result->num_rows != 0) {
      $row = $result->fetch_array(MYSQLI_ASSOC);
      return ($row['Data']);
      $result->close();
    } else {
      return("Missing");
    }
  }

  function db_set($dbHandle, $uid, $new_data) {
    $exists = db_get($dbHandle, $uid);
    if ($exists == "Missing") {
      // Insert
      $command = "INSERT INTO Mole (UID, Data) VALUES ('" . $uid . "', '" . $new_data . "')";
    } else {
      // Update
      $command = "UPDATE Mole SET Data = '" . $new_data . "' WHERE uid = '" . $uid . "'";
    }
    $result = $dbHandle->query($command);
  }

  // Set up log file
  emptyTestFile();

  // Connect to DB
  $dbHandle = new mysqli("localhost", "bowsy", "VU8Jc7ccirsre73", "bowsy_ProjectMole");
  if ($dbHandle->connect_errno) {
    echo "Failed to connect to MySQL: (" . $dbHandle->connect_errno . ") " . $dbHandle->connect_error;
  }

  // What type of action
  $json_array = json_decode($_POST['Data'], true);
  $action = $json_array['Action'];
  $uid = $json_array['UID'];
  $new_data = $json_array['NewData'];

  if ($action == 'Get') {
    // Get
    print db_get($dbHandle, $uid);
  } elseif ($action == "Set") {
    // Set
    db_set($dbHandle, $uid, $new_data);
  } else {
    // Bad action
  }

  // Close DB on way out
  $dbHandle->close();

?>