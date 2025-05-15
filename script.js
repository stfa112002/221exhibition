document.addEventListener('DOMContentLoaded', () => {
    // 一載入就讓 Title & Rainbow 淡入
    document.querySelectorAll('.overlay-img.static.initial')
            .forEach(img => img.classList.add('active'));
  
    const marker     = document.getElementById('mid-marker');
    const spotlights = [
      document.getElementById('spotlight-l-img'),
      document.getElementById('spotlight-r-img')
    ];
  
    function toggleSpotlights() {
      const top = marker.getBoundingClientRect().top;
      if (top <= 0) {
        // 捲到或超過背景中點 → 加上 .active（只加，不移除）
        spotlights.forEach(img => img.classList.add('active'));
      }
      // else 分支移除，已經刪掉，spotlight 不會再隱藏
    }
  
    window.addEventListener('scroll', toggleSpotlights);
    toggleSpotlights();  // 初始化檢查一次
  });
  