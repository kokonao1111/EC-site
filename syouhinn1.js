// ===== 商品詳細ページの機能 =====

// サムネイル画像の切り替え
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.getElementById('mainProductImage');
let currentImageIndex = 0;

// ヘッダーのカート数を更新
const updateCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartLink = document.querySelector('.nav-links a[href="kaimono.html"]');
  if (cartLink) {
    cartLink.textContent = `買い物かご [${cart.length}]`;
  }
};

// カラーごとの画像セット（全てのサムネイル画像をカラーごとに設定）
const colorImageSets = {
  'images/hare1.png': [
    'images/hare1何もなし.jpg',
    'images/モデル1.jpg',
    'images/黒１.webp',
    'images/黒２.webp',
    'images/黒３.webp',
    'images/黒４.webp',
    'images/黒５.webp'
  ],
  'images/hare色違いデニム１.png': [
    'images/赤.jpg',
    'images/赤２.webp',
    'images/赤３.webp',
    'images/赤４.webp',
    'images/赤５.webp',
    'images/赤６.webp',
    'images/赤７.webp',
    'images/赤k８.webp',
    'images/赤９.webp',
    'images/赤１０.webp',
    'images/赤１１.webp',
    'images/赤１２.webp',
    'images/赤１３.webp'
  ],
  'images/hare色違いデニム３.png': [
    'images/青.jpg',
    'images/青１.webp',
    'images/青２.webp',
    'images/青３.webp',
    'images/青４.webp',
    'images/青５.webp',
    'images/青６.webp'
  ]
};

// デフォルトの画像セット（最初のカラー用）
const defaultImageSet = colorImageSets['images/hare1.png'];
let currentImages = defaultImageSet;

// サムネイルを更新する関数
const updateThumbnails = (imageSet) => {
  // すべてのサムネイルを一度表示状態にリセット
  thumbnails.forEach((thumbnail) => {
    thumbnail.style.display = 'block';
  });
  
  thumbnails.forEach((thumbnail, index) => {
    if (index < imageSet.length) {
    const img = thumbnail.querySelector('img');
      if (img) {
    img.src = imageSet[index];
        img.style.display = 'block';
      }
    thumbnail.setAttribute('data-image', imageSet[index]);
      thumbnail.style.display = 'block';
    } else {
      // 画像セットにないサムネイルは非表示
      thumbnail.style.display = 'none';
    }
  });
  
  // 最初のサムネイルをアクティブに
  thumbnails.forEach(t => t.classList.remove('active'));
  if (thumbnails[0] && imageSet.length > 0) {
  thumbnails[0].classList.add('active');
  }
  if (imageSet.length > 0) {
  mainImage.src = imageSet[0];
  currentImageIndex = 0;
  }
};

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    // アクティブクラスを更新
    thumbnails.forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
    
    // メイン画像を更新
    const imageSrc = thumbnail.getAttribute('data-image');
    mainImage.src = imageSrc;
    currentImageIndex = index;
  });
});

// 前後の画像に移動
const prevArrow = document.getElementById('prevImage');
const nextArrow = document.getElementById('nextImage');

prevArrow.addEventListener('click', () => {
  // 現在のアクティブなサムネイルのインデックスを取得
  const activeIndex = Array.from(thumbnails).findIndex(t => t.classList.contains('active'));
  // 前のサムネイルのインデックスを計算（循環）
  const prevIndex = (activeIndex - 1 + thumbnails.length) % thumbnails.length;
  // 前のサムネイルをクリック
  thumbnails[prevIndex].click();
});

nextArrow.addEventListener('click', () => {
  // 現在のアクティブなサムネイルのインデックスを取得
  const activeIndex = Array.from(thumbnails).findIndex(t => t.classList.contains('active'));
  // 次のサムネイルのインデックスを計算（循環）
  const nextIndex = (activeIndex + 1) % thumbnails.length;
  // 次のサムネイルをクリック
  thumbnails[nextIndex].click();
});

const updateMainImage = () => {
  mainImage.src = currentImages[currentImageIndex];
  thumbnails.forEach((t, i) => {
    if (i === currentImageIndex) {
      t.classList.add('active');
    } else {
      t.classList.remove('active');
    }
  });
};

// 色の選択
const colorOptions = document.querySelectorAll('.color-option');
colorOptions.forEach(option => {
  option.addEventListener('click', () => {
    colorOptions.forEach(o => o.classList.remove('active'));
    option.classList.add('active');
    
    const colorImage = option.getAttribute('data-color');
    
    // カラーに応じた画像セットに切り替え
    if (colorImageSets[colorImage]) {
      currentImages = colorImageSets[colorImage];
      updateThumbnails(currentImages);
    } else {
      mainImage.src = colorImage;
    }
  });
});

// ページ読み込み時に最初のカラーオプションを選択状態にする
document.addEventListener('DOMContentLoaded', () => {
  const firstColorOption = document.querySelector('.color-option');
  if (firstColorOption && !firstColorOption.classList.contains('active')) {
    firstColorOption.classList.add('active');
  }
  
  // デフォルトの画像セットを設定
  currentImages = defaultImageSet;
  updateThumbnails(currentImages);
});

// サイズの選択
const sizeButtons = document.querySelectorAll('.size-btn:not(.disabled)');
const sizeErrorMessage = document.getElementById('sizeErrorMessage');
sizeButtons.forEach(button => {
  button.addEventListener('click', () => {
    sizeButtons.forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');
    if (sizeErrorMessage) {
      sizeErrorMessage.textContent = '';
    }
  });
});

// 既存のカート・お気に入りデータの商品名を更新（商品名変更の反映）
const updateExistingProductNames = () => {
  const currentProductName = document.querySelector('.product-name')?.textContent || 'ファイヤーマンバックルデニムブルゾン';
  const oldProductName = 'ナカワタファイヤーマンバックルデニムブルゾン';
  
  // カート内の商品名を更新
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  cart.forEach(item => {
    if (item.id === 'product1' && item.name === oldProductName) {
      item.name = currentProductName;
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // お気に入り内の商品名を更新
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  favorites.forEach(item => {
    if (item.link && item.link.includes('syouhinn1.html') && item.name === oldProductName) {
      item.name = currentProductName;
    }
  });
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// ページ読み込み時に既存データを更新
updateExistingProductNames();

// カート追加モーダル
const cartAddedModal = document.getElementById('cartAddedModal');
const cartAddedClose = document.getElementById('cartAddedClose');
const cartAddedOverlay = document.querySelector('.cart-added-overlay');

const openCartAddedModal = () => {
  if (cartAddedModal) {
    cartAddedModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
};

const closeCartAddedModal = () => {
  if (cartAddedModal) {
    cartAddedModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }
};

if (cartAddedClose) {
  cartAddedClose.addEventListener('click', closeCartAddedModal);
}

// 初期表示でカート数を反映
updateCartCount();

if (cartAddedOverlay) {
  cartAddedOverlay.addEventListener('click', closeCartAddedModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cartAddedModal && cartAddedModal.classList.contains('active')) {
    closeCartAddedModal();
  }
});

// お気に入り追加モーダル
const favoriteAddedModal = document.getElementById('favoriteAddedModal');
const favoriteAddedClose = document.getElementById('favoriteAddedClose');
const favoriteAddedOverlay = document.querySelector('.favorite-added-overlay');

const openFavoriteAddedModal = () => {
  if (favoriteAddedModal) {
    favoriteAddedModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
};

const closeFavoriteAddedModal = () => {
  if (favoriteAddedModal) {
    favoriteAddedModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }
};

if (favoriteAddedClose) {
  favoriteAddedClose.addEventListener('click', closeFavoriteAddedModal);
}

if (favoriteAddedOverlay) {
  favoriteAddedOverlay.addEventListener('click', closeFavoriteAddedModal);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && favoriteAddedModal && favoriteAddedModal.classList.contains('active')) {
    closeFavoriteAddedModal();
  }
});

// カートに追加
const addToCartBtn = document.querySelector('.add-to-cart-btn');
if (addToCartBtn) {
addToCartBtn.addEventListener('click', () => {
  const selectedSize = document.querySelector('.size-btn.selected');
  if (!selectedSize) {
    if (sizeErrorMessage) {
      sizeErrorMessage.textContent = 'サイズを選択してください';
    }
    return;
  }
    
    // 商品情報を取得
    const productName = document.querySelector('.product-name')?.textContent || 'ファイヤーマンバックルデニムブルゾン';
    const priceText = document.querySelector('.product-price')?.textContent || '¥24,200';
    const price = parseInt(priceText.replace(/[¥,]/g, '')) || 24200;
  
  // カートに追加する処理（LocalStorageを使用）
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const product = {
    id: 'product1',
      name: productName,
      price: price,
    size: selectedSize.textContent,
      image: mainImage?.src || 'images/hare1何もなし.jpg',
    quantity: 1
  };
  
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  
  // カートの個数を更新（index.htmlのヘッダー用）
  const cartLink = document.querySelector('.nav-links a[href="kaimono.html"]');
  if (cartLink) {
    cartLink.textContent = `買い物かご [${cart.length}]`;
  }
  
  openCartAddedModal();
});
}

// お気に入り
const buyNowBtn = document.querySelector('.buy-now-btn');
if (buyNowBtn) {
buyNowBtn.addEventListener('click', () => {
  // お気に入りに追加
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const productName = document.querySelector('.product-name')?.textContent || 'ファイヤーマンバックルデニムブルゾン';
    const productPrice = document.querySelector('.product-price')?.textContent?.match(/¥[\d,]+/)?.[0]?.replace(/[¥,]/g, '') || '24200';
    const productImage = mainImage?.src || 'images/hare1何もなし.jpg';
    const productLink = window.location.href;
    
  const product = {
    id: 'product1',
      name: productName,
      price: parseInt(productPrice),
      image: productImage,
      link: productLink
  };
  
  // 既にお気に入りに追加されているかチェック
  const isAlreadyFavorite = favorites.some(item => item.id === product.id);
  if (isAlreadyFavorite) {
    openFavoriteAddedModal();
    return;
  }
  
  favorites.push(product);
  localStorage.setItem('favorites', JSON.stringify(favorites));
  
  openFavoriteAddedModal();
  });
}

// ===== コーディネート詳細モーダル =====
const coordinationItem1 = document.getElementById('coordinationItem1');
const coordinationItem2 = document.getElementById('coordinationItem2');
const coordinationDetailModal = document.getElementById('coordinationDetailModal');
const coordinationDetailClose = document.getElementById('coordinationDetailClose');
const coordinationDetailOverlay = document.querySelector('.coordination-detail-overlay');

const openCoordinationModal = (imageSrc, itemImages = null, profileName = 'おざ', wearLink = 'https://wear.jp/ozaoza2002/', profileImage = 'images/おざ.webp', pointsText = 'ファイヤーマンバックルのブルゾンとパーカーを合わせた<br>モードカジュアルコーデ') => {
  if (coordinationDetailModal) {
    // モーダル内の画像を更新
    const modalImage = coordinationDetailModal.querySelector('.coordination-detail-image');
    if (modalImage) {
      modalImage.src = imageSrc;
    }
    
    // プロフィール画像を更新
    const profileImageElement = document.getElementById('coordinationProfileImage');
    if (profileImageElement) {
      profileImageElement.src = profileImage;
    }
    
    // プロフィール名を更新
    const profileNameElement = document.getElementById('coordinationProfileName');
    if (profileNameElement) {
      profileNameElement.textContent = profileName;
    }
    
    // WEARリンクを更新
    const wearLinkElement = document.getElementById('coordinationWearLink');
    if (wearLinkElement) {
      wearLinkElement.href = wearLink;
    }
    
    // コーディネートのポイントを更新
    const pointsTextElement = document.getElementById('coordinationPointsText');
    if (pointsTextElement) {
      pointsTextElement.innerHTML = pointsText;
    }
    
    // 着用アイテムの画像を更新
    if (itemImages && itemImages.length > 0) {
      const itemListElement = coordinationDetailModal.querySelector('.coordination-item-list');
      if (itemListElement) {
        // 既存のアイテムをすべて削除
        itemListElement.innerHTML = '';
        
        // 新しいアイテムを追加
        itemImages.forEach((item, index) => {
          const itemDetailDiv = document.createElement('div');
          itemDetailDiv.classList.add('coordination-item-detail');
          
          // アイテム情報を取得（オブジェクトの場合は詳細情報を使用、文字列の場合はデフォルト値を使用）
          let brand = 'HARE';
          let spec = 'SMALL / ブラック';
          let price = '¥17,930';
          
          if (typeof item === 'object' && item.brand) {
            brand = item.brand;
            spec = item.spec;
            price = item.price;
            itemDetailDiv.innerHTML = `
              <a href="syouhinn1.html">
              <img src="${item.src}" alt="アイテム${index + 1}" class="coordination-item-image">
              </a>
              <div class="coordination-item-info">
                <p class="coordination-item-brand">${brand}</p>
                <p class="coordination-item-spec">${spec}</p>
                <p class="coordination-item-price">${price}</p>
              </div>
            `;
          } else {
            // 文字列の場合は画像パスのみ
            itemDetailDiv.innerHTML = `
              <a href="syouhinn1.html">
              <img src="${item}" alt="アイテム${index + 1}" class="coordination-item-image">
              </a>
              <div class="coordination-item-info">
                <p class="coordination-item-brand">${brand}</p>
                <p class="coordination-item-spec">${spec}</p>
                <p class="coordination-item-price">${price}</p>
              </div>
            `;
          }
          
          itemListElement.appendChild(itemDetailDiv);
        });
      }
    }
    
    coordinationDetailModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
};

if (coordinationItem1 && coordinationDetailModal) {
  coordinationItem1.addEventListener('click', (e) => {
    e.preventDefault();
    const ozaImages = [
      'images/おざ１.jpg',
      'images/おざ２.jpg',
      'images/おざ３.jpg',
      'images/おざ４.jpg',
      'images/おざ５.jpg'
    ];
    openCoordinationModal('images/黒コーデ.avif', ozaImages, 'おざ', 'https://wear.jp/ozaoza2002/', 'images/おざ.webp', 'ファイヤーマンバックルのブルゾンとパーカーを合わせた<br>モードカジュアルコーデ');
  });
}

if (coordinationItem2 && coordinationDetailModal) {
  coordinationItem2.addEventListener('click', (e) => {
    e.preventDefault();
    const toshiImages = [
      { src: 'images/とし１.jpg', brand: 'HARE', spec: 'SMALL / ブラック', price: '¥17,930' },
      { src: 'images/とし２.jpg', brand: 'HARE', spec: 'SMALL / ブラック', price: '¥11,000' },
      { src: 'images/とし３.jpg', brand: 'HARE', spec: 'MEDIUM / ブラック', price: '¥17,930' },
      { src: 'images/とし４.jpg', brand: 'HARE', spec: 'SMALL / ブルー', price: '¥24,200' },
      { src: 'images/とし５.jpg', brand: 'HARE', spec: 'FREE / シルバー', price: '¥5,940' },
      { src: 'images/とし６.jpg', brand: 'HARE', spec: 'FREE / シルバー', price: '¥5,940' }
    ];
    openCoordinationModal('images/赤コーデ.avif', toshiImages, 'としくん', 'https://wear.jp/tigers0303/', 'images/としくん.avif', 'フロッキー加工のデニムのセットアップです^ ^！<br>モード感満載で確実に被らないデニムのセットアップ。ファイヤーマンバックルで古着要素もありトレンドもしっかり抑えれます！');
  });
}

const closeCoordinationModal = () => {
  if (coordinationDetailModal) {
    coordinationDetailModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }
};

if (coordinationDetailModal) {

  if (coordinationDetailClose) {
    coordinationDetailClose.addEventListener('click', closeCoordinationModal);
  }

  if (coordinationDetailOverlay) {
    coordinationDetailOverlay.addEventListener('click', closeCoordinationModal);
  }

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && coordinationDetailModal.classList.contains('active')) {
      closeCoordinationModal();
    }
  });
}

// ===== 商品詳細モーダル =====
const showProductDetailsBtn = document.getElementById('showProductDetailsBtn');
const productDetailsModal = document.getElementById('productDetailsModal');
const productDetailsModalClose = document.getElementById('productDetailsModalClose');
const productDetailsModalOverlay = document.querySelector('.product-details-overlay');

if (showProductDetailsBtn && productDetailsModal) {
  showProductDetailsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    productDetailsModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });

  const closeProductDetailsModal = () => {
    productDetailsModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };

  if (productDetailsModalClose) {
    productDetailsModalClose.addEventListener('click', closeProductDetailsModal);
  }

  if (productDetailsModalOverlay) {
    productDetailsModalOverlay.addEventListener('click', closeProductDetailsModal);
  }

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && productDetailsModal.classList.contains('active')) {
      closeProductDetailsModal();
    }
  });
}

// ===== サイズガイドモーダル =====
const sizeGuideLink = document.querySelector('.size-guide');
const sizeGuideModal = document.getElementById('sizeGuideModal');
const sizeGuideClose = document.getElementById('sizeGuideClose');
const sizeGuideOverlay = document.querySelector('.size-guide-overlay');

if (sizeGuideLink && sizeGuideModal) {
  sizeGuideLink.addEventListener('click', (e) => {
    e.preventDefault();
    sizeGuideModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });

  const closeModal = () => {
    sizeGuideModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };

  if (sizeGuideClose) {
    sizeGuideClose.addEventListener('click', closeModal);
  }

  if (sizeGuideOverlay) {
    sizeGuideOverlay.addEventListener('click', closeModal);
  }

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sizeGuideModal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ===== 返品についてモーダル =====
const returnInfoLink = document.querySelector('.return-info-link');
const returnInfoModal = document.getElementById('returnInfoModal');
const returnInfoClose = document.getElementById('returnInfoClose');
const returnInfoOverlay = document.querySelector('.return-info-overlay');

if (returnInfoLink && returnInfoModal) {
  returnInfoLink.addEventListener('click', (e) => {
    e.preventDefault();
    returnInfoModal.classList.add('active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  });

  const closeReturnModal = () => {
    returnInfoModal.classList.remove('active');
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  };

  if (returnInfoClose) {
    returnInfoClose.addEventListener('click', closeReturnModal);
  }

  if (returnInfoOverlay) {
    returnInfoOverlay.addEventListener('click', closeReturnModal);
  }

  // ESCキーで閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && returnInfoModal.classList.contains('active')) {
      closeReturnModal();
    }
  });
}

// ===== スマホ時のコーディネート位置調整 =====
const repositionCoordinationSection = () => {
  const coordinationSection = document.querySelector('.coordination-section');
  const productInfoSection = document.querySelector('.product-info-section');
  const productActions = document.querySelector('.product-actions');
  const productLeftColumn = document.querySelector('.product-left-column');

  if (!coordinationSection || !productInfoSection || !productActions || !productLeftColumn) {
    return;
  }

  if (window.innerWidth <= 768) {
    if (coordinationSection.parentElement !== productInfoSection) {
      productActions.insertAdjacentElement('afterend', coordinationSection);
    }
  } else if (coordinationSection.parentElement !== productLeftColumn) {
    productLeftColumn.appendChild(coordinationSection);
  }
};

repositionCoordinationSection();
window.addEventListener('resize', repositionCoordinationSection);

// ===== コラプシブルセクション（配送・返品、レビューなど） =====
const collapsibleHeaders = document.querySelectorAll('.collapsible-header');
collapsibleHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const section = header.closest('.product-collapsible-section') || header.closest('.product-reviews-section');
    const content = section.querySelector('.collapsible-content');
    const arrow = header.querySelector('.collapsible-arrow');
    
    if (section.classList.contains('active')) {
      section.classList.remove('active');
      if (content) {
        content.style.maxHeight = null;
      }
      if (arrow) {
        arrow.textContent = '◀';
      }
    } else {
      // 他のセクションを閉じる
      document.querySelectorAll('.product-collapsible-section.active, .product-reviews-section.active').forEach(activeSection => {
        activeSection.classList.remove('active');
        const activeContent = activeSection.querySelector('.collapsible-content');
        const activeArrow = activeSection.querySelector('.collapsible-arrow');
        if (activeContent) {
          activeContent.style.maxHeight = null;
        }
        if (activeArrow) {
          activeArrow.textContent = '◀';
        }
      });
      
      section.classList.add('active');
      if (content) {
        // コンテンツの実際の高さを計算（フォームが含まれる場合も考慮）
        const contentHeight = content.scrollHeight;
        content.style.maxHeight = contentHeight + 'px';
      }
      if (arrow) {
        arrow.textContent = '▼';
      }
    }
  });
});

// ===== 特殊スクロール挙動を無効化（通常のページ全体スクロール） =====
const productImagesSection = document.querySelector('.product-images-section');
const productInfoSection = document.querySelector('.product-info-section');

if (productImagesSection && productInfoSection) {
  // 最初から通常のスクロール状態にする
  productImagesSection.classList.add('scroll-enabled');
  productInfoSection.classList.add('scroll-enabled');
  
  // ページ全体のスクロールを有効化
  document.documentElement.style.overflow = 'auto';
  document.body.style.overflow = 'auto';
}

// ===== レビュー投稿機能 =====
const postReviewBtn = document.querySelector('.post-review-btn');
const reviewFormContainer = document.getElementById('reviewFormContainer');
const reviewForm = document.getElementById('reviewForm');
const cancelReviewBtn = document.getElementById('cancelReviewBtn');
const formStars = document.querySelectorAll('.form-star');
const reviewRatingInput = document.getElementById('reviewRating');
const reviewsContent = document.querySelector('.reviews-content');
const reviewCountSpan = document.getElementById('reviewCount');

let selectedRating = 0;

// レビューの平均評価を計算する関数
function calculateAverageRating() {
  if (!reviewsContent) return 0;
  
  const reviewItems = reviewsContent.querySelectorAll('.review-item');
  if (reviewItems.length === 0) return 0;
  
  let totalRating = 0;
  reviewItems.forEach(reviewItem => {
    const ratingDiv = reviewItem.querySelector('.review-rating');
    if (ratingDiv) {
      const filledStars = ratingDiv.querySelectorAll('.star.filled').length;
      const halfStars = ratingDiv.querySelectorAll('.star.half').length;
      const rating = filledStars + (halfStars * 0.5);
      totalRating += rating;
    }
  });
  
  return totalRating / reviewItems.length;
}

// ヘッダーの星の評価を更新する関数
function updateHeaderStarRating() {
  const headerStarRating = document.getElementById('headerStarRating');
  if (!headerStarRating) return;
  
  const averageRating = calculateAverageRating();
  const stars = headerStarRating.querySelectorAll('.star');
  
  // まず全ての星を空にする
  stars.forEach(star => {
    star.classList.remove('filled', 'half');
  });
  
  // レビューがない場合は終了
  if (averageRating === 0) {
    return;
  }
  
  // 平均評価に基づいて星を更新
  stars.forEach((star, index) => {
    const starNumber = index + 1;
    
    if (averageRating >= starNumber) {
      // 完全に満たされている
      star.classList.add('filled');
    } else if (averageRating >= starNumber - 0.5 && averageRating < starNumber) {
      // 半分満たされている（例: 3.8の場合、4つ目は3.5以上4未満なのでhalf）
      star.classList.add('half');
    }
    // それ以外は空のまま（クラスを追加しない）
  });
}

// レビュー詳細セクションの平均評価を更新する関数
function updateOverallRating() {
  const overallRatingText = document.getElementById('overallRatingText');
  const overallStars = document.getElementById('overallStars');
  
  if (!overallRatingText || !overallStars) return;
  
  const averageRating = calculateAverageRating();
  
  // レビューがない場合
  if (averageRating === 0) {
    overallRatingText.textContent = '星0.0';
    const stars = overallStars.querySelectorAll('.star');
    stars.forEach(star => {
      star.classList.remove('filled', 'half');
    });
    return;
  }
  
  // 平均評価を小数点第1位まで表示
  const roundedRating = Math.round(averageRating * 10) / 10;
  overallRatingText.textContent = `星${roundedRating}`;
  
  // 星を更新
  const stars = overallStars.querySelectorAll('.star');
  stars.forEach((star, index) => {
    star.classList.remove('filled', 'half');
    
    const starNumber = index + 1;
    
    if (averageRating >= starNumber) {
      // 完全に満たされている
      star.classList.add('filled');
    } else if (averageRating >= starNumber - 0.5 && averageRating < starNumber) {
      // 半分満たされている（例: 3.8の場合、4つ目は3.5以上4未満なのでhalf）
      star.classList.add('half');
    }
    // それ以外は空のまま（クラスを追加しない）
  });
}

// レビュー数を更新する関数
function updateReviewCount() {
  if (reviewsContent && reviewCountSpan) {
    const reviewItems = reviewsContent.querySelectorAll('.review-item');
    const count = reviewItems.length;
    reviewCountSpan.textContent = `レビュー (${count})`;
  }
  // レビュー数が更新されたら、平均評価も更新
  updateHeaderStarRating();
  updateOverallRating();
}

// 既存のレビューに削除ボタンのイベントリスナーを追加
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-review-btn');
  deleteButtons.forEach(btn => {
    // 既にイベントリスナーが追加されているかチェック
    if (!btn.hasAttribute('data-listener-added')) {
      btn.setAttribute('data-listener-added', 'true');
      btn.addEventListener('click', () => {
        const reviewItem = btn.closest('.review-item');
        if (reviewItem && confirm('このレビューを削除しますか？')) {
          reviewItem.remove();
          updateReviewCount();
          updateHeaderStarRating();
        }
      });
    }
  });
}

// レビューテキストの「もっと見る」機能を設定
function setupReviewTextToggle() {
  const reviewTexts = document.querySelectorAll('.review-text');
  reviewTexts.forEach(reviewText => {
    const textP = reviewText.querySelector('p');
    if (!textP || !textP.textContent) return;
    
    // 既にボタンが追加されている場合はスキップ
    if (reviewText.querySelector('.review-text-toggle')) return;
    
    // テキストの実際の高さを測定
    const originalHeight = textP.scrollHeight;
    const lineHeight = parseFloat(window.getComputedStyle(textP).lineHeight);
    const maxHeight = lineHeight * 3; // 3行分の高さ
    
    // 3行を超える場合に「もっと見る」を追加
    if (originalHeight > maxHeight) {
      reviewText.classList.add('collapsed');
      
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'review-text-toggle';
      toggleBtn.textContent = 'もっと見る';
      toggleBtn.type = 'button';
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (reviewText.classList.contains('collapsed')) {
          reviewText.classList.remove('collapsed');
          toggleBtn.textContent = '閉じる';
        } else {
          reviewText.classList.add('collapsed');
          toggleBtn.textContent = 'もっと見る';
        }
      });
      
      reviewText.appendChild(toggleBtn);
    }
  });
}

// ページ読み込み時にレビュー数を更新し、削除ボタンを設定
document.addEventListener('DOMContentLoaded', () => {
  // 少し遅延させて、DOMが完全に読み込まれた後に実行
  setTimeout(() => {
    updateReviewCount();
    updateHeaderStarRating();
    setupDeleteButtons();
    setupReviewTextToggle();
  }, 100);
});

// レビュー投稿ボタンをクリック
if (postReviewBtn && reviewFormContainer) {
  postReviewBtn.addEventListener('click', (e) => {
    // イベントの伝播を止める（ヘッダーのクリックイベントが発火しないように）
    e.stopPropagation();
    
    // レビューセクションが閉じている場合は展開する
    const reviewsSection = postReviewBtn.closest('.product-reviews-section');
    const reviewsContent = reviewsSection?.querySelector('.collapsible-content');
    const reviewsArrow = reviewsSection?.querySelector('.collapsible-arrow');
    
    // フォームの表示/非表示を切り替え
    const isOpening = reviewFormContainer.style.display === 'none';
    reviewFormContainer.style.display = isOpening ? 'block' : 'none';
    
    if (reviewsSection && !reviewsSection.classList.contains('active')) {
      reviewsSection.classList.add('active');
    }
    
    // セクションが展開された後、コンテンツの高さを再計算
    if (reviewsContent && isOpening) {
      // フォームが表示された後に高さを再計算
      setTimeout(() => {
        const contentHeight = reviewsContent.scrollHeight;
        reviewsContent.style.maxHeight = contentHeight + 'px';
        if (reviewsArrow) {
          reviewsArrow.textContent = '▼';
        }
        // スクロール
        reviewFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 50);
    } else if (reviewsContent && reviewsSection.classList.contains('active')) {
      // 既に展開されている場合も高さを再計算
      setTimeout(() => {
        const contentHeight = reviewsContent.scrollHeight;
        reviewsContent.style.maxHeight = contentHeight + 'px';
        if (isOpening) {
          reviewFormContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    }
  });
}

// キャンセルボタン
if (cancelReviewBtn && reviewFormContainer) {
  cancelReviewBtn.addEventListener('click', () => {
    reviewFormContainer.style.display = 'none';
    reviewForm.reset();
    selectedRating = 0;
    reviewRatingInput.value = '0';
    formStars.forEach(star => {
      star.classList.remove('filled', 'active');
    });
  });
}

// 星の評価を選択
formStars.forEach((star, index) => {
  star.addEventListener('click', () => {
    selectedRating = index + 1;
    reviewRatingInput.value = selectedRating;
    
    formStars.forEach((s, i) => {
      if (i < selectedRating) {
        s.classList.add('filled', 'active');
      } else {
        s.classList.remove('filled', 'active');
      }
    });
  });
  
  star.addEventListener('mouseenter', () => {
    const hoverRating = index + 1;
    formStars.forEach((s, i) => {
      if (i < hoverRating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
});

// 星のホバー解除時に選択された評価を表示
const formStarRating = document.getElementById('formStarRating');
if (formStarRating) {
  formStarRating.addEventListener('mouseleave', () => {
    formStars.forEach((s, i) => {
      if (i < selectedRating) {
        s.classList.add('active');
      } else {
        s.classList.remove('active');
      }
    });
  });
}

// フォーム送信
if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const rating = parseInt(reviewRatingInput.value);
    const title = document.getElementById('reviewTitle').value.trim();
    const text = document.getElementById('reviewText').value.trim();
    const name = document.getElementById('reviewerName').value.trim();
    
    if (rating === 0) {
      alert('評価を選択してください');
      return;
    }
    
    if (!text) {
      alert('レビュー内容を入力してください');
      return;
    }
    
    // 新しいレビューを作成
    const newReview = document.createElement('div');
    newReview.className = 'review-item';
    
    // 削除ボタンを追加
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-review-btn';
    deleteBtn.setAttribute('aria-label', 'レビューを削除');
    deleteBtn.textContent = '×';
    deleteBtn.addEventListener('click', () => {
      if (confirm('このレビューを削除しますか？')) {
        newReview.remove();
        updateReviewCount();
        updateHeaderStarRating();
      }
    });
    newReview.appendChild(deleteBtn);
    
    // 星の評価を表示
    const reviewRatingDiv = document.createElement('div');
    reviewRatingDiv.className = 'review-rating';
    for (let i = 0; i < 5; i++) {
      const starSpan = document.createElement('span');
      starSpan.className = 'star';
      if (i < rating) {
        starSpan.classList.add('filled');
      }
      reviewRatingDiv.appendChild(starSpan);
    }
    newReview.appendChild(reviewRatingDiv);
    
    // タイトルがある場合
    if (title) {
      const titleDiv = document.createElement('div');
      titleDiv.className = 'review-title';
      titleDiv.textContent = title;
      newReview.appendChild(titleDiv);
    }
    
    // レビュー作者情報
    const authorDiv = document.createElement('div');
    authorDiv.className = 'review-author';
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'reviewer-name';
    nameSpan.textContent = name || '匿名';
    authorDiv.appendChild(nameSpan);
    
    const dateSpan = document.createElement('span');
    dateSpan.className = 'review-date';
    const today = new Date();
    dateSpan.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    authorDiv.appendChild(dateSpan);
    
    newReview.appendChild(authorDiv);
    
    // レビューテキスト
    const textDiv = document.createElement('div');
    textDiv.className = 'review-text';
    const textP = document.createElement('p');
    textP.textContent = text;
    textDiv.appendChild(textP);
    newReview.appendChild(textDiv);
    
    // レビューリストの最初に追加（フォームの後）
    const reviewItems = reviewsContent.querySelectorAll('.review-item');
    if (reviewItems.length > 0) {
      reviewsContent.insertBefore(newReview, reviewItems[0]);
    } else {
      reviewsContent.appendChild(newReview);
    }
    
    // レビュー数を更新
    updateReviewCount();
    
    // 新しく追加されたレビューに「もっと見る」機能を設定
    setTimeout(() => {
      setupReviewTextToggle();
    }, 100);
    
    // フォームをリセット
    reviewForm.reset();
    selectedRating = 0;
    reviewRatingInput.value = '0';
    formStars.forEach(star => {
      star.classList.remove('filled', 'active');
    });
    
    // フォームを非表示
    reviewFormContainer.style.display = 'none';
    
    // 成功メッセージ
    alert('レビューを投稿しました');
    
    // 新しいレビューまでスクロール
    newReview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

