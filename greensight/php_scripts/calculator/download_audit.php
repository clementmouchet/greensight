<?php
$xml = ($_POST['xml']) ? $_POST['xml'] : '<?xml version="1.0" encoding="UTF-8"?>';
$filename = ($_POST['filename']) ? $_POST['filename'] : 'audit';
$ext = ".xml";
$host  = $_SERVER['HTTP_HOST'];
if ($host == 'mac-pro.lan' || $host == 'macbook-air.lan' || $host == 'minibook.lan') {
    $uri   = '/~Clement/greensight/files';
} else {
    $uri   = '/greensight/files';
}
$path = '../../files/';
// make sure the file exists
if (is_resource($path.$filename.$ext)) {
    // empty file
    unlink($path.$filename.$ext);
    echo "The file $filename has been removed";
}

if (!$handle = fopen($path.$filename.$ext,'w+')) {
    die ("The file $filename could not be opened");
} else {
    // make sure the file is writable
    if (is_writable($path.$filename.$ext)) {

        // try to write
        if (fwrite($handle, $xml) === FALSE) {
            die ("Cannot write to file ($filename)");
        }
        // get the file size
        $size=filesize("$file");
        
        // echo link
        echo ("http://".$host.$uri.'/'.$filename.$ext);
        
        fclose($handle);
    } else {
        die ("The file $filename is not writable");
    }
}
?>