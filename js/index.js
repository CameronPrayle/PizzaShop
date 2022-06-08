// Size Selector Functionality
var oldSize="";

// Gets old pizza size to compare to new size for the price change
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

// Gets old pizza base to compare to new base for the price change
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
function showCart(fromAddToUI){
    // Doesnt hide cart if its being called from addToUI as some users may want the keep cart displayed when adding new items
    if(document.getElementById("cartContainer").style.display=="block" && fromAddToUI==false){
        document.getElementById("cartContainer").style="display: none;";
    }else{
        document.getElementById("cartContainer").style="display: block;";
    }
}

class cart{
    constructor(){
        this.pizzaList=[];
        this.sideList=[];
        this.pizza5050List=[];
    }

    // Adds items to list attributes
    addToCart(itemType, object){
        if(itemType=="pizza"){
            this.pizzaList.push(object);
        }else if(itemType=="side"){
            this.sideList.push(object); 
        }else{
            this.pizza5050List.push(object); 
        }

        this.addToUI();
    }

    // Displays items in list attributes to cart 
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
        for(let i=0; i<this.sideList.length; i++){
            content = content + 
            "Extra: "+this.sideList[i].type+"<br>"+
            "Price: £"+this.sideList[i].price+"<br><br>"
            ;
            total = total + parseFloat(this.sideList[i].price);
        }
        for(let i=0; i<this.pizza5050List.length; i++){
            content = content + 
            "Pizza: "+this.pizza5050List[i].type+"<br>"+
            "1st Half: "+this.pizza5050List[i].half1+"<br>"+
            "2nd Half: "+this.pizza5050List[i].half2+"<br>"+
            "Size: "+this.pizza5050List[i].size+"<br>"+
            "Base: "+this.pizza5050List[i].base+"<br>"+
            "Price: £"+this.pizza5050List[i].price+"<br><br>"
            ;
            total = total + parseFloat(this.pizza5050List[i].price);
        }

        content=content+"Total: " + total.toFixed(2) + '<br> <button class="inShopAddButton" onclick="c.itemsPurchased()"> Order </button>' ;
        document.getElementById("cartContainer").innerHTML=content;
    }

    // Reset the attributes and cart display
    itemsPurchased(){
        document.getElementById("cartContainer").innerHTML="";
        this.pizzaList=[];
        this.sideList=[];
        this.pizza5050List=[];

        // Plays purchase animation
        document.getElementById("purchased").style="display: block;";

        // Reset after 5 seconds
        setTimeout(() => {  
            document.getElementById("purchased").style="display: none;";
        }, 5000);

        showCart(false);
    }

}

const c = new cart();

// Add Pizza

function addPizza(id){
    var type = document.getElementById(id+"Title").textContent;
    var size = document.getElementById(id+"Size").value;
    var base = document.getElementById(id+"Base").value;
    var price = document.getElementById(id+"Price").textContent;
    const p = new pizza(id, type, size, base, price);
    c.addToCart("pizza", p);
    showCart(true);
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

// Add Side and Drink 

function addSide(id){
    var type = document.getElementById(id+"Title").textContent;
    var price = document.getElementById(id+"Price").textContent;
    const s = new side(id, type, price);
    c.addToCart("side", s);
    showCart(true);
}

class side{
    constructor(id, type, price){
        this.id = id;
        this.type = type;
        this.price = price;
    }
}

// Add 50/50 Pizza

function changeHalf(halfNumber){
    var oldImgId = "pizza5050img"+halfNumber; //Get old img id to select HTML element
    var pizzaSelected = document.getElementById("5050half"+halfNumber).value; //Gets pizza title from selector
    pizzaSelected = pizzaSelected.replace(/\s+/g, ''); //Remove the space in the string
    document.getElementById(oldImgId).src="img/Pizza_"+pizzaSelected+".jpg"; //Replace img with correct img
}

function add5050Pizza(id){
    var half1 = document.getElementById(id+"half1").value;
    var half2 = document.getElementById(id+"half2").value;
    var size = document.getElementById(id+"Size").value;
    var base = document.getElementById(id+"Base").value;
    var price = document.getElementById(id+"Price").textContent;
    const p5050 = new pizza5050(id, half1, half2, size, base, price);
    c.addToCart("5050", p5050);
    showCart(true);
}

class pizza5050{
    constructor(id, half1, half2, size, base, price){
        this.id = id;
        this.type = "50/50 Pizza"
        this.half1 = half1;
        this.half2 = half2;
        this.size = size;
        this.base = base;
        this.price = price;
    }
}