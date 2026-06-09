// const currentYear = () => {
//     return new Date().getFullYear();
// }

const currentYear = new Date().getFullYear();
$('#fyear').html(currentYear);

const rangeInput = document.getElementById('range-input');
const output = document.getElementById('passlength');

rangeInput.addEventListener('input', () => {
    output.value = rangeInput.value;
});
// =====================================


const passwordLengthInput = document.getElementById('passlength');
const includeUppercaseInput = document.getElementById('uppercase');
const includeLowercaseInput = document.getElementById('lowercase');
const includeNumbersInput = document.getElementById('numbers');
const includeSymbolsInput = document.getElementById('symbols');
const generatePasswordButton = document.getElementById('generate-password');
const passwordInput = document.getElementById('password');
const copyPasswordButton = document.getElementById('copy-password');

function generatePassword() {

    const passwordLength = passwordLengthInput.value;
    const includeUppercase = includeUppercaseInput.checked;
    const includeLowercase = includeLowercaseInput.checked;
    const includeNumbers = includeNumbersInput.checked;
    const includeSymbols = includeSymbolsInput.checked;

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';

    let chars = '';
    if (includeUppercase) {
        chars += uppercaseChars;
    }
    if (includeLowercase) {
        chars += lowercaseChars;
    }
    if (includeNumbers) {
        chars += numberChars;
    }
    if (includeSymbols) {
        chars += symbolChars;
    }

    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    passwordInput.value = password;
}

generatePassword();
window.onload = generatePassword;

// Generate password on button click
$('#generate-password').on('click', generatePassword); //using JQ

// generatePasswordButton.addEventListener('click', generatePassword); using javascript

// Generate password whenever any input value changes
// passwordLengthInput.addEventListener('input', generatePassword);
$('#passlength').on('input', generatePassword);
$('#uppercase').on('change', generatePassword);
$('#lowercase').on('change', generatePassword);
$('#numbers').on('change', generatePassword);
$('#symbols').on('change', generatePassword);
$('#range-input').on('change', generatePassword);

// copyPasswordButton.addEventListener('click', () => {
//     passwordInput.select();
//     document.execCommand('copy');

// });

// onclick rorate icon of password generater 
$('.pass-ref').on('click', function () {
    $('.pass-ref').addClass('rotate-360');
    setTimeout(() => {

        $('.pass-ref').removeClass('rotate-360');
    }, 300);

});

// code to copy the generated password 
$('#copy-password').on('click', function () {
    passwordInput.select();
    document.execCommand('copy');

    $('.copy-btn-icon').removeClass('fi-rr-copy');
    $('.copy-btn-icon').addClass('fi-rr-check');
    $('.copy-btn').addClass('bg-success text-white');
    setTimeout(() => {
        $('.copy-btn-icon').removeClass('fi-rr-check');
        $('.copy-btn').removeClass('bg-success text-white');
        $('.copy-btn-icon').addClass('fi-rr-copy');

    }, 1000);
});

//  code for generating QR code 
function generateQRCode() {
    var url = $('#password').val();
    if (url.trim() == '') {
        alert('Please Generate Valid Password');
        return false;
    } else {
        $('#qr').empty();
        var qrcode = new QRCode(document.getElementById("qr"), {
            text: url,
            width: 200,
            height: 200
        });
        $('#downloadQR').removeAttr('disabled');
    }
}
generateQRCode();

window.onload = generateQRCode;
//onclick generate QR Code
// generatePasswordButton.addEventListener('click', generateQRCode);
$('#generate-password').on('click', generateQRCode);

$('#passlength').on('input', generateQRCode);
$('#password').on('input', generateQRCode);
$('#uppercase').on('change', generateQRCode);
$('#lowercase').on('change', generateQRCode);
$('#numbers').on('change', generateQRCode);
$('#symbols').on('change', generateQRCode);
$('#range-input').on('change', generateQRCode);

$(document).ready(function () {

    $('#downloadQR').on('click', function () {
        var canvas = $('#qr canvas').get(0);
        var img = canvas.toDataURL("image/png");
        $(this).attr('href', img);
    });
});