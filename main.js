$(function () {
  console.log('🔄 Iniciando carga de images.json...');
  $.getJSON('images.json')
    .done(function (images) {
      console.log('✅ images.json cargado:', images);
      const $gal = $('#galeria');
      if (!images.length) {
        console.warn('⚠️ No hay imágenes en el JSON');
        $gal.html('<p class="col-span-3 text-center text-white">No hay imágenes para mostrar.</p>');
        return;
      }
      images.forEach((src, index) => {
        console.log(`🖼️ Procesando imagen[${index}]: ${src}`);
        const filename = src.split('/').pop().split('.')[0];
        const $card = $(
          `<div class="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
             <img src="${src}" alt="${filename}" class="w-full h-full object-cover">
             <div class="p-4">
               <h3 class="text-lg font-bold mb-1">${filename}</h3>
             </div>
           </div>`
        );
        $card.find('img')
          .on('load', function() { console.log('✅ Imagen cargada correctamente:', src); })
          .on('error', function() { console.error('❌ Error cargando imagen:', src); $(this).attr('alt', 'Imagen no disponible'); });
        $gal.append($card);
      });
    })
    .fail(function (jqxhr, textStatus, error) {
      console.error('🚨 Falló la carga de images.json:', textStatus, error);
      $('#galeria').html('<p class="col-span-3 text-center text-white">No se pudieron cargar las imágenes.</p>');
    });
});