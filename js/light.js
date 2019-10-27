function setLight(ev) {
	//подсвечиваем только для своих фигру
	if( ev.target.classList.contains(turnPlayer) ){

		//находим позицию фигуры, на которой мышка
        let pos = quickFindFigurePosition(ev);
        
		//находим класс игрока
		if (ev.target.classList.contains('firstplayer')){
			var playerClass = "firstplayer";
			var playerClassRuleModifier = 1;
        }
        
        else{
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
                
				//выбираем потомка нужного .row_* с нужным .cell_*
				let rowClass = '.row_' + y;
				let cell = document.querySelectorAll(rowClass + ' .cell_' + x )[0];
				//добавляем класс allowdrop в найденные ячейки
				if (cell) {
					//проверка - нет ли там фигур
					if( cell.childNodes.length > 0){
						//если фигуры есть - нужно убедиться, что они не наши
						if( !( cell.childNodes[0].classList.contains(playerClass) ) ){
							cell.classList.add('allowdrop_selected');
						}
                    }

                    //если фигур нет - просто светим клетку
                    else{ 
						cell.classList.add('allowdrop_selected');
					}
				}

			}
	    
        }
        
        //если нет выделенного - пробегаем по всем нашим правилам и навешиваем allowDrop
        else{
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

					    //проверка - нет ли там фигур
					    if( cell.childNodes.length > 0){
						    //если фигуры есть - нужно убедиться, что они не наши
						    if( !( cell.childNodes[0].classList.contains(playerClass) ) ){
							    cell.classList.add('allowdrop');
						    }
                        }

                        //если фигур нет - просто светим клетку
                        else{ 
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
