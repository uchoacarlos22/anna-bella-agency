var data = [
  {
    img: "imagens/portfolio1.png",
    country: "Fashion Week São Paulo - Verão 2025",
    place: "Fashion Week | Julho",
    describe:
      "A modelo Ana Clara Martins brilhou na passarela apresentando nossa coleção vibrante e sustentável.",
  },
  {
    img: "imagens/portfolio2.png",
    country: "Glow Awards 2025",
    place: "Evento Glow Magazine",
    describe:
      "Mariana Santos desfilou nossa nova campanha no prestigiado evento da Glow Magazine.",
  },
  {
    img: "imagens/portfolio3.png",
    country: "Fashion Show New York - Outono 2025",
    place: "Fashion Week | Novembro",
    describe:
      "Lara Oliveira desfilou nossa coleção de outono, unindo tradição e modernidade.",
  },
  {
    img: "imagens/passarela.jpg",
    country: "Fashion Week Los Angeles - Primavera 2025",
    place: "Fashion Week | Outubro",
    describe:
      "Em Milão, Beatriz Nogueira destacou nosso design em um dos maiores palcos da moda.",
  },
];

const introduce = document.querySelector(".introduce");
const ordinalNumber = document.querySelector(".ordinal-number");

introduce.innerHTML = "";
ordinalNumber.innerHTML = "";
for (let i = 0; i < data.length; i++) {
  introduce.innerHTML += `
        <div class="wrapper">
            <span>
              <h5 class="country" style="--idx: 0">${data[i].country}</h5>
            </span>
            <span>
              <h1 class="place" style="--idx: 1">${data[i].place}</h1>
            </span>
            <span>
              <p class="describe" style="--idx: 2">${data[i].describe}</p>
            </span>
            <span>
              <button class="discover-button" style="--idx: 3">
                Discover now
              </button>
            </span>
        </div>
    `;

  ordinalNumber.innerHTML += `
        <h2>0${i + 1}</h2>
    `;
}

introduce.children[0].classList.add("active");
ordinalNumber.children[0].classList.add("active");

const thumbnailListWrapper = document.querySelector(".thumbnail-list .wrapper");

thumbnailListWrapper.innerHTML += `
    <div class="thumbnail zoom">
        <img src="${data[0].img}" alt="">
    </div>`;

for (let i = 1; i < data.length; i++) {
  thumbnailListWrapper.innerHTML += `
    <div class="thumbnail" style="--idx: ${i - 1}">
        <img src="${data[i].img}" alt="">
    </div>
  `;
}

const nextBtn = document.querySelector(".navigation .next-button");
var currentIndex = 0;
nextBtn.addEventListener("click", () => {
  nextBtn.disabled = true;
  var clone = thumbnailListWrapper.children[0].cloneNode(true);
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
  if (currentIndex < data.length - 1) {
    currentIndex++;
  } else currentIndex = 0;
  for (let i = 0; i < data.length; i++) {
    introduce.children[i].classList.remove("active");
    ordinalNumber.children[i].classList.remove("active");
  }
  introduce.children[currentIndex].classList.add("active");
  ordinalNumber.children[currentIndex].classList.add("active");
  ordinalNumber.children[currentIndex].textContent = `0${currentIndex + 1}`;
});

document.addEventListener("DOMContentLoaded", function () {
  const sectionAbout = document.querySelector(".about-section");
  const revealElements = document.querySelectorAll(
    ".about-title, .about-description, .about-content, .about-text, .about-image"
  );

  // Função para adicionar e remover animações
  function handleIntersection(entry, target) {
    if (entry.isIntersecting) {
      // Se pelo menos 50% do bloco estiver visível, aplica o efeito
      if (target.classList.contains('about-text')) {
        target.classList.add('reveal', 'left');
      } else if (target.classList.contains('about-image')) {
        target.classList.add('reveal', 'top');
      } else {
        target.classList.add('reveal');
      }
    } else {
      // Se o bloco sair de vista, remove o efeito
      target.classList.remove('reveal', 'left', 'right', 'top', 'bottom');
    }
  }

  // Função para criar observers para cada bloco
  revealElements.forEach(function (element) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => handleIntersection(entry, element));
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // Ativa o efeito quando pelo menos 50% do bloco estiver visível
      }
    );

    observer.observe(element);
  });
});

