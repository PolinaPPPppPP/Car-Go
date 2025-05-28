document.addEventListener('DOMContentLoaded', function() {
    // Получаем текущий URL и разбиваем на части
    const path = window.location.pathname;
    const parts = path.split('/').filter(part => part !== '');
    
    // Создаем массив для хранения элементов крошек
    const breadcrumbs = [];
    
    // Добавляем главную страницу
    breadcrumbs.push({
        name: 'Главная',
        url: '/'
    });
    
    // Формируем промежуточные элементы
    let accumulatedPath = '';
    parts.forEach((part, index) => {
        // Пропускаем index.html если есть
        if(part === 'index.html') return;
        
        // Формируем путь
        accumulatedPath += `/${part}`;
        
        // Преобразуем part в читаемое название
        const name = getBreadcrumbName(part, index, parts);
        
        // Последний элемент не будет ссылкой
        const isLast = index === parts.length - 1;
        
        breadcrumbs.push({
            name: name,
            url: isLast ? null : accumulatedPath,
            isLast: isLast
        });
    });
    
    // Рендерим хлебные крошки
    renderBreadcrumbs(breadcrumbs);
});

function getBreadcrumbName(part, index, allParts) {
    // Убираем расширения файлов
    part = part.replace('.html', '');
    
    // Специальные преобразования для разных страниц
    const nameMap = {
        'catalog': 'Каталог',
        'women': 'Женщинам',
        'men': 'Мужчинам',
        'fur-coats': 'Шубы',
        'about': 'О компании',
        'cart': 'Корзина',
        'favorites': 'Избранное'
    };
    
    // Преобразуем часть URL в читаемое название
    if(nameMap[part]) {
        return nameMap[part];
    }
    
    // Или преобразуем первую букву в заглавную
    return part.charAt(0).toUpperCase() + part.slice(1);
}

function renderBreadcrumbs(breadcrumbs) {
    const container = document.getElementById('breadcrumbs');
    if(!container) return;
    
    const list = document.createElement('ul');
    list.classList.add('breadcrumbs-list');
    
    breadcrumbs.forEach((crumb, index) => {
        const li = document.createElement('li');
        
        if(!crumb.isLast && crumb.url) {
            const a = document.createElement('a');
            a.href = crumb.url;
            a.textContent = crumb.name;
            li.appendChild(a);
        } else {
            li.textContent = crumb.name;
            li.classList.add('current');
        }
        
        list.appendChild(li);
        
        // Добавляем разделитель, если не последний элемент
        if(index < breadcrumbs.length - 1) {
            const separator = document.createElement('li');
            separator.innerHTML = '<i class="fas fa-chevron-right"></i>';
            separator.classList.add('separator');
            list.appendChild(separator);
        }
    });
    
    container.appendChild(list);
}