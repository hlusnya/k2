<?php

$home = $_SERVER['DOCUMENT_ROOT'];
$dir = __DIR__ . '/'; 
$files = scandir($dir);


unset($file [0]);
unset($file [1]);



foreach ($files as $file){ 

    if ($file != "." && $file != "..") { 
        if (pathinfo($file)[extension] == 'html') {
            $count++; 

            // $BadTitle=preg_replace("#.*<title>(.+)<\/title>.*#isU","\\1",preg_replace("#<\?(php)?(.+)\?".">#iUs","",file_get_contents($file)));
            preg_match_all("#.*<title>(.+)<\/title>.*#isU", file_get_contents($file), $titles);
            echo  '<p>'.$count. ').  <a href="'.$file.'" target="_blank">'.$file.'    |    '.$titles[1][0].'</a>'."</p>"; 
        }

    } 

}
