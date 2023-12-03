import { Card } from "../card/card.js";
import { dividePrice } from "../../assets/utils/dividePrice.js";

export class Accordion {
  subElements = {};

  constructor(cart) {
    this.cart = cart;
    this.render();
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="accordion">
    <div class="accordion__header">
      <div class="accordion-header__wrapper">
      <label class="checkbox accordion__checkbox" data-element="accordionCheckbox">
        <input type="checkbox" class="checkbox__input" checked data-checkbox="all" />
        <div class="checkbox__state">
          <div class="checkbox__control">
            <svg
              class="checkbox__icon"
              width="15"
              height="13"
              viewBox="0 0 15 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 7.5L5 11L13 2"
                stroke="white"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="checkbox__title checkbox__title-default">
            Выбрать все
          </div>
        </div>
      </label>
      <div class="accordion__info" data-element="info">
        <span class="accordion__count" data-element="count"> · </span>
        <span class="accordion__price" data-element="price"></span>
      </div>
      <div class="accordion__icon" data-element="arrowIcon" data-close-icon="accordion">
        <svg
          width="20"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.3417 8.91208C14.966 9.29821 14.3477 9.30437 13.9644 8.92579L8.14183 3.17475C8.06342 3.0973 7.93715 3.09788 7.85945 3.17603L2.15281 8.91591C1.76725 9.30371 1.14293 9.3137 0.745162 8.93845C0.335488 8.55196 0.321627 7.90488 0.714373 7.5012L7.28326 0.749487C7.67588 0.345934 8.32412 0.345934 8.71674 0.749487L15.3417 7.55884C15.7082 7.93549 15.7082 8.53542 15.3417 8.91208Z"
            fill="#9797AF"
          />
        </svg>
      </div>
      </div>
      <div class="cart__divider"></div>
    </div>
    <div class="accordion__body" data-element="body">
      <div class="accordion__list"></div>
    </div>
  </div>`;

    this.element = div.firstElementChild;
  }

  fillAccordion() {
    const listContainer = this.element.querySelector(".accordion__list");

    for (const product of this.cart) {
      const card = new Card(product);

      listContainer.append(card.element);
    }
  }

  render() {
    this.makeTemplate();
    this.fillAccordion();
    this.saveSubElements();
  }

  saveSubElements() {
    const dataElements = this.element.querySelectorAll("[data-element]");

    for (const element of dataElements) {
      const name = element.dataset.element;

      this.subElements[name] = element;
    }
  }

  update(cart) {
    const totalGoods = cart.reduce(
      (acc, { amount, included }) => (included ? acc + amount : acc + 0),
      0
    );

    const totalCost = cart.reduce(
      (acc, { product: { price, discount }, amount, included }) =>
        included ? acc + amount * (price - discount) : acc + 0,
      0
    );

    this.subElements["count"].innerHTML = `${this.makeGoodsText(
      totalGoods
    )} · `;
    this.subElements["price"].innerHTML = `${dividePrice(
      totalCost.toFixed(0)
    )} сом`;
  }

  closeAccordion(cart) {
    this.subElements["arrowIcon"].classList.toggle("accordion__icon-clicked");
    this.subElements["body"].classList.toggle("accordion__body-invisible");
    this.subElements["accordionCheckbox"].classList.toggle(
      "accordion__checkbox-invisible"
    );
    this.subElements["info"].classList.toggle("accordion__info-visible");

    this.update(cart);
  }

  makeGoodsText(amount) {
    const lastDigit = amount.toString().at(-1);

    if ("1".includes(lastDigit)) {
      return `${amount} товар`;
    }
    if ("234".includes(lastDigit)) {
      return `${amount} товара`;
    }
    if ("056789".includes(lastDigit)) {
      return `${amount} товаров`;
    }
  }
}
