/**
 * 擲筊網頁核心邏輯 (app.js)
 * 
 * 這是一個適合初學者的範例，展示了：
 * 1. DOM 元素選取與控制
 * 2. 隨機數運算 (Math.random)
 * 3. CSS 動畫與 JavaScript 的配合 (classList)
 * 4. 歷史紀錄的儲存與顯示
 */

// 1. 選取網頁中需要控制的元素
const tossBtn = document.getElementById('toss-btn');       // 擲筊按鈕
const leftBlock = document.getElementById('left-block');   // 左側筊杯
const rightBlock = document.getElementById('right-block'); // 右側筊杯
const resultText = document.getElementById('result-text'); // 結果文字顯示區
const historyList = document.getElementById('history-list'); // 歷史紀錄列表

// 2. 定義擲筊邏輯函數
async function tossBwaBwei() {
    // 禁用按鈕，防止在動畫期間連點
    tossBtn.disabled = true;
    resultText.innerText = "拋擲中...";

    // --- 第一步：觸發動畫 ---
    // 先移除可能存在的結果類別
    leftBlock.classList.remove('is-curved-up');
    rightBlock.classList.remove('is-curved-up');
    
    // 加上拋擲動畫類別
    leftBlock.classList.add('tossing');
    rightBlock.classList.add('tossing');

    // --- 第二步：產生隨機結果 ---
    // Math.random() 會產生 0 到 1 之間的隨機數
    // 0 代表「平面朝上」 (Flat Up)
    // 1 代表「凸面朝上」 (Curved Up)
    const resA = Math.floor(Math.random() * 2);
    const resB = Math.floor(Math.random() * 2);

    // 等待動畫播放完畢 (CSS 動畫設定為 0.8s)
    await new Promise(resolve => setTimeout(resolve, 800));

    // --- 第三步：移除動畫類別並顯示最終面像 ---
    leftBlock.classList.remove('tossing');
    rightBlock.classList.remove('tossing');

    // 根據隨機結果決定是否旋轉筊杯 (加上旋轉 180 度的類別)
    if (resA === 1) leftBlock.classList.add('is-curved-up');
    if (resB === 1) rightBlock.classList.add('is-curved-up');

    // --- 第四步：判斷結果名稱 ---
    let result = "";
    if (resA !== resB) {
        // 一平一凸
        result = "聖筊";
    } else if (resA === 0 && resB === 0) {
        // 兩平
        result = "笑筊";
    } else {
        // 兩凸
        result = "陰筊";
    }

    // 更新顯示文字
    resultText.innerText = `結果為：${result}`;
    
    // --- 第五步：記錄結果 ---
    addHistory(result);

    // 恢復按鈕功能
    tossBtn.disabled = false;
}

// 3. 歷史紀錄功能
function addHistory(result) {
    const li = document.createElement('li');
    li.className = 'history-item';
    
    // 取得當前時間
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    li.innerHTML = `
        <span>${timeStr}</span>
        <span class="history-res-tag res-${result}">${result}</span>
    `;

    // 將新紀錄插入最上方
    historyList.prepend(li);
}

// 4. 綁定按鈕點擊事件
tossBtn.addEventListener('click', tossBwaBwei);

// 初始化提示
console.log("擲筊程式載入成功！請點擊按鈕開始。");
