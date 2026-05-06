const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const haongroup = document.querySelector('#haongroupimg');

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
  { id: 'projects', title: 'Haon – Projects' }
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

  if (!grid) return;

  try {
    const res = await fetch("projetos.json");
    const projetos = await res.json();

    const isPortfolioPage = document.body.dataset.page === "portfolio";

    function renderizar(categoria = "Todos") {
      grid.innerHTML = "";

      let lista;

      if (isPortfolioPage) {
        lista = categoria === "Todos"
          ? projetos
          : projetos.filter(p => p.categoria === categoria);
      } else {
        lista = projetos.filter(p => p.destaque === true);
      }

      lista.forEach((p, index) => {
        const card = document.createElement("div");
        card.classList.add("projeto-card");
        card.style.animationDelay = `${index * 0.2}s`;

        card.innerHTML = `
          <img src="${p.imagem}" alt="${p.titulo}">
          <div class="projeto-info">
            <span class="project-type">${p.tipo}</span>
            <h3>${p.titulo}</h3>
            <p>${p.descricao}</p>

            <div class="project-tags">
              ${p.stack.map(tag => `<span>${tag}</span>`).join("")}
            </div>

            <a href="${p.link}" target="_blank">View Project ↗</a>
          </div>
        `;

        grid.appendChild(card);
      });
    }

    renderizar();

    if (isPortfolioPage) {
      filtros.forEach(btn => {
        btn.addEventListener("click", () => {
          filtros.forEach(f => f.classList.remove("ativo"));
          btn.classList.add("ativo");
          renderizar(btn.dataset.cat);
          grid.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });
    }

  } catch (err) {
    grid.innerHTML = "<p>Erro ao carregar portfólio 😢</p>";
  }
});

const logo = document.querySelector('.logo-img');

if (logo) {
  logo.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

const hero = document.querySelector('.hero');

if (hero) {
  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    hero.style.backgroundPositionY = `${scroll * 0.3}px`;
  });
}

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

  if (!modal || !modalText || !closeModal || !termosLink || !privacidadeLink || !contratoLink) {
    return;
  }

  const legalContent = {
    en: {
      termos: `
      <h2>Terms of Service</h2>
      <p>By using the services provided by <strong>Haon Technologies</strong>, the client agrees that each project will be developed according to the scope, deadlines, and conditions previously defined between both parties.</p>
      <p>All materials, designs, systems, code, and digital assets delivered by Haon Technologies are protected by intellectual property rights and may not be copied, resold, modified, or redistributed without prior authorization.</p>
      <p>Haon Technologies is committed to professional execution, clear communication, and responsible delivery throughout every stage of the project.</p>
    `,

      privacidade: `
      <h2>Privacy Policy</h2>
      <p><strong>Haon Technologies</strong> respects the privacy of its clients and visitors. Information collected through contact channels, forms, emails, or project communication is used only for service execution, support, business communication, and internal improvement.</p>
      <p>Personal information is not sold, shared, or disclosed to third parties without consent, except when required by law or necessary for the execution of contracted services.</p>
      <p>Reasonable technical and administrative measures are applied to protect information against unauthorized access, loss, misuse, or improper disclosure.</p>
    `,

      contrato: `
      <h2>Contract Clauses</h2>
      <p>Projects developed by <strong>Haon Technologies</strong> follow a defined scope, agreed deadlines, and clear responsibilities between the client and the company.</p>
      <p>Both parties are expected to maintain transparent communication, provide necessary information on time, and collaborate throughout the planning, development, review, and delivery stages.</p>
      <p>Final terms, payment conditions, maintenance, revisions, usage rights, and delivery responsibilities may vary according to each project and must be formally agreed before execution.</p>
    `
    },

    pt: {
      termos: `
      <h2>Termos de Serviço</h2>
      <p>Ao utilizar os serviços prestados pela <strong>Haon Technologies</strong>, o cliente concorda que cada projeto será desenvolvido de acordo com o escopo, prazos e condições previamente definidos entre as partes.</p>
      <p>Todos os materiais, designs, sistemas, códigos e ativos digitais entregues pela Haon Technologies são protegidos por direitos de propriedade intelectual e não podem ser copiados, revendidos, modificados ou redistribuídos sem autorização prévia.</p>
      <p>A Haon Technologies se compromete com execução profissional, comunicação clara e entrega responsável durante todas as etapas do projeto.</p>
    `,

      privacidade: `
      <h2>Política de Privacidade</h2>
      <p>A <strong>Haon Technologies</strong> respeita a privacidade de seus clientes e visitantes. Informações coletadas por canais de contato, formulários, e-mails ou comunicações de projeto são utilizadas apenas para execução de serviços, suporte, comunicação comercial e melhoria interna.</p>
      <p>Informações pessoais não são vendidas, compartilhadas ou divulgadas a terceiros sem consentimento, exceto quando exigido por lei ou necessário para a execução dos serviços contratados.</p>
      <p>Medidas técnicas e administrativas razoáveis são aplicadas para proteger as informações contra acesso não autorizado, perda, uso indevido ou divulgação inadequada.</p>
    `,

      contrato: `
      <h2>Cláusulas Contratuais</h2>
      <p>Os projetos desenvolvidos pela <strong>Haon Technologies</strong> seguem um escopo definido, prazos acordados e responsabilidades claras entre o cliente e a empresa.</p>
      <p>Ambas as partes devem manter comunicação transparente, fornecer as informações necessárias dentro dos prazos e colaborar durante as etapas de planejamento, desenvolvimento, revisão e entrega.</p>
      <p>Termos finais, condições de pagamento, manutenção, revisões, direitos de uso e responsabilidades de entrega podem variar conforme cada projeto e devem ser formalmente acordados antes da execução.</p>
    `
    }
  };

  function getCurrentLang() {
    return localStorage.getItem("lang") || "en";
  }

  document.getElementById("termosLink").addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(legalContent[getCurrentLang()].termos);
  });

  document.getElementById("privacidadeLink").addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(legalContent[getCurrentLang()].privacidade);
  });

  document.getElementById("contratoLink").addEventListener("click", (e) => {
    e.preventDefault();
    abrirModal(legalContent[getCurrentLang()].contrato);
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

if (haongroup) {
  haongroup.addEventListener('click', () => {
    window.open('https://haongroup.netlify.app/', '_blank');
  });
}

const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_how: "How We Work",
    nav_portfolio: "Projects",

    hero_title: "Digital systems built with precision, performance, and clarity.",
    hero_text: "Haon Technologies builds websites, systems, and digital solutions designed to help businesses operate with more clarity, efficiency, and long-term reliability.",
    learn_more: "Learn More",

    about_title: "About Us",
    about_text: "Haon Technologies develops digital systems, websites, and technical solutions built to improve business operations, strengthen digital presence, and support long-term growth.",

    services_title: "What We Do",

    service_design: "Interface & Brand Design",
    service_design_desc: "Digital interfaces and visual systems designed for clarity, consistency, and user experience.",

    service_web: "Websites & Digital Platforms",
    service_web_desc: "Responsive websites and digital platforms built for performance, scalability, and modern business needs.",

    service_discord: "Automation & Custom Systems",
    service_discord_desc: "Custom automation tools and operational systems built to optimize workflows and digital communities.",

    how_title: "How We Work",
    how_text: "Every project follows a structured process built around strategy, execution, and delivery — ensuring technical clarity, efficient development, and reliable results.",

    portfolio_title: "Selected Projects",
    portfolio_text: "A curated selection of projects that demonstrate our work across websites, systems, automation, and digital execution.",
    view_full_portfolio: "View All Projects",

    portfolio_archive_title: "Project Archive",
    portfolio_archive_text: "A complete archive of selected projects developed across web systems, digital platforms, automation, and interface design.",

    filter_all: "All",
    filter_technical: "Technical",

    sales_support: "Sales",
    technical_support: "Support",
    project_support: "Projects",

    legal_title: "Legal",
    legal_terms: "Terms of Service",
    legal_privacy: "Privacy Policy",
    legal_contract: "Contract Clauses",

    footer_rights: "All rights reserved.",
  },

  pt: {
    nav_home: "Início",
    nav_about: "Sobre",
    nav_services: "Serviços",
    nav_how: "Como Trabalhamos",
    nav_portfolio: "Projetos",

    hero_title: "Sistemas digitais construídos com precisão, performance e clareza.",
    hero_text: "A Haon Technologies desenvolve websites, sistemas e soluções digitais projetadas para ajudar empresas a operar com mais clareza, eficiência e confiabilidade a longo prazo.",
    learn_more: "Saiba mais",

    about_title: "Sobre Nós",
    about_text: "A Haon Technologies desenvolve sistemas digitais, websites e soluções técnicas criadas para melhorar operações, fortalecer presença digital e sustentar crescimento a longo prazo.",

    services_title: "O Que Fazemos",

    service_design: "Interface & Design de Marca",
    service_design_desc: "Interfaces digitais e sistemas visuais desenvolvidos para clareza, consistência e experiência do usuário.",

    service_web: "Websites & Plataformas Digitais",
    service_web_desc: "Websites responsivos e plataformas digitais criados para performance, escalabilidade e demandas modernas de negócios.",

    service_discord: "Automação & Sistemas Personalizados",
    service_discord_desc: "Ferramentas de automação e sistemas operacionais personalizados criados para otimizar fluxos e comunidades digitais.",

    how_title: "Como Trabalhamos",
    how_text: "Cada projeto segue um processo estruturado baseado em estratégia, execução e entrega — garantindo clareza técnica, desenvolvimento eficiente e resultados confiáveis.",

    portfolio_title: "Projetos Selecionados",
    portfolio_text: "Uma seleção de projetos que demonstram nossa atuação em websites, sistemas, automação e execução digital.",
    view_full_portfolio: "Ver todos os projetos",

    portfolio_archive_title: "Arquivo de Projetos",
    portfolio_archive_text: "Um arquivo completo de projetos selecionados desenvolvidos em sistemas web, plataformas digitais, automação e design de interface.",

    filter_all: "Todos",
    filter_technical: "Técnico",

    sales_support: "Comercial",
    technical_support: "Suporte",
    project_support: "Projetos",

    legal_title: "Legal",
    legal_terms: "Termos de Serviço",
    legal_privacy: "Política de Privacidade",
    legal_contract: "Cláusulas Contratuais",

    footer_rights: "Todos os direitos reservados.",
  }
};

function setLanguage(lang) {
  localStorage.setItem("lang", lang);

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const browserLang = navigator.language.startsWith("pt") ? "pt" : "en";
  const savedLang = localStorage.getItem("lang") || browserLang;
  setLanguage(savedLang);

  document.querySelectorAll('.lang-switch button').forEach(btn => {
    btn.classList.remove('active');
  });

  document.querySelector(`.lang-switch button[onclick="setLanguage('${savedLang}')"]`)
    ?.classList.add('active');
});

const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

if (langBtn && langMenu) {
  langBtn.addEventListener("click", () => {
    langMenu.style.display =
      langMenu.style.display === "block" ? "none" : "block";
  });

  document.addEventListener("click", (e) => {
    if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
      langMenu.style.display = "none";
    }
  })
}
