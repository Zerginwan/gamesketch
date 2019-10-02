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
    let canDropBoolean = false; //по-умолчанию мы не можем перетащить. Действуем по "белому списку".

    //проверка, можно ли вообще в эту клетку что-то ставить. Если нет - ничего не происходит
    if (canDropBoolean){

    //если там есть фигурка, удаляем ее прежде чем вставлять новую
        if (ev.target.id) {

        let targetDiv = ev.target.parentElement;
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
        }else {
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
    }
}
 //выдает баг, если «пожирать» фигурку в той же строке на предыдущей позиции

//Подсветка допустимых клеток
for (let el of allFigures) {
    el.addEventListener('mouseover', setLight);
    el.addEventListener('mouseout', removeLight);
}

function setLight(event) {
    findFigurePosition(event);
}

function removeLight(event) {
    findFigurePosition(event);
}

