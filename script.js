// ==========================================================================
// ИНТЕРАКТИВНЫЙ МНОГОСТРАНИЧНЫЙ ЗИН ДЛЯ КАТИ (6 СЛАЙДОВ)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initParcelOpening();
  initPagination();
  initBlossomBunnyStage();
  initFallingJellycats();
  initScratchCard();
  initNevadaPlayer();
  initMimimiButton();
});

// --------------------------------------------------------------------------
// 1. Анимация распаковки посылки (Плавная, физичная)
// --------------------------------------------------------------------------
function initParcelOpening() {
  const btnOpen = document.getElementById('btnOpenParcel');
  const parcelBox = document.getElementById('parcelBox');
  const parcelScreen = document.getElementById('parcelScreen');

  if (!btnOpen || !parcelBox || !parcelScreen) return;

  btnOpen.addEventListener('click', () => {
    btnOpen.style.pointerEvents = 'none';
    btnOpen.style.transform = 'scale(0.96)';
    btnOpen.style.opacity = '0.8';
    playChime(523.25);

    // 1. Плавный роспуск узла и лент
    setTimeout(() => {
      parcelBox.classList.add('untying');
      playChime(659.25);
    }, 180);

    // 2. Раскрытие посылки и легкий вылет плюшей
    setTimeout(() => {
      parcelBox.classList.add('opening');
      playChime(880);
      burstJellycats(7);
    }, 450);

    // 3. Плавный переход к первому слайду
    setTimeout(() => {
      parcelScreen.classList.add('opened');
      setTimeout(() => {
        parcelScreen.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 550);
    }, 850);
  });
}

// --------------------------------------------------------------------------
// 2. Многостраничная навигация (6 Слайдов)
// --------------------------------------------------------------------------
let currentPage = 1;
const totalPages = 6;

function initPagination() {
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const dots = document.querySelectorAll('.nav-dots .dot');

  function updatePage(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    currentPage = newPage;

    document.querySelectorAll('.zine-page').forEach((p, idx) => {
      p.classList.toggle('active', idx + 1 === currentPage);
    });

    const counter = document.getElementById('pageCounter');
    if (counter) counter.textContent = `${currentPage} / ${totalPages}`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === currentPage);
    });

    btnPrev.disabled = (currentPage === 1);
    if (currentPage === totalPages) {
      btnNext.textContent = 'В начало ↺';
    } else {
      btnNext.textContent = 'Дальше →';
    }

    if (currentPage === 4) {
      setTimeout(initScratchCard, 50);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnPrev.addEventListener('click', () => {
    playChime(440);
    updatePage(currentPage - 1);
  });

  btnNext.addEventListener('click', () => {
    playChime(523.25);
    if (currentPage === totalPages) {
      updatePage(1);
    } else {
      updatePage(currentPage + 1);
    }
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const p = parseInt(dot.getAttribute('data-page'));
      if (p) updatePage(p);
    });
  });
}

// --------------------------------------------------------------------------
// 3. Blossom Silver Bunny & «Котёнок милее всех» (Слайд 1)
// --------------------------------------------------------------------------
function initBlossomBunnyStage() {
  const stage = document.getElementById('heroStage');
  const img = document.getElementById('heroBunnyImg');
  const bubble = document.getElementById('bunnyThought');

  const thoughts = [
    '«Я милый, но Катя всё равно в 1000 раз милее»',
    '«Он тебя любит больше всех игрушек на свете»',
    '«Официально признаю поражение перед твоей милотой»',
    '«Ждёт, когда вы будете няшиться»',
    '«Согласен, что ты самая вкусная»'
  ];
  let tIdx = 0;

  if (stage && img && bubble) {
    stage.addEventListener('click', (e) => {
      playChime(587.33);
      img.style.transform = 'scale(1.08)';
      setTimeout(() => { img.style.transform = 'none'; }, 180);

      bubble.textContent = thoughts[tIdx % thoughts.length];
      tIdx++;
      bubble.classList.add('show');
      clearTimeout(bubble._timer);
      bubble._timer = setTimeout(() => {
        bubble.classList.remove('show');
      }, 2200);

      burstJellycats(3);
    });
  }
}

// --------------------------------------------------------------------------
// 4. Падающие Джелликэты (Вырезанные с фона)
// --------------------------------------------------------------------------
const JELLY_CUTOUTS = [
  'images/cutout-blossom-silver.png', // серый зайчик с цветочками в ушках!
  'images/cutout-croissant.png',      // круассанчик с ножками
  'images/cutout-coffee.png',         // стаканчик кофе
  'images/cutout-bear.png',           // мишка
  'images/cutout-bunny-pink.png'      // розовый зайчик
];

function initFallingJellycats() {
  const btnRain = document.getElementById('btnJellyRain');
  if (btnRain) {
    btnRain.addEventListener('click', () => {
      playChime(659.25);
      burstJellycats(14);
    });
  }
}

function burstJellycats(count = 8) {
  const container = document.getElementById('jellyFallContainer');
  if (!container) return;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      dropSingleJellycat(container);
    }, i * 130);
  }
}

function dropSingleJellycat(container) {
  const item = document.createElement('div');
  item.className = 'falling-jelly-item';

  const imgSrc = JELLY_CUTOUTS[Math.floor(Math.random() * JELLY_CUTOUTS.length)];
  const img = document.createElement('img');
  img.src = imgSrc;
  item.appendChild(img);

  const size = 70 + Math.random() * 40; // 70-110px
  item.style.width = `${size}px`;
  item.style.height = `${size}px`;

  const startX = Math.random() * (window.innerWidth - size);
  item.style.left = `${startX}px`;

  const initRot = (Math.random() - 0.5) * 50;
  const endRot = initRot + (Math.random() > 0.5 ? 1 : -1) * (180 + Math.random() * 160);
  const scale = 0.85 + Math.random() * 0.3;
  const duration = 2.6 + Math.random() * 2; // 2.6-4.6 секунд падения

  item.style.setProperty('--init-rot', `${initRot}deg`);
  item.style.setProperty('--end-rot', `${endRot}deg`);
  item.style.setProperty('--scale', scale);
  item.style.animationDuration = `${duration}s`;

  item.addEventListener('click', (e) => {
    e.stopPropagation();
    playChime(783.99);
    item.style.transform = 'scale(1.25) rotate(15deg)';
    setTimeout(() => {
      item.remove();
    }, 180);
  });

  container.appendChild(item);

  setTimeout(() => {
    item.remove();
  }, duration * 1000 + 100);
}

// --------------------------------------------------------------------------
// 5. Интерактивная лотерейка (Скретч-слой, Слайд 4)
// --------------------------------------------------------------------------
let scratchInitialized = false;

function initScratchCard() {
  const canvas = document.getElementById('scratchCanvas');
  const container = document.getElementById('scratchContainer');
  const hint = document.getElementById('scratchHint');
  if (!canvas || !container) return;

  const ctx = canvas.getContext('2d');
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width || 320;
  canvas.height = rect.height || 160;

  ctx.globalCompositeOperation = 'source-over';
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  grad.addColorStop(0, '#E6D7D2');
  grad.addColorStop(0.5, '#F2E4DF');
  grad.addColorStop(1, '#D9C5BF');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  for (let i = 0; i < 70; i++) {
    const rx = (i * 37) % canvas.width;
    const ry = (i * 53) % canvas.height;
    ctx.beginPath();
    ctx.arc(rx, ry, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#8C6F67';
  ctx.font = 'bold 12px Montserrat, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('✦ ПОТРИ ЗДЕСЬ ПАЛЬЦЕМ ✦', canvas.width / 2, canvas.height / 2 + 4);

  let isDrawing = false;
  let scratchedCount = 0;
  let isRevealed = false;

  function scratch(x, y) {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    playScratchTone();

    if (!isRevealed) {
      scratchedCount++;
      if (scratchedCount > 28) {
        checkPercentage();
      }
    }
  }

  function checkPercentage() {
    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let transparent = 0;
      const total = imageData.data.length / 4;

      for (let i = 3; i < imageData.data.length; i += 32) {
        if (imageData.data[i] === 0) transparent++;
      }

      const ratio = transparent / (total / 8);
      if (ratio > 0.45) {
        isRevealed = true;
        canvas.style.transition = 'opacity 0.4s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.style.display = 'none';
          if (hint) hint.textContent = 'Слой стёрт!';
        }, 400);
        playChime(783.99);
      }
    } catch (e) {}
  }

  function getCoords(e) {
    const cRect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - cRect.left) * (canvas.width / cRect.width),
      y: (clientY - cRect.top) * (canvas.height / cRect.height)
    };
  }

  if (!scratchInitialized) {
    scratchInitialized = true;

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      const { x, y } = getCoords(e);
      scratch(x, y);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDrawing) return;
      const { x, y } = getCoords(e);
      scratch(x, y);
    });

    window.addEventListener('mouseup', () => { isDrawing = false; });

    canvas.addEventListener('touchstart', (e) => {
      isDrawing = true;
      const { x, y } = getCoords(e);
      scratch(x, y);
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      if (!isDrawing) return;
      const { x, y } = getCoords(e);
      scratch(x, y);
      e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', () => { isDrawing = false; });
  }
}

// --------------------------------------------------------------------------
// 6. Плеер трека Nevada (Слайд 5)
// --------------------------------------------------------------------------
function initNevadaPlayer() {
  const audio = document.getElementById('nevadaAudio');
  const btnPlay = document.getElementById('btnPlayNevada');
  const playIcon = document.getElementById('playIcon');
  const disc = document.getElementById('trackDisc');
  const progressWrap = document.getElementById('progressWrap');
  const progressBar = document.getElementById('progressBar');
  const timeDisplay = document.getElementById('timeDisplay');

  if (!audio || !btnPlay) return;

  btnPlay.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      playIcon.textContent = '❚❚';
      if (disc) disc.classList.add('spinning');
    } else {
      audio.pause();
      playIcon.textContent = '▶';
      if (disc) disc.classList.remove('spinning');
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const progress = (audio.currentTime / audio.duration) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;

    const mins = Math.floor(audio.currentTime / 60);
    const secs = Math.floor(audio.currentTime % 60);
    if (timeDisplay) timeDisplay.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  });

  audio.addEventListener('ended', () => {
    playIcon.textContent = '▶';
    if (disc) disc.classList.remove('spinning');
    if (progressBar) progressBar.style.width = '0%';
  });

  if (progressWrap) {
    progressWrap.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = progressWrap.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = clickPos * audio.duration;
    });
  }
}

// --------------------------------------------------------------------------
// 7. МИМИМИ-МЕТР (Слайд 6)
// --------------------------------------------------------------------------
let mimimiCount = 0;
const MIMIMI_PHRASES = [
  "Самая вкусная девочка на планете.",
  "МИМИМИМИМИ! При встрече зацелую наглухо.",
  "Оближу всю от ушек до пяток (потому что сладкая).",
  "Уровень милоты: критический, требуется няшинг.",
  "Обожаю твои щёки и твой запах.",
  "Ты у меня самый лучший заяц на свете!"
];

function initMimimiButton() {
  const btn = document.getElementById('btnBigMimimi');
  const score = document.getElementById('mimimiScore');
  const toast = document.getElementById('mimimiToast');

  if (!btn || !score || !toast) return;

  btn.addEventListener('click', () => {
    mimimiCount++;
    const currentScore = 100 + mimimiCount * 150;
    score.textContent = `${currentScore}%`;

    playChime(440 + (mimimiCount % 5) * 80);

    toast.style.opacity = '0';
    setTimeout(() => {
      toast.textContent = MIMIMI_PHRASES[mimimiCount % MIMIMI_PHRASES.length];
      toast.style.opacity = '1';
    }, 120);

    btn.style.transform = 'scale(1.08) rotate(' + (mimimiCount % 2 === 0 ? 3 : -3) + 'deg)';
    setTimeout(() => { btn.style.transform = 'none'; }, 180);

    const container = document.getElementById('jellyFallContainer');
    if (container) dropSingleJellycat(container);
  });
}

// --------------------------------------------------------------------------
// 8. Звуки (Web Audio API)
// --------------------------------------------------------------------------
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) audioCtx = new AudioContext();
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playChime(freq = 523.25) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.55);
  } catch (e) {}
}

let lastScratchTone = 0;
function playScratchTone() {
  const now = Date.now();
  if (now - lastScratchTone < 130) return;
  lastScratchTone = now;
  playChime(300 + Math.random() * 80);
}
