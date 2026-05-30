# PHẦN A — ĐỌC HIỂU (TAILWINDCSS)

## Câu A1 — Utility Classes
Ý nghĩa các class trong đoạn code:
- `flex` → `display: flex;`
- `items-center` → `align-items: center;`
- `justify-between` → `justify-content: space-between;`
- `p-4` → `padding: 1rem (16px);`
- `bg-white` → `background-color: #ffffff;`
- `shadow-md` → Tạo bóng đổ cỡ vừa (box-shadow).
- `rounded-lg` → Bo góc lớn (`border-radius: 0.5rem;`).
- `hover:shadow-xl` → Khi hover chuột vào, bóng đổ sẽ to và rõ hơn.
- `transition-shadow` → Thêm hiệu ứng chuyển đổi mượt mà cho box-shadow.
- `duration-300` → Thời gian chuyển đổi là 300ms.
- `w-16` / `h-16` → `width: 4rem (64px);` / `height: 4rem (64px);`
- `rounded-full` → Bo góc tròn hoàn toàn (thành hình tròn).
- `object-cover` → `object-fit: cover;` (Ảnh không bị méo, lấp đầy khung).
- `ml-4` → `margin-left: 1rem (16px);`
- `flex-1` → `flex: 1 1 0%;` (Phần tử chiếm hết không gian trống còn lại).
- `text-lg` / `text-sm` → Kích thước font chữ lớn (Large) / nhỏ (Small).
- `font-semibold` → `font-weight: 600;`
- `text-gray-800` / `text-gray-500` → Đổi màu chữ thành sắc độ xám tương ứng.
- `truncate` → Cắt bớt chữ dài bằng dấu "...", ngăn không cho rớt dòng.
- `px-4` / `py-2` → Padding trục X (trái/phải) 1rem / Padding trục Y (trên/dưới) 0.5rem.
- `bg-blue-500` / `hover:bg-blue-600` → Nền màu xanh / Khi hover đổi sang xanh đậm hơn.
- `text-white` → `color: #ffffff;`
- `rounded-md` → Bo góc vừa.
- `focus:ring-2` / `focus:ring-blue-300` → Khi focus (click/tab vào), tạo viền sáng màu xanh nhạt xung quanh.

## Câu A2 — Responsive & States
1. **Prefix responsive (`md:`, `lg:`, `xl:`):** Đây là các điểm ngắt (breakpoints). Ví dụ `md:grid-cols-2 lg:grid-cols-4` nghĩa là: Ở màn hình cỡ trung bình (tablet) chia làm 2 cột, lên màn hình lớn (desktop) chia làm 4 cột.
2. **State modifiers:**
   - `hover:`: Áp dụng CSS khi di chuột qua phần tử.
   - `focus:`: Áp dụng CSS khi phần tử được chọn (click vào input hoặc dùng phím Tab).
   - `active:`: Áp dụng CSS ngay tại khoảnh khắc người dùng nhấn chuột (đang giữ chuột).
   - `group-hover:`: Áp dụng CSS cho phần tử con khi người dùng di chuột qua phần tử cha (phần tử cha cần có class `group`).
3. **Class cho "Ẩn trên mobile, hiện dạng flex trên tablet trở lên":**
   `hidden md:flex`

---

# PHẦN C — PHÂN TÍCH

## Câu C1 — Tailwind vs CSS thuần
- **HTML file size:** File HTML của Tailwind sẽ **lớn hơn** (nặng hơn) do chứa rất nhiều class trực tiếp trong thẻ. CSS thuần thì file HTML sạch và nhỏ gọn hơn.
- **Maintainability (Dễ bảo trì):** Tailwind dễ sửa hơn vì nhìn vào HTML biết ngay style là gì, không cần lội qua file CSS tìm class. Tuy nhiên, nếu class quá dài có thể gây rối mắt.
- **Reusability (Tính tái sử dụng):** Trong CSS thuần, ta tái sử dụng bằng class (VD: `.btn`). Trong Tailwind, ta tái sử dụng bằng cách tách thành các Component (React/Vue) hoặc dùng tính năng `@apply` trong file CSS gốc để gộp các utility classes thành 1 class tùy chỉnh.

## Câu C2 — Performance
- **Tại sao file CSS cuối cùng của Tailwind nhỏ hơn Bootstrap?** Vì Bootstrap tải toàn bộ bộ class (dù bạn có dùng hay không).
- **Tailwind PurgeCSS (JIT - Just in Time):** Trình biên dịch JIT của Tailwind sẽ quét toàn bộ file HTML/JS của bạn. Nó chỉ tạo ra mã CSS cho đúng những class mà bạn **đã viết trong code**. Các class không dùng sẽ bị loại bỏ hoàn toàn, giúp file CSS cực kỳ nhẹ (thường < 10kb).
- **Khi nào KHÔNG nên dùng TailwindCSS?**
  1. Khi làm những dự án nhỏ, prototype cần siêu tốc mà team không ai biết cú pháp Tailwind (dùng Bootstrap nhanh hơn).
  2. Khi trang web chủ yếu render từ Markdown (như Blog) vì ta không thể chèn class vào từng thẻ `<h1>`, `<p>` sinh ra tự động (trừ khi dùng plugin `@tailwindcss/typography`).