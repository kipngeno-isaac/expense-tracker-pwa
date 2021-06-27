document.addEventListener('DOMContentLoaded', () => {

  const state = {};


  state.user = JSON.parse(localStorage.getItem('user'));
  state.auth = state.user.length > 0;

  state.expenses = [
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
  ];

  const url = `https://adonis-personal-finance-api.herokuapp.com/api/v1/expenses?page=${1}&&user_id=${state.user.id}`
  if (state.auth) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        if (data.status && data.expenses.total > 0) {
          state.expenses = data.expenses.data;
          setContent(data.expenses.data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  console.log('authenticated', state.auth);


  let data = state.expenses;
  setContent(data)
  console.log('data', data);

  document.querySelector('.btn').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'addExpense.html';
  })

  console.log('content loaded');
});

function setContent(data) {
  const expenseCategories = document.querySelector('.expense_categories');
  let totalExpenses = 0;
  for (let i = 0; i < data.length; i++) {
    console.log('i :', data[i]);
    totalExpenses += parseFloat(data[i].amount);
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

}