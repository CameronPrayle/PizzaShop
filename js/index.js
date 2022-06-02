// Size Selector Functionality
var oldSize="";

function getOldSize(pizza){
    oldSize = document.getElementById(pizza+"Size").value
}

function changeSize(pizza){
    var newSize = document.getElementById(pizza+"Size").value;
    var oldPrice = parseFloat(document.getElementById(pizza+"Price").textContent);
    var newPrice = 0;

    // Change old price to new price
    if(newSize == 'Hero 8"'){
        if(oldSize=='Crook 12"'){
            newPrice = oldPrice - 1;
        }else if(oldSize=='Villain 16"'){
            newPrice = oldPrice - 2;
        }else{
            newPrice = oldPrice - 3;
        }
    }else if(newSize == 'Crook 12"'){
        if(oldSize=='Hero 8"'){
            newPrice = oldPrice + 1;
        }else if(oldSize=='Villain 16"'){
            newPrice = oldPrice - 1;
        }else{
            newPrice = oldPrice - 2;
        }
    }else if(newSize == 'Villain 16"'){
        if(oldSize=='Hero 8"'){
            newPrice = oldPrice + 2;
        }else if(oldSize=='Crook 12"'){
            newPrice = oldPrice + 1;
        }else{
            newPrice = oldPrice - 1;
        }
    }else{
        if(oldSize=='Hero 8"'){
            newPrice = oldPrice + 3;
        }else if(oldSize=='Crook 12"'){
            newPrice = oldPrice + 2;
        }else{
            newPrice = oldPrice + 1;
        }
    }

    // Display new price
    document.getElementById(pizza+"Price").textContent = newPrice;
}


// Base Selector Functionality
var oldBase="";

function getOldBase(pizza){
    oldBase = document.getElementById(pizza+"Base").value
}

function changeBase(pizza){
    var newBase = document.getElementById(pizza+"Base").value;
    var oldPrice = parseFloat(document.getElementById(pizza+"Price").textContent);
    var newPrice = 0;

    // Change old price to new price
    if(newBase == 'Thin Italian' || newBase == 'Stone Crust'){
        if(oldBase=='Cheese Stuffed Crust' || oldBase=='Vegan' || oldBase=='Gluten Free'){
            newPrice = oldPrice - 1;
        }else{
            newPrice = oldPrice;
        }
    }else{
        if(oldBase=='Thin Italian' || oldBase == 'Stone Crust'){
            newPrice = oldPrice + 1;
        }else{
            newPrice = oldPrice;
        }
    }

    // Display new price
    document.getElementById(pizza+"Price").textContent = newPrice;
}


// Cart Functionality
function showCart(){
    if(document.getElementById("cartContainer").style.display=="block"){
        document.getElementById("cartContainer").style="display: none;";
    }else{
        document.getElementById("cartContainer").style="display: block;";
    }
}

class cart{
    constructor(){
        this.pizzaList=[];
        this.sideList=[];
        this.drinkList=[];
    }

    addToCart(itemType, object){
        if(itemType=="pizza"){
            this.pizzaList.push(object);
        }else if(itemType=="side"){
            this.sideList.push(object);
        }else{
            this.drinkList.push(object); 
        }

        this.addToUI();
    }

    addToUI(){
        var content = "";
        var total = 0;
        for(let i=0; i<this.pizzaList.length; i++){
            content = content + 
            "Pizza: "+this.pizzaList[i].type+"<br>"+
            "Size: "+this.pizzaList[i].size+"<br>"+
            "Base: "+this.pizzaList[i].base+"<br>"+
            "Price: £"+this.pizzaList[i].price+"<br><br>"
            ;
            total = total + parseFloat(this.pizzaList[i].price);
        }

        content=content+"Total: " + total;
        document.getElementById("cartContainer").innerHTML=content;
    }
}

const c = new cart();

function addPizza(id){
    var type = document.getElementById(id+"Title").textContent;
    var size = document.getElementById(id+"Size").value;
    var base = document.getElementById(id+"Base").value;
    var price = document.getElementById(id+"Price").textContent;
    const p = new pizza(id, type, size, base, price);
    c.addToCart("pizza", p);
}

class pizza{
    constructor(id, type, size, base, price){
        this.id = id;
        this.type = type;
        this.size = size;
        this.base = base;
        this.price = price;
    }
}


