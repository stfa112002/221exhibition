document.addEventListener('DOMContentLoaded', () => {
  // ① 載入時先讓 Rainbow 淡入
  const rainbow = document.getElementById('rainbow-img');
  const title   = document.getElementById('title-img');

  setTimeout(() => {
    rainbow.classList.add('active');
  }, 200);
  
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

  // 3) 監聽前言標題與內容
  const prefaces = [
    document.getElementById('preface-title'),
    document.getElementById('preface-content')
  ];
  
  const prefaceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // 如果你只要出現一次，可以在這裡 unobserve:
        prefaceObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1   // 10% 露出就觸發
  });

  prefaces.forEach(el => prefaceObserver.observe(el));

  // 監聽 preface-content 進入後逐行淡入 + 按鈕延遲顯示
const prefaceContent = document.getElementById('preface-content');
const button         = document.getElementById('preface-button');
const contentObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      obs.unobserve(prefaceContent);

      // 1) 逐行淡入段落
      const paras = Array.from(prefaceContent.querySelectorAll('p'));
      paras.forEach((p, i) => {
        setTimeout(() => p.classList.add('show'), i * 600);
      });

      // 2) 全部段落啟動後，再顯示按鈕
      const totalDelay = paras.length * 600;
      setTimeout(() => button.classList.add('active'), totalDelay + 300);
    }
  });
}, { threshold: 0.1 });

contentObserver.observe(prefaceContent);

});
