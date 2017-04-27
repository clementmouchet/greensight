<?php

error_reporting(0);
// Include required files
set_include_path('/usr/lib/php/pear');
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

// Set up required definitions for use
define('AMEE_API_URL',              'stage.amee.com');
define('AMEE_API_PROJECT_KEY',      'greensight');
define('AMEE_API_PROJECT_PASSWORD', '8teht3c9');

try {
	
	
	// BROWSE FOR TYPE IN A DESKTOP AND INTEGRATED COMPUTERS
	$sProfileCategory = "/home/appliances/energystar/office/computers/desktopsAndIntegrated";

    $oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
        $sProfileCategory,
        array()
    );
	echo(" > Product type :\n");
	//print_r($oDataItem);
	
	// BROWSE FOR BRAND IN INTEGRATED COMPUTERS
	$aProfileCategory = array(
	    "productType" => "Integrated Computers",
	    "brand" => null ,
	    "modelName" => null,
	    "modelNumber" => null,
	    "category" => null
	);
	
	echo($aProfileCategory['productType']);
	$oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
        $sProfileCategory,
        $aProfileCategory
    );
	echo("\n > Brand :\n");
	//print_r($oDataItem);
	
	// BROWSE FOR MODEL IN APPLE
	$aProfileCategory = array(
	    "productType" => "Integrated Computers",
	    "brand" => "Apple" ,
	    "modelName" => null,
	    "modelNumber" => null,
	    "category" => null
	);
	
	echo($aProfileCategory['brand']);
	$oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
        $sProfileCategory,
        $aProfileCategory
    );
	echo("\n > Model name : \n");
	//print_r($oDataItem);
	
	// BROWSE FOR MODEL NUMBER IN MODEL
	$aProfileCategory = array(
	    "productType" => "Integrated Computers",
	    "brand" => "Apple" ,
	    "modelName" => "iMac - 24inch, 2.93GHz",
	    "modelNumber" => null,
	    "category" => null
	);
	
	echo($aProfileCategory['modelName']);
	$oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
        $sProfileCategory,
        $aProfileCategory
    );
	echo(" > Model number :\n");
	//print_r($oDataItem);
	echo($aProfileCategory['modelNumber']);
	
	
	if ($oDataItem==null) {
		echo("\nDrill down finished\n");
		try {

			$oProfile = new Services_AMEE_Profile();
			$sProfile = $oProfile->getUID();
			
		    // Create the AMEE API Data Item
		    $oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);
		
			// Print details
			// $aOptions = $oDataItem->getDrillDownOptions();
			// 			print_r($aOptions);
			// 			
			// 			$sPath = $oDataItem->getPath();
			// 			print_r($sPath);

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

		    // Display that the AMEE API Profile Item was created successfully
		    echo "\n\nCreated profile item succefully  \n\n";
		
		    // Get the AMEE API Profile Item's info
		    $aInfo = $oProfileItem->getInfo();
		
		    // Display the total GHG emissions for this AMEE API Profile Item
		    echo ($aRequiredProfileItemValues['quantity']." ". $aProfileCategory['modelName']." = annual CO2 ({$aInfo['unit']}/{$aInfo['unit']}): {$aInfo['amount']}\n\n");

			$oProfile->delete();
			echo "Deleted profile item successfully\n";


		} catch (Exception $oException) {

		    // An error occured
		    echo "Error: " . $oException->getMessage() . "\n";

		}
	}
	

} catch (Exception $oException) {

    // An error occured
    echo "Error: " . $oException->getMessage() . "\n";

}
?>