import { dividePrice } from "../../../assets/utils/dividePrice.js";
import { Accordion } from "../accordion.js";
import { Card_absence } from "../../card/card_absence/card_absence.js";

export class Accordion_absence extends Accordion {
  constructor(cart) {
    super(cart);
    // this.cart = cart;
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="accordion accordion__absence">
    <div class="accordion__header">
      <div class="accordion-header__wrapper">
      <div class="accordion__info" data-element="info">
        <span class="accordion__count" data-element="count">Отсутствуют · 3 товара</span>
      </div>
      <div class="accordion__icon" data-element="arrowIcon" data-close-icon="accordionAbsence">
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
      const card = new Card_absence(product);

      listContainer.append(card.element);
    }
  }

  //   render() {
  //     this.makeTemplate();
  //     this.fillAccordion();
  //     this.saveSubElements();
  //   }

  //   saveSubElements() {
  //     const dataElements = this.element.querySelectorAll("[data-element]");

  //     for (const element of dataElements) {
  //       const name = element.dataset.element;

  //       this.subElements[name] = element;
  //     }
  //   }

  //   update(cart) {
  //     const totalGoods = cart.reduce(
  //       (acc, { amount, included }) => (included ? acc + amount : acc + 0),
  //       0
  //     );

  //     const totalCost = cart.reduce(
  //       (acc, { product: { price, discount }, amount, included }) =>
  //         included ? acc + amount * (price - discount) : acc + 0,
  //       0
  //     );

  //     this.subElements["count"].innerHTML = `${this.makeGoodsText(
  //       totalGoods
  //     )} · `;
  //     this.subElements["price"].innerHTML = `${dividePrice(
  //       totalCost.toFixed(0)
  //     )} сом`;
  //   }

  closeAccordion() {
    this.subElements["arrowIcon"].classList.toggle("accordion__icon-clicked");
    this.subElements["body"].classList.toggle("accordion__body-invisible");
  }

  //   makeGoodsText(amount) {
  //     const lastDigit = amount.toString().at(-1);

  //     if ("1".includes(lastDigit)) {
  //       return `${amount} товар`;
  //     }
  //     if ("234".includes(lastDigit)) {
  //       return `${amount} товара`;
  //     }
  //     if ("056789".includes(lastDigit)) {
  //       return `${amount} товаров`;
  //     }
  //   }
}
