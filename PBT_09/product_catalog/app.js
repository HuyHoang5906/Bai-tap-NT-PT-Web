const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", image: "https://placehold.co/200", rating: 4.5, inStock: true },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", image: "https://placehold.co/200", rating: 4.8, inStock: true },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", image: "https://placehold.co/200", rating: 4.3, inStock: true },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", image: "https://placehold.co/200", rating: 4.6, inStock: false },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", image: "https://placehold.co/200", rating: 4.4, inStock: true },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", image: "https://placehold.co/200", rating: 4.1, inStock: true },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", image: "https://placehold.co/200", rating: 4.2, inStock: true },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", image: "https://placehold.co/200", rating: 4.6, inStock: true },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", image: "https://placehold.co/200", rating: 4.5, inStock: false },
    { id: 11, name: "Apple Watch 9", price: 9990000, category: "accessory", image: "https://placehold.co/200", rating: 4.7, inStock: true },
    { id: 12, name: "Surface Pro 9", price: 25990000, category: "tablet", image: "https://placehold.co/200", rating: 4.4, inStock: true }
];

const catalog = document.getElementById("catalog");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const categoryNav = document.getElementById("categoryNav");
const cartBadge = document.getElementById("cartBadge");
const themeToggle = document.getElementById("themeToggle");
const modal = document.getElementById("productModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".close-modal");

let cartCount = 0;
let currentCat = "all";

function renderProducts(list) {
    catalog.innerHTML = "";
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.id = p.id;
        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.price.toLocaleString('vi-VN')}đ</p>
            <p>⭐ ${p.rating}</p>
            <button class="add-cart" ${!p.inStock ? 'disabled' : ''}>
                ${p.inStock ? 'Thêm giỏ' : 'Hết hàng'}
            </button>
        `;
        catalog.appendChild(card);
    });
}

function updateView() {
    let filtered = products.filter(p => currentCat === "all" || p.category === currentCat);
    const keyword = searchInput.value.toLowerCase();
    if (keyword) filtered = filtered.filter(p => p.name.toLowerCase().includes(keyword));

    const sortType = sortSelect.value;
    if (sortType === "priceAsc") filtered.sort((a, b) => a.price - b.price);
    else if (sortType === "priceDesc") filtered.sort((a, b) => b.price - a.price);
    else if (sortType === "nameAsc") filtered.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortType === "rating") filtered.sort((a, b) => b.rating - a.rating);

    renderProducts(filtered);
}

searchInput.addEventListener("input", updateView);
sortSelect.addEventListener("change", updateView);

categoryNav.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        document.querySelectorAll(".cat-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentCat = e.target.dataset.cat;
        updateView();
    }
});

catalog.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    
    if (e.target.classList.contains("add-cart")) {
        cartCount++;
        cartBadge.textContent = cartCount;
        e.stopPropagation(); // Ngăn mở modal khi bấm mua
        return;
    }

    const p = products.find(x => x.id == card.dataset.id);
    modalBody.innerHTML = `<h2>${p.name}</h2><p>Giá: ${p.price.toLocaleString()}đ</p><p>Kho: ${p.inStock ? 'Còn hàng' : 'Hết hàng'}</p>`;
    modal.classList.remove("hidden");
});

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
});

updateView();