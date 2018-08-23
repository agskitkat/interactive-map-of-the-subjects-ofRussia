<?php
	header ( "Expires: Mon, 1 Apr 1974 05:00:00 GMT" );
	header ( "Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT" );
	header ( "Cache-Control: no-cache, must-revalidate" );
	header ( "Pragma: no-cache" );
	header ( "Content-type: application/vnd.ms-excel" );
	header ( "Content-Disposition: attachment; filename=data.xls" );
	
	
	$db_dir = "db";
	$files = scandir("db");
	$return_ar = [];
	
	if(isset($_GET[id])) {
		$filename = $db_dir . "/" . $_GET[id] . ".json";
		if(is_file($filename)) {
			if($string = json_decode(file_get_contents($filename))) {
				foreach( $string->problems as $problem) {
					echo $string->name;
					echo ";";
					
					echo $problem->title;
					echo ";";
					
					echo $problem->about;
					echo ";";
					
					echo $problem->full;
					echo ";";
					echo "\r\n";
				}
				$s = implode(";", $string);
				//print_r($string);
			}
		}
		exit();
	} else {
		foreach($files as $file) {
			$filename = $db_dir . "/" . $file;
			if(is_file($filename)) {
				if($string = json_decode(file_get_contents($filename))) {
					foreach( $string->problems as $problem) {
						echo $string->name;
						echo ";";
						
						echo $problem->title;
						echo ";";
						
						echo $problem->about;
						echo ";";
						
						echo $problem->full;
						echo ";";
						echo "\r\n";
					}
					$s = implode(";", $string);
					//print_r($string);
				}
			}
		}
		exit();
	}