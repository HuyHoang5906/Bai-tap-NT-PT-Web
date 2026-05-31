const slides = document.querySelectorAll('.slide');
const gallery = document.getElementById('gallery');
const cmdPalette = document.getElementById('cmdPalette');
const cmdInput = document.getElementById('cmdInput');
let currentIndex = 0;
let playing = false;
let slideInterval;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
}

window.addEventListener('keydown', (e) => {
    if (!cmdPalette.classList.contains('hidden')) return;

    if (e.key === 'ArrowRight') showSlide(currentIndex + 1);
    if (e.key === 'ArrowLeft') showSlide(currentIndex - 1);
    
    if (e.key >= '1' && e.key <= '5') {
        showSlide(parseInt(e.key) - 1);
    }
    
    if (e.key === ' ') {
        e.preventDefault(); 
        playing = !playing;
        if (playing) slideInterval = setInterval(() => showSlide(currentIndex + 1), 1000);
        else clearInterval(slideInterval);
    }
});

window.addEventListener('keydown', (e) => {
    // Ctrl + K
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        cmdPalette.classList.remove('hidden');
        cmdInput.focus();
    }
    // Escape
    if (e.key === 'Escape') {
        cmdPalette.classList.add('hidden');
        gallery.focus();
    }
});

const items = Array.from(document.querySelectorAll('#cmdList li'));
cmdInput.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    items.forEach(li => {
        if (li.textContent.toLowerCase().includes(val)) li.style.display = 'block';
        else li.style.display = 'none';
    });
});

cmdPalette.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement.tagName === 'LI') {
        alert("Đã chọn: " + document.activeElement.textContent);
        cmdPalette.classList.add('hidden');
    }
});