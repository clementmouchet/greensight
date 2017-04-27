<?php
/**
 * Named after AMEE API, oProfile creates a profile and returns the details in a JSON object
 * the PECL pecl_http and the PEAR AMEE services libraries are required
 */
include '../config.php';
require_once 'Services/AMEE/DataItem.php';
require_once 'Services/AMEE/Profile.php';
require_once 'Services/AMEE/ProfileItem.php';

// GET PARAMETERS
$sProfileCategory = ($_GET['sProfileCategory']) ? $_GET['sProfileCategory'] : '/home/appliances/computers/generic';
$productType = ($_GET['productType']) ? $_GET['productType'] : NULL;
$brand = ($_GET['brand']) ? $_GET['brand'] : NULL;
$modelName = ($_GET['modelName']) ? $_GET['modelName'] : NULL;
$modelNumber = ($_GET['modelNumber']) ? $_GET['modelNumber'] : NULL;
$category = ($_GET['category']) ? $_GET['category'] : NULL;
$device = ($_GET['device']) ? $_GET['device'] : 'Personal Computers';
$rating = ($_GET['rating']) ? $_GET['rating'] : 'Desktop';
$onStandby = floatval($_GET['onStandby']) ? $_GET['onStandby'] : 1;
$role = ($_GET['role']) ? $_GET['role'] : NULL;
$weeksOnPerYear = intval($_GET['weeksOnPerYear']) ? $_GET['weeksOnPerYear'] : 52;
$daysOnPerWeek = intval($_GET['daysOnPerWeek']) ? $_GET['daysOnPerWeek'] : intval(7);
$onPerDay = floatval($_GET['onPerDay']) ? $_GET['onPerDay'] : floatval(6.25);
$offPerDay = floatval($_GET['offPerDay']) ? $_GET['offPerDay'] : floatval(0);
$standbyPerDay = floatval($_GET['standbyPerDay']) ? $_GET['standbyPerDay'] : floatval(0);
$quantity = intval($_GET['quantity']) ? $_GET['quantity'] : 1;

// POWER USAGE FACTORS
$onFactor = 1;
$offFactor = 0.8;
$onStanbyFactor = 0.5;

/**
 * getProfile returns JSON objects with the equipment description and it's footprint details.
 */
class getProfile extends Services_AMEE_ProfileItem
{
    
    function __construct() {}

	// GET COMPUTER PROFILE
	public function getComputerProfile($sProfileCategory, $productType, $brand, $modelName, $modelNumber, $category, $onStandby, $quantity)
	{
		try {
			// Prepare the category for the new AMEE API Profile Item
			$sProfileCategory = $sProfileCategory;
			$aProfileCategory = array(
				"productType" => $productType,
				"brand" => $brand ,
				"modelName" => $modelName,
				"modelNumber" => $modelNumber,
				"category" => $category
			);

			// Create the AMEE API Profile
			$oProfile = new Services_AMEE_Profile();

			// Create the AMEE API Data Item
			$oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

			$aRequiredProfileItemValues = array(
				'quantity' => $quantity
			);

			// Create the new AMEE API Profile Item
			$oProfileItem = new Services_AMEE_ProfileItem(array(
					$oProfile,
					$oDataItem,
					$aRequiredProfileItemValues
				));

			// Get the AMEE API Profile Item's info
			$aInfo = $oProfileItem->getInfo();

			// delete profile as it is not needed anymore
			$oProfile->delete();

			// get Data Item UID for later use to retreive more info
			$sUID = $oDataItem->getUID();
			// Retreive Data Item Value Definition object from AMEE
			$aItemValueDefinition = getProfile::getDataItem($sUID, $sProfileCategory);

			// Create a device object to be stored in the database


			// get model name and model number if not returned during drilldown
			if (!$modelName) {
				$modelName = getProfile::getDataItemInfo($aItemValueDefinition, 'modelName');
			};
			if (!$modelNumber) {
				$modelNumber = getProfile::getDataItemInfo($aItemValueDefinition, 'modelNumber');
			};
			// basic description
			$sDeviceDesc = $brand." ".$modelName;
			// add modelNumber is necessary
			if ($modelName != $modelNumber) {
				$sDeviceDesc = $brand." ".$modelName." ".$modelNumber;
			};
			// add category is available
			if ($category) {
				$sDeviceDesc = $brand." ".$modelName." ".$modelNumber." (category ".$category.")";
			};

			$aDeviceValues = array(
				"type" => $aProfileCategory['productType'],
				"quantity" => $aRequiredProfileItemValues['quantity'],
				"kWhPerYear" => getProfile::getDataItemInfo($aItemValueDefinition, 'energyPerTime'),
				"onStandby" => $onStandby,
				"role" => $role,
				"weeksOnPerYear" => 'Not available with Energy Star products',
				"onPerDay" => '',
				"offPerDay" => '',
				"standbyPerDay" => '',
				"unit" => $aInfo['unit'],
				"perUnit" => $aInfo['perUnit'],
				"source" => getProfile::getDataItemInfo($aItemValueDefinition, 'source'),
				"modified" => getProfile::getDataItemInfo($aItemValueDefinition, 'modified'),
				"path" => getProfile::getDataItemInfo($aItemValueDefinition, 'path'),
				"modified" => getProfile::getDataItemInfo($aItemValueDefinition, 'modified'),
			);
			$oDeviceProfile = array(
				"description" => $sDeviceDesc,
				"values" => $aDeviceValues);

			// echo the device object in JSON
			header('Content-type: application/json');
			echo(json_encode($oDeviceProfile));

		} catch (Exception $oException) {
			// An error occured
			echo "\nError: " . $oException->getMessage() . "\n\n";
		}
	}

	// GET DEVICE PROFILE
	public function getDeviceProfile($sProfileCategory, $device, $rating, $onStandby, $role, $weeksOnPerYear,$daysOnPerWeek, $onPerDay, $offPerDay, $standbyPerDay, $quantity, $onFactor, $offFactor, $onStanbyFactor)
	{
		try {		    
			// Prepare the category for the new AMEE API Profile Item
			$sProfileCategory = $sProfileCategory;
			$aProfileCategory = array(
				"device" => $device,
				"rating" => $rating
			);

			// Create the AMEE API Profile
			$oProfile = new Services_AMEE_Profile();

			// Create the AMEE API Data Item
			$oDataItem = new Services_AMEE_DataItem($sProfileCategory, $aProfileCategory);

			// Prepare the values for the new AMEE API Profile Item
			// The following values MUST be provided for this usage
			$aRequiredProfileItemValues = array(
				'numberOwned' => $quantity,
				'onStandby' => 'SOME_VALUE'
			);

			// Create the new AMEE API Profile Item
			$oProfileItem = new Services_AMEE_ProfileItem(array(
					$oProfile,
					$oDataItem,
					$aRequiredProfileItemValues
				));

			// Get the AMEE API Profile Item's info
			$aInfo = $oProfileItem->getInfo();

			// delete profile as it is not needed anymore
			$oProfile->delete();

			// get Data Item UID for later use to retreive more info
			$sUID = $oDataItem->getUID();
			
			// Retreive Data Item Value Definition object from AMEE
			$aItemValueDefinition = getProfile::getDataItem($sUID, $sProfileCategory);
			
			// Create a device object to be stored in the database

			if (getProfile::getDataItemInfo($aItemValueDefinition, 'label')) {
				$sDeviceDesc = getProfile::getDataItemInfo($aItemValueDefinition, 'label');
			} else {
				$sDeviceDesc = $aProfileCategory['device']. " ". $aProfileCategory['rating'];
			}
			
            // print_r('kwhpear year stock= '.getProfile::getDataItemInfo($aItemValueDefinition, 'kWhPerYear')."\n");
			if ($aProfileCategory['device'] == 'Personal Computers') {
			    $kWhPerDay = floatval(floatval(getProfile::getDataItemInfo($aItemValueDefinition, 'kWhPerYear')) / 365); // divide the kWh Per Year to get day value
                // echo ('kWhPerDay = '.$kWhPerDay."\n");
			    if ($aProfileCategory['rating'] == 'Desktop' || $aProfileCategory['rating'] == 'Desktop no monitor') {
			        $kWhPerHour = floatval($kWhPerDay / 6.257);
                    // echo ('kWhPerHour = '.$kWhPerHour."\n");
			    } else if ($aProfileCategory['rating'] == 'Laptop') {
			        $kWhPerHour = floatval($kWhPerDay / 2);
			    }
                if ($onPerDay > 0) {
                    $kWhOn = floatval($kWhPerHour * $onFactor * $onPerDay);
                    print_r('onFactor = '.$onFactor."\n");
                    // echo ('onPerDay = '.$onPerDay."\n");
                    // echo ('kWhOn = '.$kWhOn."\n");
                } else {
                    $kWhOn = 0;
                }
                if ($offPerDay > 0) {
                    $kWhOff = floatval($kWhPerHour * $offFactor * $offPerDay);
                    // echo ('kWhOff = '.$kWhOff."\n");
                } else {
                    $kWhOff = 0;
                }
                if ($standbyPerDay > 0) {
                    $kWhOnStandby = floatval($kWhPerHour * $onStanbyFactor * $standbyPerDay);
                    // echo ('kWhOnStandby = '.$kWhOnStandby."\n");
                } else {
                    $kWhOnStandby = 0;
                }
			    
			    $kWhPerYear = floatval(($kWhOn+$kWhOff+$kWhOnStandby)*$daysOnPerWeek*$weeksOnPerYear);
                // echo ('kWhPerYear = '.$kWhPerYear."\n");
			}
			
			$aDeviceValues = array(
				"type" => 'Computing equipment',
				"quantity" => $aRequiredProfileItemValues['numberOwned'],
				"kWhPerYear" => $kWhPerYear, //
				"onStandby" => $onStandby,
				"role" => $role,
				"weeksOnPerYear" => $weeksOnPerYear,
				"onPerDay" => $onPerDay,
				"offPerDay" => $offPerDay,
				"standbyPerDay" => $standbyPerDay,
				"unit" => $aInfo['unit'],
				"perUnit" => $aInfo['perUnit'],
				"source" => getProfile::getDataItemInfo($aItemValueDefinition, 'source'),
				"path" => getProfile::getDataItemInfo($aItemValueDefinition, 'path'),
				"modified" => getProfile::getDataItemInfo($aItemValueDefinition, 'modified'),
			);
			$oDeviceProfile = array(
				"description" => $sDeviceDesc,
				"values" => $aDeviceValues);

			// echo the device object in JSON
			header('Content-type: application/json');
			echo(json_encode($oDeviceProfile));

		} catch (Exception $oException) {
			// An error occured
			echo "\nError: " . $oException->getMessage() . "\n";
		}
	}

	// GET DATA ITEM
	public function getDataItem($sUID, $sProfileCategory)
	{
		try {
			// prepare URL
			$url = 'https://'.AMEE_API_URL.'/data'.$sProfileCategory.'/'.$sUID;
			// perapre headers
			$header_array = array('Accept' => 'application/json',
				'Authorization' => AMEE_API_PROJECT_BASE64_KEY);
			// specify options
			$ssl_array = array('version' => SSL_VERSION_SSLv3);
			$options = array(headers => $header_array,
				httpauthtype => HTTP_AUTH_BASIC,
				protocol => HTTP_VERSION_1_1,
				ssl => $ssl_array);

			//create the httprequest object
			$oHTTPrequest = new httpRequest($url, HTTP_METH_GET, $options);
			//add the content type
			$oHTTPrequest->setContentType = 'Content-Type: application/json';
			//send the http request
			$oHTTPrequest->send();
			// convert JSON response
			$aItemValueDefinition = json_decode($oHTTPrequest->getResponseBody());

			return $aItemValueDefinition;

		} catch (Exception $oException) {
			// An error occured
			echo "\nError: " . $oException->getMessage() . "\n";
		}
	}

	// GET DATA ITEM INFO
	public function getDataItemInfo($aItemValueDefinition, $itemValue)
	{
		switch ($itemValue) {
			// if the request is Energy Per Time (Energy Star computers)
		case 'energyPerTime':
			// get to the itemValues
			$itemValues = $aItemValueDefinition->dataItem->itemValues;
			// get KWh Per Year
			for ($i=0; $i < count($itemValues); $i++) {
				if ($itemValues[$i]->path == 'energyPerTime' && $itemValue == 'energyPerTime') {
					// return it when possible
					return $itemValues[$i]->value;
					break;
				}
			} // or return n/a
			return 'N/A';
			break;

			// if the request is kWhPerYear (MTB computing equipment)
		case 'kWhPerYear':
			// get to the itemValues
			$itemValues = $aItemValueDefinition->dataItem->itemValues;
			// get KWh Per Year
			for ($i=0; $i < count($itemValues); $i++) {
				if ($itemValues[$i]->path == 'kWhPerYear' && $itemValue == 'kWhPerYear') {
					// return it when possible
					return $itemValues[$i]->value;
					break;
				}
			} // or return n/a
			return 'N/A';
			break;
			// if the request is the source
		case 'source':
			// get to the itemValues
			$itemValues = $aItemValueDefinition->dataItem->itemValues;
			// get KWh Per Year
			for ($i=0; $i < count($itemValues); $i++) {
				if ($itemValues[$i]->path == 'source' && $itemValue == 'source') {
					// return it when possible
					return $itemValues[$i]->value;
					break;
				}
			} // or return n/a
			return 'N/A';
			break;
			// if the request is the path
		case 'path':
			if ($aItemValueDefinition->path) {
				return $aItemValueDefinition->path;
			} else {
				return 'N/A';
			}
			break;
			// if the request is the last date of modification
		case 'modified':
			if ($aItemValueDefinition->dataItem->modified) {
				return $aItemValueDefinition->dataItem->modified;
			} else {
				return 'N/A';
			}
			break;
		case 'label':
			if ($aItemValueDefinition->dataItem->label) {
				return $aItemValueDefinition->dataItem->label;
			} else {
				return null;
			}
			break;
		case 'modelName':
			// get to the itemValues
			$itemValues = $aItemValueDefinition->dataItem->itemValues;
			// get KWh Per Year
			for ($i=0; $i < count($itemValues); $i++) {
				if ($itemValues[$i]->path == 'modelName' && $itemValue == 'modelName') {
					// return it when possible
					return $itemValues[$i]->value;
					break;
				}
			} // or return n/a
			return 'N/A';
			break;
		case 'modelNumber':
			// get to the itemValues
			$itemValues = $aItemValueDefinition->dataItem->itemValues;
			// get KWh Per Year
			for ($i=0; $i < count($itemValues); $i++) {
				if ($itemValues[$i]->path == 'modelNumber' && $itemValue == 'modelNumber') {
					// return it when possible
					return $itemValues[$i]->value;
					break;
				}
			} // or return n/a
			return 'N/A';
			break;
			// default, return n/a
		default:
			return 'N/A';
			break;
		}
	}
}
// select the right function depending on the equipment
if ($device == '') { // if it is a computer
	getProfile::getComputerProfile($sProfileCategory, $productType, $brand, $modelName, $modelNumber, $category, $onStandby, $role, $quantity);
} else { // if it is a computing equipment
	getProfile::getDeviceProfile($sProfileCategory, $device, $rating, $onStandby, $role, $weeksOnPerYear, $daysOnPerWeek, $onPerDay, $offPerDay, $standbyPerDay, $quantity, $onFactor, $offFactor, $onStanbyFactor);
}
?>