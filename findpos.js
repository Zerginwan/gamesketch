//ищем местоположение, которая фигура занимает в positionMatrix
function findFigurePosition(event) {
    let positionColumn;
    let positionRow;
    //пробегаемся по строчкам и находим совпадение по ID, вычисляем его порядок в масиивея
    for (let i=0; i<positionMatrix.length; i++) {
        let findId = positionMatrix[i].indexOf(event.target.id);
        positionColumn = NaN;
        if (findId >= 0)
            positionColumn = findId; 
            positionRow = i;
    }

    let currentPosition = [positionRow, positionColumn];
    return currentPosition;
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
    console.log(divPos);
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
    console.log(divPos);
    return divPos;
}