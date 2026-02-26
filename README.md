# MGC Futures Risk Monitor
MGC 微型黃金期貨風險監控計算器

## 專案功能
這是一個專為 Micro Gold Futures (MGC) 設計的風險監控工具，幫助交易者實時計算權益與風險。

### 主要特點
- **實時監控**：計算美金/台幣總權益。
- **風險指標**：自動計算保證金維持率與風險等級（安全、注意、危險）。
- **財務建議**：根據當前風險水位提供具體操作建議。
- **多語言支援**：支援 **正體中文** 與 **English** 切換。
- **RWD 設計**：針對行動裝置（如 iPhone 17 Pro Max）優化的介面。
- **本地記憶 (Local Storage)**：自動保留使用者設定的保證金、權益總值與持倉數量，下次開啟不需重新輸入。
- **便利操作**：持倉欄位提供平行且適配高度的增減箭頭，提升操作體驗。
- **PWA (網頁應用程式) 支援**：支援 iPhone 及桌機將網頁加入主畫面作為獨立 APP 執行，擁有專屬的微金風控 APP 圖示。

## TODO
- [ ] **串接 API**：整合即時報價 API 以獲取最新的 MGC 價格與匯率 (Connect Real-time API)。

## 技術棧
- React 19 + TypeScript
- Vite
- Tailwind CSS

## 開始使用
1. 安裝依賴：`npm install`
2. 啟動開發伺服器：`npm run dev`
3. 建置專案：`npm run build`
