// Start handle scroll seller brand at dashboard page

function handleResize() {
  const scrollContent = document.getElementById('scrollContent');
  const isDesktop = window.innerWidth >= 1024;

  if (scrollContent.children.length > 7) {
    scrollContent.innerHTML = scrollContent.innerHTML.slice(
      0,
      scrollContent.innerHTML.length / 2
    );
  }

  if (isDesktop && scrollContent.children.length <= 7) {
    const images = scrollContent.innerHTML;
    scrollContent.innerHTML = images + images;
  }
}

document.addEventListener('DOMContentLoaded', handleResize);
window.addEventListener('resize', handleResize);

// End handle scroll seller brand at dashboard page

// Start handle hero effect

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove('opacity-0', '-translate-x-20');
      entry.target.classList.add('opacity-100', 'translate-x-0');
      observer.unobserve(entry.target);
    }
  });
}, options);

const header = document.getElementById('header');
const thumbnail = document.getElementById('thumbnail');

observer.observe(header);
observer.observe(thumbnail);

// End handle hero effect
