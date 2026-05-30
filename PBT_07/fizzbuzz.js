// Version 1: Classic
console.log("--- CLASSIC FIZZBUZZ ---");
for (let i = 1; i <= 100; i++) {
    let output = "";
    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";
    // In ra chuỗi chữ hoặc số i nếu chuỗi rỗng
    console.log(output || i);
}

// Version 2: Custom
console.log("\n--- CUSTOM FIZZBUZZ ---");
function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        
        // Duyệt qua từng luật
        for (let j = 0; j < rules.length; j++) {
            if (i % rules[j].divisor === 0) {
                output += rules[j].word;
            }
        }
        
        console.log(output || i);
    }
}

// Test
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);