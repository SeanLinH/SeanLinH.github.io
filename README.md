# SeanLinH.github.io

> 林士桓 Sean Lin 的個人簡歷網站 — AI Architect ｜ Multi-Agent Systems

一個以 **溫暖編輯風（Warm Editorial）** 打造、帶有精緻互動特效的單頁式個人網站。
零建置、純靜態，直接由 GitHub Pages 提供服務。

🔗 線上網址：<https://seanlinh.github.io>

---

## ✨ 特色

- **溫暖編輯風設計**：暖米紙底、陶土橘／琥珀金點綴、Fraunces 襯線大標題
- **精緻互動特效**（皆尊重 `prefers-reduced-motion` 與觸控裝置）
  - 暖色塵粒漂浮背景（Canvas 繪製）
  - 滑鼠暖光暈柔和跟隨
  - 卡片 3D 傾斜（tilt）
  - Hero 打字機輪播身分
  - 捲動淡入進場、導覽列區塊高亮
- **響應式**：桌機、平板、手機皆適配
- **無框架、無 build step**：只有 HTML / CSS / JS 三個檔案，載入快、好維護

---

## 📁 檔案結構

```
SeanLinH.github.io/
├─ index.html            # 網站內容（每個區塊都有 ✏️ 註解教你改）
├─ assets/
│  ├─ css/style.css      # 溫暖編輯風的配色、排版與版面
│  └─ js/main.js         # 所有互動特效
└─ README.md
```

網站區塊順序：Hero → 關於我 → 技術專長 → 工作經歷／教育背景 → Harness Engineering → 演講與社群 → 聯絡。

---

## ✏️ 如何修改內容

大部分內容都寫在 `index.html`，直接改文字即可 —

| 想改什麼 | 位置 |
|---------|------|
| 姓名、標語 | `index.html` 的 Hero 區塊 |
| 打字機輪播的身分詞 | `assets/js/main.js` 頂部的 `ROLES` 陣列 |
| 技術專長標籤 | `index.html` 技術專長區的 `<span class="chip">` |
| 經歷、教育、演講 | `index.html` 對應區塊 |
| 配色 | `assets/css/style.css` 最上方的 `:root` 變數 |

> 💡 標有橘色 `[請補充]` 小標籤的地方，是待確認／填入的資訊（例如到職年月）。

---

## 🖥 本機預覽

因為使用了 Canvas 與字體等資源，建議用簡易伺服器開啟（而非直接雙擊檔案）：

```bash
python3 -m http.server 8000
# 瀏覽器開 http://localhost:8000
```

---

## 🚀 部署

這是 GitHub Pages 的 **User Site**（`<username>.github.io`），推送到 `main` 分支即自動發佈：

```bash
git add .
git commit -m "Update site content"
git push origin main
```

約 1–2 分鐘後即可在 <https://seanlinh.github.io> 看到更新。

---

## 📄 授權

個人簡歷內容 © 林士桓 Sean Shih-Huan Lin。程式碼可自由參考。
