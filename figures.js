//создаем фигурки
let allRows = document.querySelectorAll('.row');

let lastRow = allRows[allRows.length - 1];
let lastRowCells = lastRow.querySelectorAll('.cell');

let firstRow = allRows[0];
let firstRowCells = firstRow.querySelectorAll('.cell');


for (let i=0; i<columnsNumber; i++) {
    let figure = document.createElement('div');
    let newId = 'id1' + i;
    //назначаем среднюю фигуру мастером
    let masterClass = ( i == (Math.floor(columnsNumber / 2) )) ? ' master':'';
    figure.setAttribute('id', newId);
    figure.setAttribute('class', 'figure firstplayer' + masterClass);
    lastRowCells[i].append(figure);

    let figure2 = document.createElement('div');
    let newId2 = 'id2' + i;
    figure2.setAttribute('id', newId2);
    figure2.setAttribute('class', 'figure secondplayer' + masterClass);
    firstRowCells[i].append(figure2);
}


