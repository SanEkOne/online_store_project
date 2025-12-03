class Registration {
  constructor() {
    this.login_container = document.getElementById("login");
    this.register_container = document.getElementById("register");


  }

  printLoginForm() {
    this.register_container.innerHTML = "";
    this.login_container.innerHTML = `
      <h2>Вход</h2>
      <input id="logUserEmail" type="email" placeholder="Email">
      <input id="logUserPassword" type="password" placeholder="Пароль">
      <button id="loginBTN">Войти</button>

      <div class="switch">
        Нет аккаунта? <a id="registrationBTN">Регистрация</a>
      </div>`;

    this.logUserEmail = document.getElementById("logUserEmail");
    this.logUserPassword = document.getElementById("logUserPassword");
    this.loginBTN = document.getElementById("loginBTN");

    this.loginBTN.addEventListener("click", () => this.loginUser());

    document.getElementById("registrationBTN").addEventListener("click", () => {
      this.printRegisterForm();
    });
  }

  printRegisterForm() {
    this.login_container.innerHTML = "";
    this.register_container.innerHTML = `
      <h2>Регистрация</h2>
      <input id="username" type="text" placeholder="Имя">
      <input id="userEmail" type="email" placeholder="Email">
      <input id="userPassword" type="password" placeholder="Пароль">
      <button id="createAccountBTN">Создать аккаунт</button>

      <div class="switch">
        Уже зарегистрированы? <a id="loginBTN">Вход</a>
      </div>`;

    this.username = document.getElementById("username");
    this.userEmail = document.getElementById("userEmail");
    this.userPassword = document.getElementById("userPassword");
    this.createAccountBTN = document.getElementById("createAccountBTN");

    this.createAccountBTN.addEventListener("click", () => this.registrationUser());


    document.getElementById("loginBTN").addEventListener("click", () => {
      this.printLoginForm();
    });
  }

  registrationUser() {
    let user = {
      username: this.username.value,
      email: this.userEmail.value,
      password: this.userPassword.value
    };

    const username = this.username.value.trim();
    const email = this.userEmail.value.trim();
    const password = this.userPassword.value.trim();

    if (!username || !email || !password) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Введите корректный email!");
      return;
    }

    let users = this.getCookie("users");
    users = users ? JSON.parse(users) : [];

    let exists = users.some(u => u.email === user.email);

    if (exists) {
      alert("Пользователь с таким email уже существует!");
      return;
    }

    users.push(user);
    this.setCookie("users", JSON.stringify(users), 365);
    alert("Регистрация прошла успешно!");
    this.username.value = ''
    this.userEmail.value = ''
    this.userPassword.value = ''
  }

  loginUser() {
    let user = {
      email: this.logUserEmail.value,
      password: this.logUserPassword.value
    };

    let users = this.getCookie("users");
    users = users ? JSON.parse(users) : [];

    let exists = users.some(u => u.email === user.email && u.password === user.password);
    if (exists) {
      alert("Вход выполнен успешно!");
      this.logUserEmail.value = ''
      this.logUserPassword.value = ''

      let currentUser = users.find(
        u => u.email === user.email && u.password === user.password
      );

      this.setCookie("currentUser", JSON.stringify(currentUser), 365);
    }
    else {
      alert("Неверный email или пароль!");
    }
  }


  setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/; SameSite=Lax";
  }

  getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return cookie.substring(nameEQ.length);
      }
    }
    return null;
  }
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}
// deleteCookie("currentUser");
// deleteCookie("users");


const registration = new Registration();
registration.printLoginForm();
