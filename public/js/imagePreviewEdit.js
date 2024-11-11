// Start upload Image at edit info user

document
  .getElementById('thumbnail')
  .addEventListener('change', function (event) {
    console.log('File input changed')
    const file = event.target.files[0]

    if (file) {
      console.log('File selected: ', file)
      const reader = new FileReader()

      reader.onload = function (e) {
        console.log('File read successfully')
        const uploadContainer = document.querySelector('.avt_image')

        uploadContainer.src = e.target.result

        const imgPreview = document.createElement('img')
        imgPreview.classList.add(
          'w-[141px]',
          'h-[141px]',
          'bg-blue-300/20',
          'rounded-full',
          'border-2'
        )
        imgPreview.src = e.target.result

        uploadContainer.appendChild(imgPreview)
      }

      reader.readAsDataURL(file)
    }
  })

// End upload Image at edit info user
