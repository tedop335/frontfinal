function getProductDetails(productId) {
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      console.log('Fetched data:', data)
      const productInfo = document.querySelector('#product-info');
      const product = data.products.find(item => item.id === productId);
      console.log('Product:', product);

      if (product) {
        const { id, image, title, status, description } = product;

        productInfo.innerHTML = `
          <div class="product-card">
            <img src="${image}" alt="${title}">
            <h3>${title}</h3>
            <p>Status: ${status}</p>
            <p>Description: ${description}</p>
          </div>
        `;
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
  getProductDetails(parseInt(productId));
}

const registrationForm = document.querySelector('#registration-form');
const formMessage = document.querySelector('#form-message');

registrationForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value;
  const name = document.querySelector('#name').value;
  const lastName = document.querySelector('#last-name').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;

  if (!validateEmail(email) || name.trim() === '' || password.length < 5 || password !== confirmPassword) {
    formMessage.textContent = 'Please enter valid information.';
    return;
  }

  const user = {
    email,
    name,
    lastName,
    password
  };

  let users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));

  formMessage.textContent = 'Registration successful!';
  registrationForm.reset();
  formMessage.textContent = '';
});

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
