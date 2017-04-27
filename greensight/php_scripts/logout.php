<?php
session_start();
session_destroy();
setcookie("superuser","",time()-3600, '/');
setcookie("user","",time()-3600, '/');  
setcookie("email","",time()-3600, '/');   
unset($_COOKIE["superuser"]);
unset($_COOKIE["user"]); 
unset($_COOKIE["email"]); 
header('location:../home.php');
?>