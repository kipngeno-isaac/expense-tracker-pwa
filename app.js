document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');



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


  console.log('content loaded');
});