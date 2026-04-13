/* ===== ハンバーガーメニュー ===== */
const menuToggle = document.getElementById("menuToggle");
const modalMenu = document.getElementById("modalMenu");
const closeMenu = document.getElementById("closeMenu");

const closeModal = () => {
  modalMenu.classList.remove("active");
  menuToggle.classList.remove("active");
  document.body.style.overflow = "";
};

if (menuToggle && modalMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    if (modalMenu.classList.contains("active")) {
      closeModal();
    } else {
      modalMenu.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  });
}

if (closeMenu) {
  closeMenu.addEventListener("click", closeModal);
}

// モーダルの背景をクリックしても閉じる
if (modalMenu && menuToggle) {
  modalMenu.addEventListener("click", (e) => {
    if (e.target === modalMenu) {
      modalMenu.classList.remove("active");
      menuToggle.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

/* ===== ロゴの色変更（スクロール時） ===== */
const header = document.querySelector(".header");
const logo = document.querySelector(".logo");
const navLinks = document.querySelectorAll(".nav-links a");
const menuIcon = document.querySelector(".menu-icon");
let lastScrollY = window.scrollY;

const isCartLikePage = document.body.classList.contains("cart-page-body");
const hideStart = isCartLikePage ? 0 : 420;
const altStart = 500;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;
  const deltaY = currentScrollY - lastScrollY;
  const isScrollingDown = deltaY > 5;
  const isScrollingUp = deltaY < -5;

  if (currentScrollY > altStart) {
    header.classList.add("scrolled");
    logo.classList.add("scrolled");
    navLinks.forEach(link => link.classList.add("scrolled"));
    if (menuIcon) {
      menuIcon.classList.add("scrolled");
    }
  } else {
    header.classList.remove("scrolled");
    logo.classList.remove("scrolled");
    navLinks.forEach(link => link.classList.remove("scrolled"));
    if (menuIcon) {
      menuIcon.classList.remove("scrolled");
    }
  }

  if (currentScrollY > altStart) {
    if (isScrollingUp) {
      header.classList.add("alt-header");
      header.classList.remove("is-hidden");
    } else if (isScrollingDown) {
      header.classList.add("alt-header");
      header.classList.add("is-hidden");
    }
  } else {
    header.classList.remove("alt-header");
    if (currentScrollY <= hideStart) {
      header.classList.remove("is-hidden");
    } else {
      header.classList.add("is-hidden");
    }
  }

  if (Math.abs(deltaY) > 5) {
    lastScrollY = currentScrollY;
  }
});

// ヘッダーのカート数を初期反映
const updateHeaderCartCount = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartLink = document.querySelector('.nav-links a[href="kaimono.html"]');
  if (cartLink) {
    cartLink.textContent = `買い物かご [${cart.length}]`;
  }
};

updateHeaderCartCount();

/* ===== スライダー ===== */
const slides = document.querySelectorAll(".slide");
let currentIndex = 0;

function moveSlide(n) {
  if (!slides.length) return;
  slides[currentIndex].classList.remove("active");
  currentIndex = (n + slides.length) % slides.length;
  slides[currentIndex].classList.add("active");
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    moveSlide(currentIndex - 1);
  });
}
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    moveSlide(currentIndex + 1);
  });
}

/* 自動再生 */
if (slides.length > 0) {
  setInterval(() => {
    moveSlide(currentIndex + 1);
  }, 6000);
}

/* ===== スクロールフェードイン ===== */
const fadeTargets = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
    }
  });
});
fadeTargets.forEach(target => observer.observe(target));

const items = document.querySelectorAll(".item");
let index = 2; // 3番目の商品（インデックス2）から開始

// 各商品の説明データ
const itemDescriptions = [
  {
    title: "プルミエール エディション オリジナル",
    desc: "ファイヤーマンバックルデニムブルゾン",
    price: "¥10,450"
  },
  {
    title: "商品2",
    desc: "２WAYベルトカーゴパンツ",
    price: "¥7,700"
  },
  {
    title: "商品3",
    desc: "スカート アートジャガード2WAYスカート",
    price: "¥8,932"
  },
  {
    title: "商品4",
    desc: "マルチポケットカラートートバッグ",
    price: "¥5,720"
  },
  {
    title: "商品5",
    desc: "マルエリファーレザーブルゾン",
    price: "¥98,000"
  },
  {
    title: "商品6",
    desc: "コンパクトファーブルゾン",
    price: "¥19,800"
  },
  {
    title: "商品7",
    desc: "ハイショクステッチニッポロ",
    price: "¥6,930"
  },
  {
    title: "商品8",
    desc: "レースアップチャンキーシューズ",
    price: "¥8,910"
  }
];

const carouselTrackEl = document.querySelector(".carousel-track");
const carouselNextBtn = document.getElementById("next");
const carouselPrevBtn = document.getElementById("prev");

if (carouselTrackEl && items.length > 0 && carouselNextBtn && carouselPrevBtn) {
  const track = carouselTrackEl;
  const savedTransform = track.style.transform;
  track.style.transform = "translateX(0)";
  void track.offsetHeight;

  const firstItem = items[0];
  const secondItem = items[1];
  const firstItemLeft = firstItem.offsetLeft;
  const firstItemWidth = firstItem.offsetWidth;
  const itemSpacing = secondItem ? secondItem.offsetLeft - firstItemLeft : firstItemWidth;

  track.style.transform = savedTransform;

  function update() {
    const container = document.querySelector(".carousel");
    const trackEl = document.querySelector(".carousel-track");
    if (!container || !trackEl) return;

    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });

    const activeItemCenter = firstItemLeft + index * itemSpacing + firstItemWidth / 2;
    const containerCenter = container.offsetWidth / 2;
    const offset = containerCenter - activeItemCenter;

    trackEl.style.transform = `translateX(${offset}px)`;

    const itemInfo = document.querySelector(".item-info");
    if (itemInfo && itemDescriptions[index]) {
      const desc = itemDescriptions[index];
      const titleElement = itemInfo.querySelector("h1");
      const descElement = itemInfo.querySelector(".desc");
      const priceElement = itemInfo.querySelector(".price");

      if (titleElement) titleElement.textContent = desc.title;
      if (descElement) descElement.textContent = desc.desc;
      if (priceElement) priceElement.textContent = desc.price;
    }
  }

  carouselNextBtn.onclick = () => {
    index = (index + 1) % items.length;
    update();
  };

  carouselPrevBtn.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    update();
  };

  update();
}













// ===== FIT SHOP 画像切り替え =====
const fitItems = document.querySelectorAll('.fit-item');
const modelImage = document.getElementById('modelImage');

if (modelImage && fitItems.length > 0) {
  window.addEventListener('scroll', () => {
    fitItems.forEach(item => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
        fitItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        if (item.dataset.img) {
          modelImage.style.transition = 'opacity 0.4s ease';
          modelImage.style.opacity = 0;
          setTimeout(() => {
            modelImage.src = item.dataset.img;
            modelImage.style.opacity = 1;
          }, 400);
        }
      }
    });
  });
}

// ===== バーチャル試着機能 =====
const tryonIntro = document.querySelector('.tryon-intro');
const tryonContainer = document.getElementById('tryonContainer');
const startTryonBtn = document.getElementById('startTryon');
const cameraVideo = document.getElementById('cameraVideo');
const overlayCanvas = document.getElementById('overlayCanvas');
const startCameraBtn = document.getElementById('startCamera');
const stopCameraBtn = document.getElementById('stopCamera');
const selectorItems = document.querySelectorAll('.selector-item');
const cameraPermissionModal = document.getElementById('cameraPermissionModal');
const cameraPermissionOverlay = document.getElementById('cameraPermissionOverlay');
const cameraPermissionClose = document.getElementById('cameraPermissionClose');
const cameraPermissionMessage = document.getElementById('cameraPermissionMessage');

// 「試す」ボタンをクリックしたら試着機能を表示
if (startTryonBtn) {
  startTryonBtn.addEventListener('click', () => {
    if (tryonIntro) tryonIntro.style.display = 'none';
    if (tryonContainer) tryonContainer.style.display = 'flex';
  });
}

// バーチャル試着を閉じる
const closeTryonBtn = document.getElementById('closeTryon');
if (closeTryonBtn) {
  closeTryonBtn.addEventListener('click', () => {
    if (tryonContainer) tryonContainer.style.display = 'none';
    if (tryonIntro) tryonIntro.style.display = 'block';
    
    // カメラが起動している場合は停止
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
      if (cameraVideo) {
        cameraVideo.srcObject = null;
        cameraVideo.pause();
      }
      if (overlayCanvas) {
        const ctx = overlayCanvas.getContext('2d');
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      }
      if (startCameraBtn) startCameraBtn.style.display = 'block';
      if (stopCameraBtn) stopCameraBtn.style.display = 'none';
    }
  });
}

let stream = null;
let selectedProduct = null;
let productImage = null;
let posX = 0;
let posY = 0;
let sizeScale = 1;
let rotation = 0;
let isAnimating = false;

// カメラが利用可能かチェック
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
  console.warn('このブラウザはカメラAPIをサポートしていません');
  if (startCameraBtn) {
    startCameraBtn.disabled = true;
    startCameraBtn.textContent = 'カメラ未対応';
  }
}

// カメラ開始
if (startCameraBtn) {
  startCameraBtn.addEventListener('click', async () => {
    try {
      // 既存のストリームがあれば停止
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      // カメラにアクセス
      stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', // フロントカメラ
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });
      
      if (cameraVideo) {
        cameraVideo.srcObject = stream;
        cameraVideo.play().catch(err => {
          console.error('ビデオ再生エラー:', err);
        });
      }
      
      if (startCameraBtn) startCameraBtn.style.display = 'none';
      if (stopCameraBtn) stopCameraBtn.style.display = 'block';
      
      // カメラのサイズに合わせてCanvasを設定
      if (cameraVideo && overlayCanvas) {
        const setupCanvas = () => {
          if (cameraVideo.videoWidth > 0 && cameraVideo.videoHeight > 0) {
            overlayCanvas.width = cameraVideo.videoWidth;
            overlayCanvas.height = cameraVideo.videoHeight;
            
            // Canvasのスタイルも設定
            overlayCanvas.style.width = cameraVideo.offsetWidth + 'px';
            overlayCanvas.style.height = cameraVideo.offsetHeight + 'px';
            
            // 商品が選択されていれば描画
            if (selectedProduct && productImage) {
              drawOverlay();
            }
          }
        };
        
        // loadedmetadataイベントで設定
        cameraVideo.addEventListener('loadedmetadata', setupCanvas, { once: true });
        
        // 既にメタデータが読み込まれている場合
        if (cameraVideo.readyState >= 2) {
          setupCanvas();
        }
      }
      
      // アニメーションループ開始
      if (!isAnimating) {
        isAnimating = true;
        animate();
      }
      
    } catch (error) {
      console.error('カメラへのアクセスに失敗しました:', error);
      let errorMessage = 'カメラへのアクセスが許可されていません。';
      
      if (error.name === 'NotAllowedError') {
        errorMessage = 'カメラへのアクセスが拒否されました。ブラウザの設定でカメラの許可を確認してください。';
      } else if (error.name === 'NotFoundError') {
        errorMessage = 'カメラが見つかりませんでした。カメラが接続されているか確認してください。';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'カメラが他のアプリケーションで使用中です。';
      }
      
      if (cameraPermissionMessage) {
        cameraPermissionMessage.textContent = errorMessage;
      }
      if (cameraPermissionModal) {
        cameraPermissionModal.classList.add('active');
        cameraPermissionModal.setAttribute('aria-hidden', 'false');
      }
      
      if (startCameraBtn) startCameraBtn.style.display = 'block';
      if (stopCameraBtn) stopCameraBtn.style.display = 'none';
    }
  });
}

const closeCameraPermissionModal = () => {
  if (cameraPermissionModal) {
    cameraPermissionModal.classList.remove('active');
    cameraPermissionModal.setAttribute('aria-hidden', 'true');
  }
};

if (cameraPermissionClose) {
  cameraPermissionClose.addEventListener('click', closeCameraPermissionModal);
}

if (cameraPermissionOverlay) {
  cameraPermissionOverlay.addEventListener('click', closeCameraPermissionModal);
}

// カメラ停止
if (stopCameraBtn) {
  stopCameraBtn.addEventListener('click', () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      stream = null;
      isAnimating = false;
      
      if (cameraVideo) {
        cameraVideo.srcObject = null;
        cameraVideo.pause();
      }
      
      if (startCameraBtn) startCameraBtn.style.display = 'block';
      if (stopCameraBtn) stopCameraBtn.style.display = 'none';
      
      // Canvasをクリア
      if (overlayCanvas) {
        const ctx = overlayCanvas.getContext('2d');
        ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      }
    }
  });
}

// 商品選択
if (selectorItems.length > 0) {
  selectorItems.forEach(item => {
    item.addEventListener('click', () => {
      selectorItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      
      const productPath = item.dataset.product;
      selectedProduct = productPath;
      
      // 既に表示されている画像要素を取得
      const imgElement = item.querySelector('img');
      
      if (imgElement) {
        // 画像が既に読み込まれている場合
        if (imgElement.complete && imgElement.naturalWidth > 0) {
          productImage = imgElement;
          console.log('既存の画像要素を使用:', productPath);
          if (overlayCanvas && overlayCanvas.width > 0) {
            drawOverlay();
          } else {
            // Canvasがまだ初期化されていない場合、少し待ってから再試行
            setTimeout(() => {
              if (overlayCanvas && overlayCanvas.width > 0) {
                drawOverlay();
              }
            }, 100);
          }
        } else {
          // 画像がまだ読み込まれていない場合
          const newImage = new Image();
          newImage.src = productPath;
          
          newImage.onload = () => {
            productImage = newImage;
            console.log('商品画像の読み込み成功:', productPath);
            if (overlayCanvas && overlayCanvas.width > 0) {
              drawOverlay();
            } else {
              setTimeout(() => {
                if (overlayCanvas && overlayCanvas.width > 0) {
                  drawOverlay();
                }
              }, 100);
            }
          };
          
          newImage.onerror = (error) => {
            console.error('商品画像の読み込みに失敗しました:', productPath, error);
            alert('商品画像の読み込みに失敗しました。画像ファイルが存在するか確認してください: ' + productPath);
          };
        }
      } else {
        // 画像要素が見つからない場合
        console.error('画像要素が見つかりません:', productPath);
        alert('商品画像が見つかりませんでした。');
      }
    });
  });
}

// 位置・サイズ・回転のコントロール
const posXInput = document.getElementById('posX');
const posYInput = document.getElementById('posY');
const sizeScaleInput = document.getElementById('sizeScale');
const rotationInput = document.getElementById('rotation');

if (posXInput) {
  posXInput.addEventListener('input', (e) => {
    posX = parseInt(e.target.value) || 0;
    drawOverlay();
  });
}

if (posYInput) {
  posYInput.addEventListener('input', (e) => {
    posY = parseInt(e.target.value) || 0;
    drawOverlay();
  });
}

if (sizeScaleInput) {
  sizeScaleInput.addEventListener('input', (e) => {
    sizeScale = parseFloat(e.target.value) || 1;
    drawOverlay();
  });
}

if (rotationInput) {
  rotationInput.addEventListener('input', (e) => {
    rotation = parseInt(e.target.value) || 0;
    drawOverlay();
  });
}

// オーバーレイ描画
function drawOverlay() {
  if (!overlayCanvas || !productImage || !selectedProduct) return;
  
  // Canvasのサイズが設定されていない場合はスキップ
  if (overlayCanvas.width === 0 || overlayCanvas.height === 0) {
    return;
  }
  
  const ctx = overlayCanvas.getContext('2d');
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  
  // 中央位置を基準に計算
  const centerX = overlayCanvas.width / 2 + posX;
  const centerY = overlayCanvas.height / 2 + posY;
  
  // 画像のサイズを計算
  const imgWidth = productImage.width * sizeScale;
  const imgHeight = productImage.height * sizeScale;
  
  // 回転と描画
  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate((rotation * Math.PI) / 180);
  ctx.globalAlpha = 0.8; // 少し透明にして自然に見えるように
  ctx.drawImage(
    productImage,
    -imgWidth / 2,
    -imgHeight / 2,
    imgWidth,
    imgHeight
  );
  ctx.restore();
}

// ===== 商品画像のホバー時切り替え =====
const productItems = document.querySelectorAll('.products-section .product-item img[data-images]');
productItems.forEach(img => {
  const images = JSON.parse(img.getAttribute('data-images'));
  const originalSrc = img.src;
  let currentIndex = 0;
  let intervalId = null;
  
  if (images && images.length > 1) {
    img.parentElement.addEventListener('mouseenter', () => {
      currentIndex = 0;
      
      // 最初の画像をすぐに切り替え
      const switchImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = images[currentIndex];
          img.style.opacity = '1';
        }, 250);
      };
      
      // 最初から一定の速度で切り替え
      intervalId = setInterval(switchImage, 2000);
    });
    
    img.parentElement.addEventListener('mouseleave', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      // 元の画像に戻す（opacity変化なし）
        img.src = originalSrc;
      currentIndex = 0;
    });
  }
});

// ===== 商品画像のホバー時切り替え（products-section-2） =====
const productItems2 = document.querySelectorAll('.products-section-2 .product-item-2 img[data-images]');
productItems2.forEach(img => {
  const images = JSON.parse(img.getAttribute('data-images'));
  const originalSrc = img.src;
  let currentIndex = 0;
  let intervalId = null;
  
  if (images && images.length > 1) {
    img.parentElement.addEventListener('mouseenter', () => {
      currentIndex = 0;
      
      // 最初の画像をすぐに切り替え
      const switchImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        img.style.opacity = '0';
        setTimeout(() => {
          img.src = images[currentIndex];
          img.style.opacity = '1';
        }, 250);
      };
      
      // 最初から一定の速度で切り替え
      intervalId = setInterval(switchImage, 2000);
    });
    
    img.parentElement.addEventListener('mouseleave', () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      // 元の画像に戻す（opacity変化なし）
        img.src = originalSrc;
      currentIndex = 0;
    });
  }
});

// アニメーションループ（カメラが動いている間、オーバーレイを再描画）
function animate() {
  if (stream && selectedProduct && productImage && overlayCanvas) {
    // Canvasのサイズが正しく設定されている場合のみ描画
    if (overlayCanvas.width > 0 && overlayCanvas.height > 0) {
      drawOverlay();
    }
  }
  
  if (stream && isAnimating) {
    requestAnimationFrame(animate);
  }
}

/* ===== 商品詳細モーダル ===== */
const viewMoreTriggers = document.querySelectorAll('.view-more-trigger');
const productModal = document.getElementById('productModal');
const productModalOverlay = document.getElementById('productModalOverlay');
const productModalClose = document.getElementById('productModalClose');
const productModalContent = document.getElementById('productModalContent');

// 商品データ
const productSets = {
  1: [
    {
      image: 'images/hare.png',
      name: '商品名1',
      description: 'ブラック',
      price: '¥ 12,000'
    },
    {
      image: 'images/hare色違いかー１.png',
      name: '商品名2',
      description: 'グレー15',
      price: '¥ 12,000'
    },
    {
      image: 'images/hare色違いかー２.png',
      name: '商品名3',
      description: 'グリーン75',
      price: '¥ 12,000'
    }
  ],
  2: [
    {
      image: 'images/hare5.png',
      name: '商品名3',
      description: 'ブラック系',
      price: '¥ 98,000'
    },
    {
      image: 'images/hare革ジャン色違い.png',
      name: '商品名4',
      description: 'グレー系',
      price: '¥ 98,000'
    },
    {
      image: 'images/hare革ジャン色違い２.png',
      name: '商品名5',
      description: 'ブラウン系',
      price: '¥ 98,000'
    }
  ],
  3: [
    {
      image: 'images/hare1.png',
      name: '商品名5',
      description: 'ブラック系',
      price: '¥ 10,450'
    },
    {
      image: 'images/hare色違いデニム１.png',
      name: '商品名6',
      description: 'レッド系',
      price: '¥ 19,800'
    },
    {
      image: 'images/hare色違いデニム３.png',
      name: '商品名8',
      description: 'ブルー系',
      price: '¥ 5,720'
    }
  ],
  4: [
    {
      image: 'images/hare7.png',
      name: 'ハイショクステッチニッポロ',
      description: 'ブラック系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hare色違いセーター１.png',
      name: 'ハイショクステッチニッポロ 色違い1',
      description: 'アイボリー系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hare色違いセーター２.png',
      name: 'ハイショクステッチニッポロ 色違い2',
      description: 'ブラウン系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hare色違いセーター３.png',
      name: 'ハイショクステッチニッポロ 色違い3',
      description: 'ブルー系',
      price: '¥ 6,930'
    }
  ],
  5: [
    {
      image: 'images/hare6.png',
      name: 'コンパクトファーブルゾン',
      description: 'オレンジ系',
      price: '¥ 19,800'
    },
    {
      image: 'images/hareブルゾン色違い１.png',
      name: 'コンパクトファーブルゾン 色違い1',
      description: 'ブラック系',
      price: '¥ 19,800'
    },
    {
      image: 'images/hareブルゾン色違い２.png',
      name: 'コンパクトファーブルゾン 色違い2',
      description: 'グレー系',
      price: '¥ 19,800'
    },
    {
      image: 'images/hareブルゾン色違い３.png',
      name: 'コンパクトファーブルゾン 色違い3',
      description: 'パープル系',
      price: '¥ 19,800'
    }
  ],
  6: [
    {
      image: 'images/hare14.png',
      name: 'ロゴモールニットポロ',
      description: 'グレー系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hare色違いニット１.png',
      name: 'ロゴモールニットポロ 色違い1',
      description: 'ブラック系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hare色違いニット２.png',
      name: 'ロゴモールニットポロ 色違い2',
      description: 'ブルー系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hareニット色違い３.png',
      name: 'ロゴモールニットポロ 色違い3',
      description: 'レッド系',
      price: '¥ 6,930'
    },
    {
      image: 'images/hare色違いニット４.png',
      name: 'ロゴモールニットポロ 色違い4',
      description: 'オレンジ系',
      price: '¥ 6,930'
    }
  ],
  7: [
    {
      image: 'images/パンツ色違い１.jpg',
      name: '2WAYベルトカーゴパンツ',
      description: 'グレー系',
      price: '¥ 7,700'
    },
    {
      image: 'images/パンツ色違い２.jpg',
      name: '2WAYベルトカーゴパンツ 色違い1',
      description: 'ブラック系',
      price: '¥ 7,700'
    },
    {
      image: 'images/パンツ色違い３.jpg',
      name: '2WAYベルトカーゴパンツ 色違い2',
      description: 'ピンク系',
      price: '¥ 7,700'
    }
  ],
  8: [
    {
      image: 'images/グラで二.webp',
      name: 'ヴィンテージカコウデニムパンツ',
      description: 'ブラック×ブルー09',
      price: '¥ 9,900'
    },
    {
      image: 'images/ぐらでに色違い１.webp',
      name: 'ヴィンテージカコウデニムパンツ 色違い1',
      description: 'ネイビー×シルバー88',
      price: '¥ 9,900'
    }
  ],
  9: [
    {
      image: 'images/デニム色違い１.jpg',
      name: 'グラデーションハクプリントデニムパンツ 色違い1',
      description: 'ブラック系',
      price: '¥ 13,200'
    },
    {
      image: 'images/デニム色違い２.jpg',
      name: 'グラデーションハクプリントデニムパンツ 色違い2',
      description: 'ホワイト系',
      price: '¥ 13,200'
    },
    {
      image: 'images/デニム色違い３.jpg',
      name: 'グラデーションハクプリントデニムパンツ 色違い3',
      description: 'ブラウン系',
      price: '¥ 13,200'
    },
    {
      image: 'images/デニム色違い４.jpg',
      name: 'グラデーションハクプリントデニムパンツ 色違い4',
      description: 'ブルー系',
      price: '¥ 13,200'
    }
  ]
};

const renderProducts = (productSet) => {
  if (!productModalContent) return;
  
  const products = productSets[productSet] || productSets[1];
  productModalContent.innerHTML = products.map(product => `
    <a href="syouhinn1.html" class="product-modal-item-link">
    <div class="product-modal-item">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-modal-info">
        <p class="product-modal-description">${product.description}</p>
        <p class="product-modal-price">${product.price}</p>
      </div>
    </div>
    </a>
  `).join('');
};

const openProductModal = (productSet) => {
  if (productModal && productModalOverlay) {
    renderProducts(productSet);
    productModal.classList.add('active');
    productModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
};

const closeProductModal = () => {
  if (productModal && productModalOverlay) {
    productModal.classList.remove('active');
    productModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
};

if (viewMoreTriggers.length > 0) {
  viewMoreTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const productSet = parseInt(trigger.getAttribute('data-product-set')) || 1;
      openProductModal(productSet);
    });
  });
}

if (productModalClose) {
  productModalClose.addEventListener('click', closeProductModal);
}

if (productModalOverlay) {
  productModalOverlay.addEventListener('click', closeProductModal);
}

/* ===== カートの個数を更新 ===== */
const updateCartCountInHeader = () => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const cartLink = document.querySelector('.nav-links a[href="kaimono.html"]');
  if (cartLink) {
    cartLink.textContent = `買い物かご [${cart.length}]`;
  }
};

// ページ読み込み時にカートの個数を更新
updateCartCountInHeader();
