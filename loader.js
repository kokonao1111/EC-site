document.addEventListener('DOMContentLoaded', () => {
  const pathname = window.location.pathname;
  const isIndexPage = (() => {
    if (/\/index\.html?$/i.test(pathname)) return true;
    if (pathname === '/' || pathname === '') return true;
    const trimmed = pathname.replace(/\/+$/, '');
    const segments = trimmed.split('/').filter(Boolean);
    return pathname.endsWith('/') && segments.length === 1;
  })();
  const loader = document.getElementById('pageLoader');
  const hasShownSplash = sessionStorage.getItem('splashShown') === 'true';
  if (!loader || !isIndexPage) {
    if (loader) {
      loader.remove();
      document.body.classList.remove('is-loading', 'is-transitioning');
    }
    return;
  }
  if (hasShownSplash) {
    loader.remove();
    document.body.classList.remove('is-loading', 'is-transitioning');
    return;
  }

  document.body.classList.add('is-loading');

  const circle = loader.querySelector('.loader-circle');
  const text = loader.querySelector('.loader-circle span');
  const transition = document.getElementById('pageTransition');

  let progress = 0;
  let intervalId = null;

  const renderProgress = () => {
    if (circle) {
      circle.style.setProperty('--progress', progress);
    }
    if (text) {
      text.textContent = progress.toString();
    }
  };

  const startProgress = () => {
    intervalId = setInterval(() => {
      if (progress < 95) {
        progress += 1;
        renderProgress();
      }
    }, 20);
  };

  const finishProgress = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const finishId = setInterval(() => {
      if (progress < 100) {
        progress += 1;
        renderProgress();
        return;
      }
      clearInterval(finishId);
      sessionStorage.setItem('splashShown', 'true');
      setTimeout(() => {
        loader.classList.add('is-blank');
        document.body.classList.add('is-transitioning');
        setTimeout(() => {
          loader.classList.add('is-hidden');
          document.body.classList.remove('is-loading');
          setTimeout(() => {
            loader.remove();
          }, 300);
          setTimeout(() => {
            if (transition) {
              transition.classList.add('is-active', 'is-enter');
              setTimeout(() => {
                document.body.classList.remove('is-transitioning');
              }, 800);
              setTimeout(() => {
                // 黒くなった状態で1秒停止してから戻す
                setTimeout(() => {
                  transition.classList.remove('is-enter');
                  transition.classList.add('is-exit');
                  // 上→下のフェーズが終わるまでトランジションを維持
                  setTimeout(() => {
                    transition.classList.remove('is-active', 'is-exit');
                  }, 800);
                }, 1000);
              }, 700);
            }
          }, 150);
        }, 150);
      }, 1000);
    }, 16);
  };

  renderProgress();
  startProgress();

  window.addEventListener('load', () => {
    finishProgress();
  });
});
