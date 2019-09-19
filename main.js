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
    ev.target.appendChild(document.getElementById(data));
    
}