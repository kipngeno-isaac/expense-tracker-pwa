document.addEventListener('DOMContentLoaded', () => {

  const state = {};


  state.user = JSON.parse(localStorage.getItem('user'));
  console.log('user', state.user);


  const url = `https://adonis-personal-finance-api.herokuapp.com/api/v1/expenses?page=${1}&user_id=${state.user.id}`;
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



  document.querySelector('.btn').addEventListener('click', (event) => {
    event.preventDefault();
    window.location.href = 'expense.html';
  })

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