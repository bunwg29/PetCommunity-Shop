// Upload Image

document.getElementById('thumbnail').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const uploadContainer = document.querySelector('.flex.items-center.justify-center.w-full.h-64.border-2.border-gray-300.border-dashed.rounded-lg.cursor-pointer');

      uploadContainer.innerHTML = '';
      
      const imgPreview = document.createElement('img');
      imgPreview.classList.add('w-full', 'h-full', 'object-cover', 'rounded-lg');
      imgPreview.src = e.target.result;

      uploadContainer.appendChild(imgPreview);
    };
    
    reader.readAsDataURL(file);
  }
});

// End Upload Image