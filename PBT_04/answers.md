# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

## Câu A1 (10đ) — 5 Loại Positioning

| Position | Vẫn chiếm chỗ trong flow? | Tham chiếu vị trí | Cuộn theo trang? | Use case |
|---|---|---|---|---|
| `static` | Có | Vị trí mặc định của tài liệu HTML | Có | Layout bình thường |
| `relative` | Có | So với vị trí gốc của chính nó | Có | Dịch chuyển nhẹ phần tử mà vẫn giữ chỗ cũ |
| `absolute` | Không | So với parent gần nhất có positioning | Có | Popup, badge, icon nổi |
| `fixed` | Không | So với cửa sổ trình duyệt (viewport) | Không | Navbar cố định, nút back-to-top |
| `sticky` | Có | Ban đầu như relative, sau đó bám viewport | Một phần | Menu dính khi cuộn |

---

## Giải thích thêm

### Khi nào `absolute` tham chiếu `body`?

`absolute` sẽ tham chiếu `body` khi KHÔNG có phần tử cha nào có thuộc tính:

```css
position: relative;
position: absolute;
position: fixed;
position: sticky;
```

Lúc đó phần tử sẽ lấy toàn bộ trang web làm mốc định vị.

Ví dụ:

```css
.box {
    position: absolute;
    top: 0;
    left: 0;
}
```

Nếu không có parent nào được positioning thì `.box` sẽ nằm ở góc trên bên trái của trang.

---

### Khi nào `absolute` tham chiếu parent?

Nếu phần tử cha gần nhất có `position` khác `static` thì `absolute` sẽ lấy phần tử cha đó làm mốc.

Ví dụ:

```css
.parent {
    position: relative;
}

.child {
    position: absolute;
    top: 10px;
    right: 10px;
}
```

Lúc này `.child` sẽ nằm bên trong `.parent`.

---

## Khái niệm "nearest positioned ancestor"

"Nearest positioned ancestor" nghĩa là:

> Phần tử cha gần nhất có `position` khác `static`.

Đây chính là mốc mà phần tử `absolute` dùng để tính tọa độ.

Ví dụ:

```html
<body>
    <div class="grandparent">
        <div class="parent">
            <div class="child"></div>
        </div>
    </div>
</body>
```

```css
.grandparent {
    position: relative;
}

.parent {
    position: static;
}

.child {
    position: absolute;
    top: 0;
    left: 0;
}
```

Ở đây:

- `.parent` là `static` → bị bỏ qua
- `.grandparent` là `relative` → được chọn làm mốc

Nên `.child` sẽ định vị theo `.grandparent`.

---

## Câu A2 (10đ) — Flexbox vs Grid

---

### Trường hợp 1

```css
.container { 
    display: flex; 
}

.item { 
    flex: 1; 
}
```

#### Dự đoán bố cục

- 4 item nằm trên cùng 1 hàng
- Mỗi item có chiều rộng bằng nhau

#### Sơ đồ

```text
+------+------+------+------+
| item | item | item | item |
+------+------+------+------+
```

---

### Trường hợp 2

```css
.container { 
    display: flex; 
    flex-wrap: wrap; 
}

.item { 
    width: 45%; 
    margin: 2.5%; 
}
```

#### Dự đoán bố cục

- Mỗi item chiếm khoảng 50% chiều rộng
- Mỗi hàng chứa 2 item
- 6 item → 3 hàng × 2 cột

#### Sơ đồ

```text
+--------+--------+
| item1  | item2  |
+--------+--------+

+--------+--------+
| item3  | item4  |
+--------+--------+

+--------+--------+
| item5  | item6  |
+--------+--------+
```

---

### Trường hợp 3

```css
.container { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
}
```

#### Dự đoán bố cục

- 3 item nằm trên cùng 1 hàng
- Khoảng trống chia đều giữa các item
- Các item căn giữa theo chiều dọc

#### Sơ đồ

```text
|item1            item2            item3|
```

---

### Trường hợp 4

```css
.container { 
    display: grid; 
    grid-template-columns: 200px 1fr 200px; 
    gap: 20px; 
}
```

#### Dự đoán bố cục

Grid có 3 cột:

- Cột trái: 200px
- Cột giữa: tự co giãn (`1fr`)
- Cột phải: 200px

#### Sơ đồ

```text
+--------+------------------+--------+
| item1  |      item2       | item3  |
+--------+------------------+--------+
```

---

### Trường hợp 5

```css
.container { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px; 
}
```

#### Dự đoán bố cục

- Grid có 3 cột bằng nhau
- 7 item sẽ tự xuống hàng

#### Kết quả

- Hàng 1: 3 item
- Hàng 2: 3 item
- Hàng 3: còn 1 item

→ Tổng cộng: 3 hàng

#### Sơ đồ

```text
+------+------+------+
| item | item | item |
+------+------+------+

+------+------+------+
| item | item | item |
+------+------+------+

+------+
| item |
+------+
```

Item cuối cùng nằm ở:

- Hàng thứ 3
- Cột thứ 1

# PHẦN C — SUY LUẬN

### Câu C1 — Flexbox vs Grid: Khi nào dùng gì?

| # | Tình huống | Chọn | Giải thích |
|---|------------|------|------------|
| 1 | Navigation bar ngang (logo + menu + buttons) | **Flexbox** | Một hàng, phân bố theo trục chính (`justify-content`, `align-items`). Flexbox tối ưu cho layout 1 chiều. |
| 2 | Lưới ảnh Instagram (3 cột đều, số ảnh không cố định) | **Grid** | Cần lưới 2 chiều: `grid-template-columns: repeat(3, 1fr)` tự xuống hàng khi thêm item. Grid quản lý hàng/cột rõ ràng hơn flex wrap. |
| 3 | Layout blog: main + sidebar | **Grid** (hoặc **kết hợp**) | Bố cục trang 2D: `grid-template-columns: 1fr 300px`. Có thể dùng Grid cho khung trang, Flexbox bên trong từng vùng nếu cần. |
| 4 | Footer 4 cột thông tin | **Grid** | 4 cột song song, đồng đều: `grid-template-columns: repeat(4, 1fr)`. Grid căn cột đều hơn so với flex + width %. |
| 5 | Card sản phẩm (ảnh trên, text giữa, nút dính đáy) | **Flexbox** | Card là container `display: flex; flex-direction: column;` + `margin-top: auto` trên nút đẩy nút xuống đáy dù mô tả dài/ngắn khác nhau. |

---

### Câu C2 — Debug Flexbox

#### Lỗi 1 — Cards không đều chiều cao, nút "Mua" nhảy lên/xuống

**Nguyên nhân:** `.card` không phải flex container theo cột, nên nút không có cơ chế đẩy xuống đáy. Chiều cao card phụ thuộc nội dung từng card → nút không thẳng hàng.

**Code sửa:**

```css
.card-container {
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
.card {
    width: 30%;
    margin: 1.5%;
    display: flex;
    flex-direction: column;
}
.card img { width: 100%; }
.card h3 { font-size: 18px; flex-grow: 0; }
.card .btn {
    padding: 10px;
    margin-top: auto; 
}
```



---

#### Lỗi 2 — Muốn căn giữa ngang + dọc trong 100vh nhưng content dính góc trái trên

**Nguyên nhân:** `.hero` có `display: flex` nhưng thiếu `justify-content` và `align-items` (mặc định `flex-start`).

**Code sửa:**

```css
.hero {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.hero-content {
    text-align: center;
}
```

**Screenshot:** `screenshots/c2_loi2_truoc.png`, `screenshots/c2_loi2_sau.png`.

---

#### Lỗi 3 — Sidebar bị co khi content quá dài

**Nguyên nhân:** Trong flex container, item mặc định `flex-shrink: 1`. Sidebar có `width: 250px` nhưng vẫn bị co khi `.content` chiếm nhiều chỗ.

**Code sửa:**

```css
.layout { display: flex; }
.sidebar {
    width: 250px;
    flex: 0 0 250px;
    min-width: 250px;
}
.content { flex: 1; min-width: 0; }
```
