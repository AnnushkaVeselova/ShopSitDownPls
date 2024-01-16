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
// range-слайдер с ползунками в секции Filter используется noUiSlider
const rangeSlider = document.getElementById('range-slider');

if (rangeSlider) {
  noUiSlider.create(rangeSlider, {
    start: [500, 300000],
    connect: true, // количество ползунков 2
    step: 1, // шаг прокрутки
    start: [2000, 150000],
    range: {
        'min': [500],
        'max': [300000]
    }
});
const input0 = document.getElementById('input-0');
const input1 = document.getElementById('input-1');
const inputs = [input0, input1];

rangeSlider.noUiSlider.on('update', function(values, handle){
  inputs[handle].value = Math.round(values[handle]);
});
const setRangeSlider = (i, value) => {
  let arr = [null, null];
  arr[i] = value;

  console.log(arr);

  rangeSlider.noUiSlider.set(arr);
};
inputs.forEach((el, index) => {
  el.addEventListener('change', (e) => {
    console.log(index);
    setRangeSlider(index, e.currentTarget.value);
  });
});
}

// слайдер catalog-page swiper4
const mySwiperCatalog = new Swiper('.swiper4', {
  direction: 'horizontal',
  loop: false,
  // autoHeight: true,   автовысота
  autoHeight: false,
  // количество слайдов
  spaceBetween: 32,
  slidesPerGroup: 3,
  slidesPerView: 3,
  grid: {
    rows: 3,
    fill: 'row',
  },

  breakpoints: {
    320: {
      spaceBetween: 16,
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 3,
      },
    },
    650: {
      spaceBetween: 16,
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 3,
      },
    },
    768: {
      spaceBetween: 32,
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 3,
        fill: 'row',
      },
    },
    800: {
      spaceBetween: 32,
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: {
        rows: 3,
      },
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 3,
      },
    },
    1315: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: {
        rows: 3,
      },
    },
  },

  pagination: {
    el: '.swiper-pagination4',
    type: 'bullets',

    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  },

})

// фильтры с чекбоксом
const btnSelectFilter = document.querySelectorAll('.filter__dropdown-btn');
btnSelectFilter.forEach(item => {
  item.addEventListener('click', () => {
    const container = item.closest('div');
    const droplist = container.querySelector('.filter__checkbox-block');
    if ((document.querySelector('.filter__dropdown-btn--active')) && (document.querySelector('.filter__dropdown-btn--active') != item)) {

      document.querySelector('.filter__dropdown-btn--active').classList.remove('filter__dropdown-btn--active');
    }
    if ((document.querySelector('.filter__checkbox-block--active')) && (document.querySelector('.filter__checkbox-block--active') != droplist)) {
      document.querySelector('.filter__checkbox-container--active').classList.remove('filter__checkbox-block--active');
    }
    item.classList.toggle('filter__dropdown-btn--active');

    droplist.classList.toggle('filter__checkbox-block--active')
  })
})
