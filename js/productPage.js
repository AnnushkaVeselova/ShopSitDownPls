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
  // слайдер с похожими товарами
  const swiperSame = new Swiper('.swiper5', {
		direction: 'horizontal',
		loop: true,
		loopedSlides: 4,
   // loop: false,
    spaceBetween: 32,
    slidesPerGroup: 1,
    slidesPerView: 4,
		slidesPerView: 'auto',
		autoHeight: true,
   // autoHeight: false,
		mousewheel: {
			sensitivity: 1,
		},
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 32
      },
      1024: {
        slidesPerView: 3,
      },
      1352: {
        slidesPerView: 4
      }
    },
		 // grabCursor: true,    курсор ручка
   keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // замена изображения по щелчку мыши на списки мини-картинок
  const listImgs = document.querySelectorAll('.list-img');
  if (listImgs && listImgs.length) {
    listImgs.forEach(item => {
      item.addEventListener('click', (e) => {
        const bigImgURL = item.dataset.bimage;
        const bigImg = document.getElementById('big-img');
        bigImg.setAttribute('src', bigImgURL);

        const imgParent = bigImg.closest('.product-photo-main');
        imgParent.dataset.modalPhotoIndex = 4;
      })
    });
  }




