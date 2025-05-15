
$(function () {
    $.getJSON('images.json', function (images) {
        const $gal = $('#galeria');
        images.forEach(src => {
            const filename = src.split('/').pop().split('.')[0];
            const $card = $(`
            <div class="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
              <img src="${src}" alt="${filename}" class="w-full h-64 object-cover">
              <div class="p-4">
                <h3 class="text-lg font-bold mb-1">${filename}</h3>
              </div>
            </div>
          `);
            $gal.append($card);
        });
    }).fail(function () {
        $('#galeria').html('<p class="col-span-3 text-center">No se pudieron cargar las imágenes.</p>');
    });
});
