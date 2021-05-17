document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const body = document.querySelector('body');

  const state = {};

  state.auth = false;

  if (state.auth) {
    body.innerHTML = `<div class="login">
    <form >
      <div class="form-input">
        <label>Enter Email</label>
        <input type="text" name="email" > 
      </div>
      <div class="form-input">
        <label>Enter Password</label>
        <input type="password" name="password" > 
      </div>
      <button>Login</button>
    </form>
  </div>`;


  }

  for (let i = 0; i < 20; i++) {
    console.log('i :', i);
    const div = document.createElement('div');
    div.classList.add('content');


    const h2 = document.createElement('h2');
    h2.textContent = 'Annilation';
    div.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = 'Hello Am learning sth here';
    div.appendChild(p);

    app.appendChild(div);
  }





  //   body.innerHTML = `<div class="register">
  //   <form class="form">
  //     <div class="form-input">
  //       <label>Enter Name</label>
  //       <input type="text" name="email" > 
  //     </div>
  //     <div class="form-input">
  //       <label>Enter Email</label>
  //       <input type="email" name="email" > 
  //     </div>
  //     <div class="form-input">
  //       <label>Enter Password</label>
  //       <input type="password" name="password" > 
  //     </div>
  //     <button>Login</button>
  //   </form>
  // </div>`;

  console.log('content loaded');
});