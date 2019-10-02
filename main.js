//Реализация Drag'n'Drop

var allFigures = document.querySelectorAll('.figure');
var allCells = document.querySelectorAll('.cell');


//Проходимся циклом по фигуркам и назначаем drag event и св-во draggable
for (var el of allFigures) {
    el.setAttribute('draggable', 'true');
    el.setAttribute('ondragstart', "drag(event)");
}

//Проходимся циклом по пустым дивам и назначаем drag events
for (var el of allCells) {
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
    var data = ev.dataTransfer.getData("text");

    //если там есть фигурка, удаляем ее прежде чем вставлять новую
    if (ev.target.id) {
        var targetDiv = ev.target.parentElement;
        ev.target.parentElement.removeChild(ev.target);
        targetDiv.appendChild(document.getElementById(data));

        //ищем позицию дива в positionMatrix, записываем туда id фигуры
        var pos = findDivPositionReplaced(targetDiv);
        var thisId = targetDiv.lastChild.id;
        positionMatrix[pos[0]][pos[1]] = thisId;

        //на прежнем месте в positionMatrix нужно поставить 0
        //ищем все места в матрице, где стоит наш id
        var collection = [];
        for (var i=0; i<5; i++) {
            if (positionMatrix[i].indexOf(thisId) >= 0) {
                var arr = [i, positionMatrix[i].indexOf(thisId)]
                collection.push(arr);
            }
        }

        if (collection[0][0]==pos[0] && collection[0][1]==pos[1]) {
            var toDelete = 1;
        }
        else
            var toDelete = 0;
        

        var deleteRow = collection[toDelete][0];
        var deleteColumn = collection[toDelete][1];
        positionMatrix[deleteRow][deleteColumn] = 0;
        console.log(positionMatrix);
    }

    else {
        ev.target.appendChild(document.getElementById(data)); 
        
        //ищем позицию дива в positionMatrix
        var thisId = ev.target.lastChild.id;
        var pos = findDivPosition(ev);
        
        positionMatrix[pos[0]][pos[1]] = thisId;
        console.log(positionMatrix);

        //ставим 0 на прошлой позиции в positionMatrix
        var collection = [];
        for (var i=0; i<5; i++) {
            if (positionMatrix[i].indexOf(thisId) >= 0) {
                var arr = [i, positionMatrix[i].indexOf(thisId)]
                collection.push(arr);
            }
        }

        if (collection[0][0]==pos[0] && collection[0][1]==pos[1]) {
            var toDelete = 1;
        }
        else
            var toDelete = 0;
        

        var deleteRow = collection[toDelete][0];
        var deleteColumn = collection[toDelete][1];
        positionMatrix[deleteRow][deleteColumn] = 0;
    }
}
 //выдает баг, если «пожирать» фигурку в той же строке на предыдущей позиции

//Подсветка допустимых клеток
for (var el of allFigures) {
    el.addEventListener('mousedown', setLight);
}

function setLight(event) {
    console.log('LIGHT')
    findFigurePosition(event);
}

