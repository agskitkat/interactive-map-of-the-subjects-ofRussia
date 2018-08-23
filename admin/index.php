<?php 
// Данный файл всегда будит "включаться" в другие файлы  
// директивой include поэтому следует запретить его самостоятельный вызов  
// из строки запроса путём указания его имени  
// Если не определена константа IN_ADMIN – завершаем работу скрипта  
/* if(!defined("IN_ADMIN")) die;  */ 

// Начинаем сессию  
session_start();
// Помещаем содержимое файла в массив  
$access = array();  
$access = file("access.php");  
// Разносим значения по переменным – пропуская первую строку файла - 0  
$login = trim($access[1]);  
$passw = trim($access[2]);  
// Проверям были ли посланы данные  
if(!empty($_POST['enter']))  {  
    $_SESSION['login'] = $_POST['login'];  
    $_SESSION['passw'] = $_POST['passw'];  
}  

// Если ввода не было, или они не верны  
// просим их ввести  
if(empty($_SESSION['login']) or  
   $login != $_SESSION['login'] or  
   $passw != $_SESSION['passw']    )  {  
?>   
    <form action=index.php method=post>  
		Login <input class=input name=login value="">  
		Password <input type="password" class=input name=passw value="">  
    <input type=hidden name=enter value=yes>  
    <input class=button type=submit value="Enter">  
<?php  
   die;  
}  
?>


<!doctype html>
<html lang="ru" ng-app="app">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
	<script src="angular.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
	<link rel="stylesheet" href="css/uikit.min.css" />
    <script src="js/uikit.min.js"></script>
    <script src="js/uikit-icons.min.js"></script>
	<script src="js/ckeditor/ckeditor.js"></script>
	<script src="js/angular-ckeditor.min.js"></script>
	<link href="styleadmin.css" rel="stylesheet">
	
</head>
<body ng-controller="AppController">
	<div class="uk-child-width-expand@s" uk-grid>
		<div ng-if="view=='L'">
			<div class="uk-card uk-card-default uk-card-body">
				<b>Выбери субъект:</b>
				<div class="dis">
					<a ng-click="select_district(district)" ng-repeat="district in districts | orderBy:'name'" class='uk-button uk-button-primary district'>{{district.name}}</a>
				</div>
			</div>
		</div>
		<div ng-if="view=='D'">
			<div class="uk-card uk-card-default uk-card-body">
				<legend class="uk-legend">{{current_district.name}}</legend>
				<br>
				<br>
				<div class="">
					<button ng-click="back()" class="uk-button uk-button-primary ">Назад</button>
					<button ng-disabled="save_text == 1" ng-click="save_to_file()" class="uk-button uk-button-primary ">{{save_text_ar[save_text]}}</button>
					<br>	
					<br>
					<form>
						<fieldset class="uk-fieldset">

							
							<!--<div class="uk-margin">
								<input class="uk-input" type="text" placeholder="Заголовок" ng-model="current_district.title">
							</div>

							<div class="uk-margin">
								<textarea class="uk-textarea" rows="5" placeholder="Краткое описание" ng-model="current_district.about"></textarea>
							</div> -->
							
							<div class="uk-margin">
								<input class="uk-input" type="text" placeholder="Ссылка на картинку" ng-model="current_district.img">
							</div>
							
							<div class="uk-margin">
								<textarea class="uk-input" type="text" placeholder="Код видео" ng-model="current_district.video"></textarea>
							</div>
							
							<p class="uk-legend">Ссылки</p>
							<div class="uk-margin">
								<p uk-margin>
									<button ng-click="newLink()" class="uk-button uk-button-default uk-button-small">Добавить ссылку</button>
								</p>
								<dl class="uk-description-list">
									<span ng-repeat="link in current_district.links">
										<div class="uk-margin">
											<input class="uk-input" type="text" placeholder="Текст ссылки" ng-model="link.title">
										</div>
										<div class="uk-margin">
											<input class="uk-input" type="text" placeholder="Ссылка" ng-model="link.href">
										</div>
										<div class="uk-margin">
											<button ng-click="removeLink($index)" class="uk-button uk-button-danger uk-button-small">Удалить</button>
											
										</div>
									</span>
								</dl>
							</div>
							
							<p class="uk-legend">Проблемы</p>
							<div class="uk-margin">
								<p uk-margin>
									<button ng-click="newProblem()" class="uk-button uk-button-default uk-button-small">Добавить проблему</button>
									<a href="http://barbearshop.ru/secret/admin/getxls.php?id={{current_district.id}}" class="uk-button uk-button-primary uk-button-small">Скачать проблемы субъекта</a>
								</p>
								<dl class="uk-description-list">
									<span class="" ng-click="select_problem(problem)" ng-repeat="problem in current_district.problems">
										<dt>
											{{ problem.title }}
										</dt>
										<dd>
											{{ problem.about }}<br>
											<button ng-click="removeProblem($index)" class="uk-button uk-button-danger uk-button-small">Удалить</button>
										</dd>
									</span>
								</dl>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
		<div ng-if="view=='P'">
			<div class="uk-card uk-card-default uk-card-body">
				<legend class="uk-legend">{{current_district.name}} - {{current_problem.title}}</legend>
				<br><br>
				<div class="" ng-if="current_problem">
					<button ng-click="back()" class="uk-button uk-button-primary uk-margin">Назад</button>
					<br>
					<br>
					<form>
						<fieldset class="uk-fieldset">

							

							<div class="uk-margin">
								<input class="uk-input" type="text" placeholder="Заголовок" ng-model="current_problem.title">
							</div>

							<div class="uk-margin">
								<textarea class="uk-textarea" rows="5" placeholder="Краткое описание" ng-model="current_problem.about"></textarea>
							</div>
							
							<div class="uk-margin">
								<textarea ckeditor="options" class="uk-textarea" rows="5" placeholder="Полное описание" ng-model="current_problem.full"></textarea>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
	<script>
		'use strict';
		(function() {
			
			
		
			var app = angular.module('app', ['ckeditor']);
			app.controller('AppController', function($scope, $http) {
				$scope.save_text_ar = [
					"Сохранить изменения субъекта", 
					"Подожди, сохраняю... ", 
					"Всё сохранено !", 
					"ОШИБКА ! Нажми ещё !"
				];
				$scope.districts = [];
				$scope.current_district = false;
				$scope.current_problem = false;
				$scope.current_link = false;
				$scope.save_text = 0;
				
				
				$scope.options = {
					language: 'ru',
					allowedContent: true,
					entities: false,
					extraPlugins: 'uploadimage',
				};
				
				$scope.view = 'L';
				
				$scope.load = function(){
					$http.get('get.php', []).then(function(data){
						$scope.districts = data.data.district;
						console.log('success', data);
					}, function(data){ 
						console.log('bad', data);
					});
				}
				$scope.load();
			
			
				$scope.select_district = function(district){
					$scope.view = 'D';
					$scope.save_text = 0;
					$scope.current_district = district;
					$scope.current_problem = false;
				};
				
				$scope.newProblem = function(){
					$scope.save_text = 0;
					if(!$scope.current_district.problems) {
						$scope.current_district.problems = [];
					}
					
					$scope.current_problem = {"title":"Новая проблема " + ($scope.current_district.problems.length+1), "about":""};
					
					$scope.current_district.problems.push($scope.current_problem);
					
				};
				
				$scope.select_problem = function(problem){
					$scope.save_text = 0;
					$scope.current_problem = problem;
					$scope.view = 'P';
				};
				
				$scope.save_to_file = function(){
					$scope.save_text = 1;
					$http.post("save.php", JSON.stringify($scope.current_district))
					.then(
					function (data, status, header, config) {
						// UPDATE
						$http.get('get.php', []).then(function(data){
							$scope.districts = data.data.district;
							console.log('success', data);
							$scope.save_text = 2;
						}, function(data){ 
							console.log('bad', data);
							$scope.save_text = 3;
						});
						
					},function (data, status, header, config) {
						$scope.save_text = 3;
					});
				};
				
				$scope.newLink = function() {
					$scope.save_text = 0;
					if(!$scope.current_district.links) {
						$scope.current_district.links = [];
					}
					$scope.current_link = {"title":"Новая ссылка " + ($scope.current_district.links.length+1)};
					$scope.current_district.links.push($scope.current_link);
				}
				
				$scope.removeLink = function(index) {
					$scope.current_district.links.splice(index, 1);					
				}
				
				$scope.removeProblem = function(index) {
					$scope.current_district.problems.splice(index, 1);					
				}
				
				$scope.back = function () {
					if($scope.view == 'D') {
						$scope.view = 'L';
					}
					
					if($scope.view == 'P') {
						$scope.view = 'D';
					}
				}
			});
		})();
	</script>
</body>
</html>