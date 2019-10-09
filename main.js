//Реализация Drag'n'Drop

let allFigures = document.querySelectorAll('.figure');
let allCells = document.querySelectorAll('.cell');
let turnPlayer = "firstplayer";


//Проходимся циклом по фигуркам и назначаем drag event и св-во draggable
for (let el of allFigures) {
	el.setAttribute('draggable', 'true');
	el.setAttribute('ondragstart', "drag(event)");
}

//Проходимся циклом по пустым дивам и назначаем drag events
for (let el of allCells) {
	el.setAttribute('ondrop', 'drop(event)');
	el.setAttribute('ondragover', "allowDrop(event)");
}


//Drag Functions
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("text", ev.target.id);
	
}


function drop(ev) {
	
	ev.preventDefault();
	let data = ev.dataTransfer.getData("text");
	/////let canDropBoolean = false; //по-умолчанию мы можем перетащить. Действуем по "черному списку".
	let canDropBoolean = false; //по-умолчанию мы не можем перетащить. Действуем по "белому списку".
	
	
	//выбираем ячейку, в которую дропнули.
	if (ev.target.classList.contains('cell')){
		var targetDiv = ev.target;
	}else{
		var targetDiv = ev.target.parentElement;
	}

	//если в ячейке есть класс allowDrop_selected - разрешаем дроп
	if (targetDiv.classList.contains('allowdrop_selected')){
		canDropBoolean = true;
	}


	//проверка, можно ли вообще в эту клетку что-то ставить. Если нет - ничего не происходит
	if (canDropBoolean){

		//если в ячейке есть что-либо, удаляем это прежде чем вставлять новую фигуру
		if (targetDiv.childNodes.length>0) {

		
		ev.target.parentElement.removeChild(ev.target);
		}
		
		//и теперь спокойно дропаем фигурку	
		targetDiv.appendChild(document.getElementById(data));


		//убираем свет, чтобы не было двойной засветки.
		
		removeLight(ev);
		end_turn(targetDiv);

	}
}


//Подсветка допустимых клеток
for (let el of allFigures) {
	el.addEventListener('mouseover', setLight);
	el.addEventListener('mouseout', removeLight);
}


//функция для переделки правил.
function change_rule(array, modifier){
	//0:0 -> -2:-2   4:4 -> 2:2 . Смотрим по нижнему (первому) игроку. 
	//0:0 -> 2:2    4:4 -> -2:-2  - так выглядит у второго
	let rule = [];
	//перебираем все точки в правиле
	for (let i=0;i<dotsInRule;i++){
		//за каждую точку создаем точку в новом массиве
		rule.push([]);
		//выдаем точке в новом массиве новые координаты.
		rule[i].row =  (array[i].row - 2) * modifier;
		rule[i].column =  (array[i].column - 2) * modifier;
	}
	//возвращаем новый массив
	return rule;
}


//Ищем элемент масива по значению JSON'a
function findElement(arr, propName, propValue) {
	
	for (var i=0; i < arr.length; i++){
	  if (arr[i][propName] == propValue){

		return arr[i];
	  }
	}
	// will return undefined if not found; you could return a default instead
  }


function setLight(ev) {
	//подсвечиваем только для своих фигру
	if( ev.target.classList.contains(turnPlayer) ){

		//находим позицию фигуры, на которой мышка
		let pos = quickFindFigurePosition(ev);
		//находим класс игрока
		if (ev.target.classList.contains('firstplayer')){
			var playerClass = "firstplayer";
			var playerClassRuleModifier = 1;
		}else{
			var playerClass = "secondplayer";
			var playerClassRuleModifier = -1;
		}
		//если есть выделенное правило, учитывается только оно. Навешиваем allowdrop_selected
		if(selectedRule){
			rule = findElement(rulesArray, 'name', selectedRule).arr
			rule=change_rule(rule, playerClassRuleModifier);
			for (let el of rule){
				//складываем правило с матрицей
				let y = parseInt(pos.row) + parseInt(el.row);
				let x = parseInt(pos.column) + parseInt(el.column);
				//ввыбираем потомка нужного .row_* с нужным .cell_*
				let rowClass = '.row_' + y;
				let cell = document.querySelectorAll(rowClass + ' .cell_' + x )[0];
				//добавляем класс allowdrop в найденные ячейки
				if (cell) {
					//проверка - нет ли там фигру
					if( cell.childNodes.length > 0){
						//если фигуры есть - нужно убедиться, что они не наши
						if( !( cell.childNodes[0].classList.contains(playerClass) ) ){
							cell.classList.add('allowdrop_selected');
						}
					}else{ //если фигур нет - просто светим клетку
						cell.classList.add('allowdrop_selected');
					}
				}

			}
	//если нет выделенного - пробегаем по всем нашим правилам и навешиваем allowDrop
		}else{
		//берем список наших правил.
		let ruleNames = [];
		for (let table of document.getElementById(turnPlayer+'_rules').childNodes){
			ruleNames.push(table.id);
		}

		for (let ruleName of ruleNames){ 
			let rule = findElement(rulesArray, 'name', ruleName).arr;
			//получаем правило из точек в массиве json-ов. 
			rule=change_rule(rule, playerClassRuleModifier);
			for (let el of rule){
				//складываем правило с матрицей
				let y = parseInt(pos.row) + parseInt(el.row);
				let x = parseInt(pos.column) + parseInt(el.column);
				//ввыбираем потомка нужного .row_* с нужным .cell_*
				let rowClass = '.row_' + y;
				let cell = document.querySelectorAll(rowClass + ' .cell_' + x )[0];
				//добавляем класс allowdrop в найденные ячейки
				if (cell) {
					//проверка - нет ли там фигру
					if( cell.childNodes.length > 0){
						//если фигуры есть - нужно убедиться, что они не наши
						if( !( cell.childNodes[0].classList.contains(playerClass) ) ){
							cell.classList.add('allowdrop');
						}
					}else{ //если фигур нет - просто светим клетку
						cell.classList.add('allowdrop');
					}
				}

			}
		}	


		}
	}
}

function removeLight(ev) {
	//let pos = findFigurePosition(event);
	//выбираем все подсвеченные ячейки, пробегаем, удаляем класс allowdrop
	cellArray = document.querySelectorAll('.allowdrop');
	for (let cell of cellArray){
		cell.classList.remove('allowdrop');
	}
	$(".allowdrop_selected").removeClass("allowdrop_selected");
}
function getIdOfRandomTable(div_id){
	let tableArray = $("div#"+div_id).children();
	//берем рандомную таблицу, возвращаем ее id
	let tableId = tableArray[Math.floor( Math.random() * tableArray.length )].id;

	return tableId;
}
//меняем таблицы местами.
function swapTurnTables(id_private, id_all){
	let privateRule = findElement(rulesArray, 'name', id_private);
	let allRule = findElement(rulesArray, 'name', id_all);
	privateRule.player = 'all';
	allRule.player = turnPlayer;
}
//заглушка для функции передачи хода.
function end_turn(targetDiv){
	swapTurnTables(selectedRule, getIdOfRandomTable('all_rules') );
	turnPlayer = (turnPlayer == "firstplayer") ? "secondplayer" : "firstplayer";
	redrawRules(rulesArray);

	unselectAll();
	do_we_won(targetDiv);
	changeDivPlayerTurn();
}

//функция проверки выигрыша.
function do_we_won(targetDiv){
	//проверяем первое условие победы. Если на доске остался только один мастер, побеждает тот игрок, чей мастер
	var masters = $('.master');
	var winner = '';
	if (masters.length<2) {
		if (masters[0].id == 'id12') {
			winner = 'firstplayer';
		}
		else {
			winner = 'secondplayer';
		}	
	}
	
	//проверяем второе условие победы (мастер доходит до центральной клетки противоположной стороны)
	
	//targetDiv взяли из функции дропа. Когда ходим, запоминаем позицию дива и то, был ли это ход мастера
	//если это мастер, запоминаем, чей он
	var targetDivPosition = findDivPosition(targetDiv);
	var isMaster = false;
	
	if (targetDiv.childNodes[0].classList[2] == 'master') {
		isMaster = true;
		var thisPlayer = targetDiv.childNodes[0].classList[1];
	}
	
	
	if (isMaster) {
		//если это мастер первого игрока, смотрим, дошел ли он до позиции row:0, column:2
		if (thisPlayer == 'firstplayer') {
			if (targetDivPosition.row=='0' && targetDivPosition.column=='2') {
				winner = 'firstplayer';
			}
		}
		//если это мастер второго игрока, дошел ли он до позиции row:4 column:2
		else {
			if (targetDivPosition.row=='4' && targetDivPosition.column=='2') {
				winner = 'secondplayer';
			}
		}
	}
	
	//после проверки обоих условий проверяем, есть ли у нас победитель (в переменной winner)
	if(winner.length > 0) {
		//если есть, пишем его в div #victory, а остальное поле убираем
		var victoryBlock = document.getElementById('victory');
		victoryBlock.style.cssText = 'display: block';
		$('#victory').text(winner + ' won!');
		var mainBlock = document.getElementById('main');
		mainBlock.style.cssText = 'display: none';
	}

	
}
function changeDivPlayerTurn(){
	$('#player_turn').text(turnPlayer);
}
//для первого хода
changeDivPlayerTurn();