# PHẦN A - KIỂM TRA ĐỌC HIỂU

## Câu A1 - HTTP & Browser

**Các bước khi truy cập https://shopee.vn:**
1. Trình duyệt thực hiện DNS lookup để tìm địa chỉ IP của shopee.vn 
2. DNS server trả về địa chỉ IP tương ứng 
3. Trình duyệt thiết lập kết nối TCP với server (3-way handshake) 
4. Trình duyệt gửi HTTP request (GET) đến server 
5. Server xử lý và trả về HTTP response (HTML) 
6. Trình duyệt parse HTML → tạo DOM 
7. Tải thêm CSS, JS → tạo CSSOM 
8. Kết hợp DOM + CSSOM → render trang web 

**DevTools Network:**

![alt text](<screenshots/Screenshot 2026-04-26 155848.png>)

Tab Network hiển thị:
- Danh sách tất cả request (HTML, CSS, JS, ảnh…)
- Status Code (200, 404…)
- Thời gian tải (load time)
- Kích thước file
- Loại tài nguyên (document, css, js…)

---

## Câu A2 - Semantic HTML

**Lỗi semantic (ít nhất 4 lỗi):**
1. Dùng `<div class="header">` thay vì `<header>`
2. Menu dùng `<div>` thay vì `<nav>`
3. Sản phẩm dùng `<div>` thay vì `<article>`
4. Tiêu đề sản phẩm không dùng thẻ heading (`<h1>` hoặc `<h2>`)
5. Ảnh `<img>` không có thuộc tính `alt`
6. Không có cấu trúc `<main>`, `<section>`, `<footer>` đúng nghĩa

**Code sửa lại:**

```html
<header>
    <h1>ShopTLU</h1>
    <nav>
        <a href="/">Trang chủ</a>
        <a href="/products">Sản phẩm</a>
    </nav>
</header>

<main>
    <section>
        <article>
            <h2>iPhone 16 Pro</h2>
            <p>25.990.000đ</p>
            <figure>
                <img src="iphone.jpg" alt="iPhone 16 Pro">
            </figure>
        </article>
    </section>
</main>

<footer>
    <p>© 2026 ShopTLU</p>
</footer>
```

### Câu A3 - Block vs Inline
![alt text](<screenshots/Screenshot 2026-04-28 163254.png>)

Giải thích:

Thẻ `<div>` là phần tử block → luôn bắt đầu ở dòng mới và chiếm toàn bộ chiều rộng → Các hộp xuống dòng.

Thẻ `<span>` và `<strong>` là phần tử inline → chỉ chiếm không gian bằng nội dung và nằm cùng dòng với nhau.

Kết quả: Text A + Text B nằm cùng một dòng; Text C + Text D nằm cùng một dòng.

### Câu A4 - Table
Sự khác nhau:

`<thead>`: Nhóm các hàng chứa tiêu đề của cột/bảng.

`<tbody>`: Nhóm các hàng chứa dữ liệu chính của bảng.

`<tfoot>`: Nhóm các hàng chứa thông tin tổng kết, kết luận ở cuối bảng.

3 Lý do KHÔNG NÊN dùng table để tạo layout:

Semantic sai: Table sinh ra để trình bày dữ liệu dạng bảng (tabular data), không phải để dàn bố cục. Dùng sai mục đích làm giảm điểm SEO và gây khó khăn cho các công cụ hỗ trợ đọc (Screen Readers).

Khó khăn cho Responsive: Table rất cứng nhắc, rất khó để thiết kế giao diện thích ứng (responsive) trên các màn hình nhỏ như điện thoại.

Tăng độ phức tạp của code (Code bloat): Code HTML sẽ trở nên cực kỳ phức tạp, lồng nhau nhiều lớp (`<tr>`, `<td>`), khó đọc và khó bảo trì so với việc dùng CSS Flexbox hoặc Grid.

## PHẦN B — THỰC HÀNH CODE

### Bài B3 - Debug HTML

- **Lỗi 1:** Dòng 1 — Thiếu chữ html trong khai báo DOCTYPE — Cách sửa: `<!DOCTYPE html>`
- **Lỗi 2:** Dòng 2 — Thẻ `<title>` chưa đóng — Cách sửa: `<title>Trang web</title>`
- **Lỗi 3:** Dòng 3 — Thuộc tính charset sai chuẩn — Cách sửa: `<meta charset="utf-8">`
- **Lỗi 4:** Dòng 5 — Thẻ `<h1>` đóng sai bằng thẻ mở — Cách sửa: `<h1>Welcome to ShopTLU</h1>`
- **Lỗi 5:** Dòng 9 — Thẻ `<a>` của "Trang chủ" đóng sai bằng thẻ mở — Cách sửa: `<a href="home">Trang chủ</a>`
- **Lỗi 6:** Dòng 16 — Thẻ `<img>` thiếu dấu ngoặc kép cho giá trị thuộc tính và thiếu alt — Cách sửa: `<img src="iphone.jpg" alt="iPhone 16">`
- **Lỗi 7:** Dòng 18 — Cú pháp lồng thẻ sai (Nesting error) giữa `<b>` và `<p>` — Cách sửa: `<p>Giá: <b>25.990.000đ</b></p>`
- **Lỗi 8:** Dòng 23 — Bảng thiếu cấu trúc semantic, các thẻ tiêu đề bảng nên là `<th>` chứ không phải `<td>` — Cách sửa: Đổi `<td>Tên</td>` và `<td>Giá</td>` thành `<th>Tên</th>` và `<th>Giá</th>`, bọc trong `<thead>`.
- **Lỗi 9:** Dòng 32 — Trang web có 2 thẻ `<main>` (một trang chỉ nên có duy nhất 1 thẻ main) — Cách sửa: Đổi `<main>` thứ hai thành `<aside>`.
- **Lỗi 10:** Dòng 37 — Thẻ `<p>` trong footer chưa được đóng — Cách sửa: `<p>Copyright 2026</p>`

### Bài B4 - Phân tích trang web thật
Trang web được chọn: shopee.vn

1. Phân tích thẻ Semantic
![alt text](<screenshots/Screenshot 2026-04-28 172717.png>)

3 thẻ semantic HTML5:

`<header>` — nằm ở phần đầu trang, chứa logo và thanh tìm kiếm.

`<nav>` — chứa menu điều hướng danh mục sản phẩm.

`<footer>` — nằm cuối trang, chứa thông tin liên hệ và chính sách.

2 thẻ chưa dùng đúng semantic:

`<div id="main">` — dùng div thay vì `<main>` cho khu vực nội dung chính.

`<div id="modal">` — dùng div cho popup thay vì cấu trúc semantic như `<dialog>`.

2. Phân tích thẻ Table
![alt text](<screenshots/Screenshot 2026-04-28 203320.png>)

* **Table đó hiển thị nội dung gì?** Table này hiển thị bảng Số đo sản phẩm / Hướng dẫn chọn size (chứa các kích cỡ như S, M, L, XL... của mặt hàng thời trang).
* **Có dùng `<thead>`, `<tbody>` không?** Dựa vào source code đã inspect, trang web **CÓ** sử dụng đầy đủ cả hai thẻ `<thead>` (chứa tiêu đề cột như "Size (Quốc Tế)") và `<tbody>` (bọc các hàng dữ liệu chứa thông số size tương ứng).

3. Phân tích thẻ Form (Ô tìm kiếm)
![alt text](<screenshots/Screenshot 2026-04-28 204441.png>)

Form đó có action và method gì? * action: Không được khai báo tường minh → mặc định submit và xử lý bằng JavaScript (React).

method: Không khai báo → theo chuẩn HTML mặc định là GET.

Input types nào được dùng?

Dùng thẻ `<input>` cho ô nhập nội dung tìm kiếm (type text/search).

Dùng thẻ `<button>` cho nút thực thi tìm kiếm.

### PHẦN C — SUY LUẬN
### Câu C1 - Thiết kế cấu trúc
```
<!DOCTYPE html> <!-- khai báo HTML5 -->
<html lang="vi"> <!-- html: root của trang, lang="vi" để hỗ trợ SEO + trình đọc màn hình -->

<head> <!-- head: chứa metadata -->
    <meta charset="UTF-8"> <!-- charset: hỗ trợ tiếng Việt -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- responsive -->
    <title>RTX 4070 - Huy Hoàng Store</title> <!-- title: tiêu đề tab -->
</head>

<body> <!-- body: toàn bộ nội dung hiển thị -->

<header> <!-- header: phần đầu trang chứa logo, tìm kiếm, menu -->
    
    <a href="#"> <!-- a: logo có thể click về trang chủ -->
        <img src="https://placehold.co/120x60" alt="Logo"> <!-- img: hiển thị logo -->
    </a>

    <form action="/search" method="GET"> <!-- form: chức năng tìm kiếm -->
        <input type="search" placeholder="Tìm GPU..."> <!-- input search: nhập từ khóa -->
        <button>Tìm kiếm</button> <!-- button: gửi form -->
    </form>

    <a href="#">Giỏ hàng</a> <!-- a: link đến trang giỏ hàng -->

    <nav> <!-- nav: chứa menu điều hướng -->
        <ul> <!-- ul: danh sách menu -->
            <li><a href="#">Trang chủ</a></li> <!-- li: mỗi mục -->
            <li><a href="#">RTX Series</a></li>
            <li><a href="#">Liên hệ</a></li>
        </ul>
    </nav>

</header>

<nav aria-label="breadcrumb"> <!-- nav: breadcrumb là điều hướng -->
    <ol> <!-- ol: breadcrumb có thứ tự cấp -->
        <li><a href="#">Trang chủ</a></li>
        <li><a href="#">GPU</a></li>
        <li>RTX 4070</li>
    </ol>
</nav>

<main> <!-- main: nội dung chính của trang -->

<section id="product"> <!-- section: nhóm toàn bộ nội dung sản phẩm -->

    <section id="product_img"> <!-- section: nhóm hình ảnh -->
        <h2>Hình ảnh sản phẩm</h2> <!-- heading cho section -->

        <figure> <!-- figure: nhóm ảnh + mô tả -->
            <img src="https://placehold.co/200" alt="RTX 4070 1"> <!-- img: ảnh -->
            <img src="https://placehold.co/200" alt="RTX 4070 2">
            <img src="https://placehold.co/200" alt="RTX 4070 3">
            <img src="https://placehold.co/200" alt="RTX 4070 4">
            <img src="https://placehold.co/200" alt="RTX 4070 5">
            <figcaption>Hình ảnh minh họa sản phẩm</figcaption> <!-- figcaption: chú thích -->
        </figure>
    </section>

    <section id="product_info"> <!-- section: nhóm thông tin sản phẩm -->
        
        <article> <!-- article: nội dung độc lập (1 sản phẩm) -->
            <h1>RTX 4070</h1> <!-- h1: tiêu đề chính -->

            <p> <!-- p: đoạn mô tả -->
                <strong>Giá: 15.000.000đ</strong> <!-- strong: nhấn mạnh giá -->
                <br>
                Đánh giá: ⭐⭐⭐⭐☆
                <br><br>

                <strong>Mô tả:</strong><br>
                Card đồ họa RTX 4070 cho hiệu năng mạnh mẽ,<br>
                hỗ trợ DLSS 3 và Ray Tracing.
            </p>
        </article>

        <table border="1" cellpadding="8"> <!-- table: hiển thị thông số dạng bảng -->
            
            <thead> <!-- thead: tiêu đề bảng -->
                <tr>
                    <th>Thông số</th> <!-- th: tiêu đề cột -->
                    <th>Chi tiết</th>
                </tr>
            </thead>

            <tbody> <!-- tbody: dữ liệu chính -->
                <tr>
                    <td>GPU</td> <!-- td: dữ liệu -->
                    <td>RTX 4070</td>
                </tr>
                <tr>
                    <td>VRAM</td>
                    <td>12GB</td>
                </tr>
                <tr>
                    <td>Bus</td>
                    <td>192-bit</td>
                </tr>
                <tr>
                    <td>Công nghệ</td>
                    <td>DLSS 3</td>
                </tr>
            </tbody>

            <tfoot> <!-- tfoot: ghi chú -->
                <tr>
                    <td colspan="2">Thông số mang tính tham khảo</td>
                </tr>
            </tfoot>

        </table>

    </section>

    <section id="comment"> <!-- section: khu vực đánh giá -->
        <h2>Đánh giá / Bình luận</h2>

        <input type="text" placeholder="Tên của bạn..."> <!-- input text: nhập tên -->
        <br><br>

        <input type="text" placeholder="Nhập đánh giá..." style="width: 250px; height: 100px;"> <!-- input: nội dung -->
        <br><br>

        <button>Gửi</button> <!-- button: gửi bình luận -->

        <article> <!-- article: mỗi bình luận là nội dung độc lập -->
            <p><strong>Hoàng:</strong> Card chạy cực mượt</p>
        </article>

        <article>
            <p><strong>Nam:</strong> Đáng tiền</p>
        </article>
    </section>

    <aside> <!-- aside: nội dung phụ (sản phẩm liên quan) -->
        <h2>Sản phẩm tương tự</h2>

        <article> <!-- article: mỗi sản phẩm -->
            <figure>
                <img src="https://placehold.co/100" alt="RTX 4060">
                <figcaption>RTX 4060</figcaption>
            </figure>
        </article>

        <article>
            <figure>
                <img src="https://placehold.co/100" alt="RTX 4080">
                <figcaption>RTX 4080</figcaption>
            </figure>
        </article>

        <article>
            <figure>
                <img src="https://placehold.co/100" alt="RTX 4090">
                <figcaption>RTX 4090</figcaption>
            </figure>
        </article>
    </aside>

</section>

</main>

<footer> <!-- footer: phần cuối trang -->
    <p>© 2026 Huy Hoàng Store</p>
</footer>

</body>
</html>
```

### Câu C2 — So sánh & Tranh luận
Quan điểm chỉ dùng `<div>` kết hợp class là sai lầm vì nó tạo thêm "nợ kỹ thuật". Semantic HTML là tiêu chuẩn bắt buộc trong Web hiện đại vì hai lý do kỹ thuật cốt lõi:

Thứ nhất, về SEO. Crawler của Google không hiểu ý nghĩa các class CSS tự đặt (như `<div class="article">`). Việc dùng đúng thẻ ngữ nghĩa (như `<article>`, `<main>`) trực tiếp chỉ dẫn cho bot biết đâu là nội dung trọng tâm, giúp lập chỉ mục chính xác và tối ưu thứ hạng tìm kiếm.

Thứ hai, về Accessibility (Khả năng tiếp cận). Trình đọc màn hình cho người khiếm thị phụ thuộc hoàn toàn vào thẻ HTML để điều hướng. Nếu dùng `<div class="menu">`, máy sẽ đọc như văn bản trơ, nhưng với thẻ `<nav>`, thiết bị sẽ thông báo đây là vùng điều hướng để người dùng thao tác.

Ví dụ cụ thể chứng minh: Khi tạo nút bấm bằng thẻ `<button>`, trình duyệt tự động hỗ trợ phím Tab để focus và Enter để click. Nếu dùng `<div class="btn">`, bạn sẽ tốn thêm thời gian viết JavaScript và ARIA attributes để làm điều tương tự.

Tuy nhiên, trường hợp thực tế `<div>` vẫn phù hợp là khi bạn chỉ cần một thẻ bao bọc (wrapper) vô nghĩa thuần túy để dàn bố cục bằng CSS (ví dụ: tạo Flexbox container để căn giữa các phần tử) mà không làm ảnh hưởng đến cấu trúc ngữ nghĩa tổng thể.