export class Form {
  formNames = {
    name: "имя",
    surname: "фамилию",
    mail: "почту",
    number: "номер телефона",
    id: "ИНН",
  };

  inputs = {};

  constructor() {
    this.render();
  }

  addEventListeners() {
    this.element.addEventListener("focusout", this.checkInputValue);
  }

  checkInputValue = (event, onSubmit = false) => {
    const name = event.target.name;
    const value = event.target.value;
    const target = event.target;

    if (value.length > 0 && !onSubmit) {
      if (!this.validateInput(value, name)) {
        event.target.classList.add("cart-form__input_invalid");
        event.target.setAttribute("invalid", true);
        target.nextElementSibling.nextElementSibling.innerHTML = `введите ${this.formNames[name]}`;
      }
      if (
        this.validateInput(value, name) &&
        event.target.classList.contains("cart-form__input_invalid")
      ) {
        event.target.classList.remove("cart-form__input_invalid");
        event.target.removeAttribute("invalid", true);
        target.nextElementSibling.nextElementSibling.innerHTML = ``;
      }
    }
  };

  checkBeforeSubmit() {
    for (const inputName in this.inputs) {
      const { value, name } = this.inputs[inputName];
      const input = this.inputs[inputName];

      if (!this.validateInput(value, name)) {
        input.classList.add("cart-form__input_invalid");
        input.setAttribute("invalid", true);
        input.nextElementSibling.nextElementSibling.innerHTML = `введите ${this.formNames[name]}`;
      }
      if (
        this.validateInput(value, name) &&
        input.classList.contains("cart-form__input_invalid")
      ) {
        input.classList.remove("cart-form__input_invalid");
        input.removeAttribute("invalid", true);
        target.nextElementSibling.nextElementSibling.innerHTML = ``;
      }
    }

    return Object.values(this.inputs).every(({ name, value }) =>
      this.validateInput(value, name)
    );
  }

  validateInput(value, name) {
    const regExps = {
      name: /^[а-яА-Я ]+$/,
      surname: /^[а-яА-Я ]+$/,
      number:
        /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      mail: /^\S+@\S+\.\S+$/,
      id: /^\d+$/,
    };

    if (regExps[name].test(value)) {
      return true;
    }
    return false;
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<form class="cart-form">
    <div class="cart-form__header">
      <h3>Получатель</h3>
    </div>
    <div class="cart-form__top">
      <div class="cart-form__name">
        <label class="cart-form__label">
          <input class="cart-form__input" type="text" placeholder="name" name="name" required />
          <span class="cart-form__subtitle">Имя</span>
          <span class="cart-form__additional-info"
              ></span
            >
        </label>
      </div>
      <div class="cart-form__name">
        <label class="cart-form__label">
          <input class="cart-form__input" type="text" placeholder="surname" name="surname" required />
          <span class="cart-form__subtitle">Фамилия</span>
          <span class="cart-form__additional-info"
              ></span
            >
        </label>
      </div>
    </div>
    <div class="cart-form__bottom">
      <div class="cart-form__name cart-form__name_bottom">
        <label class="cart-form__label">
          <input class="cart-form__input" type="email" placeholder="email" name="mail" required />
          <span class="cart-form__subtitle">Почта</span>
          <span class="cart-form__additional-info"
              ></span
            >
        </label>
      </div>
      <div class="cart-form__name cart-form__name_bottom">
        <label class="cart-form__label">
          <input class="cart-form__input" type="tel" placeholder="number" name="number" required />
          <span class="cart-form__subtitle">Телефон</span>
          <span class="cart-form__additional-info"
              ></span
            >
        </label>
      </div>
      <div class="cart-form__name cart-form__name_bottom">
        <label class="cart-form__label">
          <input class="cart-form__input" type="text" name="id" placeholder="id" required />
          <span class="cart-form__subtitle">ИНН</span>
          <span class="cart-form__additional-info"
            >Для таможенного оформления</span
          >
        </label>
      </div>
    </div>
  </form>`;

    this.element = div.firstElementChild;
  }

  saveInputs() {
    const allInputs = this.element.querySelectorAll("input");

    for (const input of allInputs) {
      const name = input.name;

      this.inputs[name] = input;
    }
  }

  render() {
    this.makeTemplate();
    this.saveInputs();
    this.addEventListeners();
  }
}
