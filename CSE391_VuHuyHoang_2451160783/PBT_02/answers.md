# PHẦN A — KIỂM TRA ĐỌC HIỂU (25 điểm)

## Câu A1 (5đ) — Input Types

**type="text"** → Ô nhập văn bản ngắn bình thường. Không có validation tự động đặc biệt. → Dùng cho: Nhập Họ và Tên người mua.

**type="email"** → Ô nhập text. Tự động kiểm tra phải có ký tự `@` và domain hợp lệ. → Dùng cho: Form đăng ký tài khoản / Liên hệ.

**type="password"** → Ô nhập text bị ẩn ký tự thành dấu chấm/sao. Không có validation định dạng tự động. → Dùng cho: Nhập mật khẩu đăng nhập/đăng ký.

**type="number"** → Ô nhập số có nút tăng/giảm (spinbox). Ràng buộc giá trị là số, có thể giới hạn `min`, `max`, `step`. → Dùng cho: Chọn số lượng sản phẩm muốn mua.

**type="tel"** → Ô nhập text (tự động mở bàn phím số trên điện thoại). Không tự động kiểm tra định dạng (phải kết hợp `pattern`). → Dùng cho: Nhập số điện thoại giao hàng.

**type="date"** → Ô chọn ngày tháng với giao diện bộ lịch (calendar). Chỉ cho phép submit định dạng ngày hợp lệ. → Dùng cho: Chọn ngày sinh hoặc ngày mong muốn nhận hàng.

**type="radio"** → Nút chọn hình tròn. Tự động giới hạn chỉ được chọn 1 option trong cùng một nhóm (cùng `name`). → Dùng cho: Chọn phương thức thanh toán (COD, Chuyển khoản, Thẻ).

**type="checkbox"** → Ô vuông để đánh dấu tick. Tự kiểm tra trạng thái checked (nếu có thuộc tính `required`). → Dùng cho: Đánh dấu "Tôi đồng ý với điều khoản dịch vụ".

**type="file"** → Nút tải file lên từ máy tính. Có thể dùng `accept` để giới hạn đuôi file (ví dụ: chỉ ảnh). → Dùng cho: Upload ảnh đại diện (avatar) của user.

**type="search"** → Ô nhập liệu có thêm nút "x"để xóa nhanh nội dung. Không có validation tự động. → Dùng cho: Thanh tìm kiếm sản phẩm trên thanh điều hướng.

## Câu A2 (5đ) — Validation Attributes
 1. Trường hợp 1: 
 ```html
<input type="text" required value="">
```

Dự đoán: Form không submit được. Trình duyệt sẽ tự động chặn lại và hiện popup thông báo yêu cầu điền dữ liệu.

Tại sao: Theo Chương 07, thuộc tính `required` có nghĩa là "Bắt buộc nhập". Nếu để trống `(value="")`, trình duyệt sẽ báo lỗi.

2. Trường hợp 2: 
```html
<input type="email" value="abc">
```

Dự đoán: Form không submit được. Trình duyệt báo lỗi định dạng.

Tại sao: Theo bảng Input Types ở Chương 07, `type="email"` có khả năng "Tự kiểm tra @" và validate email format. Chuỗi "abc" thiếu ký tự `@` nên không hợp lệ.

3. Trường hợp 3: 
```html
<input type="number" min="1" max="10" value="15">
```

Dự đoán: Form không submit được. Trình duyệt báo lỗi giá trị vượt quá mức cho phép.

Tại sao: Theo Chương 07, thuộc tính `max="10"` quy định "Giá trị số max" (lớn nhất) là 10. User gõ 15 là vi phạm quy tắc này.

4. Trường hợp 4: 
```html
<input type="text" pattern="[0-9]{10}" value="abc123">
```

Dự đoán: Form không submit được. Trình duyệt báo lỗi dữ liệu không khớp với định dạng yêu cầu.

Tại sao: Theo Chương 07, `pattern` là thuộc tính dùng để thiết lập "Regex pattern". Biểu thức `[0-9]{10}` ép buộc người dùng phải nhập đúng 10 chữ số. "abc123" vừa chứa chữ cái, vừa không đủ 10 ký tự nên bị chặn.

5. Trường hợp 5: 
```html
<input type="password" minlength="8" value="123">
```

Dự đoán: Form không submit được. Trình duyệt báo lỗi văn bản quá ngắn.

Tại sao: Theo Chương 07, thuộc tính `minlength="8"` quy định "Tối thiểu 8 ký tự". User gõ "123" (chỉ có 3 ký tự) nên không thỏa mãn điều kiện.

### Câu A3 (5đ) — Accessibility
### 1. Tại sao `<label for="email">` quan trọng cho người dùng screen reader (trình đọc màn hình)?

Nguyên nhân:"Form không có `<label>` = người dùng screen reader không biết ô nhập gì." Trình đọc màn hình của người khiếm thị không thể "nhìn" thấy dòng chữ nằm cạnh ô nhập liệu giống như mắt người thường.

Cách hoạt động: Thuộc tính `for` trong thẻ `<label>` sẽ liên kết trực tiếp với thuộc tính id của thẻ `<input>` (ví dụ: `for="email"` liên kết với `id="email"`). Nhờ sự liên kết chặt chẽ này, khi người khiếm thị dùng phím Tab di chuyển đến ô input, trình đọc màn hình sẽ đọc to rõ ràng từ "Email" lên, giúp họ biết chính xác mình cần nhập thông tin gì vào đó.

(Điểm cộng thêm về UX: Nhờ có liên kết này, người dùng bình thường khi bấm chuột vào chữ "Email", con trỏ chuột cũng tự động nhảy vào ô nhập liệu, giúp tăng diện tích click trên màn hình nhỏ).

### 2. Khi nào dùng `<fieldset>` + `<legend>`? Cho ví dụ cụ thể.

Khi nào dùng:Ta dùng cặp thẻ này để "gom nhóm các ô input liên quan mật thiết với nhau" thành một khối thống nhất (cả về mặt logic và giao diện). Thẻ `<fieldset>` tạo ra một cái khung bao bọc, còn thẻ `<legend>` đóng vai trò là "Tiêu đề" cho cái khung đó. Khi Screen Reader đi vào khu vực này, nó sẽ đọc tiêu đề của `<legend>` trước, giúp người dùng nắm được bối cảnh chung.

Ví dụ cụ thể:

```html
<fieldset>
    <legend>Thông tin giao hàng</legend> <label for="city">Thành phố:</label>
    <input type="text" id="city" name="city">

    <label for="district">Quận/Huyện:</label>
    <input type="text" id="district" name="district">
</fieldset>
```

### 3. `aria-label` dùng khi nào? Tại sao KHÔNG nên dùng `aria-label` khi đã có `<label>`?

- `aria-label` dùng khi nào:Ta dùng nó cho "button icon" (nút bấm chỉ có biểu tượng). Tức là dùng khi trên giao diện KHÔNG CÓ chữ viết hiển thị để làm thẻ `<label>`. Ví dụ: Nút tìm kiếm chỉ có hình cái kính lúp, nút đóng cửa sổ chỉ có dấu X, hoặc nút giỏ hàng chỉ có icon giỏ hàng. Lúc này ta dùng `aria-label="Gửi đơn hàng"` để "đọc thầm" cho Screen Reader nghe.

- Tại sao KHÔNG nên dùng khi đã có `<label>`: 
1. Dư thừa và Xung đột: Quy tắc vàng của Web Accessibility (W3C) là "Luôn ưu tiên HTML gốc (Native HTML) thay vì dùng ARIA".
2. Nếu bạn dùng cả hai, Screen Reader có thể bị bối rối. Nó sẽ ưu tiên đọc thuộc tính `aria-label` và phớt lờ thẻ `<label>` hiển thị trên màn hình. Nếu nội dung của 2 thẻ này khác nhau (ví dụ Label ghi "Họ Tên", aria-label ghi "Nhập tên của bạn"), nó sẽ gây ra sự mất đồng bộ nghiêm trọng cho người dùng phải sử dụng cả mắt nhìn (thị lực kém) và tai nghe.

## Câu A4 (5đ) — Media
### 1. Thuộc tính `loading="lazy"` trên thẻ `<img>`:

Giải thích: Đây là thuộc tính chỉ thị cho trình duyệt trì hoãn (delay) việc tải hình ảnh. Hình ảnh sẽ không được tải ngay lập tức khi mở trang, mà chỉ bắt đầu tải khi người dùng cuộn (scroll) chuột đến gần vị trí của nó.

Cải thiện gì: Giúp trang web hiển thị nội dung ban đầu nhanh hơn (tăng tốc độ tải trang), tiết kiệm tài nguyên bộ nhớ của trình duyệt và tiết kiệm băng thông (bandwidth) mạng cho cả máy chủ lẫn thiết bị của người dùng (đặc biệt là 3G/4G).

Khi nào KHÔNG nên dùng: Tuyệt đối không dùng cho các hình ảnh nằm ngay ở màn hình hiển thị đầu tiên khi vừa truy cập trang (khu vực "Above the fold"). Ví dụ như Logo, ảnh Banner chính, ảnh Hero. Việc dùng lazy load ở đây sẽ làm ảnh hiển thị chậm nhịp đi, gây trải nghiệm xấu cho người dùng và bị Google đánh tụt điểm SEO (chỉ số LCP).

### 2. Thẻ `<video>` và nhiều thẻ `<source>`:

Tại sao nên cung cấp nhiều `<source>`: Vì các trình duyệt khác nhau (Chrome, Safari, Firefox, Edge...) không hỗ trợ chung một chuẩn giải mã video (video codec). Việc cung cấp nhiều thẻ `<source>` đóng vai trò như các phương án dự phòng. Trình duyệt sẽ đọc từ trên xuống dưới và tự động lấy định dạng đầu tiên mà nó có thể đọc được để phát, đảm bảo video không bị lỗi hiển thị trên thiết bị của người dùng.

3 format video web phổ biến:

MP4 (`video/mp4`): Phổ biến nhất, được tất cả các trình duyệt và thiết bị hỗ trợ.

WebM (`video/webm`): Định dạng mã nguồn mở do Google phát triển, tối ưu dung lượng cực tốt cho web mà vẫn giữ độ nét cao (thường được đặt làm `<source>` ưu tiên số 1).

Ogg (`video/ogg`): Định dạng mã nguồn mở, hỗ trợ tốt trên Firefox và Opera.

### 3. Thuộc tính alt trên thẻ `<img>`:

Dùng để làm gì: `alt`cung cấp văn bản thay thế cho hình ảnh. 
Nó có 3 tác dụng chính: 
- Hiển thị dòng chữ thay thế nếu ảnh bị lỗi (đứt cáp, sai đường dẫn) không tải được; 
- Giúp các công cụ tìm kiếm (Googlebot) hiểu được nội dung ảnh để SEO; 
- Quan trọng nhất cho Accessibility: Trình đọc màn hình (Screen Reader) sẽ đọc văn bản này lên cho người khiếm thị nghe.

### Viết alt tốt cho 3 trường hợp:

#### Ảnh sản phẩm iPhone 16: 
Cách viết: 
```html
alt="Điện thoại iPhone 16 Pro Max 256GB màu Titan Tự nhiên"
```
---

Ảnh trang trí (decorative): 
Cách viết:
```html
alt=""
```
Ảnh chỉ trang trí nên để alt rỗng để screen reader bỏ qua

---

Ảnh biểu đồ doanh thu Q1/2026: 
Cách viết: 
```html
alt="Biểu đồ cột thể hiện doanh thu Quý 1 năm 2026 đạt 50 tỷ đồng, tăng trưởng 10% so với cùng kỳ năm ngoái"
```

## Câu A5 (5đ) — So sánh `<figure>` vs `<img>`
### 1. Khi nào dùng Cách 1 (Chỉ dùng thẻ `<img>` độc lập)?

Mục đích: Dùng cho các hình ảnh nội tuyến (inline), ảnh mang tính chất minh họa lướt qua, hoặc các thành phần giao diện không cần (và không có) dòng chú thích giải thích trực tiếp gắn liền với nó. Nếu xóa bức ảnh đi hoặc di chuyển nó, luồng văn bản xung quanh có thể bị ảnh hưởng hoặc mất đi ý nghĩa ngữ cảnh.

2 ví dụ thực tế:

Ảnh Logo của website đặt ở góc trái trên cùng của thanh điều hướng (Navigation Bar).

Ảnh icon nhỏ (như icon cái giỏ hàng, icon kính lúp tìm kiếm) nằm lồng bên trong một nút bấm `<button>` hoặc thẻ liên kết `<a>`.

### 2. Khi nào dùng Cách 2 (Dùng thẻ `<figure>` kết hợp `<figcaption>`)?

Mục đích: Dùng cho một khối nội dung (thường là hình ảnh, biểu đồ, đoạn code) mang tính độc lập và tự trọn vẹn. Thẻ `<figcaption>` tạo ra một sự liên kết ngữ nghĩa (semantic) cực kỳ chặt chẽ với hình ảnh bên trong nó. Bạn có thể di chuyển toàn bộ khối `<figure>` này sang một cột bên cạnh, hoặc đẩy xuống cuối bài viết (phụ lục) mà không làm đứt gãy mạch đọc của đoạn văn bản chính.

2 ví dụ thực tế:

Ảnh chi tiết sản phẩm trên trang E-Commerce: Khối ảnh bao gồm hình chụp thực tế của sản phẩm và phần chú thích `(<figcaption>)`hiển thị rõ tên phiên bản kèm mức giá bên dưới (giống y hệt đoạn code đề bài đưa ra).

Biểu đồ/Hình ảnh minh họa trong một bài báo học thuật hoặc blog: Ví dụ một biểu đồ phân tích dữ liệu, bên dưới có dòng chú thích "Hình 1: Biểu đồ doanh thu Quý 1 năm 2026". Trình đọc màn hình sẽ gom khối này lại và đọc cho người khiếm thị hiểu rằng dòng text này chính là chú thích của biểu đồ bên trên.

# PHẦN B — THỰC HÀNH CODE (55 điểm)
### Bài B1 (20đ) — Form Đăng ký Tài khoản
### Giải thích tại sao HTML không thể validate Confirm Password
### Câu hỏi phụ Bài B1: Tại sao HTML5 không thể validate "Xác nhận password"?

HTML5 Validation chỉ có khả năng kiểm tra **từng ô input một cách độc lập** dựa trên các thuộc tính cố định (như `pattern`, `minlength`). 

- Nó **không có cơ chế so sánh giá trị giữa hai ô input khác nhau** (không thể biết ô "Xác nhận password" có đang trùng khớp với ô "Password" hay không). Để làm được việc này, chúng ta bắt buộc phải sử dụng **JavaScript** để so sánh `value` của hai ô trước khi cho phép gửi form, hoặc kiểm tra ở phía **Server**.
- # PHẦN C — PHÂN TÍCH & SUY LUẬN (20 điểm)

## Câu C1 (10đ) — Debug Form

**Lỗi 1:** Dòng 2 — Input "Tên" không có `<label for>` và thiếu `name`, `id`, `required`
- Vi phạm accessibility + không submit được dữ liệu

Sửa:
```html
<label for="name">Tên:</label>
<input type="text" id="name" name="name" required>
```

**Lỗi 2:** Dòng 5 — Input email không có `<label>` và thiếu name, id
- Screen reader không hiểu + backend không nhận dữ liệu

***Sửa:***
```html
<label for="email">Email:</label>
<input type="email" id="email" name="email" placeholder="Email của bạn" required>
```

**Lỗi 3:** Dòng 8 — Input password không có `<label>` và thiếu name, id
- Accessibility fail + không submit được

***Sửa:***
```html
<label for="password">Mật khẩu:</label>
<input type="password" id="password" name="password" required>
```

**Lỗi 4:** Dòng 10 — Input "Nhập lại mật khẩu" không có `<label>` + thiếu xác nhận logic
UX kém + không validate được

***Sửa:***
```html
<label for="confirmPassword">Nhập lại mật khẩu:</label>
<input type="password" id="confirmPassword" name="confirmPassword" required>
```

**Lỗi 5:** Dòng 13 — Phone dùng type="text" và có value mặc định
- Sai best practice + dễ submit nhầm dữ liệu

***Sửa:***
```html
<label for="phone">Phone:</label>
<input type="tel" id="phone" name="phone" placeholder="0901234567" required>
```

**Lỗi 6:** Dòng 16 — `<select>` không có `<label>` và thiếu name, id
- Accessibility + backend không nhận

***Sửa:***
```html
<label for="city">Thành phố:</label>
<select id="city" name="city" required>
  <option value="">-- Chọn thành phố --</option>
  <option value="HN">Hà Nội</option>
  <option value="HCM">TP.HCM</option>
</select>
```

**Lỗi 7:** Dòng 22 — Checkbox "Tôi đồng ý điều khoản" không có `<input type="checkbox">`
- Lỗi logic (chỉ có chữ, không tick được)

***Sửa:***
```html
<input type="checkbox" id="terms" name="terms" required>
<label for="terms">Tôi đồng ý điều khoản</label>
```

**Lỗi 8:** Dòng 26 — Form không có action và method
- Không biết gửi đi đâu 

***Sửa:***
```html
<form action="/submit" method="post">
```

---

## Câu C2 (10đ) — Thiết kế chiến lược Validation
### 1. Pattern Regex

a. CMND/CCCD (đúng 12 chữ số)

```html
pattern="^\d{12}$"
```

Giải thích:

- `^ `: bắt đầu chuỗi
- `\d{12}`: đúng 12 chữ số
- `$ `: kết thúc chuỗi
- Đảm bảo chỉ chứa đúng 12 chữ số, không dư, không thiếu
b. Số tài khoản (10–15 chữ số)

```html
pattern="^\d{10,15}$"
```

Giải thích:

- `\d{10,15}` : từ 10 đến 15 chữ số
- Phù hợp với nhiều hệ thống ngân hàng khác nhau
### 2. HTML5 validation có đủ an toàn cho ứng dụng ngân hàng không?

Trả lời: Không đủ an toàn.

Giải thích:

HTML5 validation (required, type, pattern…) chỉ hoạt động ở phía client (trình duyệt). Người dùng hoặc attacker có thể:

Tắt validation trên trình duyệt
Sửa request bằng DevTools
Gửi request trực tiếp bằng công cụ như Postman

Do đó, HTML5 validation chỉ giúp kiểm tra dữ liệu đầu vào sơ bộ và cải thiện trải nghiệm người dùng (UX),
không đảm bảo tính bảo mật.

Trong hệ thống ngân hàng, mọi dữ liệu phải được kiểm tra lại ở backend trước khi xử lý hoặc lưu trữ.

### 3. Ba loại validation HTML5 không thể thực hiện
#### 1. So sánh giữa các trường (Cross-field validation)

Ví dụ:

Kiểm tra “Nhập lại PIN” có trùng với “PIN” hay không

HTML5 không hỗ trợ so sánh giữa các input

#### 2. Kiểm tra dữ liệu tồn tại trong hệ thống

Ví dụ:

Email đã được đăng ký chưa
Số tài khoản có hợp lệ trong database không

Cần truy vấn server/database

#### 3. Kiểm tra logic nghiệp vụ phức tạp

Ví dụ:

PIN không được là “123456” hoặc “000000”
CMND hợp lệ theo quy tắc cấp phát
Kiểm tra blacklist tài khoản

HTML5 không xử lý được các logic này

### 4. Hai rủi ro bảo mật nếu chỉ validate ở Frontend
#### 1. Bypass validation (vượt qua kiểm tra)

Attacker có thể gửi request trực tiếp mà không qua form:

Bỏ qua `required`, `pattern`, `type`
Gửi dữ liệu sai định dạng hoặc độc hại

Dẫn đến:

Dữ liệu không hợp lệ vào hệ thống
Gây lỗi hoặc phá vỡ logic xử lý
#### 2. Tấn công Injection (SQL Injection, XSS)

Nếu backend không kiểm tra:

Hacker có thể chèn mã độc vào input

Ví dụ:
```html
' OR 1=1 --
```
Hậu quả:

- Truy cập trái phép dữ liệu
- Chiếm quyền tài khoản
- Lộ thông tin người dùng
