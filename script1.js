const API_URL = '/api';

window.toggleAuth = function() {
    document.getElementById('login-form')?.classList.toggle('d-none');
    document.getElementById('register-form')?.classList.toggle('d-none');
};

window.handleLogin = async function() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            window.location.href = 'index.html';
        } else alert(data.message || 'Login failed');
    } catch (err) { alert('Server error'); }
};

window.handleRegister = async function() {
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, role })
        });
        if (res.ok) {
            alert('Registration success! Now login.');
            window.toggleAuth();
        } else {
            const data = await res.json();
            alert(data.message);
        }
    } catch (err) { alert('Server error'); }
};

window.logout = function() {
    localStorage.clear();
    window.location.href = 'index.html';
};

window.addToCart = function(id, name, price, img) {
    let cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');
    const found = cart.find(x => x.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, name, price: parseFloat(price), img, qty: 1 });

    localStorage.setItem('plushieCart', JSON.stringify(cart));
    renderSidebarCart();
    renderFullCartPage();

    document.getElementById('cart-sidebar')?.classList.add('active');
    document.getElementById('cart-overlay')?.classList.add('active');
};

window.changeQty = function(id, delta) {
    let cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');
    const item = cart.find(x => x.id === id);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) cart = cart.filter(x => x.id !== id);
    }
    localStorage.setItem('plushieCart', JSON.stringify(cart));
    renderSidebarCart();
    renderFullCartPage();
    if (document.getElementById('checkout-summary')) renderCheckoutSummary();
};

window.removeFromCart = function(id) {
    let cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');
    cart = cart.filter(x => x.id !== id);
    localStorage.setItem('plushieCart', JSON.stringify(cart));
    renderSidebarCart();
    renderFullCartPage();
};

window.handleCheckoutRedirect = function() {
    if (!localStorage.getItem('token')) {
        alert('Please login to complete purchase! 🧸');
        window.location.href = 'login.html';
    } else window.location.href = 'checkout.html';
};

function renderSidebarCart() {
    const container = document.getElementById('cart-sidebar-items');
    const subtotalEl = document.getElementById('cart-sidebar-subtotal');
    if (!container) return;
    const cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');

    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center mt-5 text-muted">Empty</div>';
        if (subtotalEl) subtotalEl.textContent = '$0.00';
        return;
    }
    container.innerHTML = cart.map(item => `
        <div class="cart-item d-flex align-items-center mb-3">
            <img src="${item.img}" style="width:50px; height:50px; object-fit:contain;">
            <div class="flex-grow-1 ms-2">
                <div style="font-size:14px; font-weight:600;">${item.name}</div>
                <div style="color: #ff5f9a;">$${(item.price * item.qty).toFixed(2)}</div>
            </div>
            <div class="d-flex align-items-center gap-2">
                <button class="qty-btn" onclick="changeQty('${item.id}', -1)">-</button>
                <span>${item.qty}</span>
                <button class="qty-btn" onclick="changeQty('${item.id}', 1)">+</button>
            </div>
        </div>`).join('');
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
}

function renderFullCartPage() {
    const container = document.getElementById('cart-container');
    if (!container) return;
    const cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');
    if (cart.length === 0) {
        container.innerHTML = '<div class="text-center py-5"><h3>Cart is empty</h3><a href="shop.html" class="btn btn-pink mt-3">Shop</a></div>';
        return;
    }
    let html = '<table class="table align-middle"><thead><tr><th>Product</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr></thead><tbody>';
    cart.forEach(item => {
        html += `<tr>
            <td><img src="${item.img}" style="width:50px;"> ${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-light" onclick="changeQty('${item.id}', -1)">-</button> ${item.qty} <button class="btn btn-sm btn-light" onclick="changeQty('${item.id}', 1)">+</button></td>
            <td>$${(item.price * item.qty).toFixed(2)}</td>
            <td><button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.id}')">Remove</button></td>
        </tr>`;
    });
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    html += `</tbody></table><div class="text-end"><h4>Total: $${total.toFixed(2)}</h4><button onclick="handleCheckoutRedirect()" class="btn btn-pink btn-lg mt-2">Checkout</button></div>`;
    container.innerHTML = html;
}

window.renderCheckoutSummary = function() {
    const summaryEl = document.getElementById('checkout-summary');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total');
    if (!summaryEl) return;
    const cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');
    if (cart.length === 0) { summaryEl.innerHTML = '<p>Empty</p>'; return; }
    summaryEl.innerHTML = cart.map(item => `<div class="d-flex justify-content-between mb-2"><span>${item.name} x ${item.qty}</span><span class="fw-bold">$${(item.price * item.qty).toFixed(2)}</span></div>`).join('');
    const total = cart.reduce((sum, i) => sum + (i.price * i.qty), 0);
    if (subtotalEl) subtotalEl.textContent = `$${total.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
};

async function loadProducts() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;
    try {
        const res = await fetch(`${API_URL}/toys`);
        const toys = await res.json();
        const isAdmin = localStorage.getItem('role') === 'admin';
        grid.innerHTML = toys.map(toy => `
            <div class="col-6 col-md-4 col-lg-3 mb-4">
                <div class="product-card h-100">
                    <img src="${toy.image}" class="product-img">
                    <h5>${toy.name}</h5>
                    <div class="price">$${toy.price}.00</div>
                    <button class="btn btn-pink btn-add" onclick="window.addToCart('${toy._id}', '${toy.name}', ${toy.price}, '${toy.image}')">Add to Cart</button>
                    ${isAdmin ? `<div class="mt-2 d-flex gap-1"><button class="btn btn-sm btn-outline-secondary flex-grow-1" onclick="window.openEditModal('${toy._id}', '${toy.name}', ${toy.price}, '${toy.image}')">Edit</button><button class="btn btn-sm btn-outline-danger" onclick="window.deleteToy('${toy._id}')">🗑</button></div>` : ''}
                </div>
            </div>`).join('');
    } catch (err) { console.error(err); }
}

window.deleteToy = async function(id) {
    if (!confirm('Are you sure?')) return;
    await fetch(`${API_URL}/toys/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
    loadProducts();
};

window.openEditModal = function(id, name, price, img) {
    document.getElementById('edit-id').value = id;
    document.getElementById('edit-name').value = name;
    document.getElementById('edit-price').value = price;
    document.getElementById('edit-img').value = img;
    new bootstrap.Modal(document.getElementById('editModal')).show();
};

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (role === 'admin') document.getElementById('admin-panel')?.classList.remove('d-none');
    const authControls = document.getElementById('auth-controls');
    if (authControls) {
        if (token) authControls.innerHTML = `<span class="badge bg-pink me-2">${role}</span><button onclick="logout()" class="btn btn-sm btn-dark">Logout</button>`;
        else authControls.innerHTML = `<a href="login.html" class="btn btn-sm btn-outline-pink">Login</a>`;
    }

    loadProducts();
    renderSidebarCart();
    renderFullCartPage();
    renderCheckoutSummary();

    if (document.querySelector('.carousel-track')) {
        const track = document.querySelector('.carousel-track');
        const slides = Array.from(track.children);
        const nextBtn = document.querySelector('.next');
        const prevBtn = document.querySelector('.prev');
        let index = 0;
        const update = () => track.style.transform = `translateX(-${index * slides[0].offsetWidth}px)`;
        nextBtn?.addEventListener('click', () => { index = (index + 1) % slides.length; update(); });
        prevBtn?.addEventListener('click', () => { index = (index - 1 + slides.length) % slides.length; update(); });
    }

    document.getElementById('add-toy-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const toy = { name: document.getElementById('t-name').value, price: document.getElementById('t-price').value, image: document.getElementById('t-img').value };
        const res = await fetch(`${API_URL}/toys`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(toy) });
        if (res.ok) location.reload();
    });

    document.getElementById('edit-toy-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-id').value;
        const newData = { name: document.getElementById('edit-name').value, price: parseFloat(document.getElementById('edit-price').value), image: document.getElementById('edit-img').value };

        const res = await fetch(`${API_URL}/toys/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(newData) });

        if (res.ok) {
            let cart = JSON.parse(localStorage.getItem('plushieCart') || '[]');
            cart = cart.map(item => item.id === id ? { ...item, name: newData.name, price: newData.price, img: newData.image } : item);
            localStorage.setItem('plushieCart', JSON.stringify(cart));
            location.reload();
        }
    });

    document.getElementById('checkout-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.removeItem('plushieCart');
        window.location.href = 'complete.html';
    });

    // Close buttons
    [document.getElementById('close-cart'), document.getElementById('cart-overlay')].forEach(el => el?.addEventListener('click', () => {
        document.getElementById('cart-sidebar')?.classList.remove('active');
        document.getElementById('cart-overlay')?.classList.remove('active');
    }));
});
