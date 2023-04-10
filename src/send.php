<?php

$mail['to'] = ""; // Кому
$mail['to'] = "hlusnya@yandex.ru";


$mes = "Форма: ".$_POST['type_form']."<br>";


if (!empty($_POST['name'])) { $mes .= "Имя: ".$_POST['name']."<br>"; }
if (!empty($_POST['connect'])) { $mes .= "Тип связи: ".$_POST['connect']."<br>"; }
if (!empty($_POST['phone'])) { $mes .= "Телефон: ".$_POST['phone']."<br>"; }
if (!empty($_POST['email'])) { $mes .= "Email: ".$_POST['email']."<br>"; }
if (!empty($_POST['comment'])) { $mes .= "Комментарий: ".$_POST['comment']."<br>"; }
if (!empty($_POST['lang_kviz'])) { $mes .= "Язык для изучения: ".$_POST['lang_kviz']."<br>"; }
if (!empty($_POST['level_kviz'])) { $mes .= "Уровень на данный момент: ".$_POST['level_kviz']."<br>"; }
if (!empty($_POST['levelup_kviz'])) { $mes .= "Уровень для изучения: ".$_POST['levelup_kviz']."<br>"; }
if (!empty($_POST['addr_kviz'])) { $mes .= "Удобный адрес: ".$_POST['addr_kviz']."<br>"; }
if (!empty($_POST['time_kviz'])) { $mes .= "Удобное время: ".$_POST['time_kviz']."<br>"; }



$mail['message'] = $mes;

$HTTP_HOST = parse_url('http://'.$_SERVER["HTTP_HOST"]); 
$HTTP_HOST = str_replace(array("http://","www."),"",$HTTP_HOST['host']);
$mail['from'] ='no-reply@'.$HTTP_HOST.''; // от кого

$HTTP_HOST_URI = $HTTP_HOST . str_replace('/send.php',"",$_SERVER['REQUEST_URI']);
$mail['subject'] = 'Заказ с сайта '.$HTTP_HOST_URI;




$EOL = "\r\n"; // ограничитель строк, некоторые почтовые сервера требуют \n - подобрать опытным путём
$boundary     = "--".md5(uniqid(time()));  // любая строка, которой не будет ниже в потоке данных.
$subject_text = $mail['subject'];
$subject= '=?utf-8?B?' . base64_encode($subject_text) . '?=';
$message = $mail['message'];
$headers    = "MIME-Version: 1.0;" . $EOL . "";
$headers   .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"" . $EOL . "";
$headers   .= "From: ".$mail['from']."\nReply-To: ".$mail['from']."\n";

$multipart  = "--" . $boundary . $EOL;
$multipart .= "Content-Type: text/html; charset=utf-8" . $EOL . "";
$multipart .= "Content-Transfer-Encoding: base64" . $EOL . "";
$multipart .= $EOL; // раздел между заголовками и телом html-части
$multipart .= chunk_split(base64_encode($mes));

#начало вставки файлов

//foreach($_FILES["file"]["name"] as $key => $value){
if (!empty($_FILES["file"]["tmp_name"])) {
    $filename = $_FILES["file"]["tmp_name"];
    $file = fopen($filename, "rb");
    $data = fread($file,  filesize( $filename ) );
    fclose($file);
    $NameFile = $_FILES["file"]["name"]; // в этой переменной надо сформировать имя файла (без всякого пути);
    $File = $data;
    $multipart .=  "" . $EOL . "--" . $boundary . $EOL . "";
    $multipart .= "Content-Type: application/octet-stream; name=\"" . $NameFile . "\"" . $EOL . "";
    $multipart .= "Content-Transfer-Encoding: base64" . $EOL . "";
    $multipart .= "Content-Disposition: attachment; filename=\"" . $NameFile . "\"" . $EOL . "";
    $multipart .= $EOL; // раздел между заголовками и телом прикрепленного файла
    $multipart .= chunk_split(base64_encode($File));
}
//}

#>>конец вставки файлов

$multipart .= "" . $EOL . "--" . $boundary . "--" . $EOL . "";


    // Отправка сообщения
if (mail($mail['to'], $subject, $multipart, $headers)){
echo 'ok';
} else {
echo 'error';
}

?>
