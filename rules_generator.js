//Генерим "бумажки". Private - сколько "личных" правил. General - Сколько общих.
let privateRulesCount = 2;
let generalRulesCount = 1;



//нужно чтобы сгенерить клетки вокрг центра квадрата 5х5, но не в центре.
//возвращает массив вида [x,y] = [0,4]
function random_cell(){
    let rand1 = Math.floor(Math.random() * 5);
    let rand2 = Math.floor(Math.random() * 5);
    while(rand1 == rand2 == 2){
        rand2 = Math.floor(Math.random() * 5);
    }
    return [rand1, rand2];
}


//генерируем массив и возвращаем его. Вспомогательная функция.
function generateRulesArray(){
    let rulesArray = []; //создаем массив для правил
    let count = (privateRulesCount * 2) + generalRulesCount;
    //делаем сколько-то правил. x2 частных x1 общих.
    for (let i=0;i<count;i++){
        let arr = [];               //создаем массив для клеток ходов. "Бумажка"
        for (let j=0;j<4;j++){
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
    var rulesArray = generateRulesArray();
    console.log(rulesArray);

}

generateRules(privateRulesCount, generalRulesCount);
