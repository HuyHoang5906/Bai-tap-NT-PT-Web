# PHẦN A — KIỂM TRA ĐỌC HIỂU (15 điểm)

## Câu A1 — DOM Tree & Selectors

### 1. Sơ đồ cây (DOM Tree)

```text
div#app
├── header
│   ├── h1 (Text: Todo App)
│   └── nav
│       ├── a.active (Text: All)
│       ├── a (Text: Active)
│       └── a (Text: Completed)
└── main
    ├── form#todoForm
    │   ├── input#todoInput
    │   └── button (Text: Add)
    └── ul#todoList
        ├── li.todo-item (Text: Learn HTML)
        └── li.todo-item.completed (Text: Learn CSS)
```

### 2. Viết querySelector

| Yêu cầu                         | Câu lệnh                                                                          |
| ------------------------------- | --------------------------------------------------------------------------------- |
| Chọn thẻ `<h1>`                 | `document.querySelector("h1")`                                                    |
| Chọn input trong form           | `document.querySelector("#todoInput")`                                            |
| Chọn tất cả `.todo-item`        | `document.querySelectorAll(".todo-item")`                                         |
| Chọn link đang active           | `document.querySelector(".active")` hoặc `document.querySelector("nav a.active")` |
| Chọn `<li>` đầu tiên            | `document.querySelector("#todoList li:first-child")`                              |
| Chọn tất cả `<a>` trong `<nav>` | `document.querySelectorAll("nav a")`                                              |

---

## Câu A2 — innerHTML vs textContent

### 1. Sự khác nhau và khi nào sử dụng

#### innerHTML

* Đọc hoặc ghi nội dung dưới dạng HTML.
* Trình duyệt sẽ phân tích và render các thẻ HTML.
* Có thể tạo giao diện động từ chuỗi HTML.

Ví dụ:

```javascript
element.innerHTML = "<b>Hello</b>";
```

Kết quả hiển thị:

**Hello**

#### textContent

* Đọc hoặc ghi nội dung dưới dạng văn bản thuần.
* Không phân tích HTML.
* An toàn khi hiển thị dữ liệu do người dùng nhập.

Ví dụ:

```javascript
element.textContent = "<b>Hello</b>";
```

Kết quả hiển thị:

```text
<b>Hello</b>
```

### 2. Lỗ hổng XSS (Cross-Site Scripting)

#### Tại sao nguy hiểm?

Nếu người dùng nhập mã HTML hoặc JavaScript độc hại và ứng dụng sử dụng `innerHTML`, trình duyệt có thể thực thi đoạn mã đó.

Ví dụ:

```html
<img src="x" onerror="alert('Hacked')">
```

Hậu quả:

* Đánh cắp cookie.
* Chiếm quyền phiên đăng nhập.
* Thay đổi nội dung trang web.
* Chèn mã độc vào hệ thống.

#### Cách khắc phục

Sử dụng `textContent` thay cho `innerHTML`.

```javascript
document.querySelector("#result").textContent = userInput;
```

---

## Câu A3 — Event Bubbling

### 1. Output khi click vào button (Mặc định)

Do cơ chế Event Bubbling, sự kiện lan từ phần tử con lên phần tử cha.

Kết quả:

```text
BUTTON
INNER
OUTER
```

### 2. Output khi sử dụng e.stopPropagation()

```javascript
button.addEventListener("click", function(e){
    e.stopPropagation();
    console.log("BUTTON");
});
```

Kết quả:

```text
BUTTON
```

Giải thích:

`e.stopPropagation()` ngăn sự kiện tiếp tục lan lên các phần tử cha.

---

# PHẦN C — DEBUG & PHÂN TÍCH (15 điểm)

## Câu C1 — Debug DOM Code

### Các lỗi và cách khắc phục

### Lỗi 1: Sai tên sự kiện

Sai:

```javascript
addEventListener("onclick", ...)
```

Đúng:

```javascript
addEventListener("click", ...)
```

---

### Lỗi 2: Gán đè biến DOM

Sai:

```javascript
countDisplay = count;
```

Đúng:

```javascript
countDisplay.textContent = count;
```

---

### Lỗi 3: Gọi hàm thiếu dấu ngoặc

Sai:

```javascript
item.remove;
```

Đúng:

```javascript
item.remove();
```

---

### Lỗi 4: Dữ liệu localStorage là String

Sai:

```javascript
count = localStorage.getItem("count");
```

Đúng:

```javascript
count = parseInt(localStorage.getItem("count")) || 0;
```

---

### Lỗi 5: Xóa nội dung bằng null

Sai:

```javascript
historyList.innerHTML = null;
```

Đúng:

```javascript
historyList.innerHTML = "";
```

---

### Lỗi 6: Truyền this không rõ ràng

Nên sửa:

```javascript
deleteHistory(li);
```

thay vì phụ thuộc vào:

```javascript
this
```

---

### Lỗi 7: Dùng innerHTML cho dữ liệu văn bản

Sai:

```javascript
countDisplay.innerHTML = count;
```

Đúng:

```javascript
countDisplay.textContent = count;
```

---

## Câu C2 — Performance

### 1. Tại sao bind 1000 events là Bad Practice?

Nếu mỗi phần tử DOM đều có một Event Listener riêng:

```javascript
items.forEach(item => {
    item.addEventListener("click", handler);
});
```

thì:

* Tốn bộ nhớ.
* Tăng thời gian render.
* Khó quản lý.
* Dễ gây lag khi số lượng phần tử lớn.

### Giải pháp: Event Delegation

Chỉ gắn một sự kiện cho phần tử cha:

```javascript
list.addEventListener("click", (e) => {
    if (e.target.matches(".item")) {
        console.log("Clicked");
    }
});
```

Ưu điểm:

* Tiết kiệm bộ nhớ.
* Hiệu năng tốt hơn.
* Dễ bảo trì.

---

### 2. Refactor bằng DocumentFragment

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
    const div = document.createElement("div");
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

### Giải thích

`DocumentFragment` là vùng nhớ tạm không nằm trong DOM thật.

Thay vì:

```javascript
for (...) {
    document.body.appendChild(div);
}
```

gây ra rất nhiều lần Reflow và Repaint,

ta thêm tất cả phần tử vào Fragment trước, sau đó đưa vào DOM một lần duy nhất.

Ưu điểm:

* Giảm số lần Reflow.
* Giảm số lần Repaint.
* Tăng tốc độ render đáng kể.
* Tối ưu hiệu năng cho danh sách lớn.

---
