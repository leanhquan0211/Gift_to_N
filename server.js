const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.post('/save', (req, res) => {
    const { text } = req.body;
    const date = new Date();
    const timeString = date.toLocaleTimeString('en-GB').replace(/:/g, '-');
    const dateString = date.toLocaleDateString('en-GB').replace(/\//g, '-');
    const fileName = `${timeString}_${dateString}.txt`;
    const dirPath = path.join('D:/Hoc_Git/Gift/Message');

    console.log('Received text:', text);
    console.log('Directory path:', dirPath);

    if (!fs.existsSync(dirPath)) {
        console.log('Directory does not exist, creating...');
        try {
            fs.mkdirSync(dirPath, { recursive: true });
        } catch (error) {
            console.error('Lỗi khi tạo thư mục:', error);
            return res.status(500).send('Lỗi khi tạo thư mục');
        }
    }

    const filePath = path.join(dirPath, fileName);
    console.log('File path:', filePath);

    try {
        fs.writeFileSync(filePath, text, 'utf8');
        console.log(`File đã được lưu tại: ${filePath}`);
        res.status(200).send(`File đã được lưu tại: ${filePath}`);
    } catch (error) {
        console.error('Lỗi khi lưu file:', error);
        res.status(500).send('Lỗi khi lưu file');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
