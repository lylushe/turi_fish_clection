const mizu1 = new Audio("assets/sounds/mizu1.mp3");
const mizu2 = new Audio("assets/sounds/mizu2.mp3");
const mizu3 = new Audio("assets/sounds/mizu3.mp3");
const sellSound = new Audio("assets/sounds/sell.mp3");
const fishingSound = new Audio("assets/sounds/fishing.mp3");
const click1 = new Audio("assets/sounds/click1.mp3");
const click2 = new Audio("assets/sounds/click2.mp3");
const cardSound = new Audio("assets/sounds/card.mp3");
const favoriteSound = new Audio("assets/sounds/favorite.mp3");
const notFavoriteSound = new Audio("assets/sounds/not_favorite.mp3");
const levelUpSound = new Audio("assets/sounds/levelup.mp3");
const getSound = new Audio("assets/sounds/get.mp3");
const openSound = new Audio("assets/sounds/open.mp3");
const bgm = new Audio("assets/sounds/bgm.mp3");


bgm.loop = true;

document.addEventListener(
    "click",
    () => {
        applyBgmVolume();

        bgm.play().catch(error => {
            console.warn(
                "BGMを再生できませんでした。",
                error
            );
        });
    },
    { once: true }
);

const MAX_LEVEL = 500;

const FISH_EXP = {
    common: 1,
    rare: 3,
    epic: 5,
    ultra: 20,
    supreme: 50,
    legendary: 80,
    mythic: 150
};
function isNextEpicGuaranteedBox() {
    const totalFishCount =
        Number(SAVE_DATA.totalFishCount) || 0;

    const nextCount = totalFishCount + 1;

    return nextCount % 100 === 0;
}


/*
 * 管理者コード
 *
 * code:
 * 入力するコード
 *
 * type:
 * money = お金
 * exp   = 経験値
 */
const GIFT_CODES = {
    "074661": {
        type: "exp",
        amount: 100,
        message: "100XPを受け取りました！"
    },

    "253091": {
        type: "money",
        amount: 2000,
        message: "2000Gを受け取りました！"
    },
    "882904": {
        type: "money",
        amount: 5000,
        message: "5000Gを受け取りました！"
    },

    "447821": {
        type: "normalEgg",
        amount: 1,
        message: "魚卵を受け取りました！"
    },

    "777781": {
        type: "normalEgg",
        amount: 1,
        message: "魚卵を受け取りました！"
    },

    "052199": {
        type: "normalEgg",
        amount: 1,
        message: "魚卵を受け取りました！"
    },
    "334953": {
        type: "superEgg",
        amount: 1,
        message: "スーパー魚卵を受け取りました！"
    },
    "018237": {
        type: "superEgg",
        amount: 1,
        message: "スーパー魚卵を受け取りました！"
    }
};

const BAIT_PRICE = 2000;
const STORAGE_EXPANSION_PRICE = 25000;
const SUPER_EGG_PRICE = 100000;

const AUTO_MINING_PRICES = [
    25000,
    75000,
    150000,
    500000,
    1000000
];

const AUTO_MINING_REWARDS = [
    0,
    2,
    10,
    25,
    50,
    90
];
const TROPHY_ITEMS = [
    {
        id: "bronze-fish",
        name: "銅の魚トロフィー",
        image: "assets/trophies/001.png",
        price: 50000,
    },
    {
        id: "gold-fish",
        name: "黄金の魚トロフィー",
        image: "assets/trophies/002.png",
        price: 100000,
    },
    {
        id: "crown-fish",
        name: "海王のトロフィー",
        image: "assets/trophies/fish-003.png",
        price: 300000,
    }
];

function addGiftEggsToStorage(
    eggType,
    amount
) {
    const requestedAmount =
        Math.max(
            1,
            Math.floor(
                Number(amount) || 1
            )
        );

    const storageLimit =
        getStorageLimit();

    const currentStorageCount =
        SAVE_DATA.storage.length;

    const emptySlots =
        Math.max(
            0,
            storageLimit -
                currentStorageCount
        );

    if (
    emptySlots <
    requestedAmount
) {
    showGiftCodeMessage(
        `保管所に${requestedAmount}枠の空きが必要です。`,
        "error"
    );

    return false;
}
        

    const receiveAmount =
    requestedAmount;

    for (
        let index = 0;
        index < receiveAmount;
        index += 1
    ) {
        if (eggType === "super") {
            SAVE_DATA.storage.push(
                createSuperFishEgg()
            );
        } else {
            SAVE_DATA.storage.push(
                createFishEgg()
            );
        }
    }

    saveGame();
    updateStatus();
    renderStorage();
    checkAchievements();

    return true;
}

const RAVEN_PHOENIX_CHANCE = 0.05;

const giftCodeInput =
    document.getElementById("giftCodeInput");

const useGiftCodeButton =
    document.getElementById("useGiftCodeButton");

const giftCodeMessage =
    document.getElementById("giftCodeMessage");

const storeMessage =
    document.getElementById("storeMessage");

const baitCountText =
    document.getElementById("baitCountText");

const baitPriceText =
    document.getElementById("baitPriceText");

const buyBaitButton =
    document.getElementById("buyBaitButton");

const toggleBaitButton =
    document.getElementById("toggleBaitButton");

const superEggPriceText =
    document.getElementById("superEggPriceText");

const buySuperEggButton =
    document.getElementById("buySuperEggButton");

const autoMiningLevelText =
    document.getElementById("autoMiningLevelText");

const autoMiningEffectText =
    document.getElementById("autoMiningEffectText");

const autoMiningPriceText =
    document.getElementById("autoMiningPriceText");

const buyAutoMiningButton =
    document.getElementById("buyAutoMiningButton");


const trophyStoreList =
    document.getElementById("trophyStoreList");

const screens = [...document.querySelectorAll(".screen")];

const casinoScreen =
    document.getElementById("casinoScreen");

const crashScreen =
    document.getElementById("crashScreen");

const openCasinoButton =
    document.getElementById("openCasino");

const openCrashGameButton =
    document.getElementById("openCrashGame");

const backToCasinoButton =
    document.getElementById("backToCasino");

const achievementsScreen =
    document.getElementById(
        "achievementsScreen"
    );

const openAchievementsButton =
    document.getElementById(
        "openAchievements"
    );

const backToSettingsButton =
    document.getElementById(
        "backToSettings"
    );

const achievementList =
    document.getElementById(
        "achievementList"
    );

const achievementTotalCount =
    document.getElementById(
        "achievementTotalCount"
    );

const achievementProgressText =
    document.getElementById(
        "achievementProgressText"
    );


const home = document.getElementById("homeScreen");
const gacha = document.getElementById("gachaScreen");
const result = document.getElementById("resultScreen");
const storageScreen = document.getElementById("storageScreen");
const encyclopediaScreen = document.getElementById("encyclopediaScreen");
const settingsScreen = document.getElementById("settingsScreen");

const singleButton = document.getElementById("single");
const boxButton = document.getElementById("box");
const keepFishButton = document.getElementById("keepFish");
const resultFish = document.getElementById("resultFish");
const resultMessage = document.getElementById("resultMessage");
const storageList = document.getElementById("storageList");
const encyclopediaList =
    document.getElementById("encyclopediaList");

const encyclopediaTotalCount =
    document.getElementById("encyclopediaTotalCount");

const storeScreen =
    document.getElementById("storeScreen");



let currentFish = null;
let currentFishSize = 0;

/* 今準備しているBOXがEpic以上確定か */
let currentBoxIsEpicGuaranteed = false;

let currentFishIsNewRecord = false;
let resultHandled = false;
let canCloseResult = false;
let resultWaitTimer = null;
const hatchingEggIds = new Set();

SAVE_DATA.storage.forEach(item => {
    if (!item.type) {
        item.type = "fish";
    }

    item.favorite ??= false;
    item.partner ??= false;
});

SAVE_DATA.baitCount =
    Math.max(
        0,
        Math.floor(
            Number(SAVE_DATA.baitCount) || 0
        )
    );

SAVE_DATA.baitEnabled =
    SAVE_DATA.baitEnabled === true &&
    SAVE_DATA.baitCount > 0;

SAVE_DATA.storageExpansionPurchased =
    SAVE_DATA.storageExpansionPurchased === true;

SAVE_DATA.autoMiningLevel =
    Math.min(
        5,
        Math.max(
            0,
            Math.floor(
                Number(SAVE_DATA.autoMiningLevel) || 0
            )
        )
    );

if (!Array.isArray(SAVE_DATA.unlockedAchievements)) {
    SAVE_DATA.unlockedAchievements = [];
}

SAVE_DATA.totalMoneyEarned = Math.max(
    0,
    Number(SAVE_DATA.totalMoneyEarned) || 0
);
SAVE_DATA.bestCrashProfit = Math.max(
    0,
    Number(SAVE_DATA.bestCrashProfit) || 0
);
SAVE_DATA.worstCrashLoss = Math.max(
    0,
    Number(SAVE_DATA.worstCrashLoss) || 0
);
SAVE_DATA.highestCrashMultiplier = Math.max(
    0,
    Number(SAVE_DATA.highestCrashMultiplier) || 0
);
SAVE_DATA.soldSupremeOrHigher =
    SAVE_DATA.soldSupremeOrHigher === true;

SAVE_DATA.normalEggsHatched =
    Math.max(
        0,
        Math.floor(
            Number(SAVE_DATA.normalEggsHatched) || 0
        )
    );

SAVE_DATA.superEggsHatched =
    Math.max(
        0,
        Math.floor(
            Number(SAVE_DATA.superEggsHatched) || 0
        )
    );

SAVE_DATA.soldEgg =
    SAVE_DATA.soldEgg === true;

SAVE_DATA.usedBaitForFishing =
    SAVE_DATA.usedBaitForFishing === true;

if (!Array.isArray(SAVE_DATA.ownedTrophies)) {
    SAVE_DATA.ownedTrophies = [];
}

SAVE_DATA.ownedTrophies =
    [...new Set(
        SAVE_DATA.ownedTrophies.map(String)
    )];

if (
    SAVE_DATA.equippedTrophy !== null &&
    !SAVE_DATA.ownedTrophies.includes(
        String(SAVE_DATA.equippedTrophy)
    )
) {
    SAVE_DATA.equippedTrophy = null;
}



function applyVolume() {
    const volume =
        typeof SAVE_DATA.volume === "number"
            ? Math.max(0, Math.min(1, SAVE_DATA.volume))
            : 0.4;

    SAVE_DATA.volume = volume;

    [
    mizu1,
    mizu2,
    mizu3,
    sellSound,
    fishingSound,
    click1,
    click2,
    cardSound,
    favoriteSound,
    notFavoriteSound,
    levelUpSound,
    getSound,
    openSound
    ].forEach(sound => {
        sound.volume = volume;
    });
}

function applyBgmVolume() {
    const bgmVolume =
        typeof SAVE_DATA.bgmVolume === "number"
            ? Math.max(
                0,
                Math.min(1, SAVE_DATA.bgmVolume)
            )
            : 0.5;

    SAVE_DATA.bgmVolume = bgmVolume;
    bgm.volume = bgmVolume;
}

function show(screen) {
    screens.forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");

    updateTrophyScreenVisibility(screen);
}

function updateTrophyScreenVisibility(screen) {
    const layer =
        document.getElementById(
            "trophyDisplayLayer"
        );

    if (!layer) {
        return;
    }

    const trophyAllowedScreens = [
        home,
        gacha,
        result
    ];

    const shouldDisplay =
        trophyAllowedScreens.includes(screen) &&
        SAVE_DATA.equippedTrophy !== null &&
        ownsTrophy(SAVE_DATA.equippedTrophy);

    layer.classList.toggle(
        "screenVisible",
        shouldDisplay
    );
}

function getRequiredExp(level) {
    if (level >= MAX_LEVEL) {
        return 0;
    }

    return Math.floor(20 + 15 * level + 5 * level * level);
}

function getFishExp(rarity) {
    return FISH_EXP[rarity] || 0;
}
function getBestSize(id) {
    return Number(SAVE_DATA.bestSizes?.[id]) || 0;
}

function updateBestSize(fish) {
    const size = Number(fish?.size) || 0;
    const oldBest = getBestSize(fish?.id);

    if (size > oldBest) {
        SAVE_DATA.bestSizes[fish.id] = size;
        return true;
    }

    return false;
}

function updateStatus() {
    const levelText = document.getElementById("levelText");
    const expText = document.getElementById("expText");
    const expBar = document.getElementById("exp");
    const moneyText = document.getElementById("money");

    levelText.textContent = `Lv.${SAVE_DATA.level}`;
    moneyText.textContent = SAVE_DATA.money.toLocaleString("ja-JP");

    if (SAVE_DATA.level >= MAX_LEVEL) {
        expText.textContent = "MAX！";
        expBar.style.width = "100%";
        return;
    }

    const requiredExp = getRequiredExp(SAVE_DATA.level);

    expText.textContent =
        `${SAVE_DATA.exp.toLocaleString("ja-JP")} / ` +
        requiredExp.toLocaleString("ja-JP");

    const percentage = Math.min(
        100,
        (SAVE_DATA.exp / requiredExp) * 100
    );

    expBar.style.width = `${percentage}%`;
}
function updatePlayStats() {
    const totalFishCountText =
        document.getElementById("totalFishCountText");

    const nextEpicBoxText =
        document.getElementById("nextEpicBoxText");

    const totalFishCount =
        Math.max(
            0,
            Math.floor(Number(SAVE_DATA.totalFishCount) || 0)
        );

    if (totalFishCountText) {
        totalFishCountText.textContent =
            `${totalFishCount.toLocaleString("ja-JP")}匹`;
    }

    if (nextEpicBoxText) {
        const remainder = totalFishCount % 100;

        const remaining =
            remainder === 0
                ? 100
                : 100 - remainder;

        nextEpicBoxText.textContent =
            `${remaining}回`;
    }
}

function showExpPopup(amount) {
    const popupArea = document.getElementById("expPopupArea");

    if (!popupArea) {
        return;
    }

    const popup = document.createElement("span");
    const randomX = Math.floor(Math.random() * 61) - 30;
    const randomY = Math.floor(Math.random() * 11) - 5;

    popup.className = "expPopup";
    popup.textContent = `+${amount} XP`;
    popup.style.setProperty("--random-x", `${randomX}px`);
    popup.style.setProperty("--random-y", `${randomY}px`);

    popupArea.appendChild(popup);

    popup.addEventListener("animationend", () => {
        popup.remove();
    });
}


function showMoneyPopup(amount) {
    const value =
        Math.max(
            0,
            Math.floor(Number(amount) || 0)
        );

    if (value <= 0) {
        return;
    }

    const moneyDisplay =
        document.querySelector(".moneyDisplay");

    if (!moneyDisplay) {
        return;
    }

    const popup =
        document.createElement("span");

    const randomX =
        Math.floor(Math.random() * 31) - 15;

    popup.className = "moneyGainPopup";
    popup.textContent =
        `+${value.toLocaleString("ja-JP")}G`;

    popup.style.setProperty(
        "--money-popup-x",
        `${randomX}px`
    );

    moneyDisplay.appendChild(popup);

    popup.addEventListener(
        "animationend",
        () => popup.remove(),
        { once: true }
    );
}

function grantAutoMiningReward() {
    const level =
        Math.min(
            5,
            Math.max(
                0,
                Number(SAVE_DATA.autoMiningLevel) || 0
            )
        );

    const reward =
        Number(AUTO_MINING_REWARDS[level]) || 0;

    if (reward <= 0) {
        return;
    }

    SAVE_DATA.money += reward;
    SAVE_DATA.totalMoneyEarned += reward;

    showMoneyPopup(reward);
    updateStatus();
}

function showLevelUpMessage(level) {
    const oldMessage = document.querySelector(".levelUpPopup");

    if (oldMessage) {
        oldMessage.remove();
    }

    const popup = document.createElement("div");

    popup.className = "levelUpPopup";
    popup.textContent =
        level >= MAX_LEVEL ? "LEVEL MAX！" : `LEVEL UP！ Lv.${level}`;

    document.body.appendChild(popup);

    const removePopup = () => {
        if (popup.isConnected) {
            popup.remove();
        }
    };

    popup.addEventListener(
        "animationend",
        removePopup,
        { once: true }
    );

    // タブが非表示の間にanimationendが発火しない場合の保険
    setTimeout(removePopup, 2000);
}

function addExperience(amount) {
    if (SAVE_DATA.level >= MAX_LEVEL) {
        SAVE_DATA.level = MAX_LEVEL;
        SAVE_DATA.exp = 0;
        saveGame();
        updateStatus();
        return;
    }

    SAVE_DATA.exp += amount;
    showExpPopup(amount);

    let leveledUp = false;

    while (SAVE_DATA.level < MAX_LEVEL) {
        const requiredExp = getRequiredExp(SAVE_DATA.level);

        if (SAVE_DATA.exp < requiredExp) {
            break;
        }

        SAVE_DATA.exp -= requiredExp;
        SAVE_DATA.level += 1;
        leveledUp = true;
    }

    if (SAVE_DATA.level >= MAX_LEVEL) {
        SAVE_DATA.level = MAX_LEVEL;
        SAVE_DATA.exp = 0;
    }

    saveGame();
    updateStatus();

    if (leveledUp) {
        playLevelUpSound();
        showLevelUpMessage(SAVE_DATA.level);
    }
}

function addCatchRecord(fish) {
    if (!SAVE_DATA.ownedFish.includes(fish.id)) {
        SAVE_DATA.ownedFish.push(fish.id);
    }

    SAVE_DATA.caughtCount[fish.id] =
        (SAVE_DATA.caughtCount[fish.id] || 0) + 1;

    saveGame();
    checkAchievements();
}

function getRarityName(rarity) {
    const rarityData = RARITY.find(item => item.key === rarity);

    return rarityData ? rarityData.name : rarity;
}

function isRareOrHigher(rarity) {
    const rarityOrder = [
        "common",
        "rare",
        "epic",
        "ultra",
        "supreme",
        "legendary",
        "mythic"
    ];

    return rarityOrder.indexOf(rarity) >= rarityOrder.indexOf("rare");
}

function showResultMessage(message) {
    resultMessage.textContent = message;
}

function resetAudio(audio) {
    audio.pause();
    audio.currentTime = 0;
}

function playFishSound(rarity) {
    let sound;

    if (rarity === "common" || rarity === "rare" || rarity === "epic") {
        sound = Math.random() < 0.5 ? mizu1 : mizu2;
    } else {
        sound = mizu3;
    }

    resetAudio(sound);

    sound.play().catch(error => {
        console.warn("釣果の効果音を再生できませんでした。", error);
    });
}

function playSellSound() {
    resetAudio(sellSound);

    sellSound.play().catch(error => {
        console.warn("売却音を再生できませんでした。", error);
    });
}
function playFishingSound() {
    resetAudio(fishingSound);

    fishingSound.play().catch(() => {});
}

function playClickSound() {
    const sound =
        Math.random() < 0.5 ? click1 : click2;

    resetAudio(sound);

    sound.play().catch(() => {});
}

function playCardSound() {
    resetAudio(cardSound);
    cardSound.play().catch(() => {});
}

function playFavoriteSound() {
    resetAudio(favoriteSound);
    favoriteSound.play().catch(() => {});
}

function playNotFavoriteSound() {
    resetAudio(notFavoriteSound);
    notFavoriteSound.play().catch(() => {});
}

function playLevelUpSound() {
    resetAudio(levelUpSound);
    levelUpSound.play().catch(() => {});
}

function playGetSound() {
    resetAudio(getSound);
    getSound.play().catch(() => {});
}

function playOpenSound() {
    resetAudio(openSound);
    openSound.play().catch(error => {
        console.warn("魚卵の開封音を再生できませんでした。", error);
    });
}
function generateFishSize(avg){

    const r=Math.random();

    let size;

    if(r<0.7){

        size=avg+(Math.random()-0.5)*avg*0.1;

    }else if(r<0.95){

        size=avg+(Math.random()-0.5)*avg*0.3;

    }else{

        size=avg+(Math.random()-0.5)*avg*0.8;

    }

    return Number(size.toFixed(1));

}

function resetResultScreen() {
    if (resultWaitTimer !== null) {
        clearTimeout(resultWaitTimer);
        resultWaitTimer = null;
    }

    resultHandled = false;
    canCloseResult = false;
    showResultMessage("");
    keepFishButton.disabled = false;
    keepFishButton.textContent = "保管";
}

function returnToHome() {
    currentFish = null;
    resetResultScreen();
    show(home);
}

function renderCurrentFish() {
    if (!currentFish) {
        resultFish.innerHTML = "";
        return;
    }

    if (currentFish.type === "egg") {
        resultFish.innerHTML = `
            <img
                class="fishImage fishAppear"
                src="${currentFish.image}"
                alt="${currentFish.name}"
            >

            <div class="fishName autoFitFishName">
                ${currentFish.name}
            </div>

            <div class="fishInfo eggResultInfo">
                <span class="fishValue">
                    売値：${Number(currentFish.value || 0).toLocaleString("ja-JP")} G
                </span>
            </div>
        `;

        keepFishButton.textContent = "保管";
        scheduleFishNameAutoFit();
        return;
    }

    resultFish.innerHTML = `
        <img
            class="fishImage fishAppear ${currentFish.id === 27 ? "giantFish" : ""}"
            src="${currentFish.image}"
            alt="${currentFish.name}"
        >

        <div class="fishRarity ${currentFish.rarity}">
            ${getRarityName(currentFish.rarity)}
        </div>

        <div class="fishName">
            ${currentFish.name}
        </div>

        <div class="fishInfo">
            <span class="fishSize ${currentFishIsNewRecord ? "newRecord" : ""}">
                ${Number(currentFishSize || currentFish.size || 0).toFixed(1)} cm
            </span>

            <span class="fishSeparator"></span>

            <span class="fishValue">
                売値：${Number(currentFish.value || 0).toLocaleString("ja-JP")} G
            </span>
        </div>
    `;

    scheduleFishNameAutoFit();
}

function startResultCloseWait() {
    canCloseResult = false;

    if (resultWaitTimer !== null) {
        clearTimeout(resultWaitTimer);
        resultWaitTimer = null;
    }

    const rarity =
        String(currentFish?.rarity || "")
            .trim()
            .toLowerCase();

    const waitRarities = [
        "epic",
        "ultra",
        "supreme",
        "legendary",
        "mythic"
    ];

    if (
        currentFish?.type === "egg" ||
        waitRarities.includes(rarity)
    ) {
        resultWaitTimer = setTimeout(() => {
            canCloseResult = true;
            resultWaitTimer = null;
        }, 500);

        return;
    }

    canCloseResult = true;
}

function getPartnerFish() {
    return SAVE_DATA.storage.find(fish => fish.partner === true) || null;
}

function renderPartnerFish() {
    const layer =
        document.getElementById("partnerFishLayer");

    const image =
        document.getElementById("partnerFishImage");

    if (!layer || !image) {
        return;
    }

    const partner = getPartnerFish();

    // いったん完全に非表示にする
    layer.classList.remove("active");
    layer.setAttribute("aria-hidden", "true");

    image.style.display = "none";
    image.removeAttribute("src");
    image.alt = "";

    // 相棒がいない、または画像がない場合はここで終了
    if (!partner || !partner.image) {
        return;
    }

    image.src = partner.image;
    image.classList.toggle(
    "giantPartnerFish",
    partner.id === 27
);
    image.alt = `${partner.name}・相棒`;
    // 毎回ランダムな高さ
const top = 20 + Math.random() * 55;
image.style.top = `${top}%`;

    /*
     * 画像の読み込みに成功したときだけ表示
     */
    image.onload = () => {
        image.style.display = "block";
        layer.classList.add("active");
        layer.setAttribute("aria-hidden", "false");
    };

    /*
     * 画像が見つからない場合も非表示のままにする
     */
    image.onerror = () => {
        image.style.display = "none";
        image.removeAttribute("src");

        layer.classList.remove("active");
        layer.setAttribute("aria-hidden", "true");
    };
}

/*
 * 魚を発見済みか調べる
 */
function isFishDiscovered(fishId) {
    const discoveredByOwnedFish =
        SAVE_DATA.ownedFish.some(id => {
            return Number(id) === Number(fishId);
        });

    const caughtCount =
        Number(SAVE_DATA.caughtCount[fishId]) || 0;

    return discoveredByOwnedFish || caughtCount > 0;
}


/*
 * 魚を釣った回数を取得
 */
function getFishCaughtCount(fishId) {
    return Number(SAVE_DATA.caughtCount[fishId]) || 0;
}


/*
 * fish.jsに登録されている魚の総数を取得
 */
function getAllFishCount() {
    return RARITY.reduce((total, rarityData) => {
        const fishList = FISH[rarityData.key];

        if (!Array.isArray(fishList)) {
            return total;
        }

        return total + fishList.length;
    }, 0);
}


/*
 * 全体の発見数を取得
 */
function getDiscoveredFishCount() {
    return RARITY.reduce((total, rarityData) => {
        const fishList = FISH[rarityData.key];

        if (!Array.isArray(fishList)) {
            return total;
        }

        const discoveredCount =
            fishList.filter(fish => {
                return isFishDiscovered(fish.id);
            }).length;

        return total + discoveredCount;
    }, 0);
}


/*
 * 図鑑を表示
 */
function renderEncyclopedia() {
    if (!encyclopediaList || !encyclopediaTotalCount) {
        return;
    }

    const allFishCount = getAllFishCount();
    const discoveredFishCount =
        getDiscoveredFishCount();

    encyclopediaTotalCount.textContent =
        `発見数 ${discoveredFishCount} / ${allFishCount}`;

    encyclopediaList.innerHTML = RARITY
        .map(rarityData => {
            const rarity = rarityData.key;
            const fishList = FISH[rarity];

            /*
             * このレア度に魚が登録されていない場合は
             * ゾーン自体を表示しない
             */
            if (!Array.isArray(fishList) || fishList.length === 0) {
                return "";
            }

            const rarityDiscoveredCount =
                fishList.filter(fish => {
                    return isFishDiscovered(fish.id);
                }).length;

            /*
             * fishList.map()をそのまま使っているので、
             * fish.jsに書かれている順番で並ぶ
             */
            const fishCards = fishList
                .map(fish => {
                    const discovered =
                        isFishDiscovered(fish.id);

                    const caughtCount =
                        getFishCaughtCount(fish.id);

                    if (!discovered) {
                        return `
                            <article
                        class="encyclopediaCard undiscovered"
                         data-id="${fish.id}"
                          data-rarity="${rarity}">

                                <img
                                    class="encyclopediaFishImage"
                                    src="${fish.image}"
                                    alt="未発見の魚"
                                >

                                <div class="fishRarity ${rarity}">
                                    ${rarityData.name}
                                </div>

                                <h2 class="encyclopediaFishName autoFitFishName">？？？</h2>

                                <p class="encyclopediaValue">
                                    売値：？？？ G
                                </p>

                                <p class="encyclopediaCaughtCount">
                                    釣った数：0匹
                                </p>

                            </article>
                        `;
                    }

                    return `
                        <article
                         class="encyclopediaCard discovered"
                         data-id="${fish.id}"
                         data-rarity="${rarity}">

                            <img
                                class="encyclopediaFishImage"
                                src="${fish.image}"
                                alt="${fish.name}"
                            >

                            <div class="fishRarity ${rarity}">
                                ${rarityData.name}
                            </div>

                            <h2 class="encyclopediaFishName autoFitFishName">${fish.name}</h2>

                            <p class="encyclopediaValue">
                                売値：${fish.value.toLocaleString("ja-JP")} G
                            </p>

                            <p class="encyclopediaCaughtCount">
                                釣った数：${caughtCount.toLocaleString("ja-JP")}匹
                            </p>

                        </article>
                    `;
                })
                .join("");

            return `
                <section class="encyclopediaRarityZone">

                    <div class="encyclopediaRarityHeader">

                        <h2 class="encyclopediaRarityTitle ${rarity}">
                            ${rarityData.name}
                        </h2>

                        <span class="encyclopediaRarityCount">
                            発見数
                            ${rarityDiscoveredCount}
                            /
                            ${fishList.length}
                        </span>

                    </div>

                    <div class="encyclopediaFishGrid">
                        ${fishCards}
                    </div>

                </section>
            `;
        })
        .join("");

    scheduleFishNameAutoFit();
}

const detailOverlay =
    document.getElementById("encyclopediaDetailOverlay");

const closeDetailButton =
    document.getElementById("closeEncyclopediaDetail");

function closeFishDetail() {
    if (!detailOverlay) {
        return;
    }

    detailOverlay.classList.remove("active");
    detailOverlay.setAttribute("aria-hidden", "true");
}

function showFishDetail(fish, rarity) {
    if (!detailOverlay || !fish) {
        return;
    }

    const discovered =
        isFishDiscovered(fish.id);

    const image =
        document.getElementById("detailFishImage");

    const rarityElement =
        document.getElementById("detailFishRarity");

    const nameElement =
        document.getElementById("detailFishName");

    const valueElement =
        document.getElementById("detailFishValue");

    const caughtElement =
        document.getElementById("detailFishCaught");

    const averageSizeElement =
        document.getElementById("detailFishAverageSize");

    const bestSizeElement =
        document.getElementById("detailFishBestSize");

    const triviaElement =
        document.getElementById("detailFishTrivia");

    if (
        !image ||
        !rarityElement ||
        !nameElement ||
        !valueElement ||
        !caughtElement ||
        !averageSizeElement ||
        !bestSizeElement ||
        !triviaElement
    ) {
        console.error("図鑑詳細の要素が見つかりません。");
        return;
    }

    image.src = fish.image || "";
    image.classList.toggle(
        "giantDetailFish",
        Number(fish.id) === 27
    );

    rarityElement.textContent =
        getRarityName(rarity);

    rarityElement.className =
        `fishRarity ${rarity}`;

    if (!discovered) {
        image.alt = "未発見の魚";
        image.style.filter =
            "brightness(0) drop-shadow(0 12px 10px rgba(0, 0, 0, 0.35))";

        nameElement.textContent = "？？？";
        valueElement.textContent = "売値：？？？ G";
        caughtElement.textContent = "釣った数：0匹";
        averageSizeElement.textContent = "平均サイズ：？？？ cm";
        bestSizeElement.textContent = "最大サイズ：？？？ cm";
        triviaElement.textContent =
            "この魚を釣ると情報が解放されます。";
    } else {
        image.alt = fish.name;
        image.style.filter = "";

        nameElement.textContent = fish.name;

        valueElement.textContent =
            `売値：${Number(fish.value || 0).toLocaleString("ja-JP")} G`;

        caughtElement.textContent =
            `釣った数：${getFishCaughtCount(fish.id).toLocaleString("ja-JP")}匹`;

        averageSizeElement.textContent =
            `平均サイズ：${Number(fish.averageSize || 0).toFixed(1)} cm`;

        const bestSize = getBestSize(fish.id);
        bestSizeElement.textContent =
            bestSize > 0
                ? `最大サイズ：${bestSize.toFixed(1)} cm`
                : "最大サイズ：記録なし";

        triviaElement.textContent =
            fish.trivia ||
            fish.description ||
            "トリビアはまだ登録されていません。";
    }

    detailOverlay.classList.add("active");
    detailOverlay.setAttribute("aria-hidden", "false");
}

if (encyclopediaList) {
    encyclopediaList.addEventListener("click", event => {
        const card =
            event.target.closest(".encyclopediaCard");

        if (!card) {
            return;
        }

        const fishId =
            Number(card.dataset.id);

        const rarity =
            card.dataset.rarity;

        if (
            !Number.isFinite(fishId) ||
            !rarity ||
            !Array.isArray(FISH[rarity])
        ) {
            return;
        }

        const fish =
            FISH[rarity].find(item => {
                return Number(item.id) === fishId;
            });

        if (!fish) {
            return;
        }

        playCardSound();
        showFishDetail(fish, rarity);
    });
}

if (closeDetailButton) {
    closeDetailButton.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        playClickSound();
        closeFishDetail();
    });
}

if (detailOverlay) {
    detailOverlay.addEventListener("click", event => {
        if (event.target === detailOverlay) {
            closeFishDetail();
        }
    });
}

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        detailOverlay?.classList.contains("active")
    ) {
        closeFishDetail();
    }
});


/* =========================
   魚名の自動縮小
   保管所・図鑑・釣果画面に共通適用
========================= */

let fishNameFitFrame = null;

function fitTextToSingleLine(
    element,
    maximumFontSize,
    minimumFontSize
) {
    if (!element) {
        return;
    }

    const maxSize =
        Number(maximumFontSize) || 20;

    const minSize =
        Number(minimumFontSize) || 12;

    element.style.fontSize =
        `${maxSize}px`;

    /*
     * 非表示画面は幅が0になることがあるため、
     * 表示されたタイミングで再計算します。
     */
    if (element.clientWidth <= 0) {
        return;
    }

    let fontSize = maxSize;

    while (
        element.scrollWidth >
            element.clientWidth &&
        fontSize > minSize
    ) {
        fontSize -= 0.5;
        element.style.fontSize =
            `${fontSize}px`;
    }
}

function fitAllFishNames() {
    document
        .querySelectorAll(
            ".autoFitFishName"
        )
        .forEach(element => {
            if (
                element.classList.contains(
                    "fishName"
                )
            ) {
                fitTextToSingleLine(
                    element,
                    28,
                    15
                );
                return;
            }

            if (
                element.classList.contains(
                    "encyclopediaFishName"
                )
            ) {
                fitTextToSingleLine(
                    element,
                    21,
                    12
                );
                return;
            }

            fitTextToSingleLine(
                element,
                20,
                12
            );
        });
}

function scheduleFishNameAutoFit() {
    if (fishNameFitFrame !== null) {
        cancelAnimationFrame(
            fishNameFitFrame
        );
    }

    fishNameFitFrame =
        requestAnimationFrame(() => {
            fishNameFitFrame = null;
            fitAllFishNames();
        });
}

window.addEventListener(
    "resize",
    scheduleFishNameAutoFit
);

function renderStorage() {
    const limit = getStorageLimit();

    document.getElementById("storageCount").textContent =
        `${SAVE_DATA.storage.length} / ${limit}枠`;

    if (SAVE_DATA.storage.length === 0) {
        storageList.innerHTML = `
            <p class="emptyMessage">
                まだ魚や魚卵は保管されていません。
            </p>
        `;
        return;
    }

    const currentPartner = getPartnerFish();
    const hasPartner = currentPartner !== null;

    storageList.innerHTML = SAVE_DATA.storage
        .map((item, index) => {
            if (item.type === "egg") {
                const remaining = getEggRemainingTime(item);
                const hatchReady = remaining <= 0;

                return `
                    <article class="storageCard eggStorageCard ${item.eggKind === "super" ? "superEggStorageCard" : ""}" data-egg-id="${item.id}">
                        <img
                            class="storageEggImage"
                            src="${item.image}"
                            alt="${item.name}"
                        >

                        <div
                            class="fishRarity eggRarityPlaceholder"
                            aria-hidden="true"
                        >
                            Common
                        </div>

                        <h2 class="storageFishName autoFitFishName">${item.name}</h2>

                        <p class="eggTimer">
                            ${hatchReady
                                ? "孵化できます！"
                                : `孵化まで ${formatEggRemainingTime(remaining)}`}
                        </p>

                        <p>
                            売値：${Number(item.value || 0).toLocaleString("ja-JP")} G
                        </p>

                        <button
    type="button"
    class="
    eggActionButton
    storageSellButton
    ${hatchReady ? "storageHatchButton" : ""}
"
    data-storage-index="${index}"
>
    ${
        hatchReady
            ? "孵化"
            : "売却"
    }
</button>
                    </article>
                `;
            }

            const fish = item;
            const showPartnerButton =
                fish.favorite && (!hasPartner || fish.partner);

            const favoriteButtonHtml = `
                <button
                    type="button"
                    class="favoriteBtn ${fish.favorite ? "active" : ""}"
                    data-favorite-index="${index}"
                    aria-label="${fish.favorite ? "お気に入りを解除" : "お気に入りに登録"}"
                >
                    ${fish.favorite ? "♥" : "♡"}
                </button>
            `;

            const partnerButtonHtml = showPartnerButton
                ? `
                    <button
                        type="button"
                        class="partnerBtn ${fish.partner ? "active" : ""}"
                        data-partner-index="${index}"
                        aria-label="${fish.partner ? "相棒を解除" : "相棒にする"}"
                    >
                        ${fish.partner ? "★" : "☆"}
                    </button>
                `
                : "";

            const protectedFish = fish.favorite || fish.partner;

            return `
                <article class="storageCard">
                    ${favoriteButtonHtml}
                    ${partnerButtonHtml}

                    <img src="${fish.image}" alt="${fish.name}">

                    <div class="fishRarity ${fish.rarity}">
                        ${getRarityName(fish.rarity)}
                    </div>

                    <h2 class="storageFishName autoFitFishName">
    ${fish.name}
</h2>

                    <p class="storageFishSize">
                        サイズ：${Number(fish.size || 0).toFixed(1)} cm
                    </p>

                    <p>
                        売値：${Number(fish.value || 0).toLocaleString("ja-JP")} G
                    </p>

                    <button
                        class="storageSellButton"
                        data-storage-index="${index}"
                        ${protectedFish ? "disabled" : ""}
                    >
                        ${fish.partner ? "相棒" : fish.favorite ? "お気に入り" : "売却"}
                    </button>
                </article>
            `;
        })
        .join("");

    scheduleFishNameAutoFit();
}


const nameElements =
    document.querySelectorAll(
        "#storageList .storageCard h2"
    );

function showStoreMessage(message, type = "") {
    if (!storeMessage) {
        return;
    }

    storeMessage.textContent = message;
    storeMessage.className =
        `storeMessage ${type}`.trim();

    if (!message) {
        return;
    }

    clearTimeout(showStoreMessage.timer);

    showStoreMessage.timer = setTimeout(() => {
        storeMessage.textContent = "";
        storeMessage.className = "storeMessage";
    }, 2500);
}

function ownsTrophy(trophyId) {
    return SAVE_DATA.ownedTrophies.includes(
        String(trophyId)
    );
}

if (!Array.isArray(SAVE_DATA.ownedTrophies)) {
    SAVE_DATA.ownedTrophies = [];
}
function renderTrophyStore() {
    if (!trophyStoreList) {
        return;
    }

    trophyStoreList.innerHTML = TROPHY_ITEMS.map(trophy => {
        const trophyId = String(trophy.id);
        const owned = ownsTrophy(trophyId);
        const equipped = String(SAVE_DATA.equippedTrophy) === trophyId;

        let buttonText = "購入する";
        let buttonDisabled = false;

        if (equipped) {
            buttonText = "片付ける";
        } else if (owned) {
            buttonText = "設置する";
        } else if (SAVE_DATA.money < trophy.price) {
            buttonDisabled = true;
        }

        return `
            <article class="storeCard trophyStoreCard">
                <div class="trophyStoreIcon">
    ${
        trophy.image
            ? `
                <img
                    src="${trophy.image}"
                    alt="${trophy.name}"
                    class="trophyStoreImage"
                >
            `
            : trophy.icon
    }
</div>
                <div class="storeItemBody">
                    <h3>${trophy.name}</h3>
                    <div class="storePrice">
                        ${owned ? "購入済み" : `💰 ${trophy.price.toLocaleString("ja-JP")} G`}
                    </div>
                    <div class="storeCardActions">
                        <button
                            class="storeBuyButton"
                            type="button"
                            data-trophy-id="${trophyId}"
                            ${buttonDisabled ? "disabled" : ""}
                        >${buttonText}</button>
                    </div>
                </div>
            </article>
        `;
    }).join("");
}

function renderStore() {
    if (baitPriceText) {
        baitPriceText.textContent =
            `💰 ${BAIT_PRICE.toLocaleString("ja-JP")} G`;
    }

    if (baitCountText) {
        baitCountText.textContent =
            `${SAVE_DATA.baitCount.toLocaleString("ja-JP")}個`;
    }

    
if (buyAutoMiningButton) {
    buyAutoMiningButton.addEventListener(
        "click",
        buyAutoMiningLevel
    );
}

if (buyBaitButton) {
        const cannotBuy =
            SAVE_DATA.money < BAIT_PRICE;

        buyBaitButton.disabled = cannotBuy;
    }

    if (toggleBaitButton) {
        const hasBait =
            SAVE_DATA.baitCount > 0;

        toggleBaitButton.disabled = !hasBait;

        if (!hasBait) {
            toggleBaitButton.textContent =
                "撒き餌がありません";

            toggleBaitButton.classList.remove("active");
        } else if (SAVE_DATA.baitEnabled) {
            toggleBaitButton.textContent =
                "使用中";

            toggleBaitButton.classList.add("active");
        } else {
            toggleBaitButton.textContent =
                "使用する";

            toggleBaitButton.classList.remove("active");
        }
    }
    if (storageLimitStoreText) {
    storageLimitStoreText.textContent =
        `${getStorageLimit()}匹`;
}

if (storageExpansionPriceText) {
    storageExpansionPriceText.textContent =
        SAVE_DATA.storageExpansionPurchased
            ? "購入済み"
            : `💰 ${STORAGE_EXPANSION_PRICE.toLocaleString("ja-JP")} G`;
}

if (buyStorageExpansionButton) {
    const purchased =
        SAVE_DATA.storageExpansionPurchased;

    buyStorageExpansionButton.disabled =
        purchased ||
        SAVE_DATA.money <
            STORAGE_EXPANSION_PRICE;

    buyStorageExpansionButton.textContent =
        purchased
            ? "購入済み"
            : "購入する";
}

if (superEggPriceText) {
    superEggPriceText.textContent =
        `💰 ${SUPER_EGG_PRICE.toLocaleString("ja-JP")} G`;
}

if (buySuperEggButton) {
    const storageFull =
        SAVE_DATA.storage.length >= getStorageLimit();

    buySuperEggButton.disabled =
        SAVE_DATA.money < SUPER_EGG_PRICE || storageFull;

    buySuperEggButton.textContent =
        storageFull ? "保管所が満員です" : "購入する";
}


    if (
        autoMiningLevelText &&
        autoMiningEffectText &&
        autoMiningPriceText &&
        buyAutoMiningButton
    ) {
        const level =
            Math.min(
                5,
                Math.max(
                    0,
                    Number(SAVE_DATA.autoMiningLevel) || 0
                )
            );

        const maxLevel = level >= 5;

        autoMiningLevelText.textContent =
            level === 0
                ? "未購入"
                : `第${level}段階`;

        autoMiningEffectText.textContent =
            level === 0
                ? "効果：なし"
                : `効果：釣るたびに${AUTO_MINING_REWARDS[level]}G獲得`;

        if (maxLevel) {
            autoMiningPriceText.textContent =
                "最大段階";

            buyAutoMiningButton.textContent =
                "購入済み";

            buyAutoMiningButton.disabled = true;
        } else {
            const nextPrice =
                AUTO_MINING_PRICES[level];

            autoMiningPriceText.textContent =
                `💰 ${nextPrice.toLocaleString("ja-JP")} G`;

            buyAutoMiningButton.textContent =
                level === 0
                    ? "第1段階を購入"
                    : `第${level + 1}段階へ強化`;

            buyAutoMiningButton.disabled =
                SAVE_DATA.money < nextPrice;
        }
    }

    renderTrophyStore();
}


function buyAutoMiningLevel() {
    const currentLevel =
        Math.min(
            5,
            Math.max(
                0,
                Number(SAVE_DATA.autoMiningLevel) || 0
            )
        );

    if (currentLevel >= 5) {
        showStoreMessage(
            "オートマ採掘は最大段階です。",
            "error"
        );
        return;
    }

    const price =
        AUTO_MINING_PRICES[currentLevel];

    if (SAVE_DATA.money < price) {
        showStoreMessage(
            "お金が足りません。",
            "error"
        );
        return;
    }

    SAVE_DATA.money -= price;
    SAVE_DATA.autoMiningLevel =
        currentLevel + 1;

    playGetSound();
    saveGame();
    updateStatus();
    renderStore();
    checkAchievements();

    showStoreMessage(
        `オートマ採掘が第${SAVE_DATA.autoMiningLevel}段階になりました！`,
        "success"
    );
}

function buyOneBait() {
    if (SAVE_DATA.money < BAIT_PRICE) {
        showStoreMessage(
            "お金が足りません。",
            "error"
        );
        return false;
    }

    SAVE_DATA.money -= BAIT_PRICE;
    SAVE_DATA.baitCount += 1;

    playGetSound();
    saveGame();
    updateStatus();
    renderStore();

    showStoreMessage(
        "撒き餌を1個購入しました！",
        "success"
    );

    return true;
}

function buySuperEgg() {
    if (SAVE_DATA.storage.length >= getStorageLimit()) {
        showStoreMessage("保管所が満員です。", "error");
        return;
    }

    if (SAVE_DATA.money < SUPER_EGG_PRICE) {
        showStoreMessage("お金が足りません。", "error");
        return;
    }

    SAVE_DATA.money -= SUPER_EGG_PRICE;
    SAVE_DATA.storage.push(createSuperFishEgg());

    playGetSound();
    saveGame();
    updateStatus();
    renderStore();
    renderStorage();

    showStoreMessage(
        "スーパー魚卵を購入しました！保管所に入りました。",
        "success"
    );
}

function buyStorageExpansion() {
    if (
        SAVE_DATA.storageExpansionPurchased
    ) {
        showStoreMessage(
            "保管所拡張は購入済みです。",
            "error"
        );
        return;
    }

    if (
        SAVE_DATA.money <
        STORAGE_EXPANSION_PRICE
    ) {
        showStoreMessage(
            "お金が足りません。",
            "error"
        );
        return;
    }

    SAVE_DATA.money -=
        STORAGE_EXPANSION_PRICE;

    SAVE_DATA.storageExpansionPurchased =
        true;

    playGetSound();
    saveGame();
    updateStatus();
    renderStore();
    renderStorage();

    showStoreMessage(
        `保管所の上限が${getStorageLimit()}匹になりました！`,
        "success"
    );
}

if (buyBaitButton) {
    let holdTimer = null;
    let repeatTimer = null;
    let longPressStarted = false;
    let suppressNextClick = false;

    const stopBaitPurchase = () => {
        clearTimeout(holdTimer);
        clearInterval(repeatTimer);
        holdTimer = null;
        repeatTimer = null;
    };

    buyBaitButton.addEventListener("pointerdown", event => {
        if (buyBaitButton.disabled || event.button !== 0) {
            return;
        }

        longPressStarted = false;
        suppressNextClick = false;

        holdTimer = setTimeout(() => {
            longPressStarted = true;
            suppressNextClick = true;

            if (!buyOneBait()) {
                stopBaitPurchase();
                return;
            }

            repeatTimer = setInterval(() => {
                if (!buyOneBait()) {
                    stopBaitPurchase();
                }
            }, 180);
        }, 450);
    });

    ["pointerup", "pointercancel", "pointerleave"].forEach(type => {
        buyBaitButton.addEventListener(type, stopBaitPurchase);
    });

    buyBaitButton.addEventListener("click", event => {
        if (suppressNextClick || longPressStarted) {
            event.preventDefault();
            suppressNextClick = false;
            longPressStarted = false;
            return;
        }

        buyOneBait();
    });

    buyBaitButton.addEventListener("contextmenu", event => {
        event.preventDefault();
    });
}

if (toggleBaitButton) {
    toggleBaitButton.addEventListener("click", () => {
        if (SAVE_DATA.baitCount <= 0) {
            SAVE_DATA.baitEnabled = false;
            renderStore();
            return;
        }

        SAVE_DATA.baitEnabled =
            !SAVE_DATA.baitEnabled;

        playClickSound();
        saveGame();
        renderStore();

        showStoreMessage(
            SAVE_DATA.baitEnabled
                ? "次の通常釣りで撒き餌を使用します。"
                : "撒き餌の使用を解除しました。",
            "success"
        );
    });
}

if (buyStorageExpansionButton) {
    buyStorageExpansionButton.addEventListener(
        "click",
        () => {
            buyStorageExpansion();
        }
    );
}

if (buySuperEggButton) {
    buySuperEggButton.addEventListener(
        "click",
        () => {
            buySuperEgg();
        }
    );
}

if (trophyStoreList) {
    trophyStoreList.addEventListener("click", event => {
        const button = event.target.closest("[data-trophy-id]");
        if (!button || button.disabled) return;

        const trophyId = String(button.dataset.trophyId);
        const trophy = TROPHY_ITEMS.find(item => String(item.id) === trophyId);
        if (!trophy) return;

        const owned = ownsTrophy(trophyId);
        const equipped = String(SAVE_DATA.equippedTrophy) === trophyId;

        if (!owned) {
            if (SAVE_DATA.money < trophy.price) {
                showStoreMessage("お金が足りません。", "error");
                return;
            }
            SAVE_DATA.money -= trophy.price;
            SAVE_DATA.ownedTrophies.push(trophyId);
            SAVE_DATA.equippedTrophy = trophyId;
            playGetSound();
            showStoreMessage(`${trophy.name}を購入して設置しました！`, "success");
        } else if (equipped) {
            SAVE_DATA.equippedTrophy = null;
            playClickSound();
            showStoreMessage(`${trophy.name}を片付けました。`, "success");
        } else {
            SAVE_DATA.equippedTrophy = trophyId;
            playClickSound();
            showStoreMessage(`${trophy.name}を設置しました！`, "success");
        }

        saveGame();
        updateStatus();
        renderStore();
        renderEquippedTrophy();
    });
}

function renderEquippedTrophy() {
    const layer =
        document.getElementById(
            "trophyDisplayLayer"
        );

    const visual =
        document.getElementById(
            "equippedTrophyVisual"
        );

    if (!layer || !visual) {
        return;
    }

    const trophy =
        TROPHY_ITEMS.find(item => {
            return (
                item.id ===
                SAVE_DATA.equippedTrophy
            );
        });

    if (!trophy || !ownsTrophy(trophy.id)) {
        layer.classList.remove(
            "hasTrophy",
            "screenVisible"
        );

        layer.setAttribute(
            "aria-hidden",
            "true"
        );

        visual.textContent = "";
        return;
    }

    visual.textContent = trophy.visual;

    layer.classList.add("hasTrophy");

    layer.setAttribute(
        "aria-hidden",
        "false"
    );

    const activeScreen =
        document.querySelector(
            ".screen.active"
        );

    updateTrophyScreenVisibility(activeScreen);
}

singleButton.addEventListener("click", () => {
    currentBoxIsEpicGuaranteed =
        isNextEpicGuaranteedBox();

    if (currentBoxIsEpicGuaranteed) {
    /*
     * 100回確定では撒き餌を消費しない
     */
    currentFish =
        catchEpicOrHigherFish();
    } else if (
    SAVE_DATA.baitEnabled &&
    SAVE_DATA.baitCount > 0
    ) {
    /*
     * 撒き餌使用
     */
    currentFish =
        catchBaitFish();

    SAVE_DATA.usedBaitForFishing = true;

    SAVE_DATA.baitCount -= 1;

    /*
     * 全部使い切ったら自動解除
     */
    if (SAVE_DATA.baitCount <= 0) {
        SAVE_DATA.baitCount = 0;
        SAVE_DATA.baitEnabled = false;
    }

    saveGame();
    checkAchievements();
    } else {
    currentFish = catchFishOrEgg();
    }

if (currentFish.type === "egg") {
    currentFishSize = 0;
} else {
    currentFishSize =
        generateFishSize(
            currentFish.averageSize
        );
}

    resetResultScreen();

    boxButton.disabled = false;

    boxButton.classList.toggle(
        "epicBoxReady",
        currentBoxIsEpicGuaranteed
    );

    show(gacha);

    playFishingSound();
});

boxButton.addEventListener("click", () => {
    if (!currentFish || boxButton.disabled) {
        return;
    }

    boxButton.disabled = true;
    boxButton.classList.remove("epicBoxReady");

    /*
     * 魚でも魚卵でも、釣り上げた時点で
     * 総釣り数とXPを加算します。
     */
    SAVE_DATA.totalFishCount =
        (Number(SAVE_DATA.totalFishCount) || 0) + 1;

    updatePlayStats();

    grantAutoMiningReward();

    if (currentFish.type !== "egg") {
        currentFishIsNewRecord =
            updateBestSize({
                ...currentFish,
                size: currentFishSize
            });

        /*
         * 通常の魚だけ図鑑と累計魚種記録へ追加します。
         */
        addCatchRecord(currentFish);

        addExperience(
            getFishExp(currentFish.rarity)
        );
    } else {
        currentFishIsNewRecord = false;

        /*
         * 魚卵にはレアリティがないため、
         * コモン魚と同じXPを与えます。
         */
        addExperience(
            getFishExp("common")
        );
    }

    saveGame();

    showResultMessage("");
    renderCurrentFish();
    show(result);
    playFishSound(currentFish.type === "egg" ? "common" : currentFish.rarity);
    startResultCloseWait();
});

keepFishButton.addEventListener("click", event => {
    event.stopPropagation();

    if (!currentFish || resultHandled) {
        return;
    }

    if (SAVE_DATA.storage.length >= getStorageLimit()) {
        showResultMessage("保管所がいっぱいです！");
        return;
    }

if (currentFish.type === "egg") {
    SAVE_DATA.storage.push({
        ...currentFish,
        type: "egg",
        favorite: false,
        partner: false
    });
} else {
    SAVE_DATA.storage.push({
        ...currentFish,
        type: "fish",
        size: currentFishSize,
        favorite: false,
        partner: false
    });
}
    playGetSound();

    resultHandled = true;
    saveGame();
    checkAchievements();
    showResultMessage("保管しました！");
    keepFishButton.disabled = true;
    keepFishButton.textContent = "保管済み";
});

result.addEventListener("click", event => {
    if (event.target.closest("#keepFish") || !canCloseResult) {
        return;
    }

    returnToHome();
});

document.getElementById("goHome").addEventListener("click", () => {

    playClickSound();

    show(home);

});

document.getElementById("openStorage").addEventListener("click", () => {
    playClickSound();
    renderStorage();
    show(storageScreen);
});

document
    .getElementById("openStore")
    .addEventListener("click", () => {
        playClickSound();

        renderStore();
        show(storeScreen);
    });

document.getElementById("openEncyclopedia").addEventListener("click", () => {
    playClickSound();

    renderEncyclopedia();

    show(encyclopediaScreen);
});

document.getElementById("openSettings").addEventListener("click", () => {
    playClickSound();

    updatePlayStats();

    show(settingsScreen);
});

document.querySelectorAll("[data-back-home]").forEach(button => {
    button.addEventListener("click", () => {
        playClickSound();
        closeFishDetail();
        show(home);
    });
});

let pendingSellIndex = null;

function sellStoredFish(index) {
    
    const fish = SAVE_DATA.storage[index];

    if (!fish) {
        return;
    }

    if (fish.type === "egg" && canHatchEgg(fish)) {
        renderStorage();
        return;
    }

    if (fish.favorite || fish.partner) {
    return;
}
    

    const saleValue = Math.max(0, Number(fish.value) || 0);

    if (fish.type === "egg") {
        SAVE_DATA.soldEgg = true;
    }

    SAVE_DATA.money += saleValue;
    SAVE_DATA.totalMoneyEarned += saleValue;

    showMoneyPopup(saleValue);

    if (["supreme", "legendary", "mythic"].includes(String(fish.rarity))) {
        SAVE_DATA.soldSupremeOrHigher = true;
    }

    SAVE_DATA.storage.splice(index, 1);

    playSellSound();
    saveGame();
    updateStatus();
    renderStorage();
    checkAchievements();
}

function createSellConfirmModal() {
    let modal =
        document.getElementById("sellConfirmModal");

    // 確認画面がまだ存在しない場合だけ作成
    if (!modal) {
        modal = document.createElement("div");

        modal.id = "sellConfirmModal";
        modal.className = "sellConfirmModal";
        modal.setAttribute("aria-hidden", "true");

        modal.innerHTML = `
            <div class="sellConfirmBox">
                <h2>売却確認</h2>

                <p id="sellConfirmMessage">
                    この魚を売却しますか？
                </p>

                <p class="sellConfirmWarning">
                    売却後は元に戻せません
                </p>

                <div class="sellConfirmActions">
                    <button
                        id="cancelSellButton"
                        type="button"
                    >
                        キャンセル
                    </button>

                    <button
                        id="confirmSellButton"
                        type="button"
                    >
                        売却する
                    </button>
                </div>
            </div>
        `;

        const game = document.getElementById("game");

        if (!game) {
            console.error("ゲーム画面が見つかりません。");
            return null;
        }

        game.appendChild(modal);
    }

    const cancelButton =
        modal.querySelector("#cancelSellButton");

    const confirmButton =
        modal.querySelector("#confirmSellButton");

    if (!cancelButton || !confirmButton) {
        console.error("売却確認ボタンが見つかりません。");
        return null;
    }

    // onclickに代入することで、イベントの重複登録も防ぐ
    cancelButton.onclick = event => {
        event.preventDefault();
        event.stopPropagation();

        closeSellConfirm();
    };

    confirmButton.onclick = event => {
        event.preventDefault();
        event.stopPropagation();

        if (pendingSellIndex === null) {
            closeSellConfirm();
            return;
        }

        const index = pendingSellIndex;

        closeSellConfirm();
        sellStoredFish(index);
    };

    modal.onclick = event => {
        // 暗い背景を押した場合だけ閉じる
        if (event.target === modal) {
            event.preventDefault();
            event.stopPropagation();

            closeSellConfirm();
        }
    };

    return modal;
}

function openSellConfirm(index) {
    const fish = SAVE_DATA.storage[index];

    if (!fish) {
        return;
    }

    const modal = createSellConfirmModal();

    if (!modal) {
        return;
    }

    const message =
        modal.querySelector("#sellConfirmMessage");

    pendingSellIndex = index;

    if (message) {
        message.textContent =
            `${fish.name}を本当に売却しますか？`;
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
}

function closeSellConfirm() {
    const modal =
        document.getElementById("sellConfirmModal");

    if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }

    pendingSellIndex = null;
}

storageList.addEventListener("click", event => {
    /*
     * お気に入りボタン
     */
    const favoriteButton =
        event.target.closest(".favoriteBtn");

    if (favoriteButton) {
        event.preventDefault();
        event.stopPropagation();

        const index =
            Number(favoriteButton.dataset.favoriteIndex);

        if (!Number.isInteger(index)) {
            return;
        }

        const fish = SAVE_DATA.storage[index];

        if (!fish) {
            return;
        }

        fish.favorite = !fish.favorite;

if (fish.favorite) {
    playFavoriteSound();
} else {
    playNotFavoriteSound();
}

        saveGame();
        renderStorage();
        return;
    }


    /*
     * 相棒ボタン
     */
    const partnerButton =
        event.target.closest(".partnerBtn");

    if (partnerButton) {
        event.preventDefault();
        event.stopPropagation();

        const index =
            Number(partnerButton.dataset.partnerIndex);

        if (!Number.isInteger(index)) {
            return;
        }

        const selectedFish =
            SAVE_DATA.storage[index];

        if (!selectedFish) {
            return;
        }

        /*
         * 現在の相棒の★を押した場合は解除
         */
        if (selectedFish.partner) {
            selectedFish.partner = false;
            playNotFavoriteSound();
        } else {
            /*
             * 念のため、全魚の相棒状態を解除してから
             * 選択した魚だけを相棒にする
             */
            SAVE_DATA.storage.forEach(fish => {
                fish.partner = false;
            });

            selectedFish.partner = true;
            playFavoriteSound();
        }

        saveGame();
        renderStorage();
        renderPartnerFish();
        return;
    }


    /*
     * 魚卵の孵化ボタン
     */
    const hatchButton =
        event.target.closest(".storageHatchButton");

    if (hatchButton) {
        event.preventDefault();
        event.stopPropagation();

        const index =
            Number(hatchButton.dataset.storageIndex);

        if (Number.isInteger(index)) {
            hatchStoredEgg(index, hatchButton.closest(".storageCard"));
        }

        return;
    }

    /*
     * 売却ボタン
     */
    const sellButton =
        event.target.closest(".storageSellButton");

    if (!sellButton || sellButton.disabled) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    const index =
        Number(sellButton.dataset.storageIndex);

    if (!Number.isInteger(index)) {
        return;
    }

    const fish = SAVE_DATA.storage[index];

    if (!fish) {
        return;
    }

    /*
     * ボタンを無効化していますが、
     * データ側でも売却を防止します
     */
    if (fish.favorite || fish.partner) {
        return;
    }

    const rarity = String(fish.rarity)
        .trim()
        .toLowerCase();

    const confirmationRarities = [
        "epic",
        "ultra",
        "supreme",
        "legendary",
        "mythic"
    ];

    const requiresSellConfirmation =
        fish.type === "egg" ||
        confirmationRarities.includes(
            rarity
        );

    if (requiresSellConfirmation) {
        openSellConfirm(index);
        return;
    }

    sellStoredFish(index);
});

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        closeSellConfirm();
    }
});


const volumeSlider = document.getElementById("volumeSlider");
const volumeValue = document.getElementById("volumeValue");

function updateVolumeDisplay() {
    if (!volumeSlider || !volumeValue) {
        return;
    }

    const percentage = Math.round(SAVE_DATA.volume * 100);
    volumeSlider.value = percentage;
    volumeValue.textContent = `${percentage}%`;
}

if (volumeSlider) {
    volumeSlider.addEventListener("input", () => {
        SAVE_DATA.volume = Number(volumeSlider.value) / 100;
        applyVolume();
        updateVolumeDisplay();
        saveGame();
    });
}

const bgmVolumeSlider =
    document.getElementById("bgmVolumeSlider");

const bgmVolumeValue =
    document.getElementById("bgmVolumeValue");

function updateBgmVolumeDisplay() {
    if (!bgmVolumeSlider || !bgmVolumeValue) {
        return;
    }

    const percentage =
        Math.round(SAVE_DATA.bgmVolume * 100);

    bgmVolumeSlider.value = percentage;
    bgmVolumeValue.textContent = `${percentage}%`;
}

if (bgmVolumeSlider) {
    bgmVolumeSlider.addEventListener("input", () => {
        SAVE_DATA.bgmVolume =
            Number(bgmVolumeSlider.value) / 100;

        applyBgmVolume();
        updateBgmVolumeDisplay();
        saveGame();
    });
}

const bubbleBackground =
document.getElementById(
"bubbleBackground"
);

function createBubble(){

    const bubble =
    document.createElement("div");

    bubble.className="bubble";

    const size =
    20 + Math.random()*48;

    bubble.style.width=size+"px";
    bubble.style.height=size+"px";

    bubble.style.left=
    Math.random()*100+"%";

    bubble.style.animationDuration=
    8+Math.random()*8+"s";

    bubble.style.animationDelay=
    Math.random()*2+"s";

    bubbleBackground.appendChild(bubble);

    bubble.addEventListener(
        "animationend",
        ()=>bubble.remove()
    );

}

setInterval(createBubble,650);
SAVE_DATA.storage.forEach(fish => {
    fish.favorite ??= false;
});

let partnerFound = false;

SAVE_DATA.storage.forEach(item => {
    item.type ??= "fish";
    item.favorite ??= false;
    item.partner ??= false;

    if (item.type === "egg") {
        item.favorite = false;
        item.partner = false;
        return;
    }

    if (item.partner && !partnerFound) {
        partnerFound = true;
    } else if (item.partner) {
        item.partner = false;
    }
});

if (!Array.isArray(SAVE_DATA.usedCodes)) {
    SAVE_DATA.usedCodes = [];
}

if (openCasinoButton) {
    openCasinoButton.addEventListener(
        "click",
        () => {
            playClickSound();
            show(casinoScreen);
        }
    );
}
if (openCrashGameButton) {
    openCrashGameButton.addEventListener(
        "click",
        () => {
            playClickSound();
            show(crashScreen);
        }
    );
}
if (backToCasinoButton) {
    backToCasinoButton.addEventListener(
        "click",
        () => {
            playClickSound();
            show(casinoScreen);
        }
    );
}

applyVolume();
applyBgmVolume();

updateVolumeDisplay();
updateBgmVolumeDisplay();

updateStatus();
updatePlayStats();

renderPartnerFish();
renderEquippedTrophy();

setInterval(() => {
    updateEggStorageTimers();
}, 1000);

/*
 * コードメッセージを表示
 */
function showGiftCodeMessage(message, success = false) {
    if (!giftCodeMessage) {
        return;
    }

    giftCodeMessage.textContent = message;

    giftCodeMessage.classList.toggle(
        "success",
        success
    );

    giftCodeMessage.classList.toggle(
        "error",
        !success
    );
}


/*
 * 入力されたコードを整える
 */
function normalizeGiftCode(value) {
    return String(value)
        .replace(/[^0-9]/g, "")
        .slice(0, 8);
}


/*
 * コードの報酬を与える
 */
function applyGiftCodeReward(codeData) {
    switch (codeData.type) {
        case "money": {
            const reward =
                Math.max(
                    0,
                    Number(codeData.amount) || 0
                );

            SAVE_DATA.money += reward;
            SAVE_DATA.totalMoneyEarned += reward;

            saveGame();
            updateStatus();
            checkAchievements();

            break;
        }

        case "exp": {
            addExperience(
                Number(codeData.amount) || 0
            );

            break;
        }

        case "normalEgg": {
            return addGiftEggsToStorage(
                "normal",
                codeData.amount
            );
        }

        case "superEgg": {
            return addGiftEggsToStorage(
                "super",
                codeData.amount
            );
        }

        default: {
            console.error(
                "未対応のコード報酬です。",
                codeData
            );

            return false;
        }
    }

    return true;
}


/*
 * コードを使用
 */
function useGiftCode() {
    if (!giftCodeInput) {
        return;
    }

    const code =
        normalizeGiftCode(giftCodeInput.value);

    giftCodeInput.value = code;

    if (code.length === 0) {
        showGiftCodeMessage(
            "コードを入力してください。"
        );
        return;
    }

    const codeData = GIFT_CODES[code];

    if (!codeData) {
        showGiftCodeMessage(
            "このコードは存在しません。"
        );
        return;
    }

    if (!Array.isArray(SAVE_DATA.usedCodes)) {
        SAVE_DATA.usedCodes = [];
    }

    if (SAVE_DATA.usedCodes.includes(code)) {
        showGiftCodeMessage(
            "このコードはすでに使用済みです。"
        );
        return;
    }

    const rewardApplied =
        applyGiftCodeReward(codeData);

    if (!rewardApplied) {
        showGiftCodeMessage(
            "コードの使用に失敗しました。"
        );
        return;
    }

    SAVE_DATA.usedCodes.push(code);

    saveGame();
    updateStatus();

    giftCodeInput.value = "";

    showGiftCodeMessage(
        codeData.message || "報酬を受け取りました！",
        true
    );
}

if (giftCodeInput) {
    giftCodeInput.addEventListener("input", () => {
        giftCodeInput.value =
            normalizeGiftCode(giftCodeInput.value);

        if (giftCodeMessage) {
            giftCodeMessage.textContent = "";
            giftCodeMessage.classList.remove(
                "success",
                "error"
            );
        }
    });

    giftCodeInput.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            useGiftCode();
        }
    });
}

if (useGiftCodeButton) {
    useGiftCodeButton.addEventListener("click", () => {
        playClickSound();
        useGiftCode();
    });
}

openCasinoButton.addEventListener("click", () => {
    playClickSound();
    show(casinoScreen);
});
/* =========================
   クラッシュゲーム
========================= */

const crashMultiplierElement =
    document.getElementById("crashMultiplier");

const crashMessageElement =
    document.getElementById("crashMessage");

const crashBetInput =
    document.getElementById("crashBetInput");

const startCrashButton =
    document.getElementById("startCrashButton");

const crashGraphCanvas =
    document.getElementById("crashGraphCanvas");

const crashGraphContext =
    crashGraphCanvas?.getContext("2d");

/*
 * roundRunning:
 * ラウンドそのものが進行中か
 *
 * playerCashedOut:
 * プレイヤーが換金済みか
 */
let roundRunning = false;
let playerCashedOut = false;

let crashMultiplier = 1;
let crashPoint = 1;
let crashBetAmount = 0;

let cashedOutMultiplier = 0;
let cashedOutPayout = 0;

let crashStartTime = 0;
let crashAnimationFrame = null;

let crashGraphPoints = [];

function formatCrashMoney(amount) {
    return Math.floor(amount)
        .toLocaleString("ja-JP");
}

function setCrashMessage(
    message,
    type = ""
) {
    if (!crashMessageElement) {
        return;
    }

    crashMessageElement.textContent =
        message;

    crashMessageElement.classList.remove(
        "success",
        "error"
    );

    if (type) {
        crashMessageElement.classList.add(
            type
        );
    }
}

function getCrashBetAmount() {
    const amount =
        Math.floor(
            Number(crashBetInput?.value)
        );

    if (!Number.isFinite(amount)) {
        return 0;
    }

    return amount;
}

/*
 * クラッシュ倍率を決める
 *
 * 低倍率が多く、
 * 高倍率はたまに出る
 */
function createCrashPoint() {
    const random = Math.random();

    const point =
        0.99 /
        Math.max(
            0.01,
            1 - random
        );

    return Math.max(
        1,
        Math.min(
            100,
            Number(point.toFixed(2))
        )
    );
}

/* =========================
   Canvasサイズ調整
========================= */

function resizeCrashCanvas() {
    if (
        !crashGraphCanvas ||
        !crashGraphContext
    ) {
        return;
    }

    const rect =
        crashGraphCanvas
            .getBoundingClientRect();

    if (
        rect.width <= 0 ||
        rect.height <= 0
    ) {
        return;
    }

    const pixelRatio =
        window.devicePixelRatio || 1;

    crashGraphCanvas.width =
        Math.floor(
            rect.width * pixelRatio
        );

    crashGraphCanvas.height =
        Math.floor(
            rect.height * pixelRatio
        );

    crashGraphContext.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );

    drawCrashGraph();
}

/* =========================
   背景のグリッド
========================= */

function drawCrashGrid(
    width,
    height,
    padding
) {
    if (!crashGraphContext) {
        return;
    }

    crashGraphContext.save();

    crashGraphContext.strokeStyle =
        "rgba(255, 255, 255, 0.09)";

    crashGraphContext.lineWidth = 1;

    const verticalCount = 8;
    const horizontalCount = 5;

    const graphWidth =
        width - padding * 2;

    const graphHeight =
        height - padding * 2;

    for (
        let index = 0;
        index <= verticalCount;
        index += 1
    ) {
        const x =
            padding +
            (
                graphWidth /
                verticalCount
            ) *
            index;

        crashGraphContext.beginPath();
        crashGraphContext.moveTo(
            x,
            padding
        );

        crashGraphContext.lineTo(
            x,
            height - padding
        );

        crashGraphContext.stroke();
    }

    for (
        let index = 0;
        index <= horizontalCount;
        index += 1
    ) {
        const y =
            padding +
            (
                graphHeight /
                horizontalCount
            ) *
            index;

        crashGraphContext.beginPath();
        crashGraphContext.moveTo(
            padding,
            y
        );

        crashGraphContext.lineTo(
            width - padding,
            y
        );

        crashGraphContext.stroke();
    }

    crashGraphContext.restore();
}

/* =========================
   キャッシュアウト位置
========================= */

function drawCashOutMarker(
    width,
    height,
    padding,
    maximumTime,
    maximumMultiplier
) {
    if (
        !crashGraphContext ||
        !playerCashedOut ||
        cashedOutMultiplier <= 0
    ) {
        return;
    }

    const cashOutPoint =
        crashGraphPoints.find(point => {
            return (
                point.multiplier >=
                cashedOutMultiplier
            );
        });

    if (!cashOutPoint) {
        return;
    }

    const graphWidth =
        width - padding * 2;

    const graphHeight =
        height - padding * 2;

    const x =
        padding +
        (
            cashOutPoint.time /
            maximumTime
        ) *
        graphWidth;

    const normalized =
        (
            cashOutPoint.multiplier - 1
        ) /
        (
            maximumMultiplier - 1
        );

    const y =
        height -
        padding -
        normalized *
        graphHeight;

    crashGraphContext.save();

    /*
     * キャッシュアウト地点の縦線
     */
    crashGraphContext.beginPath();

    crashGraphContext.setLineDash([
        6,
        6
    ]);

    crashGraphContext.strokeStyle =
        "rgba(255, 224, 96, 0.8)";

    crashGraphContext.lineWidth = 2;

    crashGraphContext.moveTo(
        x,
        y
    );

    crashGraphContext.lineTo(
        x,
        height - padding
    );

    crashGraphContext.stroke();

    crashGraphContext.setLineDash([]);

    /*
     * キャッシュアウト地点の丸
     */
    crashGraphContext.beginPath();

    crashGraphContext.fillStyle =
        "#ffe060";

    crashGraphContext.arc(
        x,
        y,
        7,
        0,
        Math.PI * 2
    );

    crashGraphContext.fill();

    /*
     * CASH OUTの文字
     */
    crashGraphContext.font =
        "bold 13px sans-serif";

    crashGraphContext.textAlign =
        "center";

    crashGraphContext.fillStyle =
        "#ffe060";

    crashGraphContext.fillText(
        `${cashedOutMultiplier.toFixed(2)}x`,
        x,
        Math.max(
            padding + 14,
            y - 13
        )
    );

    crashGraphContext.restore();
}

/* =========================
   線グラフ
========================= */

function drawCrashGraph() {
    if (
        !crashGraphCanvas ||
        !crashGraphContext
    ) {
        return;
    }

    const width =
        crashGraphCanvas.clientWidth;

    const height =
        crashGraphCanvas.clientHeight;

    if (
        width <= 0 ||
        height <= 0
    ) {
        return;
    }

    crashGraphContext.clearRect(
        0,
        0,
        width,
        height
    );

    const padding = 24;

    drawCrashGrid(
        width,
        height,
        padding
    );

    if (
        crashGraphPoints.length <
        2
    ) {
        return;
    }

    const lastPoint =
        crashGraphPoints[
            crashGraphPoints.length - 1
        ];

    /*
     * 最初は約7秒分を表示。
     * 長引いたら表示範囲も広げる。
     */
    const maximumTime =
        Math.max(
            7,
            lastPoint.time * 1.05
        );

    /*
     * 倍率の上端に余白を作る
     */
    const highestMultiplier =
        Math.max(
            2,
            ...crashGraphPoints.map(
                point =>
                    point.multiplier
            )
        );

    const maximumMultiplier =
        Math.max(
            2,
            1 +
            (
                highestMultiplier - 1
            ) *
            1.25
        );

    const graphWidth =
        width - padding * 2;

    const graphHeight =
        height - padding * 2;

    /*
     * 線の下を薄く塗る
     */
    crashGraphContext.beginPath();

    crashGraphPoints.forEach(
        (point, index) => {
            const x =
                padding +
                (
                    point.time /
                    maximumTime
                ) *
                graphWidth;

            const normalized =
                (
                    point.multiplier - 1
                ) /
                (
                    maximumMultiplier - 1
                );

            const y =
                height -
                padding -
                normalized *
                graphHeight;

            if (index === 0) {
                crashGraphContext.moveTo(
                    x,
                    y
                );
            } else {
                crashGraphContext.lineTo(
                    x,
                    y
                );
            }
        }
    );

    const finalX =
        padding +
        (
            lastPoint.time /
            maximumTime
        ) *
        graphWidth;

    crashGraphContext.lineTo(
        finalX,
        height - padding
    );

    crashGraphContext.lineTo(
        padding,
        height - padding
    );

    crashGraphContext.closePath();

    const areaGradient =
        crashGraphContext
            .createLinearGradient(
                0,
                padding,
                0,
                height
            );

    if (
        crashMultiplierElement
            ?.classList
            .contains("crashed")
    ) {
        areaGradient.addColorStop(
            0,
            "rgba(255, 70, 80, 0.3)"
        );

        areaGradient.addColorStop(
            1,
            "rgba(255, 70, 80, 0)"
        );
    } else {
        areaGradient.addColorStop(
            0,
            "rgba(75, 240, 180, 0.28)"
        );

        areaGradient.addColorStop(
            1,
            "rgba(75, 240, 180, 0)"
        );
    }

    crashGraphContext.fillStyle =
        areaGradient;

    crashGraphContext.fill();

    /*
     * メインの線
     */
    crashGraphContext.beginPath();

    crashGraphPoints.forEach(
        (point, index) => {
            const x =
                padding +
                (
                    point.time /
                    maximumTime
                ) *
                graphWidth;

            const normalized =
                (
                    point.multiplier - 1
                ) /
                (
                    maximumMultiplier - 1
                );

            const y =
                height -
                padding -
                normalized *
                graphHeight;

            if (index === 0) {
                crashGraphContext.moveTo(
                    x,
                    y
                );
            } else {
                crashGraphContext.lineTo(
                    x,
                    y
                );
            }
        }
    );

    const lineGradient =
        crashGraphContext
            .createLinearGradient(
                padding,
                height,
                width - padding,
                padding
            );

    if (
        crashMultiplierElement
            ?.classList
            .contains("crashed")
    ) {
        lineGradient.addColorStop(
            0,
            "#ff8a90"
        );

        lineGradient.addColorStop(
            1,
            "#ff3642"
        );
    } else {
        lineGradient.addColorStop(
            0,
            "#58dfff"
        );

        lineGradient.addColorStop(
            1,
            "#71ffad"
        );
    }

    crashGraphContext.strokeStyle =
        lineGradient;

    crashGraphContext.lineWidth = 5;
    crashGraphContext.lineCap =
        "round";

    crashGraphContext.lineJoin =
        "round";

    crashGraphContext.shadowBlur = 14;

    crashGraphContext.shadowColor =
        crashMultiplierElement
            ?.classList
            .contains("crashed")
            ? "rgba(255, 65, 75, 0.7)"
            : "rgba(80, 235, 200, 0.65)";

    crashGraphContext.stroke();

    crashGraphContext.shadowBlur = 0;

    /*
     * 現在位置の丸
     */
    const normalizedLast =
        (
            lastPoint.multiplier - 1
        ) /
        (
            maximumMultiplier - 1
        );

    const finalY =
        height -
        padding -
        normalizedLast *
        graphHeight;

    crashGraphContext.beginPath();

    crashGraphContext.fillStyle =
        crashMultiplierElement
            ?.classList
            .contains("crashed")
            ? "#ff4450"
            : "#75ffb3";

    crashGraphContext.arc(
        finalX,
        finalY,
        6,
        0,
        Math.PI * 2
    );

    crashGraphContext.fill();

    drawCashOutMarker(
        width,
        height,
        padding,
        maximumTime,
        maximumMultiplier
    );
}

/* =========================
   表示リセット
========================= */

function resetCrashGameDisplay() {
    crashMultiplier = 1;

    playerCashedOut = false;
    cashedOutMultiplier = 0;
    cashedOutPayout = 0;

    crashGraphPoints = [
        {
            time: 0,
            multiplier: 1
        }
    ];

    if (crashMultiplierElement) {
        crashMultiplierElement.textContent =
            "1.00x";

        crashMultiplierElement
            .classList
            .remove(
                "crashed",
                "cashedOut"
            );
    }

    drawCrashGraph();
}

/* =========================
   操作ボタン
========================= */

function updateCrashControls() {
    if (crashBetInput) {
        crashBetInput.disabled =
            roundRunning;
    }

    if (startCrashButton) {
        if (!roundRunning) {
            startCrashButton.textContent =
                "ゲーム開始";

            startCrashButton.disabled =
                false;

            startCrashButton.classList.remove(
                "cashOutMode"
            );
        } else if (
            playerCashedOut
        ) {
            startCrashButton.textContent =
                "結果を観戦中";

            startCrashButton.disabled =
                true;

            startCrashButton.classList.remove(
                "cashOutMode"
            );
        } else {
            startCrashButton.textContent =
                "キャッシュアウト";

            startCrashButton.disabled =
                false;

            startCrashButton.classList.add(
                "cashOutMode"
            );
        }
    }

    if (backToCasinoButton) {
        backToCasinoButton.disabled =
            roundRunning;
    }
}

/* =========================
   ラウンド終了
========================= */

function finishCrashRound() {
    roundRunning = false;

    if (crashAnimationFrame !== null) {
        cancelAnimationFrame(
            crashAnimationFrame
        );

        crashAnimationFrame = null;
    }

    updateCrashControls();
}

/* =========================
   ゲームループ
========================= */

function crashGameLoop(timestamp) {
    if (!roundRunning) {
        return;
    }

    const elapsed =
        (
            timestamp -
            crashStartTime
        ) /
        1000;

    /*
     * 少しずつ加速する倍率
     */
    crashMultiplier =
        Number(
            Math.exp(
                elapsed * 0.16
            ).toFixed(2)
        );

    if (
        crashMultiplier >=
        crashPoint
    ) {
        crashMultiplier =
            crashPoint;
    }

    crashGraphPoints.push({
        time: elapsed,
        multiplier:
            crashMultiplier
    });

    /*
     * 点が増えすぎないようにする
     */
    if (
        crashGraphPoints.length >
        1000
    ) {
        crashGraphPoints.shift();
    }

    if (crashMultiplierElement) {
        crashMultiplierElement.textContent =
            `${crashMultiplier.toFixed(2)}x`;
    }

    drawCrashGraph();

    /*
     * クラッシュ判定
     */
    if (
        crashMultiplier >=
        crashPoint
    ) {
        if (crashMultiplierElement) {
            crashMultiplierElement
                .classList
                .remove("cashedOut");

            crashMultiplierElement
                .classList
                .add("crashed");
        }

        /* ラウンド結果を実績用に記録 */
        SAVE_DATA.highestCrashMultiplier = Math.max(
            Number(SAVE_DATA.highestCrashMultiplier) || 0,
            Number(crashPoint) || 0
        );

        if (!playerCashedOut) {
            SAVE_DATA.worstCrashLoss = Math.max(
                Number(SAVE_DATA.worstCrashLoss) || 0,
                Number(crashBetAmount) || 0
            );
        }

        saveGame();
        checkAchievements();

        /*
         * 換金済みかどうかで
         * 終了メッセージを変える
         */
        if (playerCashedOut) {
            setCrashMessage(
                `${crashPoint.toFixed(2)}xでクラッシュ！ ` +
                `${cashedOutMultiplier.toFixed(2)}xで` +
                `${formatCrashMoney(cashedOutPayout)}G獲得`,
                "success"
            );
        } else {
            setCrashMessage(
                `${crashPoint.toFixed(2)}xでクラッシュ！`,
                "error"
            );
        }

        drawCrashGraph();
        finishCrashRound();
        return;
    }

    crashAnimationFrame =
        requestAnimationFrame(
            crashGameLoop
        );
}

/* =========================
   ゲーム開始
========================= */

function startCrashGame() {
    if (roundRunning) {
        return;
    }

    const bet =
        getCrashBetAmount();

    if (bet < 100) {
        setCrashMessage(
            "掛け金は100G以上にしてください",
            "error"
        );
        return;
    }

    if (bet > SAVE_DATA.money) {
        setCrashMessage(
            "所持金が足りません",
            "error"
        );
        return;
    }

    crashBetAmount = bet;
    crashPoint = createCrashPoint();

    roundRunning = true;

    SAVE_DATA.money -=
        crashBetAmount;

    saveGame();
    updateStatus();

    resetCrashGameDisplay();
    updateCrashControls();

    setCrashMessage(
        "倍率が上昇しています"
    );

    crashStartTime =
        performance.now();

    crashAnimationFrame =
        requestAnimationFrame(
            crashGameLoop
        );
}

/* =========================
   キャッシュアウト
========================= */

function cashOutCrashGame() {
    if (
        !roundRunning ||
        playerCashedOut
    ) {
        return;
    }

    playerCashedOut = true;

    cashedOutMultiplier =
        crashMultiplier;

    cashedOutPayout =
        Math.floor(
            crashBetAmount *
            cashedOutMultiplier
        );

    const crashProfit = Math.max(
        0,
        cashedOutPayout - crashBetAmount
    );

    SAVE_DATA.money += cashedOutPayout;
    SAVE_DATA.totalMoneyEarned += cashedOutPayout;
    SAVE_DATA.bestCrashProfit = Math.max(
        Number(SAVE_DATA.bestCrashProfit) || 0,
        crashProfit
    );

    saveGame();
    updateStatus();
    checkAchievements();

    if (crashMultiplierElement) {
        crashMultiplierElement
            .classList
            .add("cashedOut");
    }

    setCrashMessage(
        `${cashedOutMultiplier.toFixed(2)}xでキャッシュアウト！ ` +
        `${formatCrashMoney(cashedOutPayout)}G獲得・結果を観戦中`,
        "success"
    );

    /*
     * finishCrashRound()は呼ばない。
     * グラフと倍率はクラッシュまで動き続ける。
     */
    updateCrashControls();
    drawCrashGraph();
}

/* =========================
   イベント
========================= */

if (startCrashButton) {
    startCrashButton.addEventListener(
        "click",
        () => {
            if (
                roundRunning &&
                !playerCashedOut
            ) {
                playGetSound();
                cashOutCrashGame();
                return;
            }

            if (!roundRunning) {
                playClickSound();
                startCrashGame();
            }
        }
    );
}

if (crashBetInput) {
    crashBetInput.addEventListener(
        "input",
        () => {
            const value =
                Math.max(
                    0,
                    Math.floor(
                        Number(
                            crashBetInput.value
                        ) || 0
                    )
                );

            crashBetInput.value =
                value;
        }
    );
}

window.addEventListener(
    "resize",
    resizeCrashCanvas
);

/*
 * クラッシュ画面を開いた直後は
 * display:noneから切り替わるため、
 * 少し後でCanvasサイズを再取得する
 */
if (openCrashGameButton) {
    openCrashGameButton.addEventListener(
        "click",
        () => {
            requestAnimationFrame(
                () => {
                    resizeCrashCanvas();
                }
            );
        }
    );
}

resetCrashGameDisplay();
updateCrashControls();

requestAnimationFrame(
    resizeCrashCanvas
);

renderStore();
renderEquippedTrophy();

function isAchievementUnlocked(
    achievementId
) {
    return (
        Array.isArray(
            SAVE_DATA.unlockedAchievements
        ) &&
        SAVE_DATA.unlockedAchievements.includes(
            achievementId
        )
    );
}
function renderAchievements() {
    if (
        !achievementList ||
        !Array.isArray(ACHIEVEMENTS)
    ) {
        return;
    }

    const unlockedCount =
        ACHIEVEMENTS.filter(
            achievement => {
                return isAchievementUnlocked(
                    achievement.id
                );
            }
        ).length;

    if (achievementTotalCount) {
        achievementTotalCount.textContent =
            `${unlockedCount} / ${ACHIEVEMENTS.length}`;
    }

    if (achievementProgressText) {
        achievementProgressText.textContent =
            `解除数 ${unlockedCount} / ${ACHIEVEMENTS.length}`;
    }

    achievementList.innerHTML =
        ACHIEVEMENTS.map(
            achievement => {
                const unlocked =
                    isAchievementUnlocked(
                        achievement.id
                    );

                return `
                    <article
                        class="achievementCard ${
                            unlocked
                                ? "unlocked"
                                : "locked"
                        }"
                    >
                        <div class="achievementIcon">
                            ${
                                unlocked
                                    ? achievement.icon
                                    : "🔒"
                            }
                        </div>

                        <div class="achievementContent">
                            <h2>
                                ${
                                    unlocked
                                        ? achievement.name
                                        : "未解除の実績"
                                }
                            </h2>

                            <p>
                                ${achievement.description}
                            </p>
                        </div>

                        <div class="achievementState">
                            ${
                                unlocked
                                    ? "解除済み"
                                    : "未解除"
                            }
                        </div>
                    </article>
                `;
            }
        ).join("");
}
function checkAchievements() {
    if (
        !Array.isArray(
            SAVE_DATA.unlockedAchievements
        )
    ) {
        SAVE_DATA.unlockedAchievements = [];
    }

    let unlockedSomething = false;

    ACHIEVEMENTS.forEach(
        achievement => {
            const alreadyUnlocked =
                isAchievementUnlocked(
                    achievement.id
                );

            if (alreadyUnlocked) {
                return;
            }

            if (!achievement.check()) {
                return;
            }

            SAVE_DATA.unlockedAchievements.push(
                achievement.id
            );

            showAchievementPopup(
                achievement
            );

            unlockedSomething = true;
        }
    );

    if (unlockedSomething) {
        saveGame();
    }

    renderAchievements();
}
function showAchievementPopup(
    achievement
) {
    const oldPopup =
        document.querySelector(
            ".achievementUnlockPopup"
        );

    if (oldPopup) {
        oldPopup.remove();
    }

    const popup =
        document.createElement("div");

    popup.className =
        "achievementUnlockPopup";

    popup.innerHTML = `
        <div class="achievementUnlockIcon">
            ${achievement.icon}
        </div>

        <div class="achievementUnlockContent">
            <small>実績解除！</small>
            <strong>${achievement.name}</strong>
        </div>
    `;

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.remove();
    }, 3500);
}
if (openAchievementsButton) {
    openAchievementsButton.addEventListener(
        "click",
        () => {
            playClickSound();
            renderAchievements();
            show(achievementsScreen);
        }
    );
}

if (backToSettingsButton) {
    backToSettingsButton.addEventListener(
        "click",
        () => {
            playClickSound();
            show(settingsScreen);
        }
    );
}

renderAchievements();
checkAchievements();

function getEggRemainingTime(egg) {
    const hatchAt =
        Number(egg?.hatchAt) || 0;

    return Math.max(
        0,
        hatchAt - Date.now()
    );
}
function formatEggRemainingTime(milliseconds) {
    const totalSeconds =
        Math.ceil(milliseconds / 1000);

    const minutes =
        Math.floor(totalSeconds / 60);

    const seconds =
        totalSeconds % 60;

    return (
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}`
    );
}

function canHatchEgg(egg) {
    return (
        egg?.type === "egg" &&
        getEggRemainingTime(egg) <= 0
    );
}

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
function findFishById(fishId) {
    const targetId =
        Number(fishId);

    for (
        const fishList of
        Object.values(FISH)
    ) {
        if (!Array.isArray(fishList)) {
            continue;
        }

        const fish =
            fishList.find(item => {
                return (
                    Number(item.id) ===
                    targetId
                );
            });

        if (fish) {
            return fish;
        }
    }

    return null;
}

function getSpecialSuperEggFish(egg) {
    const eggKind =
        egg?.eggKind || "normal";

    /*
     * 通常魚卵の場合は、
     * 今までどおりの抽選
     */
    if (eggKind !== "super") {
        return hatchFishFromEgg(
            eggKind
        );
    }

    const partner =
        getPartnerFish();

    const partnerIsRaven =
        Number(partner?.id) === 57;

    /*
     * ID57が相棒のときだけ、
     * 5%でID58を特別抽選
     */
    if (
    partnerIsRaven &&
    Math.random() <
        RAVEN_PHOENIX_CHANCE
) {
        const specialFish =
            findFishById(58);

        if (specialFish) {
            return {
                ...specialFish,

                /*
                 * ID58が登録されている
                 * レアリティを自動取得
                 */
                rarity:
                    findFishRarityById(58),

                size:
                    generateFishSize(
                        specialFish.averageSize
                    ),

                caughtAt:
                    Date.now()
            };
        }
    }

    /*
     * 特別抽選に外れた場合は
     * スーパー魚卵の通常抽選
     */
    return hatchFishFromEgg(
        "super"
    );
}
function findFishRarityById(fishId) {
    const targetId =
        Number(fishId);

    for (
        const [
            rarity,
            fishList
        ] of Object.entries(FISH)
    ) {
        if (!Array.isArray(fishList)) {
            continue;
        }

        const exists =
            fishList.some(item => {
                return (
                    Number(item.id) ===
                    targetId
                );
            });

        if (exists) {
            return rarity;
        }
    }

    return "common";
}
async function hatchStoredEgg(index, storageCard = null) {
    const egg = SAVE_DATA.storage[index];
    const eggId = String(egg?.id || `egg-${index}`);

    if (
        hatchingEggIds.has(eggId) ||
        !egg ||
        egg.type !== "egg" ||
        !canHatchEgg(egg)
    ) {
        return;
    }

    // 魚卵ごとに孵化中かどうかを管理するため、
    // 別の魚卵は同時に孵化できます。
    hatchingEggIds.add(eggId);

    const hatchButton =
        storageCard?.querySelector(".storageHatchButton");
    const eggImage =
        storageCard?.querySelector(".storageEggImage");

    if (hatchButton) {
        hatchButton.disabled = true;
    }

    try {
        playOpenSound();

        if (storageCard) {
            storageCard.classList.add("eggHatching");
        }

        await wait(520);

        const hatchedFish =
            getSpecialSuperEggFish(egg);

        const storedFish = {
            ...hatchedFish,
            type: "fish",
            size: Number(hatchedFish.size) ||
                generateFishSize(hatchedFish.averageSize),
            caughtAt: Date.now(),
            favorite: false,
            partner: false
        };

        if (eggImage) {
            eggImage.src = storedFish.image;
            eggImage.alt = storedFish.name;
            eggImage.classList.add("hatchedFishImage");
        }

        /*
         * 魚が実際に表示された瞬間に、
         * 通常の釣果と同じレアリティ別効果音を鳴らします。
         */
        playFishSound(storedFish.rarity);

        if (storageCard) {
            storageCard.classList.add("eggRevealed");
        }

        await wait(850);

        // 同時孵化中に並び順が変わっても、IDから現在位置を探す。
        const currentIndex = SAVE_DATA.storage.findIndex(
            item => String(item?.id) === eggId
        );

        if (currentIndex < 0) {
            return;
        }

        if (egg.eggKind === "super") {
            SAVE_DATA.superEggsHatched += 1;
        } else {
            SAVE_DATA.normalEggsHatched += 1;
        }

        SAVE_DATA.storage[currentIndex] = storedFish;

        /*
         * 孵化は新しい「釣り」ではないため、
         * 総釣り数とXPは増やしません。
         * ただし、出てきた魚は図鑑とサイズ記録へ反映します。
         */
        currentFishIsNewRecord =
            updateBestSize(storedFish);

        addCatchRecord(storedFish);

        saveGame();
        updateStatus();
        renderEncyclopedia();
        checkAchievements();
    } finally {
        hatchingEggIds.delete(eggId);

        // ほかの卵の演出中に一覧を描き直すと、その演出が消えるため、
        // 全孵化演出が終わった時だけ再描画します。
        if (hatchingEggIds.size === 0) {
            renderStorage();
        }
    }
}

function updateEggStorageTimers() {
    const eggCards =
        document.querySelectorAll(
            "#storageList .eggStorageCard"
        );

    eggCards.forEach(card => {
        const eggId =
            card.dataset.eggId;

        if (!eggId) {
            return;
        }

        const egg =
            SAVE_DATA.storage.find(item => {
                return (
                    item.type === "egg" &&
                    String(item.id) ===
                        String(eggId)
                );
            });

        if (!egg) {
            return;
        }

        const timerElement =
            card.querySelector(
                ".eggTimer"
            );

        const actionButton =
            card.querySelector(
                ".eggActionButton"
            );

        const remaining =
            getEggRemainingTime(egg);

        const hatchReady =
            remaining <= 0;

        if (timerElement) {
            timerElement.textContent =
                hatchReady
                    ? "孵化できます！"
                    : `孵化まで ${
                        formatEggRemainingTime(
                            remaining
                        )
                    }`;
        }

        if (
            hatchReady &&
            actionButton &&
            !actionButton.classList.contains(
                "storageHatchButton"
            )
        ) {
            /*
 * 売却ボタンの見た目は残したまま、
 * 孵化ボタン用の識別クラスだけ追加
 */
actionButton.classList.add(
    "storageHatchButton"
);

actionButton.textContent = "孵化";

            actionButton.textContent =
                "孵化";
        }
    });
}
