// Script jQuery para cargar imágenes y manejar lightbox
$(function () {
  console.log('🔄 Iniciando carga de images.json...');
  $.getJSON('images.json')
    .done(function (images) {
      console.log('✅ images.json cargado:', images);
      const $gal = $('#galeria');
      if (!images.length) {
        console.warn('⚠️ No hay imágenes en el JSON');
        $gal.html('<p class="text-center text-white">No hay imágenes para mostrar.</p>');
        return;
      }
      images.forEach((src, index) => {
        console.log(`🖼️ Procesando imagen[${index}]: ${src}`);
        const filename = src.split('/').pop().split('.')[0];
        const $card = $(
          `<div class="mb-4 break-inside-avoid bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
                   <img src="${src}" alt="${filename}" class="w-full h-auto object-cover">
                 </div>`
        );
        $card.find('img')
          .on('load', function () { console.log('✅ Imagen cargada:', src); })
          .on('error', function () { console.error('❌ Error cargando imagen:', src); });
        // Lightbox on click
        $card.on('click', function () {
          $('#lightbox-img').attr('src', src);
          $('#lightbox').addClass('opacity-100 pointer-events-auto');
        });
        $gal.append($card);
      });
    })
    .fail(function (jqxhr, textStatus, error) {
      console.error('🚨 Falló la carga de images.json:', textStatus, error);
      $('#galeria').html('<p class="text-center text-white">No se pudieron cargar las imágenes.</p>');
    });
  // Cerrar lightbox al clic
  $('#lightbox').on('click', function () {
    $(this).removeClass('opacity-100 pointer-events-auto');
  });
});