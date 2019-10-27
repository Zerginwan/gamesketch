//x - ширина, y - высота
var columnsNumber = 5; //x
var rowsNumber = 5;  //y

function drawAllFigures() {
let allRows = document.querySelectorAll('.row');

//фигурки первого игрока размещаем внизу (на последней строке), фигурки второго — на первой строке.
let lastRow = allRows[allRows.length - 1];
let lastRowCells = lastRow.querySelectorAll('.cell');

let firstRow = allRows[0];
let firstRowCells = firstRow.querySelectorAll('.cell');

//создаем фигурки
for (let i=0; i<columnsNumber; i++) {
    
    //назначаем среднюю фигуру мастером
    let masterClass = ( i == (Math.floor(columnsNumber / 2) )) ? ' master':'';
    
    //для первого игрока
    let figure = document.createElement('div');
    let newId = 'id1' + i;
    figure.setAttribute('id', newId);
    figure.setAttribute('class', 'figure firstplayer' + masterClass);
    lastRowCells[i].append(figure);

    //для второго игрока
    let figure2 = document.createElement('div');
    let newId2 = 'id2' + i;
    figure2.setAttribute('id', newId2);
    figure2.setAttribute('class', 'figure secondplayer' + masterClass);
    firstRowCells[i].append(figure2);
}
}

