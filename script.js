const sectionsTitles = [
  { id: 'inicio', title: 'Mirae – Início' },
  { id: 'sobre', title: 'Mirae – Quem Somos' },
  { id: 'servicos', title: 'Mirae – O Que Fazemos' },
  { id: 'como', title: 'Mirae – Como Fazemos' },
  { id: 'contato', title: 'Mirae – Contato' },
  { id: 'portfolio', title: 'Mirae – Portfólio' }
];

// ------------------------------
// MUDAR HEADER AO ROLAR
// ------------------------------
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ------------------------------
// ANIMAÇÃO DAS SEÇÕES
// ------------------------------
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

const logo = document.querySelector('#logo-img ')
logo.addEventListener('click', () => {
  window.location.href = '/'
})

document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("portfolioGrid");
  const filtros = document.querySelectorAll(".filtro");

  try {
    const res = await fetch("projetos.json");
    const projetos = await res.json();

    function renderizar(categoria = "todos") {
      grid.innerHTML = "";
      const filtrados =
        categoria === "todos"
          ? projetos
          : projetos.filter(p => p.categoria === categoria);

      filtrados.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("projeto-card");
        card.innerHTML = `
          <img src="${p.imagem}" alt="${p.titulo}">
          <div class="projeto-info">
            <h3>${p.titulo}</h3>
            <p>${p.descricao}</p>
            <a href="${p.link}" target="_blank">Ver Projeto ↗</a>
          </div>
        `;
        grid.appendChild(card);
      });
    }

    renderizar();

    filtros.forEach(btn => {
      btn.addEventListener("click", () => {
        filtros.forEach(f => f.classList.remove("ativo"));
        btn.classList.add("ativo");
        renderizar(btn.dataset.cat);
      });
    });
  } catch (err) {
    grid.innerHTML = "<p>Erro ao carregar portfólio 😢</p>";
  }
});

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.querySelector(".close");

const conteudo = {
  termos: `
      <h2>Termos de Serviço</h2>
      <p>Ao utilizar os serviços da <strong>Mirae Tecnologia</strong>, você concorda com nossos termos de uso e condições. 
      Todos os projetos são cuidadosamente planejados, executados dentro de cronogramas definidos e respeitando o escopo acordado com o cliente, garantindo qualidade, eficiência e resultados mensuráveis.</p>
      <p>O uso indevido de qualquer material, software, design ou conteúdo fornecido pela Mirae é estritamente proibido e está sujeito às leis de direitos autorais e propriedade intelectual vigentes, incluindo possíveis penalidades legais.</p>
      <p>Nosso compromisso é fornecer serviços de excelência, mantendo transparência, segurança e responsabilidade em todas as etapas do projeto.</p>
    `,
  privacidade: `
      <h2>Política de Privacidade</h2>
      <p>A <strong>Mirae Tecnologia</strong> valoriza sua privacidade e protege rigorosamente todos os dados coletados através de formulários, e-mails ou qualquer canal de contato. Essas informações são utilizadas exclusivamente para fins comerciais, de suporte, comunicação direta e melhoria contínua dos nossos serviços.</p>
      <p>Não compartilhamos dados pessoais com terceiros sem autorização expressa do usuário, exceto quando exigido por lei ou para garantir a execução adequada dos serviços contratados.</p>
      <p>Adotamos medidas técnicas e administrativas para proteger suas informações contra acesso não autorizado, perda, alteração ou divulgação indevida, garantindo que cada interação com a Mirae seja segura e confiável.</p>
    `,
  contrato: `
      <h2>Cláusulas Contratuais</h2>
      <p>Todos os contratos firmados com a <strong>Mirae Tecnologia</strong> seguem padrões técnicos, legais e éticos, assegurando a segurança, confidencialidade e integridade de todas as informações compartilhadas durante o desenvolvimento dos projetos.</p>
      <p>As partes envolvidas comprometem-se a manter comunicação clara, colaboração ativa e transparência em todas as fases do projeto, desde o planejamento até a entrega final, garantindo que expectativas e prazos sejam atendidos com excelência.</p>
      <p>O contrato define responsabilidades, direitos e deveres de cada parte, garantindo que todas as soluções fornecidas sejam entregues de forma profissional, segura e alinhadas com os mais altos padrões de qualidade.</p>
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

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};