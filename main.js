// Confirm Password && Save User in Local Storage

let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let errorMsg = document.getElementById("errorMsg");

function handlePasswords(e) {
  e.preventDefault();

  if (password.value.length >= 3 && confirmPassword.value.length >= 3) {
    if (password.value != confirmPassword.value) {
      errorMsg.style.display = "block";
    } else {
      let newUser = {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
      };

      let newUserString = JSON.stringify(newUser);
      console.log(newUserString);
      localStorage.setItem("user", newUserString);
      window.location.href = "./login.html";
    }
  }
}

// Login
let loginPassword = document.getElementById("login-password");
let loginEmail = document.getElementById("login-email");
let loginsBtn = document.getElementById("btn-login");
let loginErrMsg = document.getElementById("loginErrorMsg");
let welcomeDiv = document.getElementById("welcome-div");
let welcomeMsg = document.getElementById("welcome-text");

let user = JSON.parse(localStorage.getItem("user"));
console.log(user);
function handleLogin(e) {
  e.preventDefault();

  if (user.email == loginEmail.value && user.password == loginPassword.value) {
    user.isLogin = true;

    let userString = JSON.stringify(user);
    localStorage.setItem("user", userString);
    window.location.href = "./index.html";
  } else {
    loginErrMsg.style.display = "block";
  }
}
if (user.isLogin) {
  loginsBtn.style.display = "none";
  welcomeDiv.style.display = "flex";
  welcomeMsg.innerText = `مرحبا بك, ${user.fullName}`;
}

// Logout
function logout() {
  user.isLogin = false;
  let userString = JSON.stringify(user);
  localStorage.setItem("user", userString);
  window.location.href = "./index.html";
}

let productsContent = document.getElementById("products-content");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) =>
    data.map((item) => {
      // let itemDiv = document.createElement('div')
      productsContent.innerHTML += `
            <div
          style="cursor: pointer; width: 15em ; height:30em"
          class="product-item border p-4 rounded-4 position-relative"
        >
          <div class="product-img">
            <img
              src=${item.image}
              alt=""
              width="150"
              height="200"
              class="object-fit-contain"
            />
            <img
              class="position-absolute top-0 end-0 me-2 mt-2"
              src="https://img.icons8.com/?size=100&id=86&format=png&color=000000"
              width="25"
              alt=""
            />
          </div>
          <div
            class="first-t d-flex justify-content-between align-items-center my-2"
          >
            <div
              style="background-color: rgba(255, 255, 0, 0.205)"
              class="product-price"
            >
              <h4 class="m-0">$${item.price}</h4>
            </div>
            <div class="product-rate">
              <h6>${item.rating.rate}⭐</h6>
            </div>
          </div>

          <div class="product-title">
            <p class="fw-bold">
              ${item.title}
            </p>
          </div>
          <div class="product-action d-flex justify-content-center position-absolute bottom-0 mb-3">
            <button class="btn btn-primary">أضف الى السلة</button>
          </div>
        </div>`;
    })
  );
