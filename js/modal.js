(() => {
  document.addEventListener('DOMContentLoaded', (e) => {

  // очистить модальный диалог от лишних стилей
  function resetModalDialogStyles() {
    document.getElementById('modal-dialog').classList.remove('modal-dialog--photo');
  }
  // закрытие модалки со сворачиванием всех видов модальных окон внутри
  function closeModal() {
    document.getElementById('modal').classList.remove('scale-1');
    setTimeout(() => {
      ['modal-buy', 'modal-buy-confirm', 'modal-photo'].forEach(modalKindName => {
        const modalKind = document.getElementById(modalKindName);
        if (!modalKind.classList.contains('none')) {
          document.getElementById(modalKindName).classList.add('none');
        }
      });
      resetModalDialogStyles();
      document.body.classList.remove('stop-scroll');
    }, 300);
  }

  // открытие модалки по клику на любой элемент с классом js-modal-open. в target записывается id вида мод окна тк их много
  document.querySelectorAll('.js-modal-open').forEach(item => {
    const modalKind = document.getElementById(item.dataset.target);
    item.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.classList.add('stop-scroll');
      modalKind.classList.remove('none');
      document.getElementById('modal').classList.add('scale-1');

      changeModalDialogStyles(item.dataset.target);
    })
  });

  function changeModalDialogStyles(modalKindName) {
    const modalDialog = document.getElementById('modal-dialog');

    if (modalKindName === 'modal-photo') {
      modalDialog.classList.add('modal-dialog--photo');
    }
  }

  // закрытие модалки
  // при клике вне окна
  document.getElementById('modal')?.addEventListener('click', (e) => {
    if (e._isClickWithinModalDialog) return;
    closeModal();
  })

  // при клике на крестик
  document.getElementById('modal-close')?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  // на клик внутри диалога
  document.getElementById('modal-dialog')?.addEventListener('click', (e) => {
    e._isClickWithinModalDialog = true;
  })

 // валидация формы
  if (document.getElementById('modal-dialog-buy-form')) {
  const selector = document.querySelector("input[type='tel']");
  const im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);
  const validationModalBuy = new JustValidate('#modal-dialog-buy-form', {
    focusInvalidField: true,
    validateBeforeSubmitting: true,
    errorFieldCssClass: 'invalidated',
  })

    validationModalBuy
      .addField('#modal-dialog-buy-fio', [{
          rule: 'minLength',
          value: 3,
          errorMessage: "Не достаточное количество символов"
        },
        {
          rule: 'required',
          errorMessage: 'Поле нужно заполнить. Введите ФИО'
        }
      ])
      .addField('#modal-dialog-buy-phone', [{
        rule: "function",
        validator: function (name, value) {
          const phone = selector.inputmask.unmaskedvalue();
          return phone.length === 10
        },
        errorMessage: 'Не достаточное количество символов в строке',
      }]);

   validationModalBuy.revalidate();
    const form = document.getElementById('modal-dialog-buy-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.querySelector('.invalidated')) {
        document.getElementById('modal-buy').classList.add('none');
        document.getElementById('modal-buy-confirm').classList.remove('none');
      }
    })
  }

  // слайдер
  const modalPhotoListSlider = new Swiper(".modal-dialog__photo-list-swiper", {
    spaceBetween: 78,
    slidesPerView: 4,
    watchSlidesProgress: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 39,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 78,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 78,
      },
      1352: {
        slidesPerView: 4,
        spaceBetween: 78,
      }
    },
  });
  const modalPhotoMainSlider = new Swiper(".modal-dialog__photo-main-swiper", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".modal-dialog__photo-button-next",
      prevEl: ".modal-dialog__photo-button-prev",
      disabledClass: 'btn-icon--disabled',
    },
    thumbs: {
      swiper: modalPhotoListSlider,
    },
  });

  });
})()