# PHẦN A — ĐỌC HIỂU (BOOTSTRAP 5)

## Câu A1 — Grid System
**Bảng kích thước Grid:**
| Kích thước | < 768px | 768px - 991px | ≥ 992px |
| :--- | :--- | :--- | :--- |
| **Số cột (col)** | 1 cột (`col-12`) | 2 cột (`col-md-6`) | 4 cột (`col-lg-3`) |
| **Box layout** | Xếp chồng dọc | 2 hàng, mỗi hàng 2 box | 1 hàng ngang chứa 4 box |

**Câu hỏi thêm:** - `col-md-6` nghĩa là: Từ breakpoint `md` (≥768px) trở lên, phần tử sẽ chiếm 6/12 cột (tức 50% chiều rộng).
- Không cần viết `col-sm-12` vì class `col-12` (mặc định cho mobile) sẽ tự động áp dụng cho tất cả các màn hình lớn hơn, cho đến khi bị ghi đè bởi breakpoint tiếp theo là `md`.

## Câu A2 — Utilities & Components
1. **`d-none d-md-block`:** Element sẽ bị **ẩn** ở màn hình nhỏ (<768px) do `d-none`. Từ màn hình `md` (≥768px) trở lên, nó sẽ **hiện** dưới dạng block do `d-md-block`.
2. **5 Spacing utilities:**
   - `mt-3`: Margin-top cỡ 3 (1rem = 16px).
   - `px-4`: Padding hai bên trái/phải (x-axis) cỡ 4 (1.5rem = 24px).
   - `mb-auto`: Margin-bottom tự động (đẩy các phần tử phía dưới ra xa nhất có thể).
   - `pt-5`: Padding-top cỡ 5 (3rem = 48px).
   - `mx-auto`: Margin trái/phải tự động (dùng để căn giữa phần tử block).
3. **Sự khác nhau của Container:**
   - `.container`: Chiều rộng tối đa (max-width) bị giới hạn và nhảy bậc theo từng breakpoint.
   - `.container-fluid`: Luôn luôn chiếm 100% chiều rộng màn hình ở mọi kích thước.
   - `.container-md`: Chiếm 100% chiều rộng ở màn hình nhỏ, nhưng khi đạt breakpoint `md` trở lên sẽ hoạt động giống `.container` bình thường.

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Tùy biến Bootstrap
- **Quy trình đổi màu `$primary`:** Cần cài đặt Node.js và một trình biên dịch SASS. Tạo một file `custom.scss`, khai báo lại biến màu (`$primary: #E63946;`) TRƯỚC KHI import file `bootstrap.scss` gốc, sau đó biên dịch ra file CSS để sử dụng.
- **Tại sao dùng SASS variables thay vì override trực tiếp?** Vì biến SASS giúp đồng bộ màu sắc trên toàn bộ framework. Khi đổi `$primary`, màu của các class khác như `.btn-primary`, `.bg-primary`, `.text-primary`, `.alert-primary`... sẽ tự động đổi theo mà không cần phải viết code CSS đè cho từng thẻ một.

## Câu C2 — So sánh
- **Số dòng CSS:** CSS thuần cần viết hàng trăm dòng, trong khi Bootstrap gần như 0 dòng (dùng class có sẵn).
- **Thời gian phát triển:** Bootstrap nhanh hơn rất nhiều do có sẵn các component.
- **Khả năng tùy biến:** CSS thuần tùy biến vô hạn. Bootstrap bị giới hạn trong khuôn khổ framework.
- **Khi nào NÊN:** Làm prototype, admin dashboard, hoặc dự án cần ra mắt cực nhanh.
- **Khi nào KHÔNG NÊN:** Các website có giao diện (UI) thiết kế riêng biệt, cực kỳ độc đáo hoặc cần tối ưu kích thước file CSS tuyệt đối.