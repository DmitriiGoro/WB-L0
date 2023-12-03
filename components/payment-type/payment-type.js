import { payments } from "../../assets/products-info/payments.js";
import { Payment } from "../payment-block/payment-block.js";

export class Payment_type {
  subElements = {};

  constructor(cardNumber) {
    this.cardNumber = cardNumber;
    this.render();
  }

  addEventListeners() {
    this.element.addEventListener("click", (event) => {
      const button = event.target.closest(".payment-type__button");

      if (button) {
        event.preventDefault();
        const payment = new Payment();
        payment.open();
      }
    });
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="payment-type">
    <div class="payment-type__header">
      <h2>Способ оплаты</h2>
      <button class="payment-type__button button button_to-change">Изменить</button>
    </div>
    <div class="payment-type__card-wrapper">
      <div class="payment-type__card">
        <div class="payment-type__card-icon" data-element="cardIcon">${
          payments[this.cardNumber].icon
        }</div>
        <span class="payment-type__card-number" data-element="cardNumber">${
          payments[this.cardNumber].number
        }</span>
        <span class="payment-type__card-exp" data-element="cardExp">${
          payments[this.cardNumber].exp
        }</span>
      </div>
      <div class="payment-type__additional-info" data-element="additionalInfo">Спишем оплату с карты при получении</div>
    </div>
  </div>`;

    this.element = div.firstElementChild;
  }

  hideAdditionalInfo() {
    this.subElements["additionalInfo"].hidden =
      !this.subElements["additionalInfo"].hidden;
  }

  saveSubElements() {
    const dataElements = this.element.querySelectorAll("[data-element]");

    for (const element of dataElements) {
      const name = element.dataset.element;

      this.subElements[name] = element;
    }
  }

  update(cardNumber) {
    this.cardNumber = cardNumber;

    this.subElements["cardIcon"].innerHTML = payments[cardNumber].icon;
    this.subElements["cardNumber"] = payments[cardNumber].number;
    this.subElements["cardExp"] = payments[cardNumber].exp;
  }

  render() {
    this.makeTemplate();
    this.saveSubElements();
    this.addEventListeners();
  }
}
