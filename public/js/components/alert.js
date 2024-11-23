const alertBox = document.getElementById('alert-border-1');

if (alertBox) {
  alertBox.style.display = 'flex';
  setTimeout(() => {
    alertBox.classList.remove('opacity-0');
    alertBox.classList.add('opacity-100');
  }, 0);

  setTimeout(() => {
    alertBox.classList.remove('opacity-100');
    alertBox.classList.add('opacity-0');
  }, 5000);

  alertBox.classList.remove('scale-95');
  alertBox.classList.add('scale-100');
}
