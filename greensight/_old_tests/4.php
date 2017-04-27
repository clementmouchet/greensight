<?php
// Include required files
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

// Set up required definitions for use
define('AMEE_API_URL',              'stage.amee.com');
define('AMEE_API_PROJECT_KEY',      'greensight');
define('AMEE_API_PROJECT_PASSWORD', '8teht3c9');

// Set up the profile, category & type variables

// Create a new profile
$sProfileUID      = "KIMLCN36OCXB"; // Change this to one that exists for you
printf("Profile UID: %s\n", $sProfileUID, "\n --");

try {


	// Create the AMEE API Profile
    $oProfile = new Services_AMEE_Profile($sProfileUID);

	$oProfile->delete();
	echo "Deleted profile item OK\n";
	

} catch (Exception $oException) {

    // An error occured
    echo "Error: " . $oException->getMessage() . "\n";

}
?>