const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

function displayNone(ele){
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele){
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

class Item{
    constructor(name, type, max, price, profit, profitPerSec, totalValue, number, imageUrl){
        this.name = name;
        this.type = type;
        this.max  = max;
        this.price = price;
        this.profit = profit;
        this.profitPerSec = profitPerSec;
        this.number = number;
        this.totalValue = totalValue;
        this.imageUrl = imageUrl;
        
        
    }

    getProfitDescription(){
        let profitStr = "";
        if (this.type == "ability"){
            profitStr = "¥" + this.profit + " /click";
        }else if(this.type == "investment"){
            profitStr = "¥" + this.profit + "% /sec";
        }else{
            profitStr = "¥" + this.profit + " /sec";
        }
        return profitStr;
    }

    updateEtfPrice(){
        this.price = this.price * 1.1;
        return this.price;
    }

    updateEtfProfitPerSec(){
        this.profitPerSec = Math.floor(this.totalValue * this.profit);  
    }

    updateTotalValue(num){
        this.totalValue += this.price * num;
    }
    
    increaseItem(num){
        let isAbility = false;
        this.number += num;
        if(isFinite(this.max)){
            this.max -= num;
        }
        this.updateTotalValue(num);
        if (this.type == "investment"){
            this.updateEtfProfitPerSec();
            this.updateEtfPrice();
        }else if(this.type == "real estate"){
            this.profitPerSec = this.profit * this.number;
        }else{
            isAbility = true;
        }
        return isAbility;
    }
}

class UserAccount{
    constructor(name, age, day, money, oneClick, burger, items, profitPerSec){
        this.name = name;
        this.age = age;
        this.day = day;
        this.money = money;
        this.oneClick = oneClick;
        this.burger = burger;
        this.items = items;
        this.profitPerSec = profitPerSec;
    }

    updateProfitPerSec(){
        let arg = 0;
        for(let i=0;i < this.items.length;i++){
            arg += this.items[i].profitPerSec;
        }
        this.profitPerSec = arg;
    }

    clickBurger(){
        this.money += this.oneClick;
        this.burger += 1;
    }

    buyItem(index, number){
        let targetItem = this.items[index];
        const abilityCheck = targetItem.increaseItem(number);
        if(abilityCheck){
            this.oneClick += targetItem.profit;
        }
        this.money -= targetItem.price * number;
        this.updateProfitPerSec();
    }
}

const items = [
    new Item("Flip machine", "ability", 500, 15000, 25, 0, 0, 0, "https://cdn-icons.flaticon.com/png/512/2454/premium/2454610.png?token=exp=1634399906~hmac=ccc2d1365b466253e5177924d16ef1de"),
    new Item("ETF Stock", "investment", Infinity, 300000, 0.1, 0, 0, 0,  "https://cdn-icons-png.flaticon.com/512/4256/4256863.png"),
    new Item("ETF Bonds", "investment", Infinity, 300000, 0.07, 0, 0, 0,  "https://cdn-icons-png.flaticon.com/512/4256/4256863.png"),
    new Item("Lemonade Stand", "real estate", 1000, 30000, 30, 0, 0, 0, "https://cdn-icons-png.flaticon.com/512/941/941769.png"),
    new Item("Ice Cream Truck", "real estate", 500, 100000, 120, 0, 0, 0, "https://cdn-icons.flaticon.com/png/512/2514/premium/2514823.png?token=exp=1634402318~hmac=4faf473104bb2b54ba95e3437f619f6e"),
    new Item("House", "real estate", 100, 20000000, 32000, 0, 0, 0, "https://cdn-icons-png.flaticon.com/512/619/619153.png"),
    new Item("Townhouse", "real estate", 100, 40000000, 64000, 0, 0, 0, "https://cdn-icons-png.flaticon.com/512/1364/1364596.png"),
    new Item("Mansion", "real estate", 20, 250000000, 500000, 0, 0, 0, "https://cdn-icons-png.flaticon.com/512/1676/1676180.png"),
    new Item("Industrial Space", "real estate", 10, 1000000000, 2200000, 0, 0, 0, "https://cdn-icons.flaticon.com/png/512/3256/premium/3256216.png?token=exp=1634402721~hmac=91b683630ddfe1211c0b7ac79fdcb521"),
    new Item("Hotel Skyscraper", "real estate", 5, 10000000000, 25000000, 0, 0, 0, "https://cdn-icons-png.flaticon.com/512/2855/2855426.png"),
    new Item("Bullet-Speed Sky Railway", "real estate", 1, 10000000000000, 30000000000, 0, 0, 0, "https://cdn-icons.flaticon.com/png/512/2074/premium/2074306.png?token=exp=1634402443~hmac=aef92bddf28392e583d8868cf7520262")
];

function createItemContainer(itemArray){
    let container = document.createElement("div");
    htmlString = "";
    container.id = "selectItem";
    for(let i=0; i < itemArray.length;i++){
        let currItem = itemArray[i];
        let profitStr = currItem.getProfitDescription();

        htmlString += 
        `
        <div class="bg-pink text-white d-sm-flex align-items-center m-1 item" data-index=${i.toString()}>
            <div class="d-none d-sm-block p-1 col-sm-3">
                <img src=${currItem.imageUrl} class="smallImg-fit">
            </div>
            <div class="col-sm-9">
                <div class="d-flex justify-content-between">
                    <h5>${currItem.name}</h5>
                    <h5>${currItem.number}</h5>
                </div>
                <div class="d-flex justify-content-between">
                    <p>${currItem.price}</p>
                    <p class="text-purple">${profitStr}</p>
                </div>
            </div>
        </div>
        `;
    }
    container.innerHTML = htmlString;

    return container;
}

function createInfoCon(UserAccount){
    let infoCon = document.createElement("div");
    infoCon.classList.add("p-2", "white-box");
    htmlString =
    `
    <div class="d-flex flex-wrap p-1">
    `;

    let element = UserAccount.name;
    let eleClassName = "userName";
    for(let i=0;i < 4;i++){
        console.log(infoCon.innerHTML)
        switch(i){
            case 1:
                element = UserAccount.age + " years old";
                eleClassName = "userAge";
                break;
            case 2:
                element = UserAccount.day + " days";
                eleClassName = "userDays";
                break;
            case 3:
                element = "¥" + UserAccount.money;
                eleClassName = "userMoney";
        }
        htmlString += 
        `
        <div class="col-12 col-sm-6 p-1">
            <div class="bg-pink text-center text-white p-2 userInfo">
                <h6 class=${eleClassName} id=${eleClassName}>${element}</h6>
            </div>
        </div>
        `;
    }
    console.log(infoCon.innerHTML)
    htmlString +=
    `
    </div>
    `;
    infoCon.innerHTML = htmlString;
    return infoCon;
}

function createResetAndSave(){
    let container = document.createElement("div");
    container.classList.add("d-flex", "justify-content-end", "mt-2");
    container.innerHTML =
    `
    <div class="border p-2 m-2">
        <i class="fas fa-undo fa-2x text-blue"></i>
    </div>
    <div class="border p-2 m-2">
        <i class="fas fa-save fa-2x text-blue"></i>
    </div>
    `;
    return container;
}

function createSubPage(UserAccount, value){
    let itemList = document.getElementById("selectItem");
    displayNone(itemList);
    let subPage = document.createElement("div");
    let intValue = parseInt(value);
    let targetItem = UserAccount.items[intValue];
    let maxPurchaseStr = targetItem.max;
    if(maxPurchaseStr == "Infinity"){
        maxPurchaseStr = "∞";
    }
    let htmlString = 
    `
    <div class="bg-pink p-2 m-sm-1 m-xs-2 text-white">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h4>${targetItem.name}</h4>
                <p>Max purchases: ${maxPurchaseStr}</p>
                <p>Price: ¥${targetItem.price}</p>
                <p>Get ${targetItem.getProfitDescription()}</p>
            </div>
            <div>
                <img src=${targetItem.imageUrl} class="middleImg-fit">
            </div>
        </div>
        <p>How many would you like to buy?</p>
        <input placeholder="0" type="number" class="col-12 form-control quantity" min="1">
        <p class="text-right total-view"></p>
        <div class="d-flex justify-content-between pb-3">
            <button class="btn-blue col-5 back-btn">Go Back</button>
            <button class="btn-pink col-5 purchase-btn">Purchase</button>
        </div>
    </div>
    `;

    subPage.innerHTML = htmlString;
    let inputForm = subPage.querySelectorAll(".quantity")[0];
    inputForm.addEventListener("change", (ele) => {
        let totalView = subPage.querySelectorAll(".total-view")[0];
        let total = ele.target.value * targetItem.price;
        totalView.innerHTML = "total: ¥" + total;
    })

    let backBtn = subPage.querySelectorAll(".back-btn")[0];
    backBtn.addEventListener("click", function(){
        createMainPage(UserAccount);
    })

    let purchaseBtn = subPage.querySelectorAll(".purchase-btn")[0];
    purchaseBtn.addEventListener("click", function(){
        
        if(inputForm.value == "" || parseInt(inputForm.value) < 0){
            createMainPage(UserAccount);
        }else if(UserAccount.money < (parseInt(inputForm.value) * targetItem.price)){
            alert("You don't have enough money.");
            createMainPage(UserAccount);
        }else if(targetItem.max < parseInt(inputForm.value)){
            alert("You cannot buy anymore.")
            createMainPage(UserAccount);
        }else{ 
            UserAccount.buyItem(intValue, parseInt(inputForm.value));
            createMainPage(UserAccount);
        }
    })

    document.querySelectorAll(".item-box")[0].append(subPage);
}

function updateUserMoney(UserAccount){
    let userMoney = document.getElementById("userMoney");
    userMoney.innerHTML = "¥" + UserAccount.money;
}

function updateBurger(UserAccount){
    let userBurger = document.getElementById("userBurger");
    userBurger.innerHTML = UserAccount.burger + " Burgers";
}

function initializeUserAccount(){
    const form = document.getElementById("name-form");
    let name = form.querySelectorAll("input")[0].value;
    let account = new UserAccount(name, 20, 0, 50000, 25, 0, items, 0);
    return account;
}

function createMainPage(UserAccount){
    displayNone(config.initialPage);
    displayBlock(config.mainPage);
    config.mainPage.innerHTML = "";
    let container = document.createElement("div");
    container.classList.add("vh-100", "d-flex", "justify-content-center");

    let mainTab = document.createElement("div");
    mainTab.classList.add("main-tab", "pt-2", "pl-2", "pr-2", "pb-3", "col-12", "col-md-11", "col-lg-10", "d-flex", "flex-wrap");

    let leftSide = document.createElement("div");
    leftSide.classList.add("col-12", "col-sm-4", "mb-3", "mb-sm-0", "white-box", "p-2", "box-height");

    leftSide.innerHTML =
    `
    <div class="bg-pink pt-1 text-white text-center">
        <h6 id="userBurger">${UserAccount.burger} Burgers</h6>
        <p id="userOneClick">one click ¥${UserAccount.oneClick}</p>
    </div>
    <div class="p-2 pt-sm-5 d-flex justify-content-center">
        <img src="https://cdn-icons.flaticon.com/png/512/1811/premium/1811974.png?token=exp=1634361657~hmac=702ef0ac8c4f857ea597b2919beddb68" class="img-fit hover burger">
    </div>
    `;
    
    mainTab.append(leftSide);

    let rightside = document.createElement("div");
    rightside.classList.add("col-12", "col-sm-8", "h-100", "rightPage");
    rightside.append(createInfoCon(UserAccount));
    
    let whiteBoxContainer = document.createElement("div");
    whiteBoxContainer.classList.add("item-box","white-box", "mt-2", "p-1", "overflow-auto", "flowHeight");
    whiteBoxContainer.append(createItemContainer(UserAccount.items));
    rightside.append(whiteBoxContainer);
    rightside.append(createResetAndSave());

    mainTab.append(rightside);
    container.append(mainTab);

    //set button functions
    let burgerImage = leftSide.querySelectorAll(".burger")[0];
    burgerImage.addEventListener("click", function(){
        UserAccount.clickBurger();
        updateUserMoney(UserAccount);
        updateBurger(UserAccount);
    })

    let itemBoxes = whiteBoxContainer.querySelectorAll(".item");
    for(let i=0;i < itemBoxes.length;i++){
        let currItem = itemBoxes[i];
        currItem.addEventListener("click", function() {
            createSubPage(UserAccount, currItem.getAttribute("data-index"));
        })
    }

    config.mainPage.append(container);
    //return container
}


document.getElementById("register").addEventListener("click", function(){
    createMainPage(initializeUserAccount());
})