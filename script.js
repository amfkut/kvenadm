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
    { name: 'г. Амурск', address: 'Пионерская, 7', coords: [135.1508, 50.5002] },

    // Комсомольск-на-Амуре
    { name: 'г. Комсомольск-на-Амуре', address: 'Аллея Труда, 52 (17 магазин)', coords: [137.0021, 48.5012] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Аллея Труда, 53 (66 Квартал)', coords: [137.0023, 48.5014] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Аллея Труда, 59 (Сбербанк)', coords: [137.0025, 48.5016] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 10 (База)', coords: [137.0280, 48.5180] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 16 (База)', coords: [137.0285, 48.5185] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 70', coords: [137.0280, 48.5180] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Вокзальная, 95', coords: [137.0285, 48.5185] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Гагарина, 2, к. 2', coords: [137.0300, 48.5195] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Гамарника, 20', coords: [137.0300, 48.5195] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Гамарника, 21/2 (Магистральная)', coords: [137.0302, 48.5197] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Кирова, 26', coords: [137.0112, 48.5055] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Комсомольская, 76', coords: [137.0340, 48.5225] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Культурная, 13', coords: [137.0360, 48.5240] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Лазо, 3 (Удобный)', coords: [137.0460, 48.5315] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 13', coords: [137.0145, 48.5078] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 40', coords: [137.0185, 48.5110] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 41 (Швейная фабрика)', coords: [137.0187, 48.5112] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленина пр-кт, 76', coords: [137.0360, 48.5240] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленинградская, 37 (РИФ)', coords: [137.0480, 48.5330] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Ленинградская, 69', coords: [137.0485, 48.5335] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Магистральное шоссе, 15', coords: [137.0380, 48.5255] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Мира пр-кт, 23 (ЗЛК)', coords: [137.0210, 48.5135] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Мира пр-кт, 33', coords: [137.0400, 48.5270] },
    { name: 'г. Комсомольск-на-Амуре', address: 'мкр Дружба, автобусная остановка (ТЭЦ-3)', coords: [137.0500, 48.5350] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Московский пр-кт,30', coords: [137.0520, 48.5365] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Орехова, 45 (рынок Клюшка)', coords: [137.0540, 48.5380] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Орехова, 50', coords: [137.0542, 48.5382] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Партизанская, 17', coords: [137.0235, 48.5150] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Пермская, 9 (Парус)', coords: [137.0255, 48.5165] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Победы пр-кт, 59а', coords: [137.0560, 48.5395] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Победы, 10', coords: [137.0562, 48.5397] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Радищева, 2 (Проходная)', coords: [137.0580, 48.5410] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Советская, 1 (Металлист)', coords: [137.0600, 48.5425] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Советская, 26', coords: [137.0605, 48.5428] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Юбилейная, 13 (Садовод)', coords: [137.0440, 48.5300] },
    { name: 'г. Комсомольск-на-Амуре', address: 'Юбилейная, 4', coords: [137.0442, 48.5302] },

    // Солнечный
    { name: 'п. Солнечный', address: 'Ленина, 22', coords: [137.0620, 48.5440] },

    // Находка
    { name: 'г. Находка', address: '3-я Промышленная, 3 (Заря)', coords: [132.8650, 42.8250] },
    { name: 'г. Находка', address: 'Бокситогорская, 4', coords: [132.8730, 42.8310] },
    { name: 'г. Находка', address: 'Кирова, 4 (рынок Северный)', coords: [132.8665, 42.8260] },
    { name: 'г. Находка', address: 'Ленинская, 3', coords: [132.8735, 42.8315] },
    { name: 'г. Находка', address: 'Нахимовская, 9', coords: [132.8740, 42.8320] },
    { name: 'г. Находка', address: 'Озерный бульвар, 9/1 (Рынок)', coords: [132.8680, 42.8270] },
    { name: 'г. Находка', address: 'Пограничная, 24А', coords: [132.8745, 42.8325] },
    { name: 'г. Находка', address: 'Постышева, 29', coords: [132.8679, 42.8262] },
    { name: 'г. Находка', address: 'Постышева, 47', coords: [132.8690, 42.8275] },
    { name: 'г. Находка', address: 'Постышева, 8 (Винлаб)', coords: [132.8670, 42.8255] },
    { name: 'г. Находка', address: 'Сидоренко, 1 (Купеческий)', coords: [132.8700, 42.8280] },
    { name: 'г. Находка', address: 'Сидоренко, 8', coords: [132.8705, 42.8285] },
    { name: 'г. Находка', address: 'Советская, 9', coords: [132.8750, 42.8330] },
    { name: 'г. Находка', address: 'Спортивная, 27', coords: [132.8755, 42.8335] },
    { name: 'г. Находка', address: 'Шоссейная, 203А', coords: [132.8710, 42.8290] },
    { name: 'г. Находка', address: 'Энтузиастов б-р, 15 (МЖК)', coords: [132.8715, 42.8295] },

    // Партизанск
    { name: 'г. Партизанск', address: 'Ленинская, 4', coords: [135.0000, 45.0000] },

    // Врангель
    { name: 'п. Врангель', address: 'Восточный пр-кт, 4Б', coords: [135.0000, 45.0000] },
    { name: 'п. Врангель', address: 'Невельского, 3 (рынок Береговой)', coords: [135.0000, 45.0000] },

    // Ливадия
    { name: 'п. Ливадия', address: 'Луговая, 14 (Прага)', coords: [132.8720, 42.8300] },

    // Южно-Морской
    { name: 'п. Южно-Морской', address: 'Победы, 3б', coords: [135.0000, 45.0000] },

    // Арсеньев
    { name: 'г. Арсеньев', address: 'Садовая, 7', coords: [132.2000, 43.9000] },

    // Уссурийск
    { name: 'г. Уссурийск', address: 'Вокзальная площадь, 2 (ЖД Вокзал)', coords: [131.9530, 43.8030] },
    { name: 'г. Уссурийск', address: 'Горького, 41 (рынок Исток)', coords: [131.9540, 43.8040] },
    { name: 'г. Уссурийск', address: 'Горького, 60 (Иверия)', coords: [131.9550, 43.8050] },
    { name: 'г. Уссурийск', address: 'Кузнечная, 14 (рынок Центральный)', coords: [131.9550, 43.8050] },
    { name: 'г. Уссурийск', address: 'Некрасова, 86 (Антарес)', coords: [131.9560, 43.8060] },
    { name: 'г. Уссурийск', address: 'Пролетарская, 100 (рынок Пролетарский)', coords: [131.9570, 43.8070] },

    // Липовцы
    { name: 'пгт. Липовцы', address: 'Ленина, 27 (рынок Липовцы)', coords: [132.3000, 43.9500] },

    // Михайловка
    { name: 'с. Михайловка', address: 'Красноармейская, 24', coords: [132.5000, 44.0500] },

    // Покровка
    { name: 'с. Покровка', address: 'Советов, 88 (рынок Покровка)', coords: [132.6000, 44.1000] },

    // Хабаровск
    { name: 'г. Хабаровск', address: 'Отрадный пер-к, 3А', coords: [135.0010, 48.5010] },
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