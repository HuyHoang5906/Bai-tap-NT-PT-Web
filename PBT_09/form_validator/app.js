const form = document.getElementById('regForm');
const inputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    password: document.getElementById('password'),
    confirm: document.getElementById('confirmPassword'),
    phone: document.getElementById('phone')
};
const submitBtn = document.getElementById('submitBtn');
const strengthProgress = document.getElementById('strengthProgress');

let isValid = { name: false, email: false, password: false, confirm: false, phone: false };

function checkFormState() {
    const allValid = Object.values(isValid).every(val => val === true);
    submitBtn.disabled = !allValid;
}

function setIcon(input, valid) {
    const icon = input.nextElementSibling;
    if (icon && icon.classList.contains('icon')) {
        icon.textContent = valid ? '✅' : '❌';
    }
    input.className = valid ? 'valid' : 'invalid';
}


inputs.name.addEventListener('input', (e) => {
    const val = e.target.value.trim();
    isValid.name = val.length >= 2 && val.length <= 50;
    setIcon(inputs.name, isValid.name);
    checkFormState();
});

inputs.email.addEventListener('input', (e) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid.email = regex.test(e.target.value);
    const errorMsg = inputs.email.nextElementSibling;
    errorMsg.style.display = isValid.email || e.target.value === '' ? 'none' : 'block';
    inputs.email.className = isValid.email ? 'valid' : 'invalid';
    checkFormState();
});

inputs.password.addEventListener('input', (e) => {
    const val = e.target.value;
    let strength = 0;
    if (val.length >= 8) strength++;
    if (/[a-zA-Z]/.test(val) && /[0-9]/.test(val)) strength++;
    if (/[^a-zA-Z0-9]/.test(val) && /[A-Z]/.test(val)) strength++;

    isValid.password = strength >= 2; 
    
    if (strength === 0) { strengthProgress.style.width = '0%'; }
    else if (strength === 1) { strengthProgress.style.width = '33%'; strengthProgress.style.background = 'red'; }
    else if (strength === 2) { strengthProgress.style.width = '66%'; strengthProgress.style.background = 'orange'; }
    else if (strength === 3) { strengthProgress.style.width = '100%'; strengthProgress.style.background = 'green'; }

    inputs.confirm.dispatchEvent(new Event('input'));
    checkFormState();
});

inputs.confirm.addEventListener('input', (e) => {
    isValid.confirm = e.target.value === inputs.password.value && e.target.value !== '';
    setIcon(inputs.confirm, isValid.confirm);
    checkFormState();
});

inputs.phone.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    if (val.length > 10) val = val.substring(0, 10);
    
    let formatted = val;
    if (val.length > 4) formatted = val.slice(0,4) + '-' + val.slice(4);
    if (val.length > 7) formatted = formatted.slice(0,8) + '-' + val.slice(8);
    
    e.target.value = formatted;
    isValid.phone = val.length === 10;
    inputs.phone.className = isValid.phone ? 'valid' : 'invalid';
    checkFormState();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert("🎉 Đăng ký thành công!");
});