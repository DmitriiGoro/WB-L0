import { Accordion } from "../accordion/accordion.js";
import { products } from "../../assets/products-info/products.js";
import { dividePrice } from "../../assets/utils/dividePrice.js";
import { Sidebar } from "../sidebar/sidebar.js";
import { payments } from "../../assets/products-info/payments.js";
import { addresses } from "../../assets/products-info/addresses.js";
import { Accordion_absence } from "../accordion/accordion_absence/accordion_absence.js";
import { Payment_type } from "../payment-type/payment-type.js";
import { Delivery_container } from "../delivery-container/delivery-container.js";
import { Form } from "../form/form.js";

export class Cart {
  checkboxes = {};
  cardNumber = 1;
  delivery = { type: "pickup", number: "3" };
  cartIcons = {};

  onCheckBoxClick = (event) => {
    const target = event.target;

    if (target.getAttribute("data-checkbox") === "all") {
      this.cart = this.cart.map((good) => {
        return {
          ...good,
          included: target.checked,
        };
      });

      for (const id in this.checkboxes) {
        if (id !== "all") {
          this.checkboxes[id].checked = target.checked;
        }
      }
    }

    if (
      target.hasAttribute("data-checkbox") &&
      target.getAttribute("data-checkbox") !== "all"
    ) {
      this.checkboxes["all"].checked = false;

      const card = target.closest("[data-product-id]");
      const productId = Number(card.dataset.productId);
      const indexInCart = this.cart.findIndex(({ id }) => id === productId);

      this.cart[indexInCart].included = target.checked;
    }

    const checkCheckbox = ([name, input]) => {
      if (name !== "all") {
        return input.checked;
      }
      return true;
    };

    if (
      this.checkboxes["all"].checked === false &&
      Object.entries(this.checkboxes).every(checkCheckbox)
    ) {
      this.checkboxes["all"].checked = true;
    }

    this.sidebar.update(this.cart);
    this.deliveryContainer.update(this.delivery, this.cart);
  };

  onButtonClick = (event) => {
    const button = event.target.closest(".card__button");

    if (button) {
      event.preventDefault();

      const product = button.closest("[data-product-id]");

      const id = product.dataset.productId;
      const changeTo = button.classList.contains("card__button_plus") ? 1 : -1;

      this.productUpdate(id, changeTo);
    }
  };

  onTabClick = (event) => {
    const tab = event.target.closest("[data-element-tab]");

    if (tab) {
      event.preventDefault();
      const { productId } = tab.closest("[data-product-id]").dataset;

      if (tab.dataset.elementTab === "favouriteButton") {
        tab.classList.toggle("favourite");
        return;
      }
      const productIndex = this.findProductIndexById(productId);

      [this.cart[productIndex], this.cart[this.cart.length - 1]] = [
        this.cart[this.cart.length - 1],
        this.cart[productIndex],
      ];

      this.cart.pop();
      this.sidebar.update(this.cart);
      tab.closest(".card").remove();
      this.makeSymbolOfGoods();
    }

    if (this.cart.length === 0) {
      const gif = document.createElement("img");

      gif.src =
        "https://media.tenor.com/CTpG8Qr1A_AAAAAd/rick-roll-rick-astley.gif";

      this.element.querySelector(".cart__inner").append(gif);
    }
  };

  closeAccordionOnClick = (event) => {
    const closest = event.target.closest("[data-close-icon]");

    if (closest) {
      const accordionType = closest.dataset.closeIcon;

      this[accordionType].closeAccordion(this.cart);
    }
  };

  onSubmit = (event) => {
    const paymentButton = event.target.closest(
      "[data-element='paymentButton']"
    );

    if (paymentButton) {
      event.preventDefault();
      const isFormFilled = this.form.checkBeforeSubmit();

      if (!isFormFilled) {
        event.preventDefault();
      }
    }
  };

  constructor(container = document.body) {
    this.container = container;
    this.cart = [];
    this.render();
  }

  fillCart() {
    const goodNumbers = [2, 200, 1];

    for (const product of products) {
      const { id } = product;

      const order = {
        id: id,
        product: product,
        amount: goodNumbers.pop(),
        included: true,
      };

      order.deliveryDate = {
        1: {
          from: new Date("2023-02-05"),
          to: new Date("2023-02-06"),
          amount: order.amount,
        },
      };

      if (id === 2) {
        order.deliveryDate = {
          1: {
            from: new Date("2023-02-05"),
            to: new Date("2023-02-06"),
            amount: order.amount,
          },
          2: {
            from: new Date("2023-02-07"),
            to: new Date("2023-02-08"),
            amount: 16,
          },
        };
      }

      this.cart.push(order);
    }
  }

  saveCartIconsContainers() {
    const containers = document.body.querySelectorAll("[data-element-icon");

    for (const container of containers) {
      const dataName = container.dataset.elementIcon;

      this.cartIcons[dataName] = container;
    }
  }

  makeSymbolOfGoods() {
    for (const cartElement in this.cartIcons) {
      const div = document.createElement("div");

      div.innerHTML = `<span class="notify notify_cart">${this.cart.length}</span>`;

      this.cartIcons[cartElement].append(div.firstElementChild);
    }
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<form action="" class="cart">
    <div class="cart__content">
      <div class="cart__header">
        <h2>Корзина</h2>
      </div>
      <div class="cart__items">
        <div class="cart__inner"></div>
      </div>
      <div class="cart__items-absence"></div>
      <div class="cart__delivery"></div>
      <div class="cart__payment-type"></div>
      <div class="cart__form-wrapper"></div>
    </div>
  </form>`;

    this.element = div.firstElementChild;
  }

  render() {
    this.makeTemplate();
    this.fillCart();
    this.saveCartIconsContainers();

    this.accordion = new Accordion(this.cart);
    this.accordionAbsence = new Accordion_absence(this.cart);
    this.sidebar = new Sidebar({
      cart: this.cart,
      cardNumber: this.cardNumber,
      delivery: this.delivery,
    });
    this.paymentType = new Payment_type(this.cardNumber);
    this.deliveryContainer = new Delivery_container(this.delivery, this.cart);
    this.form = new Form();

    const cartInner = this.element.querySelector(".cart__inner");
    const cartAbsence = this.element.querySelector(".cart__items-absence");
    const cartPaymentType = this.element.querySelector(".cart__payment-type");
    const cartDelivery = this.element.querySelector(".cart__delivery");
    const cartFormContainer = this.element.querySelector(".cart__form-wrapper");

    cartInner.append(this.accordion.element);
    cartAbsence.append(this.accordionAbsence.element);
    cartPaymentType.append(this.paymentType.element);
    cartDelivery.append(this.deliveryContainer.element);
    cartFormContainer.append(this.form.element);
    this.element.append(this.sidebar.element);

    this.saveCheckboxes();

    this.addEventListeners();
    this.makeSymbolOfGoods();

    this.container.append(this.element);
  }

  update() {}

  addEventListeners() {
    this.element.addEventListener("click", this.onButtonClick);

    this.element.addEventListener("click", this.onTabClick);

    this.element.addEventListener("change", this.onCheckBoxClick);

    this.element.addEventListener("click", this.closeAccordionOnClick);

    document.body.addEventListener("payment-changed", (event) => {
      this.cardNumber = event.detail;

      this.sidebar.update(this.cart, this.cardNumber, this.delivery);
      this.paymentType.update(this.cardNumber);
    });

    document.body.addEventListener("delivery-changed", (event) => {
      this.delivery = event.detail;

      this.sidebar.update(this.cart, this.cardNumber, this.delivery);
      this.deliveryContainer.update(this.delivery, this.cart);
    });

    document.addEventListener("pay-now", () => {
      this.paymentType.hideAdditionalInfo();
    });

    this.element.addEventListener("click", this.onSubmit);
  }

  productUpdate(productId, number) {
    const productIndex = this.findProductIndexById(productId);

    const { remains: remainNumber } = this.cart[productIndex].product;

    if (remainNumber === 0 && number === 1) {
      return;
    }

    this.cart[productIndex].amount += number;
    this.cart[productIndex].product.remains += -number;

    const productCard = this.element.querySelector(
      `[data-product-id="${productId}"]`
    );

    const productAmount = this.cart[productIndex].amount;

    const curPrice = productCard.querySelector(".card__current-price");
    const oldPrice = productCard.querySelector(".card__old-price");

    const {
      product: { price, discount },
      amount,
    } = this.cart[productIndex];

    curPrice.innerHTML = `${dividePrice(
      ((price - discount) * amount).toFixed(0)
    )} <span>сом</span>`;

    oldPrice.innerHTML = `${dividePrice((price * amount).toFixed(0))} сом`;

    const total = productCard.querySelector(".card__total");
    total.innerHTML = productAmount;

    const remain = productCard.querySelector(".card__lost");
    const minusButton = productCard.querySelector(".card__button_minus");

    if (this.cart[productIndex].product.remains <= 2) {
      remain.style.opacity = "1";
      remain.innerHTML = `Осталось ${this.cart[productIndex].product.remains} шт.`;
    } else {
      remain.style.opacity = "0";
      remain.innerHTML = `Осталось 2 штук`;
    }

    if (productAmount === 1) {
      minusButton.setAttribute("disabled", true);
    } else {
      minusButton.removeAttribute("disabled", true);
    }

    this.deliveryDateUpdate();
    this.sidebar.update(this.cart);
    this.deliveryContainer.update(this.delivery, this.cart);
  }

  deliveryDateUpdate() {
    for (const good of this.cart) {
      good.deliveryDate = {
        1: {
          from: new Date("2023-02-05"),
          to: new Date("2023-02-06"),
          amount: good.amount,
        },
      };

      if (good.id === 2) {
        good.deliveryDate = {
          1: {
            from: new Date("2023-02-05"),
            to: new Date("2023-02-06"),
            amount: good.amount - 16,
          },
          2: {
            from: new Date("2023-02-07"),
            to: new Date("2023-02-08"),
            amount: good.amount - 184 > 0 ? good.amount - 184 : 0,
          },
        };
      }
    }
  }

  findProductIndexById(productId) {
    return this.cart.findIndex(({ id }) => id.toString() === productId);
  }

  saveCheckboxes() {
    const checkboxes = this.element.querySelectorAll("[data-checkbox]");

    for (const checkbox of checkboxes) {
      const checkboxName = checkbox.dataset.checkbox;
      this.checkboxes[checkboxName] = checkbox;
    }
  }
}
