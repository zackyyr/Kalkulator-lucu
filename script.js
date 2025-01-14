// Step 1 : Tangkep elemen yang dibutuhkan, yaitu display buat nampilin angka/hasil dan tombol-tombol (angka, operator, dll)
const display         = document.getElementById('user-input');
const numberButtons   = document.querySelectorAll('.numbers');
const operatorButtons = document.querySelectorAll('.operations');

// Step 2 : Definisi variabel global, yaitu angka yang lagi diketik (currentNumber), angka sebelumnya (previousNumber), dan operator yang dipilih (operator)
let currentNumber  = ""; 
let previousNumber = "";
let operator       = null;

// Step 3 : Event Listener Tombol Angka => Setiap tombol angka di klik, tambahin angkanya ke currentNumber, terus update di display.
numberButtons.forEach((button) =>  { // numberButtons adalah Node list(daftar elemen DOM) jadi untuk menambahkan event listener ke setiap tombol angka, kita pake forEach. 
    button.addEventListener('click', () => {
    if(currentNumber === "0" && button.innerText === "0") return;  // Kalo angka sekarang adalah 0 DAN angka yang di klik juga 0, fungsi langsung berhenti (return). Ini buat mencegah user mengetik 000
    currentNumber += button.innerText; // Angka yang tertulis di tombol yang diklik (contohnya "1", "2", "3", dst)
    display.innerText = currentNumber;
    });
});

// Step 4 : Event Listener Tombol Operator
operatorButtons.forEach((button) => { 
    button.addEventListener("click", () => { 
        if(button.innerText === "=") return;
        if(button.innerText === "AC") {clearAll(); return;};
        if(button.innerText === "DEL") {deleteLast(); return;};
        if(currentNumber    === "") return;
        
        operator       = button.innerText;
        previousNumber = currentNumber;
        currentNumber  = "";
    })
})

// Step 5 : Tombol Hasil (=)
document.querySelector(".key-operate.operations:last-child").addEventListener("click", () => {
    if (previousNumber === "" || currentNumber === "" || operator === null) return;

    const num1 = parseFloat(previousNumber);
    const num2 = parseFloat(currentNumber);  // Mengubah angka ke float, kenapa? karena semua input dari kalkulator adalah string maka perlu dikonversi ke angka desimal (float)

    switch (operator) {
        case "+":
            currentNumber = num1 + num2;
            break;
        case "-":
            currentNumber = num1 - num2;
            break;
        case "*":
            currentNumber = num1 * num2;
            break;
        case "/":
            currentNumber = num1 / num2;
            break;
        case "%":
            currentNumber = num1 % num2;
            break;
        default:
            return;
    }

    display.innerText = currentNumber;
    previousNumber = "";
    operator = null;
});


// Step 6 : Function Reset dan Delete 
function clearAll() {
    currentNumber = "";
    previousNumber = "";
    operator = null;
    display.innerText = "0";
  }
  
  function deleteLast() {
    currentNumber = currentNumber.slice(0, -1); // Potong karakter terakhir
    display.innerText = currentNumber || "0"; // Kalau kosong, jadi "0"
  }
  
// Step 7 : Handle Input Tombol Titik *.
numberButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.innerText === "." && currentNumber.includes(".")) return; // Cegah titik ganda
        currentNumber += button.innerText;
        // display.innerText = currentNumber;
    });
});
  