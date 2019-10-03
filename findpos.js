//ищем местоположение, которая фигура занимает в positionMatrix
function findFigurePosition(event) {
    let positionColumn;
    let positionRow;
    //пробегаемся по строчкам и находим совпадение по ID, вычисляем его порядок в масииве.
    for (let i=0; i<rowsNumber; i++) {
        let findId = positionMatrix[i].indexOf(event.target.id);
        positionColumn = NaN;
        if (findId >= 0){
            positionColumn = findId; 
            positionRow = i;
        }
    }

    let currentPosition = [positionRow, positionColumn];
    
    return currentPosition;
}
//альтернативное нахождение координат. Ищет по имени класса ячейки и строки
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

//cейчас при движении фигурки ее координаты не обновляются, потому что нам нужно,
//чтобы при движении менялась и positionMatrix

//ф-ия, чтобы узнать позицию пустого дива
//Возвращает массив кординат - X и Y
function findDivPosition(event){
    //ищем столбец с помощью подсчета предыдущих сиблингов previousSibling
    let count = 0;
    let p = event.target.previousSibling;
    
    for (let i=0; i<columnsNumber; i++) {
        
        if (p != null) {
            count = count + 1;
            p = p.previousSibling;
        }   
    }
    
    let divColumn = count;
    
    //ищем строку с помощью parentElement и previousSibling
    count=0;
    let parent = event.target.parentElement;

    p = parent.previousSibling;

    for (let i=0; i < rowsNumber; i++ ) {

        if (p!=null) {
            count = count + 1;
            p = p.previousSibling;
        }
    }

    let divRow = count;
    let divPos = [divRow, divColumn];
    //    console.log(divPos);
    return divPos;

}

function findDivPositionReplaced(cell){
    //ищем столбец с помощью подсчета предыдущих сиблингов previousSibling
    let count = 0;
    let p = cell.previousSibling;
    
    for (let i=0; i<columnsNumber; i++) {
        
        if (p != null) {
            count = count + 1;
            p = p.previousSibling;
        }   
    }
    
    let divColumn = count;

    //ищем строку с помощью parentElement и previousSibling
    count=0;
    let parent = cell.parentElement;
    p = parent.previousSibling;
    for (let i=0; i<rowsNumber; i++) {

        if (p!=null) {
            count = count + 1;
            p = p.previousSibling;
        }
    }

    let divRow = count;
    let divPos = [divRow, divColumn];
    // console.log(divPos);
    return divPos;
}