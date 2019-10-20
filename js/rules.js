//Private - сколько "личных" правил. General - Сколько общих.
let privateRulesCount = 2;
let generalRulesCount = 1;
let dotsInRule = 4;  //сколько ходов в одном правиле.
let rulesCount = (privateRulesCount * 2) + generalRulesCount;
let rulesArray = [];
let selectedRule = "";


//Функция генерит клетки вокрг центра квадрата 5х5, но не в центре
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


//Функция генерирует массив правил и возвращает его
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

//Функция рисует таблички для drawRules
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


//Функция рисует правила
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
                unselectAll();
            
            }else{
            //если не заселекчена, все другие селекты сбрасываются, а этот селект появляется.
                unselectAll();
                this.classList.add("selected");
                selectedRule = this.id;
            }
        }else{
            //если это чужие таблицы - все селекты сбрасываются
            unselectAll();
        }
    });
 
 }

//Основная функция: создает и рисует правила
function generateRules(privateRulesCount, generalRulesCount){
    rulesArray = generateRulesArray();
    drawRules(rulesArray);

}

//Функция для удаления всех таблиц с экрана
function deleteRules(){
    $('table.rule_table').remove();
}

//Функция перерисовки правил
function redrawRules(rulesArray){
  
    deleteRules();
    drawRules(rulesArray);
}

//Функция убирает выделение
function unselectAll() {
    $(".selected").removeClass("selected") ;
            selectedRule = "";
}

//Функция для переделки правил
function change_rule(array, modifier){
	//0:0 -> -2:-2   4:4 -> 2:2 . Смотрим по нижнему (первому) игроку. 
	//0:0 -> 2:2    4:4 -> -2:-2  - так выглядит у второго
	let rule = [];
	//перебираем все точки в правиле
	for (let i=0;i<dotsInRule;i++){
		//за каждую точку создаем точку в новом массиве
		rule.push([]);
		//выдаем точке в новом массиве новые координаты.
		rule[i].row =  (array[i].row - 2) * modifier;
		rule[i].column =  (array[i].column - 2) * modifier;
	}
	//возвращаем новый массив
	return rule;
}

