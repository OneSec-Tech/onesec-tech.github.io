document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     PARTICLES BACKGROUND
  ========================================== */

  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");

  let width;
  let height;

  let particles = [];

  const PARTICLE_COUNT = 80;
  const CONNECT_DISTANCE = 120;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class Particle {

    constructor() {
      this.reset();
    }

    reset() {

      this.x = Math.random() * width;
      this.y = Math.random() * height;

      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;

      this.radius = Math.random() * 2 + 1;
    }

    update() {

      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) {
        this.vx *= -1;
      }

      if (this.y < 0 || this.y > height) {
        this.vy *= -1;
      }

    }

    draw() {

      ctx.beginPath();

      ctx.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Math.PI * 2
      );

      ctx.fillStyle = "rgba(34,197,94,.5)";
      ctx.fill();

    }

  }

  function createParticles() {

    particles = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }

  }

  function drawConnections() {

    for (let i = 0; i < particles.length; i++) {

      for (let j = i + 1; j < particles.length; j++) {

        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < CONNECT_DISTANCE) {

          const opacity =
            (1 - distance / CONNECT_DISTANCE) * 0.4;

          ctx.beginPath();

          ctx.moveTo(
            particles[i].x,
            particles[i].y
          );

          ctx.lineTo(
            particles[j].x,
            particles[j].y
          );

          ctx.strokeStyle =
            `rgba(34,197,94,${opacity})`;

          ctx.lineWidth = 0.7;
          ctx.stroke();

        }

      }

    }

  }

  function animateParticles() {

    ctx.clearRect(
      0,
      0,
      width,
      height
    );

    particles.forEach((particle) => {

      particle.update();
      particle.draw();

    });

    drawConnections();

    requestAnimationFrame(
      animateParticles
    );

  }

  resizeCanvas();
  createParticles();
  animateParticles();

  window.addEventListener(
    "resize",
    resizeCanvas
  );



  /* ==========================================
     MOBILE MENU
  ========================================== */

  const burger =
    document.getElementById("burgerBtn");

  const mobileMenu =
    document.getElementById("mobileMenu");

  burger.addEventListener("click", () => {

    burger.classList.toggle("open");

    mobileMenu.classList.toggle("open");

  });

  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener("click", () => {

        burger.classList.remove("open");

        mobileMenu.classList.remove("open");

      });

    });



  /* ==========================================
     REVEAL ANIMATION
  ========================================== */

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "active"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },

      {
        threshold: 0.15
      }

    );

  document
    .querySelectorAll("[data-reveal]")
    .forEach(el => observer.observe(el));



  /* ==========================================
     GITHUB REPOSITORIES
  ========================================== */

  const repoContainer =
    document.getElementById("repos");

  fetch(
    "https://api.github.com/users/OneSec-Tech/repos?sort=updated"
  )

    .then(response => response.json())

    .then(repositories => {

      repositories
        .slice(0, 6)

        .forEach(repo => {

          const card =
            document.createElement("div");

          card.className =
            "project-card";

          card.innerHTML = `

            <h3>${repo.name}</h3>

            <p>
              ${repo.description || "No description available"}
            </p>

            <a
              href="${repo.html_url}"
              target="_blank"
              class="project-link">

              View Repository

            </a>

          `;

          repoContainer.appendChild(
            card
          );

        });

    })

    .catch(error => {

      repoContainer.innerHTML = `
        <div class="project-card">
          <h3>GitHub Error</h3>
          <p>Unable to load repositories.</p>
        </div>
      `;

      console.error(error);

    });



  /* ==========================================
     CERTIFICATES
  ========================================== */

  const certificates = [
  { img: 'image/1.png', title: 'Certificate 1' },
  { img: 'image/2.png', title: 'Certificate 2' },
  { img: 'image/3.png', title: 'Certificate 3' },
  { img: 'image/4.png', title: 'Certificate 4' },
  { img: 'image/5.png', title: 'Certificate 5' },
  { img: 'image/6.png', title: 'Certificate 6' },
  { img: 'image/7.png', title: 'Certificate 7' },
  { img: 'image/8.png', title: 'Certificate 8' },
  { img: 'image/9.png', title: 'Certificate 9' },
  { img: 'image/10.png', title: 'Certificate 10' },
  { img: 'image/11.png', title: 'Certificate 11' },
  { img: 'image/12.png', title: 'Certificate 12' }
];

  const certGrid =
    document.getElementById("certGrid");

  if (certGrid) {

    certificates.forEach(
      (certificate, index) => {

        const card =
          document.createElement("div");

        card.className =
          "cert-card";

        card.innerHTML = `

          <img
            src="${certificate.img}"
            alt="${certificate.title}"
            loading="lazy">

          <div class="overlay">

            <span>

              <i class="fas fa-search-plus"></i>
              View

            </span>

          </div>

        `;

        card.addEventListener(
          "click",
          () => openLightbox(index)
        );

        certGrid.appendChild(card);

      }
    );

  }



  /* ==========================================
     LIGHTBOX
  ========================================== */

  let currentIndex = 0;

  const lightbox =
    document.getElementById("lightbox");

  const lbImage =
    document.getElementById("lbImg");

  const lbCaption =
    document.getElementById("lbCaption");

  const lbCounter =
    document.getElementById("lbCounter");

  function updateLightbox() {

    const certificate =
      certificates[currentIndex];

    lbImage.src =
      certificate.img;

    lbCaption.textContent =
      certificate.title;

    lbCounter.textContent =
      `${currentIndex + 1} / ${certificates.length}`;

  }

  function openLightbox(index) {

    currentIndex = index;

    updateLightbox();

    lightbox.classList.remove(
      "opacity-0",
      "pointer-events-none"
    );

    document.body.style.overflow =
      "hidden";

  }

  function closeLightbox() {

    lightbox.classList.add(
      "opacity-0",
      "pointer-events-none"
    );

    document.body.style.overflow =
      "";

  }

  document
    .getElementById("lbClose")
    .addEventListener(
      "click",
      closeLightbox
    );

  document
    .getElementById("lbPrev")
    .addEventListener(
      "click",
      () => {

        currentIndex--;

        if (currentIndex < 0) {
          currentIndex =
            certificates.length - 1;
        }

        updateLightbox();

      }
    );

  document
    .getElementById("lbNext")
    .addEventListener(
      "click",
      () => {

        currentIndex++;

        if (
          currentIndex >= certificates.length
        ) {
          currentIndex = 0;
        }

        updateLightbox();

      }
    );

  lightbox.addEventListener(
    "click",
    e => {

      if (e.target === lightbox) {
        closeLightbox();
      }

    }
  );



  /* ==========================================
     KEYBOARD NAVIGATION
  ========================================== */

  document.addEventListener(
    "keydown",
    e => {

      const opened =
        !lightbox.classList.contains(
          "opacity-0"
        );

      if (!opened) return;

      if (e.key === "Escape") {
        closeLightbox();
      }

      if (e.key === "ArrowLeft") {

        currentIndex--;

        if (currentIndex < 0) {
          currentIndex =
            certificates.length - 1;
        }

        updateLightbox();

      }

      if (e.key === "ArrowRight") {

        currentIndex++;

        if (
          currentIndex >= certificates.length
        ) {
          currentIndex = 0;
        }

        updateLightbox();

      }

    }
  );

});
