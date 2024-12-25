let registeredUser = null;

document.addEventListener("DOMContentLoaded", () => {
    const savedUser = localStorage.getItem("registeredUser");
    if (savedUser) {
        registeredUser = JSON.parse(savedUser);
        document.getElementById('registerFormSection').classList.add('hidden');
        document.getElementById('shortcutSection').classList.remove('hidden');
        document.getElementById('userGreeting').innerText = registeredUser.username;
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateRegistrationForm() {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (!username || !email || !password) {
        alert("Mohon isi semua data.");
        return false;
    }

    if (!validateEmail(email)) {
        alert("Mohon masukkan email yang valid.");
        return false;
    }

    return true;
}

function register() {
    if (validateRegistrationForm()) {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        registeredUser = { username, email, password };
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
        alert("Pendaftaran Berhasil!");
        document.getElementById('registerFormSection').classList.add('hidden');
        document.getElementById('shortcutSection').classList.remove('hidden');
        document.getElementById('userGreeting').innerText = username;
    }
}

function logout() {
    localStorage.removeItem("registeredUser");
    registeredUser = null;
    alert("Anda telah keluar.");
    document.getElementById('registerFormSection').classList.remove('hidden');
    document.getElementById('shortcutSection').classList.add('hidden');
    hideAllForms();
}

function showPulsaForm() {
    hideAllForms();
    document.getElementById('pulsaForm').classList.remove('hidden');
}

function showPaketDataForm() {
    hideAllForms();
    document.getElementById('paketDataForm').classList.remove('hidden');
}

function showTokenForm() {
    hideAllForms();
    document.getElementById('tokenForm').classList.remove('hidden');
}

function showEMoneyForm() {
    hideAllForms();
    document.getElementById('eMoneyForm').classList.remove('hidden');
}

function hideAllForms() {
    document.getElementById('pulsaForm').classList.add('hidden');
    document.getElementById('paketDataForm').classList.add('hidden');
    document.getElementById('tokenForm').classList.add('hidden');
    document.getElementById('eMoneyForm').classList.add('hidden');
    document.getElementById('paymentForm').classList.add('hidden');
    document.getElementById('receiptForm').classList.add('hidden');
}

function updateTotalPricePulsa() {
    const nominal = document.getElementById('nominalPulsa').value;
    document.getElementById('totalPricePulsa').innerText = `Rp ${parseInt(nominal).toLocaleString()}`;
}

function updateTotalPriceData() {
    const nominal = document.getElementById('nominalData').value;
    document.getElementById('totalPriceData').innerText = `Rp ${parseInt(nominal).toLocaleString()}`;
}

function updateTotalPriceToken() {
    const nominal = document.getElementById('nominalToken').value;
    document.getElementById('totalPriceToken').innerText = `Rp ${parseInt(nominal).toLocaleString()}`;
}

function updateTotalPriceEMoney() {
    const nominal = document.getElementById('nominalEMoney').value;
    document.getElementById('totalPriceEMoney').innerText = `Rp ${parseInt(nominal).toLocaleString()}`;
}

function goToPayment() {
    const paymentAmount = getCurrentPaymentAmount();
    document.getElementById('paymentAmount').innerText = `Rp ${paymentAmount.toLocaleString()}`;
    hideAllForms();
    document.getElementById('paymentForm').classList.remove('hidden');
    alert("Lanjut ke pembayaran!");
}

function getCurrentPaymentAmount() {
    const pulsaFormVisible = !document.getElementById('pulsaForm').classList.contains('hidden');
    const dataFormVisible = !document.getElementById('paketDataForm').classList.contains('hidden');
    const tokenFormVisible = !document.getElementById('tokenForm').classList.contains('hidden');
    const eMoneyFormVisible = !document.getElementById('eMoneyForm').classList.contains('hidden');

    if (pulsaFormVisible) {
        return parseInt(document.getElementById('nominalPulsa').value);
    } else if (dataFormVisible) {
        return parseInt(document.getElementById('nominalData').value);
    } else if (tokenFormVisible) {
        return parseInt(document.getElementById('nominalToken').value);
    } else if (eMoneyFormVisible) {
        return parseInt(document.getElementById('nominalEMoney').value);
    }

    return 0;
}

function confirmPayment() {
    const paymentAmount = getCurrentPaymentAmount();
    hideAllForms();
    document.getElementById('receiptAmount').innerText = `Rp ${paymentAmount.toLocaleString()}`;
    document.getElementById('receiptDate').innerText = new Date().toLocaleString();
    document.getElementById('receiptForm').classList.remove('hidden');
    alert("Pembayaran berhasil!");
}
let currentPaymentAmount = 0; // Tambahkan variabel global untuk menyimpan nominal pembayaran

function goToPayment() {
    currentPaymentAmount = getCurrentPaymentAmount(); // Simpan nominal pembayaran sebelum masuk halaman pembayaran
    if (currentPaymentAmount > 0) {
        document.getElementById('paymentAmount').innerText = `Rp ${currentPaymentAmount.toLocaleString()}`;
        hideAllForms();
        document.getElementById('paymentForm').classList.remove('hidden');
        alert("Lanjut ke pembayaran!");
    } else {
        alert("Tidak ada nominal yang dipilih. Silakan pilih nominal terlebih dahulu.");
    }
}

function confirmPayment() {
    if (currentPaymentAmount > 0) {
        hideAllForms();
        document.getElementById('receiptAmount').innerText = `Rp ${currentPaymentAmount.toLocaleString()}`;
        document.getElementById('receiptDate').innerText = new Date().toLocaleString();
        document.getElementById('receiptForm').classList.remove('hidden');
        document.getElementById
        alert("Pembayaran berhasil!");
    } else {
        alert("Nominal pembayaran tidak valid.");
    }
}

function hideReceiptForm() {
    document.getElementById('receiptForm').classList.add('hidden');
    document.getElementById('shortcutSection').classList.remove('hidden');
}
