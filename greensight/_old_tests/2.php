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
$oProfile = new Services_AMEE_Profile();
printf("Profile UID: %s\n", $oProfile->getUID(), "\n --");

$sProfileCategory = "home/appliances/energystar/office/computers/desktopsAndIntegrated";
$aProfileCategory = array(
    "productType" => "Integrated Computers",
    "brand" => "Apple",
    "modelName" => "iMac - 20-inch, 2.0GHz, Education",
    "modelNumber" => "MC015",
    "category" => "A"
);

try {

    // Create a new profile
    // $oProfile = new Services_AMEE_Profile();
    //     sProfileUID = $oProfile->getUID();
    //     //printf("Profile UID: %s\n", sProfileUID);

    // Create the AMEE API Data Item
    $oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

    // Prepare the values for the new AMEE API Profile Item
    // The following values MUST be provided for this usage
    $aRequiredProfileItemValues = array(
      'quantity' => '2'
    );

    // Create the new AMEE API Profile Item
    $oProfileItem = new Services_AMEE_ProfileItem(array(
        $oProfile,
        $oDataItem,
        $aRequiredProfileItemValues
    ));
	$aInfo = $oProfileItem->getInfo();
	printf("Description: %s\n", $aInfo['oDataItem'] , "\n -- ");

    // Display that the AMEE API Profile Item was created successfully
    echo "Created profile item OK\n";
    // Get the AMEE API Profile Item's info
    $aInfo = $oProfileItem->getInfo();
    // Display the total GHG emissions for this AMEE API Profile Item
    echo " - CO2 ({$aInfo['unit']}/{$aInfo['unit']}): {$aInfo['amount']}\n";

} catch (Exception $oException) {

    // An error occured
    echo "Error: " . $oException->getMessage() . "\n";

}
?>