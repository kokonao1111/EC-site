// ===== お気に入りページの機能 =====
const favoritesEmptySection = document.getElementById('favoritesEmptySection');
const favoritesItemsSection = document.getElementById('favoritesItemsSection');
const favoritesItemsContainer = document.getElementById('favoritesItemsContainer');

// ヘッダーのカート数を更新
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartLink = document.querySelector('.nav-links a[href="kaimono.html"]');
  if (cartLink) {
    cartLink.textContent = `買い物かご [${cart.length}]`;
  }
};

// お気に入り情報を読み込む
const loadFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  
  if (favorites.length === 0) {
    // お気に入りが空の場合
    favoritesEmptySection.style.display = 'block';
    favoritesItemsSection.style.display = 'none';
  } else {
    // お気に入りに商品がある場合
    favoritesEmptySection.style.display = 'none';
    favoritesItemsSection.style.display = 'block';
    renderFavoritesItems(favorites);
  }
};

// お気に入りアイテムを表示
const renderFavoritesItems = (favorites) => {
  favoritesItemsContainer.innerHTML = '';
  
  favorites.forEach((item, index) => {
    const favoriteItem = document.createElement('div');
    favoriteItem.className = 'cart-item';
    favoriteItem.innerHTML = `
      <div class="cart-item-image">
        <a href="${item.link || '#'}">
          <img src="${item.image}" alt="${item.name}">
        </a>
      </div>
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">¥${item.price.toLocaleString()}</p>
        <button class="cart-item-remove favorite-remove" data-index="${index}">削除</button>
        <div class="favorite-item-actions">
          <button class="cart-btn cart-btn-filled add-to-cart-from-favorite" data-index="${index}">カートに追加</button>
        </div>
      </div>
    `;
    
    favoritesItemsContainer.appendChild(favoriteItem);
  });
  
  // 削除ボタンのイベントリスナーを追加
  const removeButtons = document.querySelectorAll('.favorite-remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      removeFromFavorites(index);
    });
  });
  
  // カートに追加ボタンのイベントリスナーを追加
  const addToCartButtons = document.querySelectorAll('.add-to-cart-from-favorite');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const index = parseInt(button.getAttribute('data-index'));
      addToCartFromFavorites(favorites[index]);
    });
  });
};

// お気に入りから商品を削除
const removeFromFavorites = (index) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.splice(index, 1);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  loadFavorites();
};

// お気に入りからカートに追加
const favoriteCartModal = document.getElementById('favoriteCartModal');
const favoriteCartClose = document.getElementById('favoriteCartClose');
const favoriteCartOverlay = document.querySelector('.favorite-cart-overlay');

const openFavoriteCartModal = () => {
  if (favoriteCartModal) {
    favoriteCartModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
};

const closeFavoriteCartModal = () => {
  if (favoriteCartModal) {
    favoriteCartModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }
};

if (favoriteCartClose) {
  favoriteCartClose.addEventListener('click', closeFavoriteCartModal);
}

if (favoriteCartOverlay) {
  favoriteCartOverlay.addEventListener('click', closeFavoriteCartModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && favoriteCartModal && favoriteCartModal.classList.contains('active')) {
    closeFavoriteCartModal();
  }
});

const addToCartFromFavorites = (item) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartItem = {
    name: item.name,
    image: item.image,
    price: item.price,
    size: item.size || 'M',
    quantity: 1
  };
  cart.push(cartItem);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  openFavoriteCartModal();
};

// ページ読み込み時にお気に入りを表示
loadFavorites();
updateCartCount();

