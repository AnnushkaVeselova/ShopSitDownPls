// header
// Дропдаун с городами и категориями с выбором нужного

// Полифилл для метода forEach для NodeList
if (window.NodeList && !NodeList.prototype.forEach) {
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (var i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

document.querySelectorAll('.dropdown').forEach(function (dropDownWrapper) {
	const dropDownBtn = dropDownWrapper.querySelector('.dropdown__button');
	const dropDownList = dropDownWrapper.querySelector('.dropdown__list');
	const dropDownListItems = dropDownList.querySelectorAll('.dropdown__list-item');
	const dropDownInput = dropDownWrapper.querySelector('.dropdown__input-hidden');

	// Клик по кнопке. Открыть/Закрыть select
	dropDownBtn.addEventListener('click', function (e) {
		dropDownList.classList.toggle('dropdown__list--visible');
        this.classList.toggle('dropdown__button--active');
	});

	// Выбор элемента списка. Запомнить выбранное значение. Закрыть дропдаун
	dropDownListItems.forEach(function (listItem) {
		listItem.addEventListener('click', function (e) {
			e.stopPropagation();
			dropDownBtn.innerText = this.innerText;
			dropDownBtn.focus();
			dropDownInput.value = this.dataset.value;
			dropDownList.classList.remove('dropdown__list--visible');
		});
	});

	// Клик снаружи дропдауна. Закрыть дропдаун
	document.addEventListener('click', function (e) {
		if (e.target !== dropDownBtn) {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});

	// Нажатие на Tab или Escape. Закрыть дропдаун
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Tab' || e.key === 'Escape') {
			dropDownBtn.classList.remove('dropdown__button--active');
			dropDownList.classList.remove('dropdown__list--visible');
		}
	});
});

// Бургер-меню
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("burger").addEventListener("click", function() {
    document.querySelector("header").classList.toggle("open")
  })
})

// Main
// секция Popular кнопка смотреть еще
const seeMoreBtn = document.querySelector('.popular__btn');
const hideCard = document.querySelectorAll('.card__block--display');
const hideItem = document.querySelectorAll('.popular__card-item--hide');
const hideCardLap = document.querySelectorAll('.card__block--laptop');
const hideItemLap = document.querySelectorAll('.popular__card-item--laptop');

seeMoreBtn.addEventListener('click', () => {
    hideCard.forEach(item => {
      item.classList.add('card__block--block');
    })
    hideItem.forEach(item => {
      item.classList.remove('popular__card-item--hide');
    })
    hideCardLap.forEach(item => {
      item.classList.add('card__block--block');
    })
    hideItemLap.forEach(item => {
      item.classList.add('card__block--block');
    })
    seeMoreBtn.classList.add('popular__btn-hide');
  })

// слайдер Hero Главная swiper1
const swiper = new Swiper('.swiper1', {
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },

  mousewheel: {
    sensitivity: 1,
  },

  autoHeight: true,
});


// слайдер Special Специальные предложения swiper2
const mySwiper = new Swiper('.swiper2', {
  direction: 'horizontal',
 // loop: true бесконечная прокрутка
  loop: true,
   // autoHeight: true,   автовысота
 // количество слайдов
 slidesPerView: 3,
 spaceBetween: 32,
 slidesPerGroup: 1,
 slidesPerView: 'auto',

 breakpoints: {
  575: {
    slidesPerView: 1,
  },
  800: {
    slidesPerView: 2,
    spaceBetween: 32
  },
  1024: {
    slidesPerView: 3,
  },
  1310: {
    slidesPerView: 3,
    slidesPerGroup: 1,
  }
},

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
 // grabCursor: true,    курсор ручка
   // управление клавиатурой
   keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
});


// слайдер Information Полезное swiper3
const mySwiperT = new Swiper('.swiper3', {
  direction: 'horizontal',
  loop: true,

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
 // grabCursor: true,    курсор ручка
   // управление клавиатурой
   keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },

 // autoHeight: true,   автовысота
 // количество слайдов
 slidesPerView: 2,
 spaceBetween: 32,
 slidesPerGroup: 1,
 slidesPerView: 'auto',

 breakpoints: {
  650: {
    slidesPerView: 1,
  },
  768: {
    slidesPerView: 2,
    spaceBetween: 32
  },
  800: {
    slidesPerView: 2,
    spaceBetween: 32
  },
  1024: {
    slidesPerView: 3,
  },
  1310: {
    slidesPerView: 2,
    slidesPerGroup: 1,
  }
},
});

// валидация JustValidate в секции contact

document.addEventListener("DOMContentLoaded", function() {
  const validator = new JustValidate('.contact__block-forma');

  const selector = document.querySelector("input[type='tel']");
    const im = new Inputmask("+7 (999)-999-99-99");
    im.mask(selector);

  validator
  .addField('.contacts-name', [
    {
      rule: 'required',
      errorMessage: 'Поле пустое',
    },
    {
      rule: 'minLength',
      value: 3,
      errorMessage: 'Недопустимый формат. Минимальное количество букв 3',
    },
  ])
  .addField('.contacts-email', [
    {
      rule: 'required',
      errorMessage: 'Поле пустое',
    },
    {
      rule: 'email',
      errorMessage: 'Недопустимый формат',
    },
  ])
  .addField('.contacts-telephone', [{
    rule: "function",
    validator: function (name, value) {
      const phone = selector.inputmask.unmaskedvalue();
      return phone.length === 10
    },
    errorMessage: 'Не достаточное количество символов в строке',
  }])
  .onSuccess((e) => {
    alert("Мы всегда вам рады! Форма успешно заполнена! Мы вам перезвоним и отправим информацию на почту!")
  })
});

