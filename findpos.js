//нахождение координат. Ищет по имени класса ячейки и строки
function quickFindFigurePosition(event) {
    let thisId = event.target.id;
    let figure = document.getElementById(thisId);
    let cell = figure.parentElement;
    let row = cell.parentElement;
    let positionColumn = NaN;
    let positionRow = NaN;
//пробегаемся по классам строкии находим класс с номером. Обрезаем, получаем номер.
    for (let className of row.classList) {
        if ( className.startsWith("row_")  ) {
             positionRow = className.slice(4);
        }
    }
//тоже самое с ячейкой.
    for (let className of cell.classList) {
        if ( className.startsWith("cell_")  ) {
             positionColumn = className.slice(5);
        }
    }
//возвращаем JSON
    return {
        row:    positionRow,
        column: positionColumn
    }
}


function findDivPosition(div) {
    let cell = div;
    let row = div.parentElement;

    let positionColumn = NaN;
    let positionRow = NaN;
//пробегаемся по классам строкии находим класс с номером. Обрезаем, получаем номер.
    for (let className of row.classList) {
        if ( className.startsWith("row_")  ) {
             positionRow = className.slice(4);
        }
    }
//тоже самое с ячейкой.
    for (let className of cell.classList) {
        if ( className.startsWith("cell_")  ) {
             positionColumn = className.slice(5);
        }
    }
//возвращаем JSON
    return {
        row:    positionRow,
        column: positionColumn
    }
}