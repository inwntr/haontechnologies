const sectionsTitles = [
  { id: 'inicio', title: 'Mirae – Início' },
  { id: 'sobre', title: 'Mirae – Quem Somos' },
  { id: 'servicos', title: 'Mirae – O Que Fazemos' },
  { id: 'como', title: 'Mirae – Como Fazemos' },
  { id: 'contato', title: 'Mirae – Contato' }
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
      observer.unobserve(entry.target); // anima apenas uma vez
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
}, { threshold: 0.5 }); // 50% visível para mudar

sectionsTitles.forEach(s => {
  const sec = document.getElementById(s.id);
  if (sec) observerTitle.observe(sec);
});

// seleciona todos os links do menu
const menuLinks = document.querySelectorAll('nav a');

// função que adiciona 'active' baseado na rolagem
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