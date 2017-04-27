<?php
// Include required files
set_include_path('/usr/lib/php/pear');
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

// Set up required definitions for use
define('AMEE_API_URL',              'stage.amee.com');
define('AMEE_API_PROJECT_KEY',      'greensight');
define('AMEE_API_PROJECT_PASSWORD', '8teht3c9');


// Set up the profile, category & type variables
$sProfileCategory = "/home/appliances/computers/generic";
$aProfileCategory = array(
    "device" => "Personal Computers",
    "rating" => "Desktop"
);

try {
    // Create the AMEE API Profile
    $oProfile = new Services_AMEE_Profile();

    // Create the AMEE API Data Item
    $oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

    // Prepare the values for the new AMEE API Profile Item
    // The following values MUST be provided for this usage
    $aRequiredProfileItemValues = array(
      'numberOwned' => '2',
      'onStandby' => 'never'
    );
    
    $sDataItemUID = $oDataItem->getUID();

    //set up variables
    $url = 'https://'.AMEE_API_URL.'/data'.$sProfileCategory.'/'.$sDataItemUID;
    $header_array = array('Accept' => 'application/json',
                    'Authorization' => 'Basic Z3JlZW5zaWdodDo4dGVodDNjOQ==');
    $ssl_array = array('version' => SSL_VERSION_SSLv3);
    $options = array(headers => $header_array,
                    httpauthtype => HTTP_AUTH_BASIC,
                    protocol => HTTP_VERSION_1_1,
                    ssl => $ssl_array);
                    
    //create the httprequest object                
    $httpRequest_OBJ = new httpRequest($url, HTTP_METH_GET, $options);
    //add the content type
    $httpRequest_OBJ->setContentType = 'Content-Type: application/json';
    //send the http request
    $result = $httpRequest_OBJ->send();
    //print out the result
    //echo ($result);
    echo ($httpRequest_OBJ->getResponseBody());

} catch (Exception $oException) {
    // An error occured
    echo "Error: " . $oException->getMessage() . "\n";

}
?>