const getUser = () => JSON.parse(localStorage.getItem('usuarioActivo'));
const setUser = (user) => localStorage.setItem('usuarioActivo', JSON.stringify(user));
const getUsers = () => JSON.parse(localStorage.getItem('usuariosImportShop')) || [];
const setUsers = (users) => localStorage.setItem('usuariosImportShop', JSON.stringify(users));

if (getUsers().length === 0) {
  setUsers([{
    nombre: "Administrador",
    correo: "admin@importshop.com",
    password: "123",
    rol: "admin"
  }]);
}

function updateHeaderUser() {
  const user = getUser();
  document.querySelectorAll('.login-link').forEach(link => {
    if (user) {
      if (user.rol === 'admin') {
        link.innerHTML = `<i class="fa-solid fa-screwdriver-wrench"></i> Panel Admin`;
        link.href = 'admin.html';
        link.title = 'Ir al Panel de Administración';
      } else {
        link.innerHTML = `<i class="fa-solid fa-circle-user"></i> Mi Perfil`;
        link.href = 'perfil.html';
        link.title = 'Ir a mi perfil';
      }
      link.onclick = null;
    } else {
      link.innerHTML = `<i class="fa-solid fa-circle-user"></i> Iniciar sesión`;
      link.href = 'login.html';
    }
  });
}

function initLoginPage() {
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.target).classList.add('active');
    });
  });

  const loginForm = document.getElementById('form-login');
  const registerForm = document.getElementById('form-register');
  const msg = document.getElementById('auth-message');

  const correoInput = document.getElementById('login-correo');
  const passwordInput = document.getElementById('login-password');
  if (correoInput && passwordInput) {
      correoInput.value = 'admin@importshop.com';
      passwordInput.value = '123';
  }

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value.trim();
    const correo = document.getElementById('reg-correo').value.trim().toLowerCase();
    const password = document.getElementById('reg-password').value.trim();
    let users = getUsers();

    if (users.some(u => u.correo === correo)) {
      msg.textContent = 'Este correo ya está registrado.';
      msg.className = 'auth-message error';
      return;
    }

    const newUser = { nombre, correo, password, rol: 'usuario' };
    users.push(newUser);
    setUsers(users);
    setUser({ nombre, correo, rol: 'usuario' });
    msg.textContent = 'Registro exitoso. Redirigiendo...';
    msg.className = 'auth-message success';
    setTimeout(() => window.location.href = 'perfil.html', 1200);
  });

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const correo = document.getElementById('login-correo').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value.trim();
    const user = getUsers().find(u => u.correo === correo && u.password === password);

    if (!user) {
      msg.textContent = 'Correo o contraseña incorrectos.';
      msg.className = 'auth-message error';
      return;
    }

    setUser({ nombre: user.nombre, correo: user.correo, rol: user.rol || 'usuario' });
    msg.textContent = 'Bienvenido/a';
    msg.className = 'auth-message success';
    setTimeout(() => {
        if(user.rol === 'admin') window.location.href = 'admin.html';
        else window.location.href = 'perfil.html';
    }, 1000);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateHeaderUser();
  initLoginPage();
});

export { getUser };
