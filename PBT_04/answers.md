# PHẦN A — KIỂM TRA ĐỌC HIỂU

---

# Câu A1 (10đ) — 5 Loại Positioning

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

# Câu A2 (10đ) — Flexbox vs Grid

---

## Trường hợp 1

```css
.container { 
    display: flex; 
}

.item { 
    flex: 1; 
}
```

### Dự đoán bố cục

- 4 item nằm trên cùng 1 hàng
- Mỗi item có chiều rộng bằng nhau

### Sơ đồ

```text
+------+------+------+------+
| item | item | item | item |
+------+------+------+------+
```

---

## Trường hợp 2

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

### Dự đoán bố cục

- Mỗi item chiếm khoảng 50% chiều rộng
- Mỗi hàng chứa 2 item
- 6 item → 3 hàng × 2 cột

### Sơ đồ

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

## Trường hợp 3

```css
.container { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
}
```

### Dự đoán bố cục

- 3 item nằm trên cùng 1 hàng
- Khoảng trống chia đều giữa các item
- Các item căn giữa theo chiều dọc

### Sơ đồ

```text
|item1            item2            item3|
```

---

## Trường hợp 4

```css
.container { 
    display: grid; 
    grid-template-columns: 200px 1fr 200px; 
    gap: 20px; 
}
```

### Dự đoán bố cục

Grid có 3 cột:

- Cột trái: 200px
- Cột giữa: tự co giãn (`1fr`)
- Cột phải: 200px

### Sơ đồ

```text
+--------+------------------+--------+
| item1  |      item2       | item3  |
+--------+------------------+--------+
```

---

## Trường hợp 5

```css
.container { 
    display: grid; 
    grid-template-columns: repeat(3, 1fr); 
    gap: 10px; 
}
```

### Dự đoán bố cục

- Grid có 3 cột bằng nhau
- 7 item sẽ tự xuống hàng

### Kết quả

- Hàng 1: 3 item
- Hàng 2: 3 item
- Hàng 3: còn 1 item

→ Tổng cộng: 3 hàng

### Sơ đồ

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