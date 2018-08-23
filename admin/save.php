<?php 
	$data = file_get_contents('php://input');
	//file_put_contents('../data.json', "{\"district\":".$data."}");
	
	$object_data = json_decode($data);
	// Сохраняем 1
	if(isset($object_data->id)) {
		
		if(isset($object_data->{'$$hashKey'})) {
			unset($object_data->{'$$hashKey'});
		}
		
		if(isset($object_data->problems)) {
			if(!count($object_data->problems)) {
				unset($object_data->problems);
			}
		}
		
		file_put_contents('db/'.$object_data->id.'.json', json_encode($object_data));
	} else {
		// Сохраняем все
		foreach($object_data as $item) {
			print_r($item->id);
			file_put_contents('db/'.$item->id.'.json', json_encode($item));
		} 
	}
	
	