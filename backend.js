// const express = require('express');
// const { Pool } = require('pg');
// const app = express();
// const port = 3000;

// app.use(express.json());

// // 提供 front.html 當作首頁
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'front.html'));
// });

// // 使用資料庫連接資訊
// const pool = new Pool({
//     connectionString: 'postgresql://toeic_score_user:FsgMhnWBlNPYhg8vHHqKK3TTV8QgRwFk@dpg-cv0j89dumphs739q623g-a/toeic_score',
//     ssl: { rejectUnauthorized: false },
// });

// const cors = require('cors');
// app.use(cors());

// // 處理 JSON 請求
// app.use(express.json());

// // 查詢成績 API
// app.post('/search', async (req, res) => {
//     const { student_id } = req.body;

//     try {
//         const query = 'SELECT listening, reading, total FROM toeic_score WHERE id = $1';
//         const result = await pool.query(query, [student_id]);

//         if (result.rows.length > 0) {
//             res.json(result.rows[0]);
//         } else {
//             res.json({ error: '找不到此學號的成績' });
//         }
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: '伺服器發生錯誤' });
//     }
// });

// app.listen(port, () => {
//     console.log(`後端伺服器正在運行於 http://localhost:${port}`);
// });

const express = require('express');
const path = require('path'); // 確保引入 path 模組以處理檔案路徑
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000; // 支援雲端環境的動態 PORT 配置

// 啟用 CORS 支援
app.use(cors());

// 處理 JSON 請求
app.use(express.json());

// 提供 front.html 作為首頁
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front.html')); // 確保 front.html 位於專案根目錄
});

// 設定資料庫連接資訊
const pool = new Pool({
    connectionString: 'postgresql://students_scores_user:EhSlv8R4mvevVAl0WUvNBWnUh3Nibnfr@dpg-d0uojgadbo4c73bqsk30-a/students_scores',
    ssl: { rejectUnauthorized: false }, // 啟用 SSL 並關閉 SSL 憑證驗證以支援雲端資料庫
});

// 查詢成績 API
app.post('/search', async (req, res) => {
    const { student_id } = req.body; // 接收來自前端的學生學號

    try {
        // 執行資料庫查詢
        const query = 'SELECT listening, reading, total FROM students_scores WHERE id = $1';
        const result = await pool.query(query, [student_id]);

        // 傳回查詢結果或錯誤訊息
        if (result.rows.length > 0) {
            res.json(result.rows[0]); // 回傳查詢成功的成績
        } else {
            res.status(404).json({ error: '找不到此學號的成績' }); // 回傳錯誤訊息
        }
    } catch (err) {
        console.error('資料庫查詢發生錯誤:', err); // 輸出詳細錯誤供除錯
        res.status(500).json({ error: '伺服器發生錯誤' }); // 回傳內部伺服器錯誤
    }
});

// 啟動伺服器
app.listen(port, () => {
    console.log(`伺服器正在運行於 http://localhost:${port}`);
});
