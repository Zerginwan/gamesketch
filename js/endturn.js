//Функция меняет таблицы местами
function swapTurnTables(id_private, id_all){
	let privateRule = findElement(rulesArray, 'name', id_private);
	let allRule = findElement(rulesArray, 'name', id_all);
	privateRule.player = 'all';
	allRule.player = turnPlayer;
}

//Функция передачи хода
function end_turn(targetDiv){
	swapTurnTables(selectedRule, getIdOfRandomTable('all_rules') );
	turnPlayer = (turnPlayer == "firstplayer") ? "secondplayer" : "firstplayer";
	redrawRules(rulesArray);

	unselectAll();
	do_we_won(targetDiv);
	changeDivPlayerTurn();
	rotateField();
}

//Функция проверки выигрыша
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

		var mainBlock = document.getElementById('field');
        mainBlock.style.cssText = 'display: none';
		var leftBlock = document.getElementById('left');
        leftBlock.style.cssText = 'display: none';
		var rightBlock = document.getElementById('right');
        rightBlock.style.cssText = 'display: none';
        
        var newGameButton = document.createElement('div');
        newGameButton.setAttribute('class', 'newgame');
        var buttonPlace = document.getElementById('buttonplace');
        newGameButton.innerText = 'New Game';
        buttonPlace.append(newGameButton);

		//заглушка для функции начала новой игры
        // $('.newgame').click(function() {
        //     location.reload();
        // });
        $('.newgame').click(startNewGame);
        
	}
	
}


function changeDivPlayerTurn(){
	$('#player_turn').text('Player: ' + turnPlayer);
}

//Переворот поля
function rotateField() {
	
	let degreeCount = (turnPlayer == "secondplayer")?180:0;
	let mainField = document.getElementById('field');
	mainField.style.transform = 'rotate('+degreeCount+'deg)';

	for (el of allFigures) {
		el.style.transform = 'rotate('+degreeCount+'deg)';
	}

	let turnPlayerOpposite = (turnPlayer == "secondplayer")?"firstplayer":"secondplayer";

	$('.'+turnPlayer+'_rules>.rule_table').css({'transform': 'rotate(180deg)'});
	$('.'+turnPlayerOpposite+'_rules>.rule_table').css({'transform': 'rotate(0deg)'});
	//смена правил местами, правила меняются, но надо поработать над переворачиванием
	// let rightSide = document.getElementById('rightrules');
	// let rightId = rightSide.childNodes[3].id;
	// console.log(rightSide.childNodes);
	// let rightPlayerRules = document.getElementById(rightId);
	
	// let leftSide = document.getElementById('leftrules');
	// let leftId = leftSide.childNodes[3].id;
	// let leftPlayerRules = document.getElementById(leftId);
	
	// leftSide.appendChild(rightPlayerRules);
	// rightSide.appendChild(leftPlayerRules);
	
}

//функция начала новой игры пока не работает - проблемы с перемещением фигур и правилами
function startNewGame() {
	
	let buttonPlace = document.getElementById('buttonplace');
	buttonPlace.remove();
	let victory = document.getElementById('victory');
	victory.style.display = 'none';
	let center = document.getElementById('center');
	center.style.display = 'flex';
	let left = document.getElementById('left');
	left.style.display = 'flex';
	let right = document.getElementById('right');
	right.style.display = 'flex';
	let field = document.getElementById('field');
	field.style.display = 'block';

	$('.figure').remove();
	drawAllFigures();
	let allFigures = document.querySelectorAll('.figure');
	let allCells = document.querySelectorAll('.cell');
	let turnPlayer = "firstplayer";
	dragAndDrop();

	deleteRules();
	generateRules(privateRulesCount, generalRulesCount);
	
	setLightEvents();
	changeDivPlayerTurn();
}