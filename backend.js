const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(express.json());

// 提供 front.html 當作首頁
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'front.html'));
});

// 使用資料庫連接資訊
const pool = new Pool({
    connectionString: 'postgresql://toeic_score_user:FsgMhnWBlNPYhg8vHHqKK3TTV8QgRwFk@dpg-cv0j89dumphs739q623g-a/toeic_score',
    ssl: { rejectUnauthorized: false },
});

const cors = require('cors');
app.use(cors());

// 處理 JSON 請求
app.use(express.json());

// 查詢成績 API
app.post('/search', async (req, res) => {
    const { student_id } = req.body;

    try {
        const query = 'SELECT listening, reading, total FROM toeic_score WHERE id = $1';
        const result = await pool.query(query, [student_id]);

        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.json({ error: '找不到此學號的成績' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: '伺服器發生錯誤' });
    }
});

app.listen(port, () => {
    console.log(`後端伺服器正在運行於 http://localhost:${port}`);
});
