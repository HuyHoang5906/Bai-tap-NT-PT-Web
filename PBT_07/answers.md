# PHẦN A — KIỂM TRA ĐỌC HIỂU (JAVASCRIPT BASICS)

## Câu A1 — var / let / const

Dưới đây là dự đoán kết quả và giải thích chi tiết về cơ chế hoạt động của JavaScript cho từng đoạn code:

**1. Đoạn 1: Hoisting với `var`**
* **Kết quả:** In ra `undefined`.
* **Giải thích:** JavaScript có cơ chế **Hoisting** (kéo phần khai báo lên đầu). Trình biên dịch sẽ hiểu đoạn code này là: khai báo `var x;` ở trên cùng, sau đó gọi `console.log(x)` (lúc này `x` chưa có giá trị nên là `undefined`), và cuối cùng mới gán `x = 5`.

**2. Đoạn 2: Hoisting với `let` và TDZ**
* **Kết quả:** Báo lỗi `ReferenceError: Cannot access 'y' before initialization`.
* **Giải thích:** Tương tự `var`, biến `let` cũng được hoisting lên đầu scope. Tuy nhiên, nó bị đưa vào một vùng gọi là **Temporal Dead Zone (TDZ - Vùng chết tạm thời)**. Bạn không thể truy cập vào biến `let` cho đến khi luồng thực thi chạy tới dòng gán giá trị của nó.

**3. Đoạn 3: Tính bất biến của `const`**
* **Kết quả:** Báo lỗi `TypeError: Assignment to constant variable`.
* **Giải thích:** Từ khóa `const` dùng để khai báo hằng số. Với các kiểu dữ liệu nguyên thủy (Primitive types như Number, String), sau khi đã khởi tạo giá trị ban đầu (`15`), bạn tuyệt đối không thể gán lại cho nó một giá trị khác (`20`).

**4. Đoạn 4: `const` với kiểu Tham chiếu (Reference Types)**
* **Kết quả:** In ra `[1, 2, 3, 4]`.
* **Giải thích:** Khi dùng `const` với Mảng (Array) hoặc Đối tượng (Object), `const` chỉ bảo vệ **địa chỉ ô nhớ (tham chiếu)** chứa mảng đó, ngăn không cho gán bằng một mảng hoàn toàn mới. Tuy nhiên, bạn hoàn toàn có thể thay đổi, thêm, bớt **nội dung bên trong** ô nhớ đó (sử dụng hàm `push`).

**5. Đoạn 5: Phạm vi khối (Block Scope)**
* **Kết quả:** In ra `Trong block: 2` và `Ngoài block: 1`.
* **Giải thích:** Từ khóa `let` và `const` tuân theo **Block Scope** (phạm vi khối — giới hạn bởi cặp ngoặc nhọn `{}`). Biến `a = 2` bên trong khối là một biến hoàn toàn độc lập, che khuất biến `a = 1` ở bên ngoài. Khi khối `{}` kết thúc, biến `a = 2` bị hủy, trả lại quyền truy cập cho biến `a = 1` bên ngoài.

---

## Câu A2 — Data Types & Coercion (Ép kiểu)

**1. Dự đoán kết quả typeof:**
* `typeof null` ➔ `"object"` (Đây là một lỗi lịch sử đã được công nhận của JavaScript từ những ngày đầu và không được sửa để tránh làm hỏng các website cũ).
* `typeof undefined` ➔ `"undefined"`
* `typeof NaN` ➔ `"number"` (Lưu ý: `NaN` mang nghĩa là "Not a Number" - Không phải là một số hợp lệ, nhưng bản thân kiểu dữ liệu của nó vẫn được phân loại là dạng Số).

**2. Dự đoán kết quả tính toán:**
* `"5" + 3` ➔ `"53"`
* `"5" - 3` ➔ `2`
* `"5" * "3"` ➔ `15`
* `true + true` ➔ `2`
* `[] + []` ➔ `""` (Chuỗi rỗng)
* `[] + {}` ➔ `"[object Object]"`
* `{} + []` ➔ `0` (Trong console) hoặc `"[object Object]"` (Tùy thuộc vào cách trình biên dịch hiểu `{}` là một khối lệnh trống hay một object rỗng).

**3. Giải thích sự khác biệt giữa `"5" + 3` và `"5" - 3`:**
Trong JavaScript có khái niệm **Type Coercion (Ép kiểu ngầm định)**:
* **Phép cộng (`+`) bị quá tải (overloaded):** Khi thực hiện phép `+`, nếu có ít nhất một toán hạng là Chuỗi (String), JavaScript sẽ ưu tiên thực hiện việc **Nối chuỗi**. Nó sẽ ép kiểu số `3` thành chuỗi `"3"` và nối với `"5"`, tạo ra `"53"`.
* **Phép trừ (`-`):** Phép trừ (cũng như nhân, chia) chỉ có một ý nghĩa duy nhất là tính toán toán học. Do đó, JavaScript bắt buộc phải thực hiện **Numeric Coercion (Ép về kiểu số)**, biến chuỗi `"5"` thành số `5` để trừ đi `3`, cho ra kết quả là `2`.

---

## Câu A3 — So sánh == vs ===

**1. Dự đoán kết quả:**
* `5 == "5"` ➔ `true` (Do ép kiểu: chuỗi "5" biến thành số 5).
* `5 === "5"` ➔ `false` (Khác kiểu dữ liệu: Number khác String).
* `null == undefined` ➔ `true` (Quy tắc đặc biệt của JS: null và undefined tương đương nhau khi dùng ==).
* `null === undefined` ➔ `false` (Khác kiểu: "object" khác "undefined").
* `NaN == NaN` ➔ `false` (Quy tắc toán học: Không có giá trị vô lý nào bằng với một giá trị vô lý khác).
* `0 == false` ➔ `true` (false được ép kiểu thành số 0).
* `0 === false` ➔ `false` (Khác kiểu: Number khác Boolean).
* `"" == false` ➔ `true` (Chuỗi rỗng ép thành 0, false ép thành 0).

**2. Quy tắc thực tiễn (Best Practice):**
Từ giờ trở đi, chúng ta **LUÔN LUÔN NÊN DÙNG `===` (Strict Equality)**.
* **Lý do:** Phép `==` ngầm định ép kiểu toán hạng trước khi so sánh, dẫn đến những kết quả rất vô lý và không thể lường trước (ví dụ `"" == 0` là true). Việc dùng `===` sẽ so sánh cả **Giá trị** và **Kiểu dữ liệu**, giúp code minh bạch, an toàn, dễ dự đoán và tránh được các lỗi logic tiềm ẩn.

---

## Câu A4 — Truthy & Falsy

**1. TẤT CẢ các giá trị Falsy trong JavaScript (chỉ có 8 giá trị):**
1. `false`
2. `0` (Số 0)
3. `-0` (Số 0 âm)
4. `0n` (Số 0 kiểu BigInt)
5. `""` hoặc `''` hoặc ` `` ` (Chuỗi rỗng)
6. `null`
7. `undefined`
8. `NaN`
*Tất cả những giá trị không nằm trong danh sách này đều là Truthy.*

**2. Dự đoán vòng lặp If:**
* `if ("0")` ➔ **CÓ in ra "A"** (Chuỗi có ký tự là Truthy).
* `if ("")` ➔ **KHÔNG in** (Chuỗi rỗng là Falsy).
* `if ([])` ➔ **CÓ in ra "C"** (Mảng, dù rỗng, vẫn là Object. Object luôn là Truthy).
* `if ({})` ➔ **CÓ in ra "D"** (Object rỗng luôn là Truthy).
* `if (null)` ➔ **KHÔNG in** (Falsy).
* `if (0)` ➔ **KHÔNG in** (Falsy).
* `if (-1)` ➔ **CÓ in ra "G"** (Mọi số khác 0 đều là Truthy).
* `if (" ")` ➔ **CÓ in ra "H"** (Chuỗi chứa dấu cách không phải chuỗi rỗng nên là Truthy).

---

## Câu A5 — Template Literals

Thay vì dùng phép nối chuỗi `+` rườm rà, dễ sai sót dấu ngoặc kép, Template Literals (dùng dấu backtick ` ` `) giúp nhúng trực tiếp biến thông qua cú pháp `${}` và hỗ trợ viết chuỗi trên nhiều dòng (multiline string).

```javascript
// Cách 1: Nối chuỗi cơ bản
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;

// Cách 2: Nội suy giá trị vào URL (Rất phổ biến khi làm việc với API)
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;

// Cách 3: Viết chuỗi HTML nhiều dòng mà không cần dấu + và \n
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;

```

# PHẦN C — SUY LUẬN (20 điểm)

## Câu C1 — DEBUG JAVASCRIPT

Đoạn mã gốc chứa nhiều lỗi nghiêm trọng về logic, phạm vi biến (scope) và ép kiểu ngầm định. Dưới đây là phân tích 6 lỗi chi tiết và cách sửa:

### Phân tích lỗi:

1. **Lỗi 1: Phép gán thay vì so sánh (`if (giaSauGiam = 0)`)**
   * *Giải thích:* Dấu `=` là phép gán, biểu thức này sẽ gán giá trị 0 cho biến `giaSauGiam` và trả về `0` (falsy). Do đó, khối lệnh `if` sẽ không bao giờ được thực thi.
   * *Cách sửa:* Thay bằng toán tử so sánh tuyệt đối `===`.

2. **Lỗi 2: Trả về sai kiểu dữ liệu khi validate lỗi**
   * *Giải thích:* Khi `phanTramGiam` sai, hàm `return` một chuỗi (String) thay vì một Số (Number). Điều này làm hỏng logic tính toán ở các bước sau vì người dùng kỳ vọng nhận về một con số.
   * *Cách sửa:* Ném ra ngoại lệ bằng `throw new Error("...")` để dừng chương trình và báo lỗi.

3. **Lỗi 3: Truyền String vào phép toán (Ép kiểu ngầm định)**
   * *Giải thích:* Lời gọi hàm `tinhGiaGiamGia("100000", 20)` truyền vào một chuỗi. Dù JavaScript tự ép kiểu ngầm định khi làm phép nhân/trừ, nhưng phụ thuộc vào nó là thói quen dễ gây bug.
   * *Cách sửa:* Chủ động ép kiểu dữ liệu bằng `Number(giaBan)`.

4. **Lỗi 4: Nối chuỗi rác tạo ra kết quả vô lý**
   * *Giải thích:* Do lỗi số 2, biến `gia2` nhận vào một chuỗi thông báo lỗi. Khi thực hiện `console.log("Giá: " + gia2)`, JS tiến hành nối chuỗi, tạo ra một câu in sai hoàn toàn logic.
   * *Cách sửa:* Gọi hàm tính toán bên trong khối `try...catch` để bắt và xử lý lỗi một cách an toàn.

5. **Lỗi 5: Khai báo biến chưa tối ưu (`var` và `let`)**
   * *Giải thích:* Các biến `giamGia` và `giaSauGiam` chỉ được khởi tạo 1 lần duy nhất từ công thức, không bị thay đổi giá trị về sau.
   * *Cách sửa:* Nên dùng `const` thay cho `var/let` để code chặt chẽ và tránh biến bị ghi đè nhầm.

6. **Lỗi 6 (Lỗi Ẩn): Từ khóa `var` trong vòng lặp bất đồng bộ**
   * *Giải thích:* Vòng lặp `for` dùng `var i = 0`. Vì `var` không có Block Scope, vòng lặp chạy cực nhanh và kết thúc ngay khiến biến toàn cục `i = 5`. Khi các hàm `setTimeout` bắt đầu chạy sau 1 giây, tất cả đều truy cập vào cùng một biến `i` (đang là 5). Kết quả là in ra "Item 5" liên tiếp 5 lần.
   * *Cách sửa:* Đổi `var i` thành `let i`. Mỗi vòng lặp sẽ tạo ra một Block Scope mới, lưu giữ đúng giá trị của `i` tại thời điểm vòng lặp đó chạy.

### Code hoàn chỉnh sau khi sửa lỗi:

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
    if (phanTramGiam < 0 || phanTramGiam > 100) {
        // Sửa 2: Ném ra lỗi thay vì return chuỗi
        throw new Error("Phần trăm giảm không hợp lệ"); 
    }
    
    // Sửa 3: Chủ động ép kiểu dữ liệu đầu vào thành Số
    const gia = Number(giaBan); 
    
    // Sửa 5: Dùng const cho các biến không thay đổi
    const giamGia = (gia * phanTramGiam) / 100;
    const giaSauGiam = gia - giamGia;
    
    // Sửa 1: Dùng === thay vì =
    if (giaSauGiam === 0) {
        console.log("Sản phẩm miễn phí!");
    }
    
    return giaSauGiam;
}

// Sửa 4: Dùng try...catch để xử lý lỗi
try {
    const gia = tinhGiaGiamGia("100000", 20);
    console.log("Giá sau giảm: " + gia + "đ");
} catch (error) {
    console.error("Lỗi:", error.message);
}

try {
    const gia2 = tinhGiaGiamGia(50000, 110);
    console.log("Giá: " + gia2);
} catch (error) {
    console.error("Lỗi:", error.message); 
}

// Sửa 6: Thay var bằng let để tạo Block Scope cho vòng lặp
for (let i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log("Item " + i);
    }, 1000);
}