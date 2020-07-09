
var animals = {
    text:"Животные",
    childs:[{text :"Млекопитающие",
             childs : [{text:"Коровы"},
                       {text:"Ослы"},
                       {text:"Собаки"},
                       {text:"Тигры"}]},
                       {text:"Другие",
             childs:  [{text:"Змеи"},
                       {text:"Птицы"},
                       {text:"Ящерицы"}]}]
}
var fish= {
    text:"Рыбы",
    childs:[{text: "Аквариумные",
             childs:[{text:"Гуппи"},
                     {text:"Скалярии"}]},
                     {text:"Морские",
             childs:[{text:"Морская форель"}]}]
}

$(function()
{
    var kul = document.createElement("ul");
        kul.id = "main";

    RecursiveAdd(kul,animals,0);
    RecursiveAdd(kul,fish,1);
    
    var body = document.getElementsByTagName("body");
        body[0].appendChild(kul);

    $(".kul_btn").click(function (e) {
        $(this.id).toggleClass("collapse");
        e.preventDefault();
    })
});

function RecursiveAdd(parent,tmp,h){

    let to_add = document.createElement("li");

    if(tmp.hasOwnProperty("childs"))
    {
        let connection = document.createElement("a");
            connection.id = "#" + parent.id + "_" +h;
            connection.className = "kul_btn";
            connection.innerHTML = tmp.text;
            to_add.appendChild(connection);
        
        let onset = document.createElement("ul");
        
            onset.className = "collapse";
            onset.id = parent.id + "_" +h;
        
        for(let x = 0; x < tmp.childs.length; x++)
        {
            RecursiveAdd(onset,tmp.childs[x],x);
        }
        
            to_add.appendChild(onset);
    }
    else
    {
        to_add.innerHTML = tmp.text;
    }
        parent.appendChild(to_add);
}