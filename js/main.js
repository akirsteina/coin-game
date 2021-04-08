// ClickCoin clicker game.

// 1. Spēles lauki:
// 1.1 Kopējais ClickCoin skaits, kas ir savākts.
// 1.2 Pieejamais ClickCoin skaits, ko var tērēt.
// 1.3. Poga "Click Me", kas palielinās ClickCoin skaitu
// 1.4. Pogas, lai nopirktu 1x un 10x upgrades.
// 1.5. Katram upgrades tipam jāparāda cik tādi jau iegādāti.

// 2. Spēles gaita:
// 2.1. Uzpiežot Click Me pogu, palielinās ClickCoin skaits par 1.
// 2.1. Kad ir savākti vismaz 10 ClickCoin, tad var nopirkt pirmo upgrade(1x). 
// Sākotnēji tas maksā 10 ClickCoin, bet ar katru nopirkšanas reizi cena palielinās par 10%.
// 2.3. Kad ir savākti vismaz 90 ClickCoin, tad var nopirkt otro upgrade (10x). 
// Cena paceļās tā pat kā 1x Upgrade.
// 2.4. 1x Upgrade dod 1 ClickCoin katru sekundi. 10x upgrade dod 10 koinus katru sekundi
// 2.5. Ja nepietiek ClickCoin, lai nopirktu kādu upgrade, bogai ir jābūt deaktivizētai (disabled)


let coinsAvailable = document.getElementById('coins-available').innerHTML;
let coinsSpent = 0;
let totalCoins = document.getElementById('total-coins').innerHTML;
let singleUpgradePrice = parseInt(document.getElementById('single-upgrade-price').innerHTML);
let singleUpgradeCount = parseInt(document.getElementById('single-upgrade-count').innerHTML);
let tenUpgradesPrice = parseInt(document.getElementById('ten-upgrades-price').innerHTML);
let tenUpgradesCount = parseInt(document.getElementById('ten-upgrades-count').innerHTML);
let coinsPerSecond = parseInt(document.getElementById('coins-per-second').innerHTML);
let interval = 0;
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// 1x upgrade
document.getElementById('buy-single-upgrade-btn').addEventListener('click', function() {
    if (coinsAvailable >= singleUpgradePrice) {
        clearInterval(interval);
        singleUpgradeCount++;
        document.getElementById('single-upgrade-count').innerHTML = singleUpgradeCount;
        calculateCoinsAvailable(singleUpgradePrice);
        singleUpgradePrice = updatePrice(singleUpgradePrice);
        document.getElementById('single-upgrade-price').innerHTML = singleUpgradePrice;
        let coinsNow = countcoinsPerSecond(singleUpgradeCount, tenUpgradesCount);
        interval = setInterval(function() { addCoins(coinsNow); }, 1000);
    }
});

// 10x upgrade
document.getElementById('buy-10-upgrades-btn').addEventListener('click', function() {
    if (coinsAvailable >= tenUpgradesPrice) {
        clearInterval(interval);
        tenUpgradesCount++;
        document.getElementById('ten-upgrades-count').innerHTML = tenUpgradesCount;
        calculateCoinsAvailable(tenUpgradesPrice);
        tenUpgradesPrice = updatePrice(tenUpgradesPrice);
        document.getElementById('ten-upgrades-price').innerHTML = tenUpgradesPrice;
        let coinsNow = countcoinsPerSecond(singleUpgradeCount, tenUpgradesCount);
        interval = setInterval(function() { addCoins(coinsNow); }, 1000);
    }
});

// adds coins
function addCoins(coins) {
    totalCoins += coins;
    document.getElementById('total-coins').innerHTML = totalCoins;
    coinsAvailable += coins;
    document.getElementById('coins-available').innerHTML = coinsAvailable;
    areTenUpgradesAffordable();
    isSingleUpgradeAffordable();
}

// calculates, how much coins per second are earned
function countcoinsPerSecond(single, ten) {
    coinsPerSecond = single + ten * 10;
    document.getElementById('coins-per-second').innerHTML = coinsPerSecond;
    document.getElementById('coins-available').innerHTML = coinsAvailable;
    return coinsPerSecond;
}

// function that returns coins spent
function calculateCoinsAvailable(coins) {
    coinsSpent = coins;
    coinsAvailable = coinsAvailable - coinsSpent;
    document.getElementById('coins-available').innerHTML = coinsAvailable;
}

// increase the coin price by 10%
function updatePrice(price) {
    return Math.round(price + (price * 0.1));
}

// checks if there are enough coins to buy a single upgrade
function isSingleUpgradeAffordable() {
    if (coinsAvailable >= singleUpgradePrice) {
        document.getElementById('buy-single-upgrade-btn').removeAttribute("disabled");
    } else {
        document.getElementById('buy-single-upgrade-btn').setAttribute("disabled", "disabled");
    }
}

// checks if there are enough coins to buy 10 upgrades
function areTenUpgradesAffordable() {
    if (coinsAvailable >= tenUpgradesPrice) {
        document.getElementById('buy-10-upgrades-btn').removeAttribute("disabled");
    } else {
        document.getElementById('buy-10-upgrades-btn').setAttribute("disabled", "disabled");
    }
}

// buy a single coin by clicking the button
document.getElementById('coin-clicker-btn').addEventListener('click', function() {
    totalCoins++;
    document.getElementById('total-coins').innerHTML = totalCoins;
    coinsAvailable++;
    document.getElementById('coins-available').innerHTML = coinsAvailable;
    isSingleUpgradeAffordable();
    areTenUpgradesAffordable();
});