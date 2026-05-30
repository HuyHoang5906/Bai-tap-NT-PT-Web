function createCart() {
    // Private data (Closure bảo vệ mảng này)
    let items = [];
    let activeDiscount = 0; // Lưu phần trăm giảm hoặc tiền giảm

    return {
        addItem(product, quantity = 1) {
            const existingItem = items.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                items.push({ ...product, quantity });
            }
        },
        
        removeItem(productId) {
            items = items.filter(item => item.id !== productId);
        },
        
        updateQuantity(productId, newQuantity) {
            if (newQuantity <= 0) return this.removeItem(productId);
            const item = items.find(i => i.id === productId);
            if (item) item.quantity = newQuantity;
        },
        
        getTotal() {
            const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            if (activeDiscount < 1) { // Giảm theo phần trăm (vd: 0.1, 0.2)
                return subtotal * (1 - activeDiscount);
            } else { // Giảm tiền mặt (vd: 30000)
                return subtotal - activeDiscount;
            }
        },
        
        applyDiscount(code) {
            if (code === "SALE10") activeDiscount = 0.1;
            else if (code === "SALE20") activeDiscount = 0.2;
            else if (code === "FREESHIP") activeDiscount = 30000;
            else activeDiscount = 0;
        },
        
        printCart() {
            console.log("┌──────────────────────────────────────────────┐");
            console.log("│ # │ Sản phẩm      │ SL │ Đơn giá     │ Tổng        │");
            items.forEach((item, index) => {
                const name = item.name.padEnd(13);
                const qty = String(item.quantity).padStart(2);
                const price = item.price.toLocaleString('vi-VN').padStart(11);
                const total = (item.price * item.quantity).toLocaleString('vi-VN').padStart(11);
                console.log(`│ ${index + 1} │ ${name} │ ${qty} │ ${price} │ ${total} │`);
            });
            console.log("├──────────────────────────────────────────────┤");
            const finalTotal = this.getTotal().toLocaleString('vi-VN') + "đ";
            console.log(`│ Tổng cộng:                       ${finalTotal.padStart(11)} │`);
            console.log("└──────────────────────────────────────────────┘");
        },
        
        getItemCount() {
            return items.reduce((sum, item) => sum + item.quantity, 0);
        },
        
        clearCart() {
            items = [];
            activeDiscount = 0;
        }
    };
}

// === TEST ===
const cart = createCart();
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1);
cart.addItem({ id: 3, name: "AirPods Pro", price: 6990000 }, 2);
cart.addItem({ id: 1, name: "iPhone 16", price: 25990000 }, 1); // Tăng lên 2

cart.printCart();

cart.applyDiscount("SALE10");
cart.printCart();

console.log("Số SP:", cart.getItemCount()); // → 4
cart.removeItem(3);
console.log("Sau xóa:", cart.getItemCount()); // → 2