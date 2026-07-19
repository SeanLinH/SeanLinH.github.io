/* ============================================================
   Sean Lin · 個人簡歷 — 互動特效
   溫暖編輯風：暖色塵粒、滑鼠光暈、3D 傾斜、打字機、捲動進場
   ============================================================ */

(() => {
  "use strict";

  /* ✏️ ───── 打字機輪播的角色詞：這是「你如何定義自己」，最值得親手改 ─────
     增減、換順序都可以，會自動輪播。 */
  const ROLES = [
    "AI Architect",
    "Multi-Agent Systems 設計者",
    "Agent Builder 平台打造者",
    "Harness Engineering 提出者",
    "懂商業的工程師",
  ];

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none)").matches;

  /* ---------- 1. 捲動進場（IntersectionObserver） ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 同一批元素依序淡入，形成流動感
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => entry.target.classList.add("is-visible"), delay);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    // 為同一容器內的相鄰 reveal 加上遞增延遲，做出交錯感
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 2. 打字機 ---------- */
  const twEl = document.getElementById("typewriter");
  if (twEl && ROLES.length) {
    if (reduceMotion) {
      twEl.textContent = ROLES[0];
    } else {
      let roleIdx = 0, charIdx = 0, deleting = false;
      const type = () => {
        const word = ROLES[roleIdx];
        twEl.textContent = word.slice(0, charIdx);
        if (!deleting && charIdx < word.length) {
          charIdx++;
          setTimeout(type, 110);
        } else if (!deleting && charIdx === word.length) {
          deleting = true;
          setTimeout(type, 1600); // 打完停留
        } else if (deleting && charIdx > 0) {
          charIdx--;
          setTimeout(type, 55);
        } else {
          deleting = false;
          roleIdx = (roleIdx + 1) % ROLES.length;
          setTimeout(type, 320);
        }
      };
      type();
    }
  }

  /* ---------- 4. 導覽列：捲動狀態 + 目前區塊高亮 ---------- */
  const nav = document.getElementById("nav");
  const navLinks = [...document.querySelectorAll(".nav__link")];
  const sections = [...document.querySelectorAll("main section[id]")];

  const onScroll = () => {
    if (nav) nav.classList.toggle("is-scrolled", window.scrollY > 40);
    // 找出目前捲到的區塊
    const pos = window.scrollY + window.innerHeight * 0.35;
    let current = "";
    for (const sec of sections) {
      if (sec.offsetTop <= pos) current = sec.id;
    }
    navLinks.forEach((l) =>
      l.classList.toggle("is-active", l.getAttribute("href") === "#" + current)
    );
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 5. 滑鼠暖光暈（帶緩動跟隨） ---------- */
  const glow = document.getElementById("cursor-glow");
  if (glow && !isTouch && !reduceMotion) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let gx = mx, gy = my;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    document.addEventListener("mouseleave", () => (glow.style.opacity = "0"));
    document.addEventListener("mouseenter", () => (glow.style.opacity = "1"));
    const render = () => {
      // lerp：讓光暈柔和地追上游標，而非硬綁
      gx += (mx - gx) * 0.14;
      gy += (my - gy) * 0.14;
      glow.style.transform = `translate(${gx}px, ${gy}px)`;
      requestAnimationFrame(render);
    };
    render();
  } else if (glow) {
    glow.style.display = "none";
  }

  /* ---------- 6. 卡片 3D 傾斜 ---------- */
  const tilts = document.querySelectorAll(".tilt");
  if (!isTouch && !reduceMotion) {
    tilts.forEach((card) => {
      const MAX = 7; // 最大傾斜角度（度），收斂一點才有質感
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          `perspective(800px) rotateX(${(-py * MAX).toFixed(2)}deg) rotateY(${(px * MAX).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener("mouseleave", () => { card.style.transform = ""; });
    });
  }

  /* ---------- 7. 暖色塵粒背景（canvas） ---------- */
  const canvas = document.getElementById("dust-canvas");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, motes = [];
    const COLORS = ["191, 91, 60", "217, 154, 78", "124, 122, 90"]; // 陶土 / 琥珀 / 橄欖

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(70, Math.floor((w * h) / 26000));
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.2 + 0.6,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.08, // 整體略微向上飄
        a: Math.random() * 0.35 + 0.08,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const m of motes) {
        m.x += m.vx;
        m.y += m.vy;
        // 邊界環繞
        if (m.x < -5) m.x = w + 5; else if (m.x > w + 5) m.x = -5;
        if (m.y < -5) m.y = h + 5; else if (m.y > h + 5) m.y = -5;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${m.c}, ${m.a})`;
        ctx.fill();
      }
      requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();
  }

  /* ---------- 8. 頁尾年份 ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
