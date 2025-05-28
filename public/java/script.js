document.addEventListener('DOMContentLoaded', function() {
    // Инициализация фильтров
    const priceInputs = document.querySelectorAll('.price-inputs input');
    
    priceInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            // Форматирование ввода цены
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                value = parseInt(value).toLocaleString('ru-RU');
            }
            e.target.value = value;
        });
    });

    // Обработка клика по кнопке "Показать"
    const applyButton = document.querySelector('.apply-filters');
    if (applyButton) {
        applyButton.addEventListener('click', function() {
            // Здесь будет логика применения фильтров
            console.log('Фильтры применены');
            // В реальном проекте здесь будет AJAX-запрос или фильтрация товаров
        });
    }

    // Обработка добавления в корзину
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            console.log(`Добавлено в корзину: ${productName} за ${productPrice}`);
            // В реальном проекте здесь будет логика добавления в корзину
        });
    });
});