//Реализация Drag'n'Drop

let allFigures = document.querySelectorAll('.figure');
let allCells = document.querySelectorAll('.cell');


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

	//если в ячейке есть класс allowDrop - разрешаем дроп
	if (targetDiv.classList.contains('allowdrop')){
		canDropBoolean = true;
	}


	//проверка, можно ли вообще в эту клетку что-то ставить. Если нет - ничего не происходит
	if (canDropBoolean){

	//если в ячейке есть что-либо, удаляем это прежде чем вставлять новую фигуру
		if (targetDiv.childNodes.length>0) {

		
		ev.target.parentElement.removeChild(ev.target);
		targetDiv.appendChild(document.getElementById(data));

		//ищем позицию дива в positionMatrix
		let pos = findDivPositionReplaced(targetDiv);
		let thisId = targetDiv.lastChild.id;
 

		//на прежнем месте в positionMatrix нужно поставить 0
		//ищем все места в матрице, где стоит наш id
		let collection = [];
		
		for (let i=0; i < columnsNumber; i++) {
			if (positionMatrix[i].indexOf(thisId) >= 0) {
				let arr = [i, positionMatrix[i].indexOf(thisId)]
				collection.push(arr);
			}
		}

		if (collection[0][0]==pos[0] && collection[0][1]==pos[1]) {
			let deleteRow = collection[1][0];
			let deleteColumn = collection[1][1];
			positionMatrix[deleteRow][deleteColumn] = 0;
		}else{
			let deleteRow = collection[0][0];
			let deleteColumn = collection[0][1];
			positionMatrix[deleteRow][deleteColumn] = 0;
		}
		//Пишем id в новое место
		positionMatrix[pos[0]][pos[1]] = thisId;
		}else{
		ev.target.appendChild(document.getElementById(data)); 
		
		//ищем позицию дива в positionMatrix
		let thisId = ev.target.lastChild.id;
		let pos = findDivPosition(ev);
		
		
		// ставим 0 на прошлой позиции в positionMatrix:


		let collection = [];
		//пробегаемся по строкам. Ищем совпадение ID. 
		for (let i=0; i < columnsNumber; i++) {
			if (positionMatrix[i].indexOf(thisId) >= 0) {
				/* Если находим, записываем индекс ячейки с совпавшим ID  в качестве Y, 
				а строку, в которой это произошло - в качестве X в массив arr */
				let arr = [i, positionMatrix[i].indexOf(thisId)]
				// добавляем arr в массив coolection
				collection.push(arr);
			}
		}

		if (collection[0][0]==pos[0] && collection[0][1]==pos[1]) {
			let toDelete = 1;
			let deleteRow = collection[1][0];
			let deleteColumn = collection[1][1];
			positionMatrix[deleteRow][deleteColumn] = 0;
		}else{
			let toDelete = 0;
			let deleteRow = collection[0][0];
			let deleteColumn = collection[0][1];
			positionMatrix[deleteRow][deleteColumn] = 0;
		}
		//Пишем id в новое место
		positionMatrix[pos[0]][pos[1]] = thisId;
		

	   
		}
		removeLight(ev);
		end_turn();

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

function setLight(ev) {
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
	//пробегаем по всем правилам и навешиваем allowDrop
	//Пока совсем по всем. надо будет переделать, когда появятся частные правила.
	for (let i=0;i<rulesCount;i++){ 
			let rule = rulesArray[i];
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
							console.log(cell.childNodes[0].classList.contains(playerClass) );
							cell.classList.add('allowdrop');
						}
					}else{ //если фигур нет - просто светим клетку
						cell.classList.add('allowdrop');
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
}

//заглушка для функции передачи хода.
function end_turn(){
	do_we_won();
}
//заглушка для функции проверки выигрыша.
function do_we_won(){
}