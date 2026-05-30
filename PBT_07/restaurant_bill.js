const order = [
    { name: "Phở bò", qty: 2, price: 65000 },
    { name: "Trà đá", qty: 3, price: 5000 },
    { name: "Bún chả", qty: 1, price: 55000 }
];

const currentDay = "Wednesday"; // Giả lập ngày
let subtotal = 0;

// Tính tổng gốc
for (let i = 0; i < order.length; i++) {
    subtotal += order[i].qty * order[i].price;
}

// Tính phần trăm giảm giá
let discountPercent = 0;
if (subtotal > 1000000) {
    discountPercent = 15;
} else if (subtotal > 500000) {
    discountPercent = 10;
}

if (currentDay === "Wednesday") {
    discountPercent += 5;
}

let discountAmount = subtotal * (discountPercent / 100);
let afterDiscount = subtotal - discountAmount;

// Tính VAT và Tip
let vat = afterDiscount * 0.08;
let tip = afterDiscount * 0.05;
let finalTotal = afterDiscount + vat + tip;

// Hàm hỗ trợ format tiền (Thêm dấu chấm, vd: 130.000)
function formatMoney(num) {
    return num.toLocaleString('vi-VN');
}

// In hóa đơn
console.log("╔══════════════════════════════════════╗");
console.log("║           HÓA ĐƠN NHÀ HÀNG           ║");
console.log("╠══════════════════════════════════════╣");

for (let item of order) {
    let namePadded = item.name.padEnd(10, " ");
    let qty = `x${item.qty}`.padEnd(4, " ");
    let price = `@${item.price/1000}k`.padEnd(5, " ");
    let total = `= ${(item.qty * item.price)/1000}k`.padEnd(6, " ");
    
    // Đảm bảo đủ độ dài chuỗi để khung không bị méo (Căn chỉnh tương đối trên console)
    let line = `║ ${order.indexOf(item) + 1}. ${namePadded} ${qty} ${price} ${total} ║`;
    console.log(line);
}

console.log("╠══════════════════════════════════════╣");
console.log(`║ Tổng cộng:              ${formatMoney(subtotal).padStart(8, " ")}đ  ║`);
console.log(`║ Giảm giá (${String(discountPercent).padStart(2, " ")}%):         ${formatMoney(discountAmount).padStart(8, " ")}đ  ║`);
console.log(`║ VAT (8%):               ${formatMoney(vat).padStart(8, " ")}đ  ║`);
console.log(`║ Tip (5%):               ${formatMoney(tip).padStart(8, " ")}đ  ║`);
console.log("╠══════════════════════════════════════╣");
console.log(`║ THANH TOÁN:             ${formatMoney(finalTotal).padStart(8, " ")}đ  ║`);
console.log("╚══════════════════════════════════════╝");