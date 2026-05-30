// 1. pipe() — Nối chuỗi functions
function pipe(...fns) {
    return function(initialValue) {
        return fns.reduce((value, currentFunc) => currentFunc(value), initialValue);
    };
}

const process = pipe(
    x => x * 2,        // 5 → 10
    x => x + 10,       // 10 → 20
    x => x.toString(), // 20 → "20"
    x => "Kết quả: " + x
);
console.log(process(5)); // → "Kết quả: 20"

// 2. memoize() — Cache kết quả
function memoize(fn) {
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache[key]) return cache[key];
        
        const result = fn(...args);
        cache[key] = result;
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log("Đang tính...");
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    return result;
});
console.log(expensiveCalc(100000)); // In: "Đang tính..." rồi tính
console.log(expensiveCalc(100000)); // Lấy từ cache, không in "Đang tính..."

// 3. debounce() — Chờ user ngừng gõ mới thực hiện
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}

const search = debounce((query) => {
    console.log("Searching:", query);
}, 500);
search("a");
search("ap");
search("app"); // Chỉ dòng này được chạy sau 500ms

// 4. retry() — Thử lại nếu lỗi
async function retry(fn, maxAttempts = 3) {
    for (let i = 1; i <= maxAttempts; i++) {
        try {
            return await fn();
        } catch (err) {
            if (i === maxAttempts) throw new Error(`Failed after ${maxAttempts} attempts`);
            console.log(`Lỗi ở lần ${i}, đang thử lại...`);
        }
    }
}
