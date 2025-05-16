document.addEventListener('DOMContentLoaded', () => {
  // 使用哪個捲動容器：桌機版是 phone-screen，手機版 fallback window
  const phoneScreen = document.getElementById('phone-screen') || window;

  // Rainbow & Title
  const rainbow = document.getElementById('rainbow-img');
  const title   = document.getElementById('title-img');
  rainbow.classList.add('active');
  setTimeout(() => title.classList.add('active'), 500);

  // Spotlight L/R
  const marker     = document.getElementById('mid-marker');
  const spotlights = [
    document.getElementById('spotlight-l-img'),
    document.getElementById('spotlight-r-img')
  ];
  function toggleSpotlights() {
    // 判斷 marker 在 phoneScreen 的相對位置
    const containerTop = phoneScreen === window
      ? 0
      : phoneScreen.getBoundingClientRect().top;
    const markerTop = marker.getBoundingClientRect().top - containerTop;
    if (markerTop <= 0) {
      spotlights.forEach(img => img.classList.add('active'));
    }
  }
  phoneScreen.addEventListener('scroll', toggleSpotlights);
  toggleSpotlights();

  // 前言標題 & 內容淡入
  const prefaces = [
    document.getElementById('preface-title'),
    document.getElementById('preface-content')
  ];
  const prefaceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        prefaceObserver.unobserve(entry.target);
      }
    });
  }, {
    root: phoneScreen === window ? null : phoneScreen,
    threshold: 0.1
  });
  prefaces.forEach(el => prefaceObserver.observe(el));

  // 內容逐行 + 按鈕
  const prefaceContent = document.getElementById('preface-content');
  const button         = document.getElementById('preface-button');
  const contentObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        obs.unobserve(prefaceContent);
        const paras = Array.from(prefaceContent.querySelectorAll('p'));
        paras.forEach((p, i) =>
          setTimeout(() => p.classList.add('show'), i * 600)
        );
        setTimeout(() => button.classList.add('active'),
                   paras.length * 600 + 300);
      }
    });
  }, {
    root: phoneScreen === window ? null : phoneScreen,
    threshold: 0.1
  });
  contentObserver.observe(prefaceContent);
});
