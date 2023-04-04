import * as funcs from "./modules/functions.js";

funcs.isWebp();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("partner-form");

  form.addEventListener("submit", formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    formData.append('image', logoInput.files[0]);

    if (error === 0) {
      console.log(formData);
      alert('Форма успешно отпрвлена');
      logoWrap.style.backgroundImage = `url("../img/avatar.png")`;
      form.reset();
    } else {
      alert("Заполните обязательные поля");
    }

    function formValidate(form) {
      let error = 0;
      let inputsRequired = document.querySelectorAll("._required");

      for (let i = 0; i < inputsRequired.length; i++) {
        const input = inputsRequired[i];
        formRemoveError(input);

        if (input.classList.contains("_email")) {
          if (emailValidate(input)) {
            formAddError(input);
            error++;
          }
        } else if (input.classList.contains("_tel")) {
          if (telValidate(input)) {
            formAddError(input);
            error++;
          }
        } else {
          if (input.value === "") {
            formAddError(input);
            error++;
          }
        }
      }
      return error;
    }

    function formAddError(input) {
      input.parentElement.classList.add("_error");
    }

    function formRemoveError(input) {
      input.parentElement.classList.remove("_error");
    }

    function emailValidate(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function telValidate(input) {
      return !/^((\+7|7|8)+([0-9]){10})$/.test(input.value);
    }
  }

  const logoInput = document.getElementById("logo");
  const logoWrap = document.querySelector(".partner-form__photo");
  const logoCancel = document.querySelector(".partner-form__icon-close");

  logoCancel.addEventListener("click", () => {
    logoInput.value = "";
    logoWrap.style.backgroundImage = `url("../img/avatar.png")`;
  })

  logoInput.addEventListener("change", () => {
    uploadFile(logoInput.files[0]);
  });

  function uploadFile(file) {
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      alert("Разрешены только изображения в форматах jpeg и png");
      logoInput.value = "";
      return;
    }
    let reader = new FileReader();
    reader.onload = function (e) {
      logoWrap.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.onerror = function (e) {
      alert('Ошибка');
    }
    reader.readAsDataURL(file);
  }


  const popup = document.querySelector('.open-popup');
  const formClose = document.querySelector('.partner-form__cancel');

  popup.addEventListener("click", () => {
    form.style.display = 'block';
    popup.style.display = 'none';
    document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.42)';
  });

  formClose.addEventListener('click', () => {
    form.style.display = 'none';
    popup.style.display = 'block';
    document.body.style.backgroundColor = 'transparent';
  })

});
