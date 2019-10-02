//создаем фигурки
let allRows = document.querySelectorAll('.row');

let lastRow = allRows[allRows.length - 1];
let lastRowCells = lastRow.querySelectorAll('.cell');

let firstRow = allRows[0];
let firstRowCells = firstRow.querySelectorAll('.cell');


for (let i=0; i<columnsNumber; i++) {
    let figure = document.createElement('div');
    let newId = 'id1' + i;
    figure.setAttribute('id', newId);
    figure.setAttribute('class', 'figure firstplayer');
    lastRowCells[i].append(figure);

    let figure2 = document.createElement('div');
    let newId2 = 'id2' + i;
    figure2.setAttribute('id', newId2);
    figure2.setAttribute('class', 'figure secondplayer');
    firstRowCells[i].append(figure2);
}

//data structure

//creating empty matrix
let positionMatrix = [];
for (let i=0; i<rowsNumber; i++) {
    positionMatrix.push([]);
}
for (let el of positionMatrix) {
    for (let i=0; i<columnsNumber; i++) {
        el.push(0);
    }
}

//filling matrix with figures id

let firstFigures = document.querySelectorAll('.firstplayer');

for (let i=0; i<columnsNumber; i++) {
    let rowCount = rowsNumber - 1;
    positionMatrix[rowCount][i] = firstFigures[i].id;
}

let secondFigures = document.querySelectorAll('.secondplayer');

for (let i=0; i<columnsNumber; i++) {
    positionMatrix[0][i] = secondFigures[i].id;
}


