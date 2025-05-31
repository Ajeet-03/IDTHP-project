// Tab switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// Encryption
document.getElementById('encryptForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const file = document.getElementById('fileInput').files[0];
    const password = document.getElementById('encryptPassword').value;
    const output = document.getElementById('encryptedOutput');

    const reader = new FileReader();
    reader.onload = function () {
        const base64Image = reader.result.split(',')[1];
        const encrypted = CryptoJS.AES.encrypt(base64Image, password).toString();
        output.value = encrypted;
    };
    reader.readAsDataURL(file);
});

// Decryption
document.getElementById('decryptForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const encrypted = document.getElementById('encryptedInput').value;
    const password = document.getElementById('decryptPassword').value;
    const img = document.getElementById('decryptedImage');

    try {
        const decryptedBytes = CryptoJS.AES.decrypt(encrypted, password);
        const decryptedBase64 = decryptedBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedBase64) {
            alert('Invalid password or corrupted data.');
            return;
        }

        img.src = 'data:image/png;base64,' + decryptedBase64;
        img.style.display = 'block';
    } catch (err) {
        alert('Decryption failed. Please check your input.');
    }
});
