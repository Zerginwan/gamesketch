//Генерим "бумажки". Private - сколько "личных" правил. General - Сколько общих.
//Пока все общие.
let privateRulesCount = 0;
let generalRulesCount = 1;
let dotsInRule = 4;  //сколько ходов в одном правиле.
let rulesCount = (privateRulesCount * 2) + generalRulesCount;
let rulesArray = [];



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
        rulesArray.push(arr);       //добавляем "Бумажку" к массиву "Бумажек"
    }
    return rulesArray;

}
//заглушка для рисования "Бумажек". Вспомогательная функция.
function drawRules(){

}

function generateRules(privateRulesCount, generalRulesCount){
    rulesArray = generateRulesArray();
    drawRules();
    console.log(rulesArray);

}

generateRules(privateRulesCount, generalRulesCount);
