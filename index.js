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

  const publicVapidKey = 'BOx6niRL1VeYTNz1t_iMWJTAW4crETATuD8sUZnpovevzNri-NQpWqJP40kEtmALZPPpQ_ZFT7hDAx6cfsp9ReQ';

  // Copied from the web-push documentation

  if (!('serviceWorker' in navigator)) return;

  subscribeUserToPush()

});

function subscribeUserToPush() {
  return navigator.serviceWorker.ready
    .then(function (registration) {
      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BOx6niRL1VeYTNz1t_iMWJTAW4crETATuD8sUZnpovevzNri-NQpWqJP40kEtmALZPPpQ_ZFT7hDAx6cfsp9ReQ'
        )
      };

      return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function (pushSubscription) {
      console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
      sendSubscriptionToBackEnd(pushSubscription)

      return pushSubscription;
    });
}

function sendSubscriptionToBackEnd(subscription) {
  return fetch('https://adonis-personal-finance-api.herokuapp.com/api/v1/subscriptions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
    .then(function (response) {
      if (!response.ok) {
        throw new Error('Bad status code from server.');
      }

      return response.json();
    })
    .then(function (responseData) {
      if (!(responseData.data && responseData.data.success)) {
        throw new Error('Bad response from server.');
      }
    });
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}


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