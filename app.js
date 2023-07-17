// // querying the DOM
// const loanForm = document.querySelector('form');
// const hisDiv = document.querySelector('.history');
// const resetButton = document.querySelector('.btFresh');


// loanForm.addEventListener('submit', (nero) =>{
//         nero.preventDefault();
//         amount = (Number(loanForm.loanInput.value));
//         years = (Number(loanForm.yearsIn.value));
//         let totalAmount = (amount * years * 2)/100;
//         let SI = totalAmount.toLocaleString('en');
//         let loan = amount + totalAmount;
//         let month = years*12;
//         let monthly = amount / month
//         if (totalAmount){
//             document.getElementById('displ3').textContent = `₦${SI}`;
//             document.getElementById('displ2').textContent = `₦${loan}`;
//             document.getElementById('displ1').textContent = `₦${monthly}`;
//         }
//           // resetting the result and form
//         resetButton.addEventListener('click', (jay) => {
//             jay.preventDefault()
//             loanForm.reset();
//             document.getElementById('displ3').textContent = ``;
//             document.getElementById('displ2').textContent = ``;
//             document.getElementById('displ1').textContent = ``;
//         })
// })

const loanForm = document.querySelector('form');
const hisDivs = document.querySelector('.history');
const hisDiv = document.querySelector('.tab');
const resetButton = document.querySelector('.btFresh');

loanForm.addEventListener('submit', (nero) => {
  nero.preventDefault();
  const amountInput = loanForm.loanInput;
  const yearsInput = loanForm.yearsIn;
    // Check for valid input values
    if (isNaN(amountInput.value) || isNaN(yearsInput.value) || amountInput.value < 0 || yearsInput.value < 0) {
        alert('Please enter valid values for the loan amount and years');
        return;
      }
  const amount = Number(loanForm.loanInput.value);
  const years = Number(loanForm.yearsIn.value);
  const rate = 2;
  const month = years * 12;
  const monthlyRate = rate / 1200;
  const monthlyPayment = amount * monthlyRate / (1 - (1 + monthlyRate) ** -month);
  const totalPayment = monthlyPayment * month;
  const totalInterest = totalPayment - amount;

  document.getElementById('displ3').textContent = `₦${totalInterest.toLocaleString('en')}`;
  document.getElementById('displ2').textContent = `₦${totalPayment.toLocaleString('en')}`;
  document.getElementById('displ1').textContent = `₦${monthlyPayment.toLocaleString('en')}`;

  // display amortization schedule
  const table = document.createElement('table');
  const headers = ['Month', 'Balance', 'Payment', 'Interest Paid'];
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);


  let balance = amount;
  for (let i = 1; i <= month; i++) {
    const interest = balance * monthlyRate;
    const principal = monthlyPayment - interest;
    balance -= principal;

    const row = document.createElement('tr');
    const monthCell = document.createElement('td');
    monthCell.textContent = i;
    row.appendChild(monthCell);

    const balanceCell = document.createElement('td');
    balanceCell.textContent = `₦${balance.toLocaleString('en')}`;
    row.appendChild(balanceCell);

    const paymentCell = document.createElement('td');
    paymentCell.textContent = `₦${monthlyPayment.toLocaleString('en')}`;
    row.appendChild(paymentCell);

    const interestCell = document.createElement('td');
    interestCell.textContent = `₦${interest.toLocaleString('en')}`;
    row.appendChild(interestCell);

    table.appendChild(row);
  }

  hisDiv.innerHTML = '';
  hisDiv.appendChild(table);

  // resetting the result and form
  resetButton.addEventListener('click', (jay) => {
    jay.preventDefault()
    loanForm.reset();
    document.getElementById('displ3').textContent = ``;
    document.getElementById('displ2').textContent = ``;
    document.getElementById('displ1').textContent = ``;
    hisDiv.innerHTML = '';
  })
});
