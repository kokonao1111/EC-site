// ===== カートページの機能 =====
const cartEmptySection = document.getElementById('cartEmptySection');
const cartItemsSection = document.getElementById('cartItemsSection');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartSubtotal = document.getElementById('cartSubtotal');
const cartTotal = document.getElementById('cartTotal');

// カート情報を読み込む
const loadCart = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log('[cart] items:', cart);
  
  if (cart.length === 0) {
    // カートが空の場合
    cartEmptySection.style.display = 'block';
    cartItemsSection.style.display = 'none';
    updateCartCount(0);
  } else {
    // カートに商品がある場合
    cartEmptySection.style.display = 'none';
    cartItemsSection.style.display = 'block';
    renderCartItems(cart);
    updateCartCount(cart.length);
  }
};

// カートアイテムを表示
const renderCartItems = (cart) => {
  cartItemsContainer.innerHTML = '';
  
  let subtotal = 0;
  
  cart.forEach((item, index) => {
    const safeName = item.name || '商品';
    const safeSize = item.size || '-';
    const safePrice = Number(item.price) || 0;
    const safeImage = item.image || 'images/hare1何もなし.jpg';
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.innerHTML = `
      <div class="cart-item-image">
        <a href="syouhinn1.html" class="cart-item-link">
          <img src="${safeImage}" alt="${safeName}">
        </a>
      </div>
      <div class="cart-item-info">
        <a href="syouhinn1.html" class="cart-item-link">
          <h3 class="cart-item-name">${safeName}</h3>
        </a>
        <p class="cart-item-size">サイズ: ${safeSize}</p>
        <p class="cart-item-price">¥${safePrice.toLocaleString()}</p>
        <button class="cart-item-remove" data-index="${index}">削除</button>
      </div>
    `;
    
    cartItemsContainer.appendChild(cartItem);
    subtotal += safePrice * (item.quantity || 1);
  });
  
  // 合計金額を更新
  cartSubtotal.textContent = `¥${subtotal.toLocaleString()}`;
  cartTotal.textContent = `¥${subtotal.toLocaleString()}`;
  
  // 削除ボタンのイベントリスナーを追加
  const removeButtons = document.querySelectorAll('.cart-item-remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      removeFromCart(index);
    });
  });
};

// カートから商品を削除
const removeFromCart = (index) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
};

// カートの個数を更新（ヘッダーのカート表示を更新）
const updateCartCount = (count) => {
  const cartLink = document.querySelector('.nav-links a[href="kaimono.html"]');
  if (cartLink) {
    cartLink.textContent = `買い物かご [${count}]`;
  }
};

// レジに進むボタン
const checkoutBtn = document.querySelector('.cart-checkout-btn');
const checkoutDevModal = document.getElementById('checkoutDevModal');
const checkoutDevClose = document.getElementById('checkoutDevClose');
const checkoutDevOverlay = document.querySelector('.checkout-dev-overlay');
const cartHeader = document.querySelector('.header');

const openCheckoutDevModal = () => {
  if (checkoutDevModal) {
    checkoutDevModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    if (cartHeader) {
      cartHeader.classList.add('is-dim');
    }
  }
};

const closeCheckoutDevModal = () => {
  if (checkoutDevModal) {
    checkoutDevModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
    if (cartHeader) {
      cartHeader.classList.remove('is-dim');
    }
  }
};

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    openCheckoutDevModal();
  });
}

if (checkoutDevClose) {
  checkoutDevClose.addEventListener('click', closeCheckoutDevModal);
}

if (checkoutDevOverlay) {
  checkoutDevOverlay.addEventListener('click', closeCheckoutDevModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && checkoutDevModal && checkoutDevModal.classList.contains('active')) {
    closeCheckoutDevModal();
  }
});

// ページ読み込み時にカートを表示
loadCart();

