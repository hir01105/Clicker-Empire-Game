const config = {
    initialPage: document.getElementById("initialPage"),
    mainPage: document.getElementById("mainPage"),
}

//global valiable for timer
let oneSecondTimer;

//General functions
function startTimer(account){
    oneSecondTimer = setInterval(function(){
                        account.oneSecondPassed();
                        let userInfoArray = document.querySelectorAll(".userInfo");
                        userInfoArray[1].innerHTML = account.age + " years old";
                        userInfoArray[2].innerHTML = account.day + " days";
                        userInfoArray[3].innerHTML = "¥" + account.money.toLocaleString();
                    },1000);
}

function stopTimer(){
    clearInterval(oneSecondTimer);
}

function displayNone(ele){
    ele.classList.remove("d-block");
    ele.classList.add("d-none");
}

function displayBlock(ele){
    ele.classList.remove("d-none");
    ele.classList.add("d-block");
}

//class
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
            profitStr = "¥" + (this.profit).toLocaleString() + " /click";
        }else if(this.type == "investment"){
            profitStr = "¥" + this.profit + "% /sec";
        }else{
            profitStr = "¥" + (this.profit).toLocaleString() + " /sec";
        }
        return profitStr;
    }

    updateEtfPrice(){
        this.price = Math.floor(this.price * 1.1);
        return this.price;
    }

    updateEtfProfitPerSec(){
        this.profitPerSec = Math.floor(this.totalValue * (this.profit / 100));  
    }

    updateTotalValue(num){
        this.totalValue += this.price * num;
    }
    
    increaseItem(num){
        let isAbility = false;
        this.number += num;
        if(this.max != null){
            this.max -= num;
        }
        this.updateTotalValue(num);
        if (this.type == "investment"){
            this.updateEtfProfitPerSec();
            if(this.name == "ETF Stock"){
                this.updateEtfPrice();
            }
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
            this.oneClick += targetItem.profit * number;
        }
        this.money -= targetItem.price * number;
        this.updateProfitPerSec();
    }

    oneSecondPassed(){
        this.money += this.profitPerSec;
        this.day += 1;
        let yearsPassed = Math.floor(this.day / 365);
        const initialAge = 20;
        this.age =  initialAge + yearsPassed;
    }

    getUserData(){
        let dataArray = 
        
        {
            age: this.age,
            day: this.day,
            money: this.money,
            oneClick: this.oneClick,
            burger: this.burger,
            items: this.items,
            profitPerSec: this.profitPerSec
        };
        
        return dataArray;
    }
}


const defaultItems = [
    {
        name: "Flip machine",
        type: "ability",
        max: 500,
        price: 15000,
        profit: 25,
        profitPerSec:0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/823/823215.png"
    },
    {
        name: "ETF Stock",
        type: "investment",
        max: null,
        price: 300000,
        profit: 0.1,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/4256/4256863.png"
    },
    {
        name: "ETF Bonds",
        type: "investment",
        max: null,
        price: 300000,
        profit: 0.07,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/4256/4256863.png"
    },
    {
        name: "Lemonade Stand",
        type: "real estate",
        max: 1000,
        price: 30000,
        profit: 30,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/941/941769.png"
    },
    {
        name: "Ice Cream Truck",
        type: "real estate",
        max: 500,
        price: 100000,
        profit: 120,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/532/532832.png"
    },
    {
        name: "House",
        type: "real estate",
        max: 100,
        price: 20000000,
        profit: 32000,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/619/619153.png"
    },
    {
        name: "Townhouse",
        type: "real estate",
        max: 100,
        price: 40000000,
        profit: 64000,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1364/1364596.png"
    },
    {
        name: "Mansion",
        type: "real estate",
        max: 20,
        price: 250000000,
        profit: 500000,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/1676/1676180.png"
    },
    {
        name: "Industrial Space",
        type: "real estate",
        max: 10,
        price: 1000000000,
        profit: 2200000,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/3618/3618747.png"
    },
    {
        name: "Hotel Skyscraper",
        type: "real estate",
        max: 5,
        price: 10000000000,
        profit: 25000000,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2855/2855426.png"
    },
    {
        name: "Bullet-Speed Sky Railway",
        type: "real estate",
        max: 1,
        price: 10000000000000,
        profit: 30000000000,
        profitPerSec: 0,
        number: 0,
        totalValue: 0,
        imageUrl: "https://cdn-icons-png.flaticon.com/512/2159/2159692.png"
    }
]



//create HTML functions
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
        <p id="userOneClick">one click ¥${UserAccount.oneClick.toLocaleString()}</p>
    </div>
    <div class="p-2 pt-sm-5 d-flex justify-content-center">
        <img src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" class="img-fit hover burger">
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

    //set button function for Burger icon
    let burgerImage = leftSide.querySelectorAll(".burger")[0];
    burgerImage.addEventListener("click", function(){
        UserAccount.clickBurger();
        updateUserMoney(UserAccount);
        updateBurger(UserAccount);
    })

    //set event for item selections
    let itemBoxes = whiteBoxContainer.querySelectorAll(".item");
    for(let i=0;i < itemBoxes.length;i++){
        let currItem = itemBoxes[i];
        currItem.addEventListener("click", function() {
            createSubPage(UserAccount, currItem.getAttribute("data-index"));
        })
    }

    //set button function reset & save
    let resetBtn = rightside.querySelectorAll(".reset-btn")[0];
    resetBtn.addEventListener("click", function(){
        const result = window.confirm("Reset All Data?");
        if(result){
            stopTimer();
            let name = UserAccount.name;
            if(localStorage.getItem(name) != null){
                localStorage.removeItem(name);
            }
            config.mainPage.innerHTML = "";
            let newAccount = initializeUserAccount(name);
            createMainPage(newAccount);
            startTimer(newAccount);
        }
    })
    
    let saveBtn = rightside.querySelectorAll(".save-btn")[0];
    saveBtn.addEventListener("click", function(){
        stopTimer();
        const saveData = JSON.stringify(UserAccount.getUserData());
        localStorage.setItem(UserAccount.name, saveData);
        alert("Saved your data. Please put the same name when you login.");
        displayNone(config.mainPage);
        config.mainPage.innerHTML = "";
        let inputForm = document.querySelectorAll(".name-input")[0];
        inputForm.value = "";
        displayBlock(config.initialPage);
    })

    config.mainPage.append(container);
    //return container
}

function createSubPage(UserAccount, value){
    let itemList = document.getElementById("selectItem");
    displayNone(itemList);
    let subPage = document.createElement("div");
    let intValue = parseInt(value);
    let targetItem = UserAccount.items[intValue];
    let maxPurchaseStr = targetItem.max;
    if(maxPurchaseStr === null){
        maxPurchaseStr = "∞";
    }
    let htmlString = 
    `
    <div class="bg-pink p-2 m-sm-1 m-xs-2 text-white">
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h4>${targetItem.name}</h4>
                <p>Max purchases: ${maxPurchaseStr}</p>
                <p>Price: ¥${targetItem.price.toLocaleString()}</p>
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
        totalView.innerHTML = "total: ¥" + total.toLocaleString();
    })

    let backBtn = subPage.querySelectorAll(".back-btn")[0];
    backBtn.addEventListener("click", function(){
        createMainPage(UserAccount);
    })

    let purchaseBtn = subPage.querySelectorAll(".purchase-btn")[0];
    purchaseBtn.addEventListener("click", function(){
        
        if(inputForm.value == "" || parseInt(inputForm.value) <= 0){
            createMainPage(UserAccount);
        }else if(UserAccount.money < (parseInt(inputForm.value) * targetItem.price)){
            alert("You don't have enough money.");
            createMainPage(UserAccount);
        }else if(targetItem.max != null && targetItem.max < parseInt(inputForm.value)){
            alert("You cannot buy anymore.")
            createMainPage(UserAccount);
        }else{ 
            UserAccount.buyItem(intValue, parseInt(inputForm.value));
            createMainPage(UserAccount);
        }
    })

    document.querySelectorAll(".item-box")[0].append(subPage);
}

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
                    <p>¥${(currItem.price).toLocaleString()}</p>
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
                element = "¥" + (UserAccount.money).toLocaleString();
                eleClassName = "userMoney";
        }
        htmlString += 
        `
        <div class="col-12 col-sm-6 p-1">
            <div class="bg-pink text-center text-white p-2">
                <h6 class="userInfo" id=${eleClassName}>${element}</h6>
            </div>
        </div>
        `;
    }
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
    <div class="border p-2 m-2 reset-btn">
        <i class="fas fa-undo fa-2x text-blue"></i>
    </div>
    <div class="border p-2 m-2 save-btn">
        <i class="fas fa-save fa-2x text-blue"></i>
    </div>
    `;
    return container;
}

//Update UI functions
function updateUserMoney(UserAccount){
    let userMoney = document.getElementById("userMoney");
    userMoney.innerHTML = "¥" + UserAccount.money.toLocaleString();
}

function updateBurger(UserAccount){
    let userBurger = document.getElementById("userBurger");
    userBurger.innerHTML = UserAccount.burger.toLocaleString() + " Burgers";
}

//create UserAccount
function initializeUserAccount(name){
    let itemList = [];
    for(let i=0;i < defaultItems.length; i++){
        let currItem = defaultItems[i];
        let itemObj = new Item(currItem.name, currItem.type, currItem.max, currItem.price, currItem.profit, currItem.profitPerSec, currItem.totalValue, currItem.number, currItem.imageUrl);
        itemList.push(itemObj);
    }
    let account = new UserAccount(name, 20, 0, 50000, 25, 0, itemList, 0);
    //For testing
    //if(name.indexOf("test") != -1){
    //    account = new UserAccount(name, 20, 0, 100000000000, 25, 0, itemList, 0);
    //}
    return account;
}


//New button on the initail page
document.getElementById("register").addEventListener("click", function(){
    const userName = document.querySelectorAll(".name-input")[0].value;
    if(userName == ""){
        alert("Please put your name");
    }else{
        let account = initializeUserAccount(userName);
        createMainPage(account);
        //startTimer
        startTimer(account);
    }
    //event.preventDefault();
})

//Login button on the initial page
document.getElementById("login").addEventListener("click", function(){
    const userName = document.querySelectorAll(".name-input")[0].value;
    if(userName == ""){
        alert("Please put your name");
    }else if(localStorage.getItem(userName) === null){
        alert("There is no data.");
    }else{
        let userInfo = JSON.parse(localStorage.getItem(userName));
        let itemList = [];
        for(let i=0;i < userInfo.items.length;i++){
            let currItem = userInfo.items[i];
            let itemObj = new Item(currItem.name, currItem.type, currItem.max, currItem.price, currItem.profit, currItem.profitPerSec, currItem.totalValue, currItem.number, currItem.imageUrl);
            itemList.push(itemObj);
        }
        let account = new UserAccount(userName, userInfo.age, userInfo.day, userInfo.money, userInfo.oneClick, userInfo.burger, itemList, userInfo.profitPerSec);
        createMainPage(account);
        //startTimer
        startTimer(account);

    }
})


//Basic Design of HTML <body> tag for reference 
/*
<body>
        <div class="bg-special">
            <div id="initialPage" class="d-none">
                <div class="vh-100 d-flex justify-content-center align-items-center">
                    <div class="box-tab text-center p-4">
                        <h3>Clicker Empire Game</h3>
                        <form class="py-3 form" id="name-form">
                            <input class="col-12" type="text" placeholder="Your Name">
                        </form>
                        <div class="d-flex justify-content-between">
                            <div class="col-6 pl-0">
                                <button type="submit" class="btn-blue col-12">New</button>
                            </div>
                            <div class="col-6 pr-0">
                                <button type="submit" class="btn-pink col-12">Login</button>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
            <div id="mainPage" class="d-block">
                <div class="vh-100 d-flex justify-content-center">
                    <div class="main-tab pt-2 pl-2 pr-2 pb-3 col-12 col-md-11 col-lg-10 d-flex flex-wrap">
                        <div class="col-12 col-sm-4 mb-3 mb-sm-0 white-box p-2 box-height">
                            
                                <div class="bg-pink pt-1 text-white text-center">
                                    <h6>0 Burger</h6>
                                    <p>one click ¥25</p>
                                </div>
                                <div class="p-2 pt-sm-5 d-flex justify-content-center">
                                    <img src="https://cdn-icons.flaticon.com/png/512/1811/premium/1811974.png?token=exp=1634361657~hmac=702ef0ac8c4f857ea597b2919beddb68" class="img-fit hover">
                                </div>
                            
                        </div>
                        <div class="col-12 col-sm-8 h-100 rightPage">
                            <div class="p-2 white-box">
                                <div class="d-flex flex-wrap p-1">
                                    <div class="col-12 col-sm-6 p-1">
                                        <div class="bg-pink text-center text-white p-2">
                                            <h6>HY</h6>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 p-1">
                                        <div class="bg-pink text-center text-white p-2">
                                            <h6>24 years old</h6>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 p-1">
                                        <div class="bg-pink text-center text-white p-2">
                                            <h6>365 days</h6>
                                        </div>
                                    </div>
                                    <div class="col-12 col-sm-6 p-1">
                                        <div class="bg-pink text-center text-white p-2">
                                            <h6>¥100</h6>
                                        </div>
                                    </div>
                            
                                </div>
                            </div>
                            <div class="white-box mt-2 p-1 overflow-auto flowHeight">
                                
                                <div class="d-none">
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons.flaticon.com/png/512/2454/premium/2454610.png?token=exp=1634399906~hmac=ccc2d1365b466253e5177924d16ef1de" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Flip machine</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥150000</p>
                                                <p class="text-purple">¥25 /click</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons-png.flaticon.com/512/4256/4256863.png" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>ETF Stock</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons-png.flaticon.com/512/4256/4256863.png" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>ETF Bonds</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons-png.flaticon.com/512/941/941769.png" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Lemodnade Stand</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons.flaticon.com/png/512/2514/premium/2514823.png?token=exp=1634402318~hmac=4faf473104bb2b54ba95e3437f619f6e" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Ice Cream Truck</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons.flaticon.com/png/512/3256/premium/3256216.png?token=exp=1634402721~hmac=91b683630ddfe1211c0b7ac79fdcb521" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Ice Cream Truck</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons-png.flaticon.com/512/619/619153.png" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Ice Cream Truck</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons.flaticon.com/png/512/2605/premium/2605035.png?token=exp=1634402839~hmac=8e2f53ed298c61360c22acc82f86820f" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Ice Cream Truck</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons-png.flaticon.com/512/1676/1676180.png" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Ice Cream Truck</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons.flaticon.com/png/512/3009/premium/3009489.png?token=exp=1634402545~hmac=a54279a637bb6042644f59a1ce39bfd0" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Ice Cream Truck</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="bg-pink text-white d-sm-flex align-items-center m-1 item">
                                        <div class="d-none d-sm-block p-1 col-sm-3">
                                            <img src="https://cdn-icons.flaticon.com/png/512/2074/premium/2074306.png?token=exp=1634402443~hmac=aef92bddf28392e583d8868cf7520262" class="smallImg-fit">
                                        </div>
                                        <div class="col-sm-9">
                                            <div class="d-flex justify-content-between">
                                                <h5>Bullet-Speed Sky Railway</h5>
                                                <h5>0</h5>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <p>¥300000</p>
                                                <p class="text-purple">¥0.1 /sec</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="">
                                    <div class="bg-pink p-2 m-sm-1 m-xs-2 text-white">
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h4>Flip machine</h4>
                                                <p>Max purchases: 500</p>
                                                <p>Price: ¥15000</p>
                                                <p>Get ¥25 /click</p>
                                            </div>
                                            <div>
                                                <img src="https://cdn-icons.flaticon.com/png/512/2454/premium/2454610.png?token=exp=1634399906~hmac=ccc2d1365b466253e5177924d16ef1de" class="middleImg-fit">
                                            </div>
                                        </div>
                                        <p>How many would you like to buy?</p>
                                        <input placeholder="0" type="number" class="col-12 form-control">
                                        <p class="text-right">total: ¥0</p>
                                        <div class="d-flex justify-content-between pb-3">
                                            <button class="btn-blue col-5">Go Back</button>
                                            <button class="btn-pink col-5">Purchase</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                            <div class="d-flex justify-content-end mt-2">
                                <div class="border p-2 m-2">
                                    <i class="fas fa-undo fa-2x text-blue"></i>
                                </div>
                                <div class="border p-2 m-2">
                                    <i class="fas fa-save fa-2x text-blue"></i>
                                </div>
                            </div>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    </body>
*/