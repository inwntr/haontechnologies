const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // ativa/desativa o menu
  });
}

const sectionsTitles = [
  { id: 'inicio', title: 'Haon – Home' },
  { id: 'sobre', title: 'Haon – About' },
  { id: 'servicos', title: 'Haon – Services' },
  { id: 'como', title: 'Haon – How We Work' },
  { id: 'portfolio', title: 'Haon – Portfólio' }
];

const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const sections = document.querySelectorAll('.section, .hero-content, .card');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.animation = 'fadeInUp 1s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => {
  observer.observe(section);
});

const observerTitle = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const current = sectionsTitles.find(s => s.id === entry.target.id);
      if (current) {
        document.title = current.title;
      }
    }
  });
}, { threshold: 0.5 })

sectionsTitles.forEach(s => {
  const sec = document.getElementById(s.id);
  if (sec) observerTitle.observe(sec);
});

const menuLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';

  document.querySelectorAll('section').forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  menuLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("portfolioGrid");
  const filtros = document.querySelectorAll(".filtro");

  if (grid) {
    try {
      const res = await fetch("/projetos.json");
      const projetos = await res.json();

      function renderizar(categoria = "todos") {
        grid.innerHTML = "";
        const filtrados = categoria === "todos"
          ? projetos
          : projetos.filter(p => p.categoria === categoria);

        filtrados.forEach((p, index) => {
          const card = document.createElement("div");
          card.classList.add("projeto-card");
          card.style.animationDelay = `${index * 0.2}s`;
          card.innerHTML = `
            <img src="${p.imagem}" alt="${p.titulo}">
            <div class="projeto-info">
              <h3>${p.titulo}</h3>
              <p>${p.descricao}</p>
              <a href="${p.link}" target="_blank">Ver Projeto ↗</a>
            </div>
          `;
          grid.appendChild(card);

          // efeito de brilho dentro do render
          card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
          });
          card.addEventListener('mouseleave', () => {
            card.style.setProperty('--x', `50%`);
            card.style.setProperty('--y', `50%`);
          });
        });
      }

      renderizar();

      filtros.forEach(btn => {
        btn.addEventListener("click", () => {
          filtros.forEach(f => f.classList.remove("ativo"));
          btn.classList.add("ativo");
          renderizar(btn.dataset.cat);
          grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });

    } catch (err) {
      grid.innerHTML = "<p>Erro ao carregar portfólio 😢</p>";
    }
  }
});

const logo = document.querySelector('.logo-img')
logo.addEventListener('click', () => {
  window.location.href = '/'
})

const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  hero.style.backgroundPositionY = `${scroll * 0.3}px`;
});

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.2}s`;
  card.classList.add('animate');
});

document.querySelectorAll('.projeto-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.setProperty('--x', `50%`);
    card.style.setProperty('--y', `50%`);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const modalText = document.getElementById("modalText");
  const closeModal = document.querySelector(".close");

    const conteudo = {
    termos: `
    <h2>Terms of Service</h2>
    <p>By using the services of <strong>Haon Technologies</strong>, you agree to our terms of use and conditions.
    All projects are carefully planned, executed within defined timelines, and aligned with the agreed-upon scope with the client, ensuring quality, efficiency, and measurable results.</p>
    <p>Any misuse of materials, software, designs, or content provided by Haon is strictly prohibited and subject to current copyright and intellectual property laws, including potential legal penalties.</p>
    <p>Our commitment is to deliver services with excellence, maintaining transparency, security, and accountability at every stage of the project.</p>
  `,
    privacidade: `
    <h2>Privacy Policy</h2>
    <p><strong>Haon Technologies</strong> values your privacy and rigorously protects all data collected through forms, emails, or any contact channels. This information is used exclusively for business purposes, support, direct communication, and continuous improvement of our services.</p>
    <p>We do not share personal data with third parties without the user's explicit consent, except when required by law or to ensure proper execution of contracted services.</p>
    <p>We adopt technical and administrative measures to protect your information against unauthorized access, loss, alteration, or improper disclosure, ensuring every interaction with Haon is secure and trustworthy.</p>
  `,
    contrato: `
    <h2>Contract Clauses</h2>
    <p>All contracts entered into with <strong>Haon Technologies</strong> follow technical, legal, and ethical standards, ensuring the security, confidentiality, and integrity of all information shared during project development.</p>
    <p>All parties involved commit to clear communication, active collaboration, and transparency throughout all phases of the project, from planning to final delivery, ensuring expectations and deadlines are met with excellence.</p>
    <p>The contract defines responsibilities, rights, and duties of each party, ensuring that all provided solutions are delivered professionally, securely, and in line with the highest quality standards.</p>
  `
  };

  document.getElementById("termosLink").addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(conteudo.termos);
  });

  document.getElementById("privacidadeLink").addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(conteudo.privacidade);
  });

  document.getElementById("contratoLink").addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(conteudo.contrato);
  });

function abrirModal(texto) {
  modalText.innerHTML = texto;
  modal.style.display = "flex";
}

function fecharModal() {
  modal.style.display = "none";
}

closeModal.onclick = fecharModal;

window.onclick = (event) => {
  if (event.target === modal) {
    fecharModal();
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    fecharModal();
  }
});

})

