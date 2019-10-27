drawAllFigures();

let allCells = document.querySelectorAll('.cell');
let turnPlayer = "firstplayer";


//Реализация Drag'n'Drop
//Проходимся циклом по фигуркам и назначаем drag event и св-во draggable
function dragAndDrop() {
	let allFigures = document.querySelectorAll('.figure');
	for (let el of allFigures) {
		el.setAttribute('draggable', 'true');
		el.setAttribute('ondragstart', "drag(event)");
	}

	//Проходимся циклом по пустым дивам и назначаем drag events
	for (let el of allCells) {
		el.setAttribute('ondrop', 'drop(event)');
		el.setAttribute('ondragover', "allowDrop(event)");
	}
}

dragAndDrop();
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
	let canDropBoolean = false; //по-умолчанию мы не можем перетащить. Действуем по "белому списку".
	
	
	//выбираем ячейку, в которую дропнули.
	if (ev.target.classList.contains('cell')){
		var targetDiv = ev.target;
	}
	else{
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
		//и теперь дропаем фигурку	
		targetDiv.appendChild(document.getElementById(data));
		removeLight(ev);
		end_turn(targetDiv);
	}
}


//генерим и рисуем правила
generateRules(privateRulesCount, generalRulesCount);

//Подсветка допустимых клеток
function setLightEvents() {
	let allFigures = document.querySelectorAll('.figure');
	for (let el of allFigures) {
		el.addEventListener('mouseover', setLight);
		el.addEventListener('mouseout', removeLight);
	}
}
setLightEvents();

//для первого хода
changeDivPlayerTurn();

//заглушка для функции начала новой игры при нажатии на кнопку

$('.newgame').click(function() {
    startNewGame();
});