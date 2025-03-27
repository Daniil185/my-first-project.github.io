const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static(__dirname));

app.post("/upload", (req, res) => {
    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ error: "Нет изображения" });
    }

    const base64Data = image.replace(/^data:image\\/png;base64,/, "");
    const filePath = path.join(__dirname, `selfie_${Date.now()}.png`);

    fs.writeFile(filePath, base64Data, "base64", (err) => {
        if (err) {
            return res.status(500).json({ error: "Ошибка сохранения" });
        }
        res.json({ message: "Изображение сохранено", filePath });
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});
