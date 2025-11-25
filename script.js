// script.js

// Плавная прокрутка для якорей
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Обработка формы (имитация отправки)
//document.getElementById('contact-form')?.addEventListener('submit', function(e) {
//  e.preventDefault();
//  alert('Спасибо! Ваше сообщение отправлено.\n(В реальной версии данные ушли бы на сервер.)');
//  this.reset();
//});

// Генерация продуктов (если нужно — можно заменить на статику)
function generateProducts(count = 24) {
  const container = document.getElementById('products-container');
  if (!container) return;

  let html = '';
  for (let i = 1; i <= count; i++) {
    html += `
      <div class="product">
        <div class="product-img">Продукт ${i}</div>
        <h3>Продукт ${i}</h3>
        <p>Высококачественная крабовая палочка. Подходит для салатов, закусок и горячих блюд.</p>
      </div>
    `;
  }
  container.innerHTML = html;
}

// Запуск генерации при загрузке страницы products.html
if (document.getElementById('products-container')) {
  generateProducts(24);
}

// Анимация чисел в блоке "Компания в цифрах"
document.addEventListener('DOMContentLoaded', function () {
  const statNumbers = document.querySelectorAll('.stat-number');

  statNumbers.forEach(el => {
    const target = parseFloat(el.getAttribute('data-value'));
    const format = el.getAttribute('data-format');
    let start = 0;
    const duration = 3500; // 3.5 секунды
    let startTime = null;

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;
      const fraction = Math.min(progress / duration, 1);

      if (format === 'thousand-step') {
        // Анимация от 0 до 3 с шагом 0.5 при отображении
        const rawValue = target * fraction;
        const steppedValue = Math.floor(rawValue * 2) / 2; // шаг 0.5
        el.textContent = (steppedValue === Math.floor(steppedValue) ? steppedValue.toFixed(0) : steppedValue) + ' тыс';
      } else if (el.closest('.stat-card').querySelector('.stat-bold').textContent.includes('Тонн')) {
        // Второй блок: 1.6 тыс
        const value = target * fraction;
        el.textContent = (value / 1000).toFixed(1) + ' тыс';
      } else {
        // Обычные целые числа (26, 2400)
        const value = Math.floor(target * fraction);
        el.textContent = value;
      }

      if (fraction < 1) {
        requestAnimationFrame(animate);
      } else {
        // Финальное значение (чтобы не было 2.999999)
        if (format === 'thousand-step') {
          el.textContent = '3 тыс';
        } else if (el.closest('.stat-card').querySelector('.stat-bold').textContent.includes('Тонн')) {
          el.textContent = '1.6 тыс';
        } else {
          el.textContent = Math.floor(target).toString();
        }
      }
    }

    requestAnimationFrame(animate);
  });
});

// Инициализация карты фирменных отделов
if (document.getElementById('map')) {
  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleGt1dCIsImEiOiJjbWd4cWxpbmYxMmtyMm5xa2x0d3A0bjRwIn0.fxaR7hsYJl1TBMkZvu-UtQ';

  const outletsMap = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [133.3845, 53.0569],
    zoom: 3.5
  });

  const places = [
    // Владивосток
    { name: 'г. Владивосток', address: '100-летия Владивостока пр-кт, 155 (На Заре)', coords: [131.918695, 43.179062] },
    { name: 'г. Владивосток', address: 'Карьерная, 18а', coords: [131.966944, 43.147084] },
    { name: 'г. Владивосток', address: 'Кузнецова, 48А', coords: [131.951753, 43.123255] },
    { name: 'г. Владивосток', address: 'Луговая, 85В (Баляева)', coords: [131.939312, 43.127380] },
    { name: 'г. Владивосток', address: 'Народный проспект, 9/1', coords: [131.924669, 43.122972] },
    { name: 'г. Владивосток', address: 'о.Русский, п.Аякс, 10, пав. 21', coords: [131.886293, 43.030680] },
    { name: 'г. Владивосток', address: 'Окатовая, 12', coords: [131.919459, 43.099068] },
    { name: 'г. Владивосток', address: 'Русская, 66а', coords: [131.921750, 43.168569] },
    { name: 'г. Владивосток', address: 'Терешковой, 26б', coords: [131.916971, 43.093228] },

    // Амурск
    { name: 'г. Амурск', address: 'Пионерская, 7', coords: [136.892461, 50.217091] },

    // Комсомольск-на-Амуре
    { name: 'г. Комсомольск-на-Амуре', address: 'Аллея Труда, 52 (17 магазин)', coords: [137.006286, 50.533723] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Аллея Труда, 53 (66 Квартал)', coords: [137.006187, 50.532750] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Аллея Труда, 59 (Сбербанк)', coords: [137.000456, 50.529308] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 10 (База)', coords: [137.004930, 50.556098] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 16 (База)', coords: [137.012017, 50.561220] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 70', coords: [136.975806, 50.544846] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 95', coords: [136.966500, 50.544102] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Гагарина, 2, к. 2', coords: [137.005540, 50.525060] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Гамарника, 20', coords: [136.977594, 50.546701] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Гамарника, 21/2 (Магистральная)', coords: [136.976345, 50.549385] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Кирова, 26', coords: [137.031286, 50.542682] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Комсомольская, 76', coords: [136.996575, 50.537444] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Культурная, 13', coords: [137.043494, 50.600183] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Лазо, 3 (Удобный)', coords: [137.067237, 50.593590] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 13', coords: [137.013571, 50.552842] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 40', coords: [137.004130, 50.548109] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 41 (Швейная фабрика)', coords: [136.994967, 50.542184] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 76', coords: [136.969536, 50.541205] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленинградская, 37 (РИФ)', coords: [137.064641, 50.582679] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленинградская, 69', coords: [137.063913, 50.593630] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Магистральное шоссе, 15', coords: [136.984349, 50.549935] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Мира пр-кт, 23 (ЗЛК)', coords: [137.022267, 50.541589] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Мира пр-кт, 33', coords: [137.019186, 50.545894] },
    { name: 'г. Комсомольск-на-Амуре', address: 'мкр Дружба, автобусная остановка (ТЭЦ-3)', coords: [136.965490, 50.604848] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Московский пр-кт,30', coords: [137.053546, 50.590411] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Орехова, 45 (рынок Клюшка)', coords: [137.061470, 50.590268] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Орехова, 50', coords: [137.062242, 50.589519] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Партизанская, 17', coords: [137.017281, 50.553609] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Пермская, 9 (Парус)', coords: [137.052594, 50.560173] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Победы пр-кт, 59а', coords: [137.058227, 50.589439] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Победы, 10', coords: [137.059924, 50.580574] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Радищева, 2 (Проходная)', coords: [137.063958, 50.609924] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Советская, 1 (Металлист)', coords: [137.079445, 50.585824] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Советская, 26', coords: [137.057274, 50.584171] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Юбилейная, 13 (Садовод)', coords: [136.958586, 50.547279] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Юбилейная, 4', coords: [136.961460, 50.548246] },

    // Солнечный
    { name: 'п. Солнечный', address: 'Ленина, 22', coords: [136.642405, 50.727432] },

    // Находка
    { name: 'г. Находка', address: '3-я Промышленная, 3 (Заря)', coords: [132.965592, 42.860322] },
    { name: 'г. Находка', address: 'Бокситогорская, 4', coords: [132.849090, 42.776699] },
    { name: 'г. Находка', address: 'Кирова, 4 (рынок Северный)', coords: [132.957543, 42.853905] },
    { name: 'г. Находка', address: 'Ленинская, 3', coords: [132.870622, 42.810043] },
    { name: 'г. Находка', address: 'Нахимовская, 9', coords: [132.870694, 42.804229] },
    { name: 'г. Находка', address: 'Озерный бульвар, 9/1 (Рынок)', coords: [132.891122, 42.836976] },
    { name: 'г. Находка', address: 'Пограничная, 24А', coords: [132.881294, 42.820684] },
    { name: 'г. Находка', address: 'Постышева, 29', coords: [132.895344, 42.836434] },
    { name: 'г. Находка', address: 'Постышева, 47', coords: [132.887277, 42.838781] },
    { name: 'г. Находка', address: 'Постышева, 8 (Винлаб)', coords: [132.897985, 42.836004] },
    { name: 'г. Находка', address: 'Сидоренко, 1 (Купеческий)', coords: [132.889595, 42.848108] },
    { name: 'г. Находка', address: 'Сидоренко, 8', coords: [132.894769, 42.849067] },
    { name: 'г. Находка', address: 'Советская, 9', coords: [132.877063, 42.825386] },
    { name: 'г. Находка', address: 'Спортивная, 27', coords: [132.853761, 42.775263] },
    { name: 'г. Находка', address: 'Шоссейная, 203А', coords: [132.965296, 42.849853] },
    { name: 'г. Находка', address: 'Энтузиастов б-р, 15 (МЖК)', coords: [132.881618, 42.839171] },

    // Партизанск
    { name: 'г. Партизанск', address: 'Ленинская, 4', coords: [133.117506, 43.115516] },

    // Врангель
    { name: 'п. Врангель', address: 'Восточный пр-кт, 4Б', coords: [133.056726, 42.772245] },
    { name: 'п. Врангель', address: 'Невельского, 3 (рынок Береговой)', coords: [133.054534, 42.772252] },

    // Ливадия
    { name: 'п. Ливадия', address: 'Луговая, 14 (Прага)', coords: [132.670918, 42.870181] },

    // Южно-Морской
    { name: 'п. Южно-Морской', address: 'Победы, 3б', coords: [132.688866, 42.859899] },

    // Арсеньев
    { name: 'г. Арсеньев', address: 'Садовая, 7', coords: [133.268306, 44.157609] },

    // Уссурийск
    { name: 'г. Уссурийск', address: 'Вокзальная площадь, 2 (ЖД Вокзал)', coords: [131.979224, 43.800676] },
    { name: 'г. Уссурийск', address: 'Горького, 41 (рынок Исток)', coords: [131.943264, 43.795861] },
    { name: 'г. Уссурийск', address: 'Горького, 60 (Иверия)', coords: [131.942662, 43.805874] },
    { name: 'г. Уссурийск', address: 'Кузнечная, 14 (рынок Центральный)', coords: [131.963099, 43.791813] },
    { name: 'г. Уссурийск', address: 'Некрасова, 86 (Антарес)', coords: [131.951044, 43.802062] },
    { name: 'г. Уссурийск', address: 'Пролетарская, 100 (рынок Пролетарский)', coords: [131.955329, 43.802660] },

    // Липовцы
    { name: 'пгт. Липовцы', address: 'Ленина, 27 (рынок Липовцы)', coords: [131.722638, 44.200024] },

    // Михайловка
    { name: 'с. Михайловка', address: 'Красноармейская, 24', coords: [132.005356, 43.925927] },

    // Покровка
    { name: 'с. Покровка', address: 'Советов, 88 (рынок Покровка)', coords: [131.630408, 43.949179] },

    // Хабаровск
    { name: 'г. Хабаровск', address: 'Отрадный пер-к, 3А', coords: [135.038886, 48.364974] },
  ];

  function initOutletsMap() {
    const listContainer = document.getElementById('places-list');
    const markers = [];

    for (const place of places) {
      const coords = place.coords;
      const yandexLink = `https://yandex.ru/maps/?rtext=0%2C0~${coords[1]},${coords[0]}&rtt=auto`;

      const popupHtml = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 250px;">
          <h3 style="margin: 0 0 8px; color: #e63946; font-size: 16px;">${place.name}</h3>
          <p style="margin: 0 0 6px; font-size: 14px;">${place.address}</p>
          <a href="${yandexLink}" target="_blank" style="display: inline-block; margin-top: 8px; padding: 4px 8px; font-size: 13px; color: #e63946; border: 1px solid #e63946; border-radius: 4px; text-decoration: none; transition: all 0.2s;">Проложить маршрут</a>
        </div>
      `;
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHtml);
      const marker = new mapboxgl.Marker({ color: '#e63946' })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(outletsMap);

      const item = document.createElement('div');
      item.className = 'place';
      item.innerHTML = `
        <h3>${place.name}</h3>
        <p>${place.address}</p>
        <a href="${yandexLink}" target="_blank" class="place-btn">Проложить маршрут</a>
      `;
      listContainer.appendChild(item);

      markers.push({ place, marker, popup, coords, item });

      item.addEventListener('click', () => {
        document.querySelectorAll('.place').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        outletsMap.flyTo({ center: coords, zoom: 13, essential: true });
        popup.addTo(outletsMap);
      });

      marker.getElement().addEventListener('click', () => {
        document.querySelectorAll('.place').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      });
    }

    if (markers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(m => bounds.extend(m.coords));
      outletsMap.fitBounds(bounds, { padding: { top: 80, bottom: 80, left: 320, right: 40 }, linear: true });
    }
  }

  outletsMap.on('load', initOutletsMap);
}