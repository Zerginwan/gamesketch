var columnsNumber = 5; //x
var rowsNumber = 5;  //y
//x - ширина y  - высота
function buildField(x, y) {
    let container = document.createElement('div');
    container.setAttribute('id', 'container');
    container.style.cssText = 'height: 35em; display: flex;'; 
    container.style.cssText += 'justify-content: center; align-items: center';
    document.body.append(container);

    let field = document.createElement('div');
    field.setAttribute('id', 'field');
    field.style.width = '25em';
    container.append(field);

    for (let i=0; i<x; i++) {
        let row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.style.cssText = 'display: flex; width: 25em; height: 5em;'

        for (let j=0; j<y; j++) {
            let cell = document.createElement('div');
            cell.setAttribute('class', 'cell');
            cell.style.cssText = 'display: flex; border: 1px black solid; width: 5em;' ;
            cell.style.cssText += 'height: 5em; border-right: 0px; border-bottom: 0px;';
            cell.style.cssText += 'justify-content: center; align-items: center;';
            row.append(cell);
        }
        field.append(row);
    }

    /*убрали лишние границы, чтобы не было двойных на стыке блоков, 
    восстанавливаем недостающие боковые и нижние */

    let allRows = document.querySelectorAll('.row');
    for (let el of allRows) {
        el.lastChild.style.borderStyle = 'solid';
        el.lastChild.style.borderColor = 'black';
        el.lastChild.style.borderRightWidth = '1px';
    }


    let lastRow = allRows[allRows.length - 1];
    let lastRowCells = lastRow.querySelectorAll('.cell');
    for (let el of lastRowCells) {
	    el.style.borderStyle = 'solid';
	    el.style.borderColor = 'black';
	    el.style.borderBottomWidth = '1px';
    }

}


buildField(rowsNumber, columnsNumber);
