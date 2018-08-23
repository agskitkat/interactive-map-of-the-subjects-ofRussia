<?php
	header('Content-Type: application/json');
	$db_dir = "db";
	$files = scandir("db");
	$return_ar = [];
	
	foreach($files as $file) {
		$filename = $db_dir . "/" . $file;
		//echo $filename;
		if(is_file($filename)) {
			if($string = json_decode(file_get_contents($filename))) {
				$return_ar[] = $string;
			}
		}
	}
	
	$r['district'] = $return_ar;
	
	echo json_encode($r);