//ищем местоположение, которая фигура занимает в positionMatrix
function findFigurePosition(event) {
    
    for (var i=0; i<positionMatrix.length; i++) {
        var findId = positionMatrix[i].indexOf(event.target.id);
        var positionColumn = NaN;
        if (findId >= 0)
            positionColumn = findId; 
            var positionRow = i;
    }

    var currentPosition = [positionRow, positionColumn];
    return currentPosition;
}

//cейчас при движении фигурки ее координаты не обновляются, потому что нам нужно,
//чтобы при движении менялась и positionMatrix

//ф-ия, чтобы узнать позицию пустого дива
function findDivPosition(event){
    //ищем столбец с помощью подсчета предыдущих сиблингов previousSibling
    var count = 0;
    var p = event.target.previousSibling;
    
    for (var i=0; i<4; i++) {
        
        if (p != null) {
            count = count + 1;
            p = p.previousSibling;
        }   
    }
    
    var divColumn = count;
    
    //ищем строку с помощью parentElement и previousSibling
    var count=0;
    var parent = event.target.parentElement;

    var p = parent.previousSibling;

    for (var i=0; i<4; i++) {

        if (p!=null) {
            count = count + 1;
            p = p.previousSibling;
        }
    }

    var divRow = count;
    var divPos = [divRow, divColumn];
    console.log(divPos);
    return divPos;

}

function findDivPositionReplaced(cell){
    //ищем столбец с помощью подсчета предыдущих сиблингов previousSibling
    var count = 0;
    var p = cell.previousSibling;
    
    for (var i=0; i<4; i++) {
        
        if (p != null) {
            count = count + 1;
            p = p.previousSibling;
        }   
    }
    
    var divColumn = count;

    //ищем строку с помощью parentElement и previousSibling
    var count=0;
    var parent = cell.parentElement;
    var p = parent.previousSibling;
    for (var i=0; i<5; i++) {

        if (p!=null) {
            count = count + 1;
            p = p.previousSibling;
        }
    }

    var divRow = count;
    var divPos = [divRow, divColumn];
    console.log(divPos);
    return divPos;
}