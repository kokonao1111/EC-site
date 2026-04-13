// ===== ログイン・登録フォーム処理 =====
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');
const successMessage = document.getElementById('successMessage');

// メールアドレスのバリデーション
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// エラーメッセージを表示
const showError = (message) => {
  emailError.textContent = message;
  emailError.style.display = 'block';
  emailInput.style.borderColor = '#d32f2f';
};

// エラーメッセージを非表示
const hideError = () => {
  emailError.textContent = '';
  emailError.style.display = 'none';
  emailInput.style.borderColor = '';
};

// ユーザー情報をLocalStorageに保存
const saveUser = (email) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  
  // 既存のユーザーかチェック
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    // 既存ユーザーの場合はログインとして扱う
    localStorage.setItem('currentUser', JSON.stringify(existingUser));
    return { success: true, isNewUser: false };
  }
  
  // 新規ユーザーの場合
  const newUser = {
    email: email,
    id: Date.now().toString(),
    registeredAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('currentUser', JSON.stringify(newUser));
  
  return { success: true, isNewUser: true };
};

// フォーム送信処理
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = emailInput.value.trim();
    
    // バリデーション
    if (!email) {
      showError('メールアドレスを入力してください');
      return;
    }
    
    if (!validateEmail(email)) {
      showError('有効なメールアドレスを入力してください');
      return;
    }
    
    hideError();
    
    // ユーザー情報を保存
    const result = saveUser(email);
    
    if (result.success) {
      // 成功メッセージを表示
      successMessage.style.display = 'block';
      loginForm.style.display = 'none';
      
      // 2秒後にindex.htmlにリダイレクト
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 2000);
    }
  });
}

// 入力中にエラーをクリア
if (emailInput) {
  emailInput.addEventListener('input', () => {
    hideError();
  });
}

// ソーシャルログインボタン（モーダル表示）
const socialButtons = document.querySelectorAll('.social-btn');
const socialLoginModal = document.getElementById('socialLoginModal');
const socialLoginOverlay = document.getElementById('socialLoginOverlay');
const socialLoginClose = document.getElementById('socialLoginClose');

const openSocialLoginModal = () => {
  if (!socialLoginModal) return;
  socialLoginModal.classList.add('active');
};

const closeSocialLoginModal = () => {
  if (!socialLoginModal) return;
  socialLoginModal.classList.remove('active');
};

socialButtons.forEach(button => {
  button.addEventListener('click', () => {
    openSocialLoginModal();
  });
});

if (socialLoginOverlay) {
  socialLoginOverlay.addEventListener('click', closeSocialLoginModal);
}

if (socialLoginClose) {
  socialLoginClose.addEventListener('click', closeSocialLoginModal);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSocialLoginModal();
  }
});
