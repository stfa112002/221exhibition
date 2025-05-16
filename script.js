document.addEventListener('DOMContentLoaded', () => {
  // ① 載入時先讓 Rainbow 淡入
  const rainbow = document.getElementById('rainbow-img');
  const title   = document.getElementById('title-img');

  rainbow.classList.add('active');
  
  // ② 延遲一段時間後再讓 Title 淡入（這裡以 1000ms 為例）
  setTimeout(() => {
    title.classList.add('active');
  }, 500);

  // ③ 其餘 Spotlight 控制不動
  const marker     = document.getElementById('mid-marker');
  const spotlights = [
    document.getElementById('spotlight-l-img'),
    document.getElementById('spotlight-r-img')
  ];

  function toggleSpotlights() {
    const top = marker.getBoundingClientRect().top;
    if (top <= 0) {
      spotlights.forEach(img => img.classList.add('active'));
    } 
    // 不再移除，保持顯示
  }

  window.addEventListener('scroll', toggleSpotlights);
  toggleSpotlights();
});
