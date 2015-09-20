<?php
$path = 'bg_green.png';
$type = pathinfo($path, PATHINFO_EXTENSION);
$data = file_get_contents($path);
echo $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
?>
<br /><br />
<img src="<?=$base64?>" />