const SAPLING_COST = 10;
const WATER_COST = 5;
const INITIAL_EMISSIONS = 10;
const EMISSION_RATE = 1;
const EMISSIONS_PER_TREE = 0;
const EMISSIONS_PER_WRONG_ANSWER = 1;
const EMISSIONS_REDUCTION_PER_WATER = 5;

let score = 0;
let emissions = INITIAL_EMISSIONS;
let trees = [];
let currentQuestion = 0;
let currentQuestions = [];
let gameTimer;
let isGameWon = false;

const questions = [
    {
        question: "什麼是「淨零排放」？",
        options: ["完全不使用能源", "溫室氣體排放量與吸收量達到平衡", "只使用太陽能", "停止所有工業生產"],
        correct: 1
    },
    {
        question: "以下哪個不是再生能源？",
        options: ["太陽能", "風力發電", "煤炭", "地熱能"],
        correct: 2
    },
    {
        question: "什麼是「碳足跡」？",
        options: ["腳印的大小", "產品生命週期的碳排放量", "二氧化碳的重量", "鞋子的尺寸"],
        correct: 1
    },
    {
        question: "溫室效應主要是由什麼氣體造成？",
        options: ["氧氣", "氮氣", "二氧化碳", "氫氣"],
        correct: 2
    },
    {
        question: "什麼是「綠建築」？",
        options: ["用綠色油漆的建築", "節能環保的建築設計", "種滿植物的建築", "建在公園裡的建築"],
        correct: 1
    },
    {
        question: "以下哪個行為最能減少碳排放？",
        options: ["使用一次性餐具", "搭乘大眾運輸", "開啟空調時不關窗", "每天更換新衣服"],
        correct: 1
    },
    {
        question: "什麼是「循環經濟」？",
        options: ["經濟週期循環", "資源重複使用的經濟模式", "股市漲跌循環", "工廠生產循環"],
        correct: 1
    },
    {
        question: "地球暖化可能造成什麼影響？",
        options: ["海平面下降", "極地冰層增加", "海平面上升", "全球溫度下降"],
        correct: 2
    },
    {
        question: "什麼是「碳權交易」？",
        options: ["買賣碳製品", "交易碳排放配額", "販賣二氧化碳", "碳稅收取"],
        correct: 1
    },
    {
        question: "以下哪個不是節能方式？",
        options: ["使用LED燈泡", "選用節能電器", "長期開啟待機電源", "適時關閉不需要的電源"],
        correct: 2
    },
    {
        question: "海洋污染主要來源是什麼？",
        options: ["魚類", "塑膠垃圾", "海藻", "珊瑚"],
        correct: 1
    },
    {
        question: "什麼是「生物多樣性」？",
        options: ["生物種類的豐富程度", "生物的大小差異", "生物的顏色變化", "生物的數量"],
        correct: 0
    },
    {
        question: "以下哪個是最環保的能源？",
        options: ["核能", "太陽能", "煤炭", "天然氣"],
        correct: 1
    },
    {
        question: "減少使用塑膠袋的原因是？",
        options: ["價格太貴", "不方便攜帶", "難以分解污染環境", "容易破損"],
        correct: 2
    },
    {
        question: "什麼是「永續發展」？",
        options: ["經濟持續發展", "滿足當代需求且不損及後代發展", "科技不斷進步", "企業持續獲利"],
        correct: 1
    },
    {
        question: "以下哪個不是可再生能源的例子？",
        options: ["太陽能", "風能", "核裂變", "生物質能"],
        correct: 2
    },
    {
        question: "什麼是「碳稅」？",
        options: ["對碳排放徵稅", "碳交易的稅收", "購買碳產品的稅", "碳足跡的稅"],
        correct: 0
    },
    {
        question: "哪個行業是最大的二氧化碳排放源？",
        options: ["運輸業", "工業", "農業", "住宅"],
        correct: 1
    },
    {
        question: "什麼是「碳中和」？",
        options: ["不產生碳排放", "碳排放量等於碳吸收量", "僅使用再生能源", "完全停止工業活動"],
        correct: 1
    },
    {
        question: "以下哪個不是節水方法？",
        options: ["修補漏水的水龍頭", "使用節水型設備", "長時間開著水龍頭刷牙", "收集雨水灌溉"],
        correct: 2
    },
    {
        question: "什麼是「綠色能源」？",
        options: ["核能", "太陽能", "化石燃料", "天然氣"],
        correct: 1
    },
    {
        question: "以下哪個是可降解塑膠？",
        options: ["PET", "PE", "PLA", "PVC"],
        correct: 2
    },
    {
        question: "什麼是「風能」？",
        options: ["利用太陽光發電", "利用水流發電", "利用風力發電", "利用地熱發電"],
        correct: 2
    },
    {
        question: "什麼是「綠色住宅」？",
        options: ["塗上綠色油漆的住宅", "使用環保材料和技術的住宅", "種滿植物的住宅", "建在公園裡的住宅"],
        correct: 1
    },
    {
        question: "以下哪個不是溫室氣體？",
        options: ["二氧化碳", "甲烷", "氮氣", "一氧化二氮"],
        correct: 2
    },
    {
        question: "什麼是「綠色消費者」？",
        options: ["只購買綠色產品的人", "選擇環保產品的消費者", "購買所有可再生產品的人", "使用二手商品的人"],
        correct: 1
    },
    {
        question: "以下哪個不是可持續發展目標（SDGs）的一部分？",
        options: ["消除貧困", "達到性別平等", "增加化石燃料使用", "促進經濟成長"],
        correct: 2
    },
    {
        question: "什麼是「再生能源」？",
        options: ["無限供應的能源", "能夠自然補充的能源", "從化石燃料中提取的能源", "不可再生的能源"],
        correct: 1
    },
    {
        question: "減少電子垃圾的方法是？",
        options: ["購買更多電子產品", "延長電子產品的使用壽命", "隨意丟棄電子產品", "進行電子產品回收"],
        correct: 1
    },
    {
        question: "什麼是「綠色交通」？",
        options: ["只使用私家車", "使用公共交通和非機動交通工具", "增加機動車的數量", "長時間駕駛"],
        correct: 1
    },
    {
        question: "以下哪個是節能燈泡？",
        options: ["白熾燈泡", "螢光燈", "LED燈", "鹵素燈"],
        correct: 2
    },
    {
        question: "什麼是「可持續漁業」？",
        options: ["過度捕撈魚類", "科學管理漁業資源", "非法捕魚", "只釣大型魚類"],
        correct: 1
    },
    {
        question: "以下哪項是最浪費能源的行為？",
        options: ["使用省電燈泡", "夏天冷氣設定在18度", "使用電扇", "開窗通風"],
        correct: 1
    },
    {
        question: "什麼是「綠色供應鏈」？",
        options: ["只從本地供應商購買", "整合環保理念於供應鏈管理中", "縮短供應鏈距離", "只使用塑膠包裝"],
        correct: 1
    },
    {
        question: "以下哪個不是碳捕捉技術的一部分？",
        options: ["捕捉二氧化碳", "儲存二氧化碳", "轉化二氧化碳", "增加二氧化碳排放"],
        correct: 3
    },
    {
        question: "什麼是「低碳生活」？",
        options: ["增加能源消耗", "減少碳排放的生活方式", "只使用電動汽車", "完全不使用化石燃料"],
        correct: 1
    },
    {
        question: "以下哪個不是廢物減量的方法？",
        options: ["重複使用物品", "回收利用資源", "增加包裝材料", "選擇無包裝產品"],
        correct: 2
    },
    {
        question: "什麼是「綠色建材」？",
        options: ["環保材料", "傳統建材", "塑膠材料", "金屬材料"],
        correct: 0
    },
    {
        question: "什麼是「綠色金融」？",
        options: ["支持環保和可持續發展項目的金融活動", "專注於高風險投資的金融活動", "只投資於科技公司的金融活動", "支持傳統能源項目的金融活動"],
        correct: 0
    }
];

class Tree {
    constructor(element) {
        this.element = element;
        this.waterCount = 0;
        this.stage = 0;
        this.isFullyGrown = false;
        this.absorption = 0.1;
        this.updateAppearance();
    }

    water() {
        if (this.waterCount < 4) {
            this.waterCount++;
            this.stage = Math.min(Math.floor(this.waterCount), 3);
            this.updateAbsorption();
            this.updateAppearance();
            this.showWaterEffect();
            return true;
        }
        return false;
    }

    updateAbsorption() {
        const absorptionRates = [0.1, 0.2, 0.3, 0.4];
        this.absorption = absorptionRates[this.stage];
        if (this.stage === 3) this.isFullyGrown = true;
    }

    updateAppearance() {
        const stages = ['tree-sapling', 'tree-small', 'tree-medium', 'tree-full'];
        this.element.className = `tree ${stages[this.stage]}`;
        this.element.innerHTML = '<div class="trunk"></div><div class="leaves"></div>';
    }

    showWaterEffect() {
        const waterDrop = document.createElement('div');
        waterDrop.className = 'water-drop';
        waterDrop.textContent = '💧';
        this.element.appendChild(waterDrop);
        setTimeout(() => waterDrop.remove(), 1000);
    }
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    initGame();
    startGameTimer();
}

function initGame() {
    score = 0;
    emissions = INITIAL_EMISSIONS;
    trees = [];
    currentQuestion = 0;
    isGameWon = false;
    document.getElementById('treeContainer').innerHTML = '';
    getRandomQuestions();
    showQuestion();
    updateGameStatus();
}

function startGameTimer() {
    if (gameTimer) clearInterval(gameTimer);
    gameTimer = setInterval(() => {
        const totalAbsorption = trees.reduce((sum, tree) => sum + tree.absorption, 0);
        emissions = Math.max(0, emissions + EMISSION_RATE - totalAbsorption);
        updateGameStatus();
    }, 1000);
}

function getRandomQuestions() {
    currentQuestions = [...questions].sort(() => Math.random() - 0.5);
}

function showQuestion() {
    if (currentQuestion >= currentQuestions.length) {
        currentQuestion = 0;
        getRandomQuestions();
    }
    
    const q = currentQuestions[currentQuestion];
    document.getElementById('questionText').textContent = q.question;

    const options = document.querySelectorAll('.option');
    options.forEach((option, index) => {
        option.querySelector('.option-text').textContent = q.options[index];
        option.className = 'option';
    });
}

function checkAnswer(choice) {
    const q = currentQuestions[currentQuestion];
    const options = document.querySelectorAll('.option');

    if (choice === q.correct) {
        options[choice].classList.add('correct');
        score += 10;
    } else {
        options[choice].classList.add('wrong');
        options[q.correct].classList.add('correct');
        emissions += EMISSIONS_PER_WRONG_ANSWER;
    }

    updateGameStatus();

    setTimeout(() => {
        currentQuestion++;
        showQuestion();
    }, 1500);
}

function plantSapling() {
    if (score >= SAPLING_COST) {
        score -= SAPLING_COST;
        const treeElement = document.createElement('div');
        const tree = new Tree(treeElement);
        trees.push(tree);
        document.getElementById('treeContainer').appendChild(treeElement);
        emissions += EMISSIONS_PER_TREE;
        updateGameStatus();
    }
}

function waterTree() {
    if (score >= WATER_COST && trees.length > 0) {
        const treeToWater = trees.find(tree => !tree.isFullyGrown);
        if (treeToWater && treeToWater.water()) {
            score -= WATER_COST;
            emissions -= EMISSIONS_REDUCTION_PER_WATER;
            updateGameStatus();
        }
    }
}

function updateGameStatus() {
    document.getElementById('scoreValue').textContent = Math.floor(score);
    document.getElementById('treeCount').textContent = trees.length;
    document.getElementById('emissionValue').textContent = emissions.toFixed(1);

    document.getElementById('plantButton').disabled = score < SAPLING_COST;
    document.getElementById('waterButton').disabled = score < WATER_COST || !trees.find(tree => !tree.isFullyGrown);

    // 檢查勝利條件
    if (emissions <= 0 && !isGameWon) {
        isGameWon = true;
        clearInterval(gameTimer);
        showVictoryScreen();
    }
}

function showVictoryScreen() {
    document.getElementById('victoryScreen').style.display = 'flex';
    document.getElementById('finalTrees').textContent = trees.length;
    document.getElementById('finalScore').textContent = score;
}

function restartGame() {
    document.getElementById('victoryScreen').style.display = 'none';
    initGame();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('startScreen').style.display = 'flex';
    document.getElementById('gameContainer').style.display = 'none';
});