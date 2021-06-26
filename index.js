document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const expenseCategories = document.querySelector('.expense_categories');

  const state = {};

  state.auth = false;
  const data = [
    {
      name: 'Food',
      amount: 1200
    },
    {
      name: 'Entertainment',
      amount: 3200
    },
    {
      name: 'Fare',
      amount: 1000
    },
    {
      name: 'Medical',
      amount: 11200
    },
  ]

  let totalExpenses = 0;
  for (let i = 0; i < data.length; i++) {
    console.log('i :', data[i]);
    totalExpenses += data[i].amount;
    const expenseWrapper = document.createElement('div');
    expenseWrapper.classList.add('expense');


    const expenseName = document.createElement('div');
    expenseName.classList.add('expense_name');
    expenseName.textContent = data[i].name;
    expenseWrapper.appendChild(expenseName);

    const expenseAmount = document.createElement('div');
    expenseAmount.classList.add('expense_amount');
    expenseAmount.textContent = data[i].amount.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });
    expenseWrapper.appendChild(expenseAmount);

    expenseCategories.appendChild(expenseWrapper);
  }

  document.querySelector('.expense_total').textContent = totalExpenses.toLocaleString('en-KE', { style: 'currency', currency: 'KES' });

  document.querySelector('.btn').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'addExpense.html';
  })

  console.log('content loaded');
});