//Функции поиска
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

//Ищем элемент масива по значению JSON'a
function findElement(arr, propName, propValue) {
	
	for (var i=0; i < arr.length; i++){
	  if (arr[i][propName] == propValue){

		return arr[i];
	  }
	}
	// will return undefined if not found; you could return a default instead
} 

function getIdOfRandomTable(div_id){
	let tableArray = $("div#"+div_id).children();
	//берем рандомную таблицу, возвращаем ее id
	let tableId = tableArray[Math.floor( Math.random() * tableArray.length )].id;

	return tableId;
}