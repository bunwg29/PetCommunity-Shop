function handleResize() {
    const scrollContent = document.getElementById('scrollContent');
    const isDesktop = window.innerWidth >= 1024;
    
    if (scrollContent.children.length > 7) {
      scrollContent.innerHTML = scrollContent.innerHTML.slice(0, scrollContent.innerHTML.length / 2);
    }
    
    if (isDesktop && scrollContent.children.length <= 7) {
      const images = scrollContent.innerHTML;
      scrollContent.innerHTML = images + images;
    }
  }
  
  document.addEventListener('DOMContentLoaded', handleResize);
  window.addEventListener('resize', handleResize);