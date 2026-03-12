const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target || 0);
      const duration = 1300;
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        el.textContent = Math.floor(progress * target);

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = `${target}+`;
        }
      };

      requestAnimationFrame(updateCounter);
      observer.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const moduleData = [
  {
    title: 'Control operativo',
    text: 'Organiza los domicilios desde un tablero central para responder más rápido y mantener una operación ordenada.',
    list: ['Asignación de domiciliarios', 'Estados en vivo', 'Alertas de seguimiento']
  },
  {
    title: 'Trazabilidad de entregas',
    text: 'Registra cada paso del servicio para que la empresa vea cuándo se recogió y cuándo se entregó el pedido.',
    list: ['Confirmación de recogida', 'Confirmación de entrega', 'Historial por domicilio']
  },
  {
    title: 'Geolocalización de tiendas',
    text: 'Permite registrar sedes en mapa para que los nuevos domiciliarios abran la ruta y lleguen al punto con facilidad.',
    list: ['Pines por tienda', 'Botón de cómo llegar', 'Cobertura por zona']
  },
  {
    title: 'Cartera y liquidación',
    text: 'Ayuda a controlar pagos semanales, saldos pendientes y bloqueos automáticos cuando existe mora.',
    list: ['Cierre semanal', 'Historial de pagos', 'Bloqueo por deuda']
  }
];

const moduleCards = document.querySelectorAll('.module-card');
const moduleTitle = document.getElementById('moduleTitle');
const moduleText = document.getElementById('moduleText');
const moduleList = document.getElementById('moduleList');

const renderModule = (index) => {
  const module = moduleData[index];
  if (!module || !moduleTitle || !moduleText || !moduleList) return;

  moduleTitle.textContent = module.title;
  moduleText.textContent = module.text;
  moduleList.innerHTML = module.list.map((item) => `<li>${item}</li>`).join('');

  moduleCards.forEach((card) => card.classList.remove('active'));
  moduleCards[index]?.classList.add('active');
};

moduleCards.forEach((card) => {
  card.addEventListener('click', () => {
    renderModule(Number(card.dataset.module));
  });
});

renderModule(0);
