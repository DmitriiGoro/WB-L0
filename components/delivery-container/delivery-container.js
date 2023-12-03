import { addresses } from "../../assets/products-info/addresses.js";
import { Delivery } from "../payment-block/delivery-block.js";

export class Delivery_container {
  subElements = {};

  constructor(delivery, cart) {
    this.delivery = delivery;
    this.cart = cart;
    this.render();
  }

  addEventListeners() {
    this.element.addEventListener("click", (event) => {
      const closest = event.target.closest(".delivery-container__button");

      if (closest) {
        event.preventDefault();
        const delivery = new Delivery();
        delivery.open();
      }
    });
  }

  makeDeliveryObj(cart) {
    const info = {};

    const months = {
      1: "февраля",
    };

    for (const good of cart) {
      const {
        deliveryDate,
        product: { image },
        included,
      } = good;

      if (included) {
        for (const dateNumber in deliveryDate) {
          const { from, to, amount } = deliveryDate[dateNumber];

          const dateString = `${new Date(from).getDate()}⎯${new Date(
            to
          ).getDate()} ${months[new Date(to).getMonth()]}`;

          info[dateString] = info[dateString]
            ? [...info[dateString], { image, amount }]
            : [{ image, amount }];
        }
      }
    }

    return info;
  }

  makeDeliveryElements(dates) {
    this.subElements["deliveryDate"].innerHTML = "";
    for (const date in dates) {
      const div = document.createElement("div");

      div.innerHTML = `<div class="delivery-container__date">
      <span class="delivery-container__subtitle">${date}</span>
      <div class="delivery-container__date-goods-img">
        ${dates[date]
          .map(({ amount, image }) => {
            if (amount === 0) {
              return "";
            }
            return `<div><img src="assets/images/${image}" width="40px" height="56px"/> ${
              amount > 1 ? `<span class="notify">${amount}</span>` : ""
            }</div>`;
          })
          .join("")}
      </div>
    </div>`;

      this.subElements["deliveryDate"].append(div.firstElementChild);
    }
  }

  update(delivery, cart) {
    this.delivery = delivery;
    this.cart = cart;

    this.subElements["deliveryType"].innerHTML =
      this.delivery.type === "courier" ? "Курьерская доставка" : "Пункт выдачи";

    this.subElements["deliveryAddress"].innerHTML =
      this.delivery.type === "courier"
        ? `<span class="delivery-container__address">${
            addresses[this.delivery.type][this.delivery.number]
          }</span>`
        : `<span class="delivery-container__address">${
            addresses[this.delivery.type][this.delivery.number]
          }</span>
        <div class="delivery-container__address_additional">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922"
              fill="#FF970D"
            />
          </svg>
          <span>4.99</span> <span>${
            addresses[this.delivery.type].workHours
          }</span>
        </div>`;

    const dates = this.makeDeliveryObj(this.cart);
    this.makeDeliveryElements(dates);
  }

  saveSubElements() {
    const dataElements = this.element.querySelectorAll("[data-element]");

    for (const element of dataElements) {
      const name = element.dataset.element;
      this.subElements[name] = element;
    }
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="delivery-container">
    <div class="delivery-container__header">
      <h2>Способ доставки</h2>
      <button class="delivery-container__button button button_to-change">Изменить</button>
    </div>
    <div class="delivery-container__type">
      <div class="delivery-container__type-wrapper">
        <span class="delivery-container__delivery-type" data-element="deliveryType">${
          this.delivery.type === "courier"
            ? "Курьерская доставка"
            : "Пункт выдачи"
        }</span>
        <div class="delivery-container__address-wrapper" data-element="deliveryAddress">
          <span class="delivery-container__address">${
            addresses[this.delivery.type][this.delivery.number]
          }</span>
          ${
            this.delivery.type === "pickup"
              ? `<div class="delivery-container__address_additional">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.69769 1.14922C6.43817 0.528396 5.56198 0.528387 5.30244 1.14919L6.69769 1.14922ZM5.30244 1.14919L4.14719 3.90977L1.19202 4.16613C0.519264 4.22467 0.262282 5.05966 0.759713 5.49464L3.00514 7.45915L2.33207 10.3824C2.18436 11.0238 2.87792 11.5567 3.46133 11.2023L6.00032 9.65611L8.53797 11.2015C9.12269 11.5588 9.81568 11.0227 9.66861 10.3826L8.99549 7.45915L11.2402 5.49537C11.7385 5.05961 11.4793 4.22519 10.8083 4.16667L7.85294 3.91029L6.69769 1.14922"
              fill="#FF970D"
            />
          </svg>
          <span>4.99</span> <span>${
            addresses[this.delivery.type].workHours
          }</span>
        </div>`
              : ""
          }
        </div>
      </div>
      
      
    </div>
    <div class="delivery-container__cost">
      <span class="delivery-container__subtitle">Стоимость доставки</span>
      <span class="delivery-container__value">Бесплатно</span>
    </div>
    <div class="delivery-container__date-wrapper" data-element="deliveryDate">
      
    </div>
    <div class="delivery-container__additional-information__wrapper">
      <div class="additional-information__icon">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1 10.9998C1 16.5226 5.47715 20.9998 11 20.9998C16.5228 20.9998 21 16.5226 21 10.9998C21 5.47691 16.5228 0.999756 11 0.999756C5.47715 0.999756 1 5.47691 1 10.9998ZM19.1818 10.9997C19.1818 15.5184 15.5187 19.1816 11 19.1816C6.48128 19.1816 2.81815 15.5184 2.81815 10.9997C2.81815 6.48103 6.48128 2.81791 11 2.81791C15.5187 2.81791 19.1818 6.48103 19.1818 10.9997Z"
                fill="url(#paint0_linear_7_2382)"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.98273 9.6548C7.40206 9.29538 8.03336 9.34394 8.39278 9.76327L10.6286 12.3717L14.6826 7.58061C15.0394 7.15901 15.6704 7.10643 16.092 7.46317C16.5136 7.81991 16.5662 8.45089 16.2094 8.8725L11.7761 14.1118C11.1795 14.817 10.0933 14.8204 9.49219 14.1191L6.87427 11.0648C6.51485 10.6455 6.56341 10.0142 6.98273 9.6548Z"
                fill="url(#paint1_linear_7_2382)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_7_2382"
                  x1="4"
                  y1="1.99994"
                  x2="11"
                  y2="20.9998"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0CD38B" />
                  <stop offset="1" stop-color="#0CB477" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_7_2382"
                  x1="9"
                  y1="7.5"
                  x2="10.5089"
                  y2="15.8594"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#0CD38B" />
                  <stop offset="1" stop-color="#0CB477" />
                </linearGradient>
              </defs>
            </svg>
          </div>
      <div class="additional-information__description sidebar_fontsize">
        Обратная доставка товаров на склад при отказе —
        <span class="additional-information__tooltip-switcher">бесплатно</span>
        <div class="additional-information__tooltip sidebar_fontsize">
          Если товары вам не подойдут, мы вернем их обратно на склад — это
          бесплатно
        </div>
      </div>
    </div>
  </div>`;

    this.element = div.firstElementChild;
  }

  render() {
    this.makeTemplate();
    this.saveSubElements();
    this.addEventListeners();
    this.update(this.delivery, this.cart);
  }
}
