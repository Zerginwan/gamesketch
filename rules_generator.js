//Генерим "бумажки". Private - сколько "личных" правил. General - Сколько общих.
//Пока все общие.
let privateRulesCount = 2;
let generalRulesCount = 1;
let dotsInRule = 4;  //сколько ходов в одном правиле.
let rulesCount = (privateRulesCount * 2) + generalRulesCount;
let rulesArray = [];
let selectedRule = "";



//нужно чтобы сгенерить клетки вокрг центра квадрата 5х5, но не в центре.
//возвращает массив вида [x,y] = [0,4]
function random_cell(){
    let rand1 = Math.floor(Math.random() * 5);
    let rand2 = Math.floor(Math.random() * 5);
    while(rand1 == rand2 && rand2 == 2){
        rand2 = Math.floor(Math.random() * 5);
    }
    //возвращаем JSON-ом
    return {row: rand1, 
            column: rand2
        };
}


//генерируем массив и возвращаем его. Вспомогательная функция.
function generateRulesArray(){
    let rulesArray = []; //создаем массив для правил
    //делаем сколько-то правил. x2 частных x1 общих.
    for (let i=0;i<rulesCount;i++){
        let arr = [];               //создаем массив для клеток ходов. "Бумажка"
        //в каждую бумажку тыкаем dotsInRule ходов.
        for (let j=0;j<dotsInRule;j++){
            arr.push(random_cell());
        }
        //назначаем правило игроку или всем
        let player = "";
        switch (true){
            case(i < privateRulesCount):
                player = "firstplayer";
                break;
            case(i < (privateRulesCount * 2)):
                player = "secondplayer";
                break;
            default:
                player = "all";
                break;
        }
        rulesArray.push({
            name:   "rule_" + i,
            player: player,
            arr:    arr
        });       //добавляем JSON - "Бумажку" к массиву "Бумажек"
    }
    return rulesArray;

}
//рисуем таблички для drawRules
function makeTable(name, player){
    let table = document.createElement('table');
    table.setAttribute('id', name);
    table.classList.add('rule_table');
    let tablePlaceId = player+"_rules";
    document.getElementById(tablePlaceId).append(table);


    for (let i=0; i<5; i++) {
        let row = document.createElement('tr');
        row.classList.add('rule_row');
        for (let j=0; j<5; j++) {
            let cell = document.createElement('td');
            cell.classList.add('rule_cell');
            row.append(cell);
        }
        table.append(row);
    }
    
    return table;
}



//заглушка для рисования "Бумажек". Вспомогательная функция.
function drawRules(rulesArray){
    for(let rule in rulesArray){
        //создаем таблицу

        let table = makeTable(rulesArray[rule].name, rulesArray[rule].player);
        //добавляем в таблицу точки.
        for (let dot=0;dot<dotsInRule;dot++){
            let row = rulesArray[rule].arr[dot].row;
            let column = rulesArray[rule].arr[dot].column;
            table.childNodes[row].childNodes[column].classList.add("rule_dot");
        }
        //добавляем таблице центральную точку.
        table.childNodes[2].childNodes[2].classList.add("rule_center");
    }
    //навешиваем селектор
    $(".rule_table").click(function(){
        //кликать можно только в свои таблицы
        if (this.parentElement.id == turnPlayer+"_rules"){
        //если она уже заселекчена, то все селеккты сбрасываются
           if( this.classList.contains("selected") ){
                $(".selected").removeClass("selected") ;
                selectedRule = "";
            
            }else{
            //если не заселекчена, все другие селекты сбрасываются, а этот селект появляется.
                $(".selected").removeClass("selected") ;
                this.classList.add("selected");
                selectedRule = this.id;
            }
        }else{
            //если это чужие таблицы - все селекты сбрасываются
            $(".selected").removeClass("selected") ;
            selectedRule = "";
        }
    });
 
 }

function generateRules(privateRulesCount, generalRulesCount){
    rulesArray = generateRulesArray();
    drawRules(rulesArray);

}
//сносим все таблицы с экрана
function deleteRules(){
    $('table.rule_table').remove();
}

function redrawRules(rulesArray){
  
    deleteRules();

    drawRules(rulesArray);

}


generateRules(privateRulesCount, generalRulesCount);


function unselectAll() {
    $(".selected").removeClass("selected") ;
            selectedRule = "";
}
//селектим табличку с нужным правилом.

