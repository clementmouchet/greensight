<?php
include '../config.php';
//set up variables
$sProfileCategory = ($_GET['sProfileCategory']) ? $_GET['sProfileCategory'] : '/home/appliances/computers/generic';
$sUID = ($_GET['sUID']) ? $_GET['sUID'] : 'B32624F8CD5F';

$url = 'https://'.AMEE_API_URL.'/data'.$sProfileCategory.'/'.$sUID;
$header_array = array('Accept' => 'application/json',
                'Authorization' => AMEE_API_PROJECT_BASE64_KEY);
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
$httpRequest_OBJ->send();
//echo response
// header('Content-type: application/json');
// echo($httpRequest_OBJ->getResponseBody());
$aItemValueDefinition = json_decode($httpRequest_OBJ->getResponseBody());

$itemValues = $aItemValueDefinition->dataItem->itemValues;
// get KWh Per Year
for ($i=0; $i < count($itemValues); $i++) { 
    if ($itemValues[$i]->path == 'kWhPerYear') {
        echo($itemValues[$i]->value);
    }
}
?>