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

    kr: {
      termos: `
      <h2>서비스 약관</h2>
      <p>하온 테크놀로지스가 제공하는 서비스를 이용함으로써 고객은 각 프로젝트가 당사자 간에 사전에 합의된 범위, 기한 및 조건에 따라 개발된다는 데 동의합니다.</p>
      <p>하온 테크놀로지스가 제공하는 모든 자료, 디자인, 시스템, 코드 및 디지털 자산은 지적 재산권으로 보호되며 사전 허가 없이 복제, 재판매, 수정 또는 재배포할 수 없습니다.</p>
      <p>하온 테크놀로지스는 프로젝트의 모든 단계에서 전문적인 실행, 명확한 커뮤니케이션 및 책임 있는 배포를 지키기로 약속합니다.</p>
    `,

      privacidade: `
      <h2>개인정보 보호정책</h2>
      <p>하온 테크놀로지스는 고객의 개인정보를 존중합니다. 연락 채널, 양식, 이메일 또는 프로젝트 커뮤니케이션을 통해 수집된 정보는 서비스 실행, 지원, 상업적 커뮤니케이션 및 내부 개선을 위해만 사용됩니다.</p>
      <p>개인 정보는 동의 없이 판매, 공유 또는 노출되지 않으며, 법적 요구 또는 계약된 서비스 실행에 필수적인 경우에만 제공됩니다.</p>
      <p>합리적인 기술적 및 관리적 조치가 적용되어 정보가 무단 접근, 손실, 부정 사용 또는 불충분한 공개로부터 보호됩니다.</p>
    `,

      contrato: `
      <h2>계약 조건</h2>
      <p>하온 테크놀로지스가 개발한 프로젝트는 정해진 범위, 합의된 기간 및 책임을 기준으로 진행됩니다.</p>
      <p>두 당사자는 투명한 커뮤니케이션을 유지하고, 각 단계에서 필요한 정보를 제공하며, 계획, 개발, 검토 및 배포 단계에서 협력해야 합니다.</p>
      <p>최종 조건, 결제 조건, 유지보수, 검토, 사용 권리 및 배포 책임은 각 프로젝트에 따라 달라질 수 있으며, 실행 전에 공식적으로 합의되어야 합니다.</p>
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
    return localStorage.getItem("lang") || "en" || "pt" || "kr";
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
    hero_text: "Technology that reduces noise and transforms operation into clarity.",
    learn_more: "Learn More",

    about_title: "About Us",
    about_text: "We are a team focused on building digital systems, websites, and technical solutions with attention to performance, clarity, and consistency. We work collaboratively to transform ideas into functional digital products.",

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
    hero_text: "Tecnologia que reduz ruído e transforma operação em clareza.",
    learn_more: "Saiba mais",

    about_title: "Sobre Nós",
    about_text: "Somos uma equipe focada em construir sistemas digitais, websites e soluções técnicas com atenção a desempenho, clareza e consistência. Trabalhamos de forma colaborativa para transformar ideias em produtos digitais funcionais.",

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
  },

  kr: {
    nav_home: "시작",
    nav_about: "소개",
    nav_services: "서비스",
    nav_how: "작업 방식",
    nav_portfolio: "프로젝트",

    hero_title: "정확성, 성능 및 명확성을 갖춘 디지털 시스템.",
    hero_text: "소음을 줄이고 운영을 명확하게 전환하는 기술.",
    learn_more: "자세히 알아보기",

    about_title: "소개",
    about_text: "우리는 성능, 명확성 및 일관성에 중점을 두고 디지털 시스템, 웹사이트 및 기술 솔루션을 구축하는 데 집중하는 팀입니다. 우리는 아이디어를 기능적인 디지털 제품으로 전환하기 위해 협력적으로 작업합니다.",

    services_title: "우리가 하는 일",

    service_design: "인터페이스 및 브랜드 디자인",
    service_design_desc: "명확성, 일관성 및 사용자 경험을 위해 설계된 디지털 인터페이스 및 시각적 시스템.",

    service_web: "웹사이트 및 디지털 플랫폼",
    service_web_desc: "성능, 확장성 및 현대 비즈니스 요구 사항을 위해 구축된 반응형 웹사이트 및 디지털 플랫폼.",

    service_discord: "자동화 및 맞춤형 시스템",
    service_discord_desc: "워크플로우 및 디지털 커뮤니티를 최적화하기 위해 구축된 맞춤형 자동화 도구 및 운영 시스템.",

    how_title: "작업 방식",
    how_text: "모든 프로젝트는 전략, 실행 및 전달을 중심으로 구축된 구조화된 프로세스를 따릅니다. 이를 통해 기술적 명확성, 효율적인 개발 및 신뢰할 수 있는 결과를 보장합니다.",

    portfolio_title: "선택된 프로젝트",
    portfolio_text: "우리의 웹사이트, 시스템, 자동화 및 디지털 실행에서의 활동을 보여주는 프로젝트들의 선택적 집합.",
    view_full_portfolio: "모든 프로젝트 보기",

    portfolio_archive_title: "프로젝트 아카이브",
    portfolio_archive_text: "웹 시스템, 디지털 플랫폼, 자동화 및 인터페이스 디자인에서 개발된 선택된 프로젝트들의 완전한 아카이브.",

    filter_all: "모두",
    filter_technical: "기술적",

    sales_support: "영업",
    technical_support: "기술 지원",
    project_support: "프로젝트",

    legal_title: "법적",
    legal_terms: "서비스 약관",
    legal_privacy: "개인정보 처리방침",
    legal_contract: "계약 조건",

    footer_rights: "모든 권리 보유.",
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
  const browserLang = navigator.language.startsWith("pt") ? "pt" : navigator.language.startsWith("kr") ? "ko" : "en";
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
