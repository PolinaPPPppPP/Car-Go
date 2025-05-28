// Функции для управления горизонтальной каруселью
function scrollCarousel(direction) {
    const carousel = document.querySelector('.products-carousel');
    const scrollAmount = carousel.clientWidth * 0.8 * direction;
    
    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Инициализация карусели
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.products-carousel');
    
    // Показывать/скрывать кнопки навигации при скролле
    carousel.addEventListener('scroll', function() {
        const prevBtn = document.querySelector('.carousel-btn.prev');
        const nextBtn = document.querySelector('.carousel-btn.next');
        
        prevBtn.style.display = carousel.scrollLeft > 0 ? 'flex' : 'none';
        nextBtn.style.display = carousel.scrollLeft < (carousel.scrollWidth - carousel.clientWidth) ? 'flex' : 'none';
    });
    
    // Инициализация видимости кнопок
    const prevBtn = document.querySelector('.carousel-btn.prev');
    prevBtn.style.display = 'none';
    
    // Если контент не помещается - показать кнопку next
    if (carousel.scrollWidth > carousel.clientWidth) {
        document.querySelector('.carousel-btn.next').style.display = 'flex';
    }
});
    // Выбор цвета
    document.querySelectorAll('.color-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
        });
    });

    // Отправка формы отзыва
    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const rating = document.querySelector('.rating-select span.active')?.dataset.rating || 0;
        const text = document.getElementById('reviewText').value;
        
        // Здесь должна быть логика отправки отзыва
        console.log('Отзыв отправлен:', { name, rating, text });
        
        closeModal('reviewModal');
        alert('Спасибо за ваш отзыв! После модерации он будет опубликован.');
        this.reset();
    });
// Функции для работы с модальными окнами
function openReviewForm() {
    document.getElementById('reviewModal').style.display = 'block';
}

function openImageModal() {
    document.getElementById('imageModal').style.display = 'block';
    updateModalImage(document.getElementById('main-product-image').src);
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Установка рейтинга
function setRating(rating) {
    const stars = document.querySelectorAll('.rating-select span');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
            star.textContent = '★';
        } else {
            star.classList.remove('active');
            star.textContent = '☆';
        }
        star.dataset.rating = index + 1;
    });
}

// Работа с галереей изображений
const images = [
    '/public/img/products/men-sheep-(1).jpg',
    '/public/img/products/men-sheep-(2).jpg',
    '/public/img/products/men-sheep-(3).jpg',
    '/public/img/products/men-sheep-(4).jpg'
];

let currentImageIndex = 0;

function changeMainImage(src) {
    document.getElementById('main-product-image').src = src;
    document.querySelectorAll('.thumbnail').forEach(thumb => {
        thumb.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Обновляем индекс текущего изображения
    currentImageIndex = images.indexOf(src);
}

function updateModalImage(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('currentImage').textContent = currentImageIndex + 1;
    document.getElementById('totalImages').textContent = images.length;
}

function navigateImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    
    const newSrc = images[currentImageIndex];
    document.getElementById('modalImage').src = newSrc;
    document.getElementById('main-product-image').src = newSrc;
    document.getElementById('currentImage').textContent = currentImageIndex + 1;
    
    // Обновляем активную миниатюру
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Открытие модального окна
document.querySelector('.size-table-btn').addEventListener('click', function() {
    document.querySelector('.size-table-modal').style.display = 'block';
  });
  
  // Закрытие модального окна
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.querySelector('.size-table-modal').style.display = 'none';
  });
  
  // Закрытие при клике вне изображения
  window.addEventListener('click', function(event) {
    if (event.target === document.querySelector('.size-table-modal')) {
      document.querySelector('.size-table-modal').style.display = 'none';
    }
  });
  document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.similar-products-grid');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const products = document.querySelectorAll('.similar-product');
    
    let currentIndex = 0;
    const productWidth = products[0].offsetWidth + 20; // width + gap
    
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * productWidth}px)`;
        
        // Скрываем/показываем кнопки в зависимости от позиции
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'flex';
        nextBtn.style.display = currentIndex >= products.length - 3 ? 'none' : 'flex';
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentIndex < products.length - 3) {
            currentIndex++;
            updateCarousel();
        }
    });
    
    // Инициализация
    updateCarousel();
    
    // Адаптация при изменении размера окна
    window.addEventListener('resize', function() {
        productWidth = products[0].offsetWidth + 20;
        updateCarousel();
    });
});
/**
 * Функция для автоматической подгонки изображений
 * @param {string} containerSelector - CSS-селектор контейнера
 * @param {string} imgSelector - CSS-селектор изображения
 */
function autoResizeImages(containerSelector = '.product-image-container', 
    imgSelector = '.product-image') {

// Находим все контейнеры на странице
const containers = document.querySelectorAll(containerSelector);

containers.forEach(container => {
const img = container.querySelector(imgSelector);

if (!img) return;

// Ждем загрузки изображения
if (!img.complete) {
img.addEventListener('load', function() {
resizeImage(container, img);
});
} else {
resizeImage(container, img);
}
});

/**
* Основная функция подгонки
*/
function resizeImage(container, img) {
// Получаем размеры
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;
const imgNaturalWidth = img.naturalWidth;
const imgNaturalHeight = img.naturalHeight;

// Вычисляем соотношения сторон
const containerRatio = containerWidth / containerHeight;
const imgRatio = imgNaturalWidth / imgNaturalHeight;

// Выбираем стратегию подгонки
if (imgRatio > containerRatio) {
// Горизонтальное изображение
img.style.width = '100%';
img.style.height = 'auto';
img.style.maxHeight = 'none';
} else {
// Вертикальное изображение
img.style.width = 'auto';
img.style.height = '100%';
img.style.maxWidth = 'none';
}

// Центрируем изображение
img.style.position = 'absolute';
img.style.top = '50%';
img.style.left = '50%';
img.style.transform = 'translate(-50%, -50%)';
}
}

// Запускаем при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
autoResizeImages();
});

// И при изменении размера окна
window.addEventListener('resize', function() {
autoResizeImages();
});