<?php

// Named after AMEE API, oDataItemOptions perfoms the "DrillDown" using parameters transmitted via AJAX and returns options object in JSON
require_once '../config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

$sProfileCategory = ($_GET['sProfileCategory']) ? $_GET['sProfileCategory'] : null;
$productType = ($_GET['productType']) ? $_GET['productType'] : null;
$brand = ($_GET['brand']) ? $_GET['brand'] : null;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : null;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : null;
$category = ($_GET['category']) ? $_GET['category'] : null;
$device = ($_GET['device']) ? $_GET['device'] : null;
$rating = ($_GET['rating']) ? $_GET['rating'] : null;

try {
	// BROWSE FOR TYPE IN A DESKTOP AND INTEGRATED COMPUTERS
    $sProfileCategory = $sProfileCategory;
	$aProfileCategory = array(
		"productType" => $productType,
		"brand" => $brand ,
		"modelName" => $modelName,
		"modelNumber" => $modelNumber,
		"category" => $category,
		"device" => $device,
		"rating" => $rating);
		
	$oDataItem = Services_AMEE_DataItem::browseDrillDownOptions(
		$sProfileCategory,
		$aProfileCategory
	);

	// print_r($oDataItem);
    header('Content-type: application/json');
    echo json_encode($oDataItem['options']);

} catch (Exception $oException) {
	// An error occured
	echo "Error: " . $oException->getMessage() . "\n";
}
?>