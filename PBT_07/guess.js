function startGame() {
    const targetNumber = Math.floor(Math.random() * 100) + 1;
    let attempts = 0;
    const maxAttempts = 7;
    let guessedNumbers = [];

    alert("Chào mừng đến với trò chơi Đoán Số! Máy đã chọn 1 số từ 1-100. Bạn có 7 lượt đoán.");

    while (attempts < maxAttempts) {
        let input = prompt(`Lượt ${attempts + 1}/${maxAttempts}. Nhập số dự đoán (1-100):`);
        
        // Hủy nếu user bấm Cancel
        if (input === null) {
            alert("Bạn đã thoát game.");
            return;
        }

        let guess = Number(input);

        // Validate
        if (isNaN(guess) || guess < 1 || guess > 100) {
            alert("Vui lòng chỉ nhập số từ 1 đến 100!");
            continue; 
        }

        // Check số trùng
        if (guessedNumbers.includes(guess)) {
            alert("Bạn đã đoán số này rồi! Vui lòng thử số khác.");
            continue; 
        }

        guessedNumbers.push(guess);
        attempts++;

        if (guess === targetNumber) {
            alert(`Đúng rồi! Bạn đoán đúng sau ${attempts} lần!`);
            return;
        } else if (guess > targetNumber) {
            alert("Thấp hơn!");
        } else {
            alert("Cao hơn!");
        }
    }

    alert(`Rất tiếc, bạn đã hết lượt. Đáp án đúng là: ${targetNumber}`);
}

// Tự động gọi khi load trang
setTimeout(startGame, 500);