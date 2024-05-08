// Функция для загрузки XML через XMLHttpRequest
function loadXMLDoc(filename, callback) {
    var xhttp = new XMLHttpRequest();
    var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content'); // Получаем CSRF токен

    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            callback(this);
        }
    };

    xhttp.open("GET", filename, true);
    xhttp.setRequestHeader('X-CSRF-TOKEN', csrfToken);
    xhttp.send();
}

// Функция для заполнения каталога товарами из XML
function fillCatalog(xml) {
    var xmlDoc = xml.responseXML;
    var items = xmlDoc.getElementsByTagName("item");
    var catalogList = document.querySelector(".catalog__list");

    for (var i = 0; i < items.length; i++) {
        if(items[i].getElementsByTagName("photo")[0] && items[i].getElementsByTagName("title")[0] &&
           items[i].getElementsByTagName("description")[0] && items[i].getElementsByTagName("price")[0]) {
            var photo = items[i].getElementsByTagName("photo")[0].childNodes[0].nodeValue;
            var title = items[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
            var description = items[i].getElementsByTagName("description")[0].childNodes[0].nodeValue;
            var price = items[i].getElementsByTagName("price")[0].childNodes[0].nodeValue;

            var li = document.createElement("li");
            li.className = "catalog__item";

            li.innerHTML =
                `<img src="${photo}" alt="${title}" class="catalog__item-pic">
                <h2 class="catalog__item-title">${title}</h2>
                <p class="catalog__item-text">${description}</p>
                <p class="catalog__item-price">${price}</p>
                <button class="catalog__item-btn">
                    <a href="#" class="modal__open">Заказать</a>
                </button>`;

            catalogList.appendChild(li);
        }
    }
    var firstItem = catalogList.querySelector("li:first-child");
    if (firstItem) {
        catalogList.removeChild(firstItem);
    }
}

// Загружаем XML и заполняем каталог после загрузки страницы
document.addEventListener("DOMContentLoaded", function() {
    loadXMLDoc("catalog.xml", fillCatalog);
});

// Вешает событие на бургер меню. При нажатии на бургер меню открывается/закрывается меню
document.addEventListener('DOMContentLoaded', function () {
   var burger = document.querySelector('.burger');
   var menu = document.querySelector('.burger_menu');

   burger.addEventListener('click', function () {
     burger.classList.toggle('active');
     menu.classList.toggle('open');
   });
});

// Modal window

    // Modal window
    const modal = document.querySelector('.modal__window');
    const closeButton = document.querySelector('.close-btn');

function openModal(item) {
    console.log(item)
    let photo = item.querySelector(".catalog__item-pic").getAttribute("src");
    let title = item.querySelector(".catalog__item-title").textContent;
    let description = item.querySelector(".catalog__item-text").textContent;

    let price = item.querySelector(".catalog__item-price").textContent;
    console.log(price);

    document.querySelector('.modal__left-pic').src = photo;
    document.querySelector('.modal__left-pic').alt = title;
    document.querySelector('.modal__right-title').textContent = title;
    document.querySelector('.modal__right-text').textContent = description;
    document.querySelector('.modal__right-price').textContent = price;

    modal.style.display = 'block';
}



  function closeModal() {
    modal.style.display = 'none';
  }

document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('modal__open')) {
    let item = e.target.closest('.catalog__item');
    console.log(item)
    openModal(item);
  }
});

closeButton.addEventListener('click', closeModal);

