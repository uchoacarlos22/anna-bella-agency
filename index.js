/* ============================================================
   MOTOR DA GALERIA 3D INFINITA (VANILLA JS)
   ============================================================ */

const galleryData = [
  {
    img: "imagens/portfolio1.png",
    client: "Ana Clara Martins",
    campaign: "Verão 2025"
  },
  {
    img: "imagens/portfolio2.png",
    client: "Mariana Santos",
    campaign: "Glow Magazine"
  },
  {
    img: "imagens/portfolio3.png",
    client: "Lara Oliveira",
    campaign: "NY Fashion Week"
  },
  {
    img: "imagens/passarela.jpg",
    client: "Beatriz Nogueira",
    campaign: "Milão Fashion"
  },
  // Duplicando/Mocando para criar volume na nuvem 3D (para efeito impressionante)
  { img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80", client: "Sophia L.", campaign: "Editorial Urban" },
  { img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80", client: "Chloe D.", campaign: "Haute Couture" },
  { img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80", client: "Emma W.", campaign: "Beauty Shot" },
  { img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&auto=format&fit=crop&q=80", client: "Olivia R.", campaign: "Vogue Cover" },
  { img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80", client: "Isabella V.", campaign: "Spring Collection" },
  { img: "https://images.unsplash.com/photo-1488161628813-04466f872507?w=600&auto=format&fit=crop&q=80", client: "Mia T.", campaign: "Streetwear X" }
];

let zProgress = 0; // A posição virtual da câmera
let targetZProgress = 0; // Para smooth scroll (interpolação)
let isHoveringGallery = false;
let autoRevealInterval = null;

const Z_SPACING = 500; // Distância no eixo Z entre cada card
const TOTAL_CARDS = galleryData.length;
const Z_LIMIT = Z_SPACING * TOTAL_CARDS;

// Parâmetros de distribuição espacial (o quão longe do centro X/Y os cards podem ir)
const X_SPREAD = 800;
const Y_SPREAD = 400;

document.addEventListener("DOMContentLoaded", () => {
  init3DGallery();
});

function init3DGallery() {
  const container = document.getElementById("gallery-container");
  const stage = document.getElementById("gallery-stage");
  const hudTitle = document.getElementById("hud-title");
  const hudDesc = document.getElementById("hud-desc");

  if (!container || !stage) return;

  // 1. Cria e ejeta os cards no DOM
  galleryData.forEach((data, index) => {
    const card = document.createElement('div');
    card.className = 'card-3d';
    card.style.backgroundImage = `url(${data.img})`;
    
    // Calcula posições espaciais pseudo-aleatórias (espiral/distribuição fixa)
    const angle = index * 2.4; // Golden angle approx
    const radiusX = (index % 3 + 1) * (X_SPREAD / 3);
    const radiusY = (index % 2 + 1) * (Y_SPREAD / 2);
    
    const x = Math.sin(angle) * radiusX;
    const y = Math.cos(angle) * radiusY;
    
    // Armazena dados originais no elemento
    card.dataset.origX = x;
    card.dataset.origY = y;
    card.dataset.index = index;
    card.dataset.client = data.client;
    card.dataset.campaign = data.campaign;

    // Titulo
    const title = document.createElement('div');
    title.className = 'card-title';
    title.innerHTML = `${data.client}<br><span style="font-size: 0.5em; color: var(--primary-color)">${data.campaign}</span>`;
    card.appendChild(title);

    // Eventos de Hover no card
    card.addEventListener('mouseenter', () => {
      hudTitle.textContent = data.client;
      hudDesc.textContent = `Campanha: ${data.campaign}`;
      hudTitle.style.color = 'var(--primary-color)';
    });

    card.addEventListener('mouseleave', () => {
      hudTitle.textContent = "Anna Bella Agency";
      hudDesc.textContent = "Onde o talento encontra a perfeição estética.";
      hudTitle.style.color = '#fff';
    });

    stage.appendChild(card);
  });

  const cards = Array.from(stage.children);

  // 2. Loop de Renderização (Request Animation Frame para máxima performance)
  function render3D() {
    // Interpolação suave do scroll (Lerp)
    zProgress += (targetZProgress - zProgress) * 0.08;

    cards.forEach((card) => {
      const index = parseInt(card.dataset.index);
      const x = parseFloat(card.dataset.origX);
      const y = parseFloat(card.dataset.origY);

      // A mágica do Loop infinito
      // Z base do card menos o progresso da câmera
      let cardZ = (index * Z_SPACING) - zProgress;

      // Se o card passar muito atrás da câmera (ex: > 400px), a gente joga ele pro fundo da fila
      // Se ele for muito lá pro fundo (menor que -Z_LIMIT), trás pra frente.
      // Modulo ajustado em JavaScript: ((a % n) + n) % n
      let normalizedZ = ((cardZ % Z_LIMIT) + Z_LIMIT) % Z_LIMIT;
      
      // Centraliza a visão: câmera fica em Z=0, mas queremos que cards apareçam antes
      // Vamos assumir que normalizedZ de 0 a 500 está perto, e Z_LIMIT está longe.
      // Deslocamos para que os cards sumam nas costas do user
      let finalZ = normalizedZ - 1000; 

      // Opacidade e Blur dependem da distância (Depth of Field Fake)
      let opacity = 1;
      let blur = 0;

      if (finalZ > 200) {
        // Passou da câmera (atrás do usuário)
        opacity = 0;
      } else if (finalZ > -200) {
        // Perto demais / foco
        opacity = 1;
        blur = 0;
      } else if (finalZ > -2000) {
        // Meio fundo
        opacity = 1 - (Math.abs(finalZ) / 3000);
        blur = Math.abs(finalZ + 200) * 0.003; 
      } else {
        // Muito ao fundo
        opacity = 0;
        blur = 10;
      }

      // Evita pintar e renderizar se invisível (Otimização CPU)
      if (opacity <= 0.05) {
        card.style.display = 'none';
      } else {
        card.style.display = 'block';
        card.style.transform = `translate3d(${x}px, ${y}px, ${finalZ}px)`;
        card.style.opacity = opacity;
        card.style.filter = blur > 0.5 ? `blur(${blur}px)` : 'none'; // Evitar blur 0px gasta menos
      }
    });

    // Auto-scroll loop
    if (!isHoveringGallery) {
      targetZProgress += 2; // Velocidade do auto-voar
    }

    requestAnimationFrame(render3D);
  }

  // Iniciar loop
  render3D();

  // 3. Controles - Wheel e Touch com Limite de "Trava" (Scroll Budget)
  let scrollAccumulator = 0;
  const SCROLL_THRESHOLD = 2500; // O quanto o user pode scrollar internamente antes de "liberar" a página

  container.addEventListener('wheel', (e) => {
    // Só capturamos o scroll se estivermos dentro da "folga" do orçamento
    if (e.deltaY > 0 && scrollAccumulator < SCROLL_THRESHOLD) {
      e.preventDefault();
      scrollAccumulator += Math.abs(e.deltaY);
      targetZProgress += e.deltaY * 2;
    } else if (e.deltaY < 0 && scrollAccumulator > -SCROLL_THRESHOLD) {
      e.preventDefault();
      scrollAccumulator -= Math.abs(e.deltaY);
      targetZProgress += e.deltaY * 2;
    }
    // Se estourar o threshold, não chamamos preventDefault, permitindo o scroll da página
  });

  let touchStartY = 0;
  container.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  });

  container.addEventListener('touchmove', (e) => {
    let touchY = e.touches[0].clientY;
    let delta = touchStartY - touchY;

    if (delta > 0 && scrollAccumulator < SCROLL_THRESHOLD) {
      e.preventDefault();
      scrollAccumulator += Math.abs(delta) * 5;
      targetZProgress += delta * 15;
    } else if (delta < 0 && scrollAccumulator > -SCROLL_THRESHOLD) {
      e.preventDefault();
      scrollAccumulator -= Math.abs(delta) * 5;
      targetZProgress += delta * 15;
    }
    touchStartY = touchY;
  });

  container.addEventListener('mouseenter', () => {
    isHoveringGallery = true;
  });
  
  container.addEventListener('mouseleave', () => {
    isHoveringGallery = false;
    // Opcional: Resetar orçamento ao sair para que ele "trave" de novo ao re-entrar
    scrollAccumulator = 0; 
  });

  // Setas teclado (sempre capturamos se focado, mas sem travar o scroll da página se não quiser)
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      targetZProgress -= 300;
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      targetZProgress += 300;
    }
  });

}

/* ============================================================
   LÓGICA ORIGINAL DO CARROSSEL DE DESTAQUES (.containerCarousel)
   ============================================================ */

const dataCarousel = [
  { img: "imagens/portfolio1.png", country: "Fashion Week São Paulo - Verão 2025", place: "Fashion Week | Julho", describe: "A modelo Ana Clara Martins brilhou na passarela apresentando nossa coleção vibrante e sustentável." },
  { img: "imagens/portfolio2.png", country: "Glow Awards 2025", place: "Evento Glow Magazine", describe: "Mariana Santos desfilou nossa nova campanha no prestigiado evento da Glow Magazine." },
  { img: "imagens/portfolio3.png", country: "Fashion Show New York - Outono 2025", place: "Fashion Week | Novembro", describe: "Lara Oliveira desfilou nossa coleção de outono, unindo tradição e modernidade." },
  { img: "imagens/passarela.jpg", country: "Fashion Week Los Angeles - Primavera 2025", place: "Fashion Week | Outubro", describe: "Em Milão, Beatriz Nogueira destacou nosso design em um dos maiores palcos da moda." },
];

document.addEventListener("DOMContentLoaded", () => {
  const introduce = document.querySelector(".introduce");
  const ordinalNumber = document.querySelector(".ordinal-number");
  const thumbnailListWrapper = document.querySelector(".thumbnail-list .wrapper");
  const nextBtn = document.querySelector(".navigation .next-button");

  if (!introduce || !ordinalNumber || !thumbnailListWrapper || !nextBtn) return;

  introduce.innerHTML = "";
  ordinalNumber.innerHTML = "";
  for (let i = 0; i < dataCarousel.length; i++) {
    introduce.innerHTML += `
          <div class="wrapper">
              <span><h5 class="country" style="--idx: 0">${dataCarousel[i].country}</h5></span>
              <span><h1 class="place" style="--idx: 1">${dataCarousel[i].place}</h1></span>
              <span><p class="describe" style="--idx: 2">${dataCarousel[i].describe}</p></span>
              <span><button class="discover-button" style="--idx: 3">Discover now</button></span>
          </div>
      `;
    ordinalNumber.innerHTML += `<h2>0${i + 1}</h2>`;
  }

  introduce.children[0].classList.add("active");
  ordinalNumber.children[0].classList.add("active");

  thumbnailListWrapper.innerHTML += `
      <div class="thumbnail zoom">
          <img src="${dataCarousel[0].img}" alt="">
      </div>`;

  for (let i = 1; i < dataCarousel.length; i++) {
    thumbnailListWrapper.innerHTML += `
      <div class="thumbnail" style="--idx: ${i - 1}">
          <img src="${dataCarousel[i].img}" alt="">
      </div>
    `;
  }

  let currentIndex = 0;
  nextBtn.addEventListener("click", () => {
    nextBtn.disabled = true;
    let clone = thumbnailListWrapper.children[0].cloneNode(true);
    clone.classList.remove("zoom");
    thumbnailListWrapper.appendChild(clone);
    thumbnailListWrapper.children[1].classList.add("zoom");
    setTimeout(() => {
      thumbnailListWrapper.children[0].remove();
      nextBtn.disabled = false;
    }, 1000);

    for (let i = 2; i < thumbnailListWrapper.childElementCount; i++) {
      thumbnailListWrapper.children[i].style = `--idx: ${i - 2}`;
    }
    
    currentIndex = (currentIndex < dataCarousel.length - 1) ? currentIndex + 1 : 0;
    
    for (let i = 0; i < dataCarousel.length; i++) {
      introduce.children[i].classList.remove("active");
      ordinalNumber.children[i].classList.remove("active");
    }
    introduce.children[currentIndex].classList.add("active");
    ordinalNumber.children[currentIndex].classList.add("active");
    ordinalNumber.children[currentIndex].textContent = "0" + (currentIndex + 1);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const editorialElements = document.querySelectorAll(
    "#sobre .about-header, #sobre .about-grid-content"
  );


  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const editorialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  editorialElements.forEach(el => editorialObserver.observe(el));
});

// Detectar o scroll para adicionar/remover classe "sticky"
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.getElementById("navbar");
  const stickyOffset = navbar.offsetTop;

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > stickyOffset) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
});


