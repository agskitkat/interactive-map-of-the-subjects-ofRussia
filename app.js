var names = {
	'BelgorodOblast':'Белгородская область',
	'BryanskOblast':'Брянская область',
	'IvanovoOblast':'Ивановская область',
	'KalugaOblast':'Калужская область',
	'KostromaOblast':'Костромская область',
	'KurskOblast':'Курская область',
	'LipetskOblast':'Липецкая область',
	'Moscow':'Москва',
	'MoscowOblast':'Московская область',
	'OryolOblast':'Орловская область',
	'RyazanOblast':'Рязанская область',
	'SmolenskOblast':'Смоленская область',
	'TambovOblast':'Тамбовская область',
	'TverOblast':'Тверская область',
	'TulaOblast':'Тульская область',
	'VladimirOblast':'Владимирская область',
	'VoronezhOblast':'Воронежская область',
	'YaroslavlOblast':'Ярославская область',
	'Adygeya':'Республика Адыгея',
	'AstrakhanOblast':'Астраханская область',
	'Chechnya':'Чече́нская Респу́лика',
	'Dagestan':'Республика Дагеста́н',
	'Ingushetia':'Республика Ингушетия',
	'KabardinoBalkaria':'Кабарди́но-Балка́рская Респу́блика',
	'Kalmykia':'Респу́блика Калмы́кия ',
	'KarachayCherkessia':'Карача́ево-Черке́сская Респу́блика',
	'KrasnodarKrai':'Краснодарский край',
	'NorthOssetia':'Респу́блика Се́верная Осе́тия',
	'StavropolKrai':'Ставропольский край',
	'RostovOblast':'Ростовская область',
	'VolgogradOblast':'Волгоградская область',
	'ArkhangelskOblast':'Архангельская область',
	'NenetsAutDistrict':'Ненецкий автономный округ',
	'KaliningradOblast':'Калининградская область',
	'LeningradOblast':'Ленинградская область',
	'Karelia':'Республика Карелия',
	'KomiRep':'Республика Коми',
	'MurmanskOblast':'Мурманская область',
	'NovgorodOblast':'Новгородская область',
	'PskovOblast':'Псковская область',
	'SaintPetersburg':'Санкт-Петербург',
	'VologdaOblast':'Вологодская область',
	'AmurOblast':'Амурская область',
	'JewishAutOblast':'Еврейская автономная область',
	'KamchatkaKrai':'Камчатский край',
	'KhabarovskKrai':'Хабаровский край',
	'MagadanOblast':'Магаданская область',
	'Chukotka':'Чукотский автономный округ',
	'PrimorskyKrai':'Приморский край',
	'Yakutia':'Респу́блика Саха́ (Якутия)',
	'SakhalinOblast':'Сахалинская область',
	'AltaiRepublic':'Республика Алтай',
	'AltaiKrai':'Алтайский край',
	'Buryatia':'Респу́блика Буря́тия',
	'ChitaOblast':'Читинская область',
	'AgaBuryatia':'Республика Бурятия-Ага',
	'IrkutskOblast':'Иркутская область',
	'UstOrdaBuryatia':'Усть-Ордынский Бурятский округ',
	'Khakassia':'Респу́блика Хака́сия',
	'KemerovoOblast':'Кемеровская область',
	'KrasnoyarskKrai':'Красноярский край',
	'NovosibirskOblast':'Новосибирская область',
	'OmskOblast':'Омская область',
	'TomskOblast':'Томская область',
	'Tuva':'Респу́блика Тыва́',
	'KurganOblast':'Курганская область',
	'SverdlovskOblast':'Свердловская область',
	'TyumenOblast':'Тюменская область',
	'KhantiaMansia':'Ханты-Мансийский автономный округ',
	'YamaloNenetsAutDistrict':'Ямало-Ненецкий автономный округ',
	'ChelyabinskOblast':'Челябинская область',
	'OrenburgOblast':'Оренбургская область',
	'Bashkortostan':'Респу́блика Башкортоста́н',
	'SaratovOblast':'Саратовская область',
	'SamaraOblast':'Самарская область',
	'Tatarstan':'Респу́блика Татарста́н',
	'UlyanovskOblast':'Ульяновская область',
	'PermKrai':'Пермский край',
	'PenzaOblast':'Пензенская область',
	'Udmurtia':'Удму́ртская Респу́блика',
	'Mordovia':'Респу́блика Мордо́вия ',
	'Chuvashia':'Чува́шская Респу́блика',
	'KirovOblast':'Кировская область',
	'MariEl':'Респу́блика Мари́й Эл',
	'NizhnyNovgorodOblast':'Нижегородская область',
	'Cremia':'Республика Крым'
};
var names_t = [];
var key_names = [];

$.each(names, function(key, value) {
	names_t.push({id:key,name:value});
	key_names.push(key);
});

window.onload = function() { 
	$("#svgmap").ready(function () {
		var districts = [];
		var svgobject = document.getElementById('svgmap');
		var svgdom = svgobject.contentDocument;
		
		$("path", svgdom).css({"transition": 'fill .2s ease'});
		
		$.get( "get.php", function( data ) {
			districts = data.district;
			
			check_dial();

			var options = {
				data:data.district,
				getValue: 'name',
				list: {
					onSelectItemEvent: function() {
						var id = $("#tags").getSelectedItemData().id;
						searchHover(id);
						
					},
					onChooseEvent: function() {
						var id = $("#tags").getSelectedItemData().id;
						searchGet(id);
					},
					match: {
						enabled: true
					}
				}
			}
			$("#tags").easyAutocomplete(options);
		});
		
		
		
		/* Scale */
		var scale = 1;
		var scale_step = 0.5;
		var min_scale = 1;
		var max_scale = 8;
		$(".zoom-in").click(
			function() {
				if(min_scale < scale) {
					scale -= scale_step;
					newScale();
				}
			}
		); 
		$(".zoom-out").click(
			function() {
				if(max_scale > scale) {
					scale += scale_step;
					newScale();
				}
			}
		);
		$(".reset").click(
			function() {
				scale = 1;
				newScale();
				arViewBox[0] = 0;
				arViewBox[1] = 0;
				setViewBox();
				hide(); 
			}
		);
		function newScale() {
			$("svg", svgdom).css({"transition": 'all .2s ease-in-out'})
			$("svg", svgdom).css({'transform': 'scale('+scale+')'});
			$("svg", svgdom).css({'-webkit-transform': 'scale('+scale+')'});
			$("svg", svgdom).css({'-moz-transform': 'scale('+scale+')'});
			$("svg", svgdom).css({'-ms-transform': 'scale('+scale+')'});
			$("svg", svgdom).css({'-o-transform': 'scale('+scale+')'});
		}
		
		/* Moving */
		var viewBox = $("svg", svgdom).attr('viewBox');
		var arViewBox = viewBox.split(" ");
		var is_draggable = false;
		var start_move_coord = [0,0];
		var start_arViewBox = [0,0];
		
		$("svg", svgdom).on('mousedown touchstart', function(event){
			is_draggable = true;
			var ex = (event.pageX);
			var ey = (event.pageY);
			if(event.originalEvent.touches) {
				ex = event.originalEvent.touches[0].pageX;
				ey = event.originalEvent.touches[0].pageY;
			}
			start_move_coord = [ex, ey];
			start_arViewBox = [arViewBox[0],arViewBox[1]];
			
			
		});
		
		$("svg", svgdom).on('mousemove touchmove', function(event){
			if(is_draggable) {
				var ex = (event.pageX);
				var ey = (event.pageY);
				if(event.originalEvent.touches) {
					ex = event.originalEvent.touches[0].pageX;
					ey = event.originalEvent.touches[0].pageY;
				}
				x = (parseInt(start_arViewBox[0]) + (start_move_coord[0] - ex)*2/scale);
				y = (parseInt(start_arViewBox[1]) + (start_move_coord[1] - ey)*2/scale);
				arViewBox[0] = x;
				arViewBox[1] = y;
				setViewBox();
			}
		});
		
		$("svg", svgdom).on('mouseup touchend',function(){
			is_draggable = false;
			
		});
		
		function setViewBox() {
			$("svg", svgdom).attr('viewBox', arViewBox.join(" "));
		}
		
	
	
		
		/* Hover and over */
		
		/* HIDE MODAL INIT */
		function hide() {
			$('.elements').animate({opacity: 0}, 250, function(){$(this).hide()});
			$("path.active", svgdom).attr('class', ' ');
			$("path", svgdom).css({"fill": "#ffe9b2"});
			$('.elements').scrollTop(0);
			/* Show Search */
			$('.elements-second').show().animate({opacity: 1}, 500);
			check_dial();
		}
		
		/* CLOSE MODAL EVENT */
		$(".elements button.close").on('click touchstart',	function() {
			hide();
		});
		
		function searchHover(id) {
			$("path", svgdom).css({"fill": "#ffe9b2"});
			$('#'+id, svgdom).css({"fill": "#96172C"});
		}
		
		function searchGet(id) {
			$("path", svgdom).css({"fill": "#ffe9b2"});
			$('#'+id, svgdom)
				.css({"fill": "#96172C"})
				.attr('class', 'active');
			$('.elements').show().animate({opacity: 1}, 300);
			$('.elements-second').animate({opacity: 0}, 250, function(){$(this).hide()});
			buildModal(find(id));
		}
		
		function buildModal(object) {
			$('#district').html(object[0].name);
			
			var c = $(".elements .content");
			c.html(" ")
			/* if(object[0].title)
				c.append("<h3>"+object[0].title+"</h3>"); */
			
			if(object[0].img)
				c.append("<img class='image' src='"+object[0].img+"'>");
			
			if(object[0].video)
				c.append("<div class='video'>"+object[0].video+"</div>");
			
			/* if(object[0].about)
				c.append("<p>"+object[0].about+"</p>"); */
			
			if(object[0].problems) {
				c.append("<h3>Проблемы</h3><ol class='num-list'></ol>");
				list = c.find('.num-list');
				$.each(object[0].problems, function(key, value) {
					list.append("<li><div class='problem' object='"+object[0].id+"' problem='"+key+"'>"+"<h4>"+value.title+"</h4>"+"<p>"+value.about+"</p>"+"</div></li>");
				});
			}
			
			if(object[0].links) {
				c.append("<h3>Ссылки</h3>");
				$.each(object[0].links, function(key, value) {
					c.append("<a class='button_link' target='_blank' href='"+value.href+"'>"+value.title+"</a>");
				});
			}
		}
		
		function find(id) {
			var object = $.map(districts, function(value, key) {
				if (value.id == id) {
					return value;
				}
			});
			return object;
		}
		
		function check_dial() {
			if(districts) {
				$.each(districts, function(key, dskt) {	
					if($("#"+dskt.id, svgdom).attr('class') == 'active') { 
						$("#"+dskt.id, svgdom).css({"fill": "#96172C"}); 
					} else {
						if(dskt.title || dskt.about ||  dskt.img || dskt.video || dskt.problems || dskt.links) {
							$("#"+dskt.id, svgdom).css({"fill": "#FFD25E"}); 
						} else {
							$("#"+dskt.id, svgdom).css({"fill": "#ffe9b2"});
						}
					}
				});
			}
		}
		
		$('.content').on('click', '.problem', function() {
			$('.elements-problem .content').html(" ");
			$('.elements-problem').show();
			var id = $(this).attr('object');
			var problem = $(this).attr('problem');
			object = find(id);
			p = object[0].problems[problem];
			$('.elements-problem .content').append("<h1>"+p.title+"</h1>");
			$('.elements-problem .content').append("<p>"+p.full+"</p>");
		});
		
		$('.elements-problem').on('click', '.close', function() {
			$('.elements-problem').hide();
		});
		
		function isTouchDevice() {
			return 'ontouchstart' in document.documentElement;
		}
		if(isTouchDevice()) {
			/* TOUCH */
			$("path", svgdom).on('touchstart',
				function() {
					if($(this).attr('class') != 'active') {
						/* FIRST TOUCH */
						console.log("FIRST TOUCH");
						$("path.active", svgdom).attr('class', ' ');
						$("path", svgdom).css({"fill": "#ffe9b2"}); 
						check_dial();
						
						$('#tags').val(names[$(this).attr("id")]);
						
						$(this).attr('class', 'active');
						$(this).css({"fill": "#96172C"}); 
					} else {
						/* SECOND TOUCH */
						console.log("SECOND TOUCH");
						$('.elements').show().animate({opacity: 1}, 300);
						$('.elements-second').animate({opacity: 0}, 250, function(){$(this).hide()});
						buildModal(find($(this).attr('id')));
					}								
				}
			); 
		} else {
			/* CLICK */
			/* VIEW */
			$("path", svgdom).on('click',
				function() {
					console.log("Click");
					$('.elements').scrollTop(0);
					$("path.active", svgdom).attr('class', ' ');
					$("path", svgdom).css({"fill": "#ffe9b2"}); 
					check_dial();
					$(this).attr('class', 'active');
					$(this).css({"fill": "#96172C"}); 
					$('.elements').show().animate({opacity: 1}, 300);
					$('.elements-second').animate({opacity: 0}, 250, function(){$(this).hide()});
					
					buildModal(find($(this).attr('id')));
				}
			);
			/* HOVER */
			//var last_color = false;
			$("path", svgdom).hover(
				function() {
					$(this).css({"fill": "#96172C"}); 
					$('#tags').val(names[$(this).attr("id")]);
				},
				function() {					
					check_dial();
				}
			);	
		}
	});
};