var animals = {
    text:"Животные",
    childs:[{text :"Млекопитающие", childs : [{text:"Коровы"},{text:"Ослы"},{text:"Собаки"},{text:"Тигры"}]},{text:"Другие",childs:  [{text:"Змеи"},{text:"Птицы"},{text:"Ящерицы"}]}]
}
var fish= {
    text:"Рыбы",
    childs:[{text: "Аквариумные",childs:[{text:"Гуппи"},{text:"Скалярии"}]},{text:"Морские",childs:[{text:"Морская форель"}]}]
}

window.onload = function()
{
    var kul = document.createElement("ul");
    
    RecursiveAdd(kul,animals);
    RecursiveAdd(kul,fish);
    
    var body = document.getElementsByTagName("body");
        body[0].appendChild(kul);
}

function RecursiveAdd(parent,tmp){
    let to_add = document.createElement("li");
        to_add.innerHTML = tmp.text;
    if(tmp.hasOwnProperty("childs"))
    {
        let onset = document.createElement("ul");
        
        for (let x of tmp.childs)
        {
            RecursiveAdd(onset,x);
        }
        
        to_add.appendChild(onset);
    }
        parent.appendChild(to_add);
}