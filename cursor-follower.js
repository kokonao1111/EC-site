document.addEventListener('DOMContentLoaded', () => {
  const follower = document.createElement('div');
  follower.className = 'cursor-follower';
  document.body.appendChild(follower);

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let targetScale = 1;
  let currentScale = 1;
  let isVisible = false;

  const handleMove = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;

    if (!isVisible) {
      follower.classList.add('is-visible');
      isVisible = true;
    }
  };

  document.addEventListener('mousemove', handleMove);

  const isInteractive = (element) => {
    if (!element) return false;
    if (element.closest('.size-guide-modal, .size-guide-content')) return false;
    return Boolean(element.closest('a, button, input, textarea, select, [role="button"], [data-clickable="true"]'));
  };

  document.addEventListener('pointerover', (event) => {
    if (isInteractive(event.target)) {
      targetScale = 1.4;
    }
  });

  document.addEventListener('pointerout', (event) => {
    if (isInteractive(event.target)) {
      targetScale = 1;
    }
  });

  const render = () => {
    const modalOpen = Boolean(document.querySelector('[class*="modal"].active'));
    if (document.querySelector('.size-guide-modal.active')) {
      targetScale = 1;
    }
    if (modalOpen) {
      follower.classList.add('is-hidden');
      follower.classList.remove('is-visible');
      isVisible = false;
    } else {
      follower.classList.remove('is-hidden');
    }
    currentX += (targetX - currentX) * 0.15;
    currentY += (targetY - currentY) * 0.15;
    currentScale += (targetScale - currentScale) * 0.2;
    follower.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%) scale(${currentScale})`;
    requestAnimationFrame(render);
  };

  render();
});
