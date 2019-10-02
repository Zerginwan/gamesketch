//создаем фигурки
var allRows = document.querySelectorAll('.row');

var lastRow = allRows[allRows.length - 1];
var lastRowCells = lastRow.querySelectorAll('.cell');

var firstRow = allRows[0];
var firstRowCells = firstRow.querySelectorAll('.cell');


for (var i=0; i<5; i++) {
    var figure = document.createElement('div');
    var newId = 'id1' + i;
    figure.setAttribute('id', newId);
    figure.setAttribute('class', 'figure firstplayer');
    lastRowCells[i].append(figure);

    var figure2 = document.createElement('div');
    var newId2 = 'id2' + i;
    figure2.setAttribute('id', newId2);
    figure2.setAttribute('class', 'figure secondplayer');
    firstRowCells[i].append(figure2);
}

//data structure

//creating empty matrix
var positionMatrix = [];
for (let i=0; i<5; i++) {
    positionMatrix.push([]);
}
for (var el of positionMatrix) {
    for (let i=0; i<5; i++) {
        el.push(0);
    }
}

//filling matrix with figures id

var firstFigures = document.querySelectorAll('.firstplayer');

for (var i=0; i<5; i++) {
    positionMatrix[4][i] = firstFigures[i].id;
}

var secondFigures = document.querySelectorAll('.secondplayer');

for (var i=0; i<5; i++) {
    positionMatrix[0][i] = secondFigures[i].id;
}



