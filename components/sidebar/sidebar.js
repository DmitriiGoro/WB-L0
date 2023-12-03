import { dividePrice } from "../../assets/utils/dividePrice.js";
import { payments } from "../../assets/products-info/payments.js";
import { Payment } from "../payment-block/payment-block.js";
import { Delivery } from "../payment-block/delivery-block.js";
import { addresses } from "../../assets/products-info/addresses.js";

export class Sidebar {
  subElements = {};
  cardNumber = "1";
  delivery = {};

  checkPayment = (event) => {
    const closest = event.target.closest(".checkbox");

    if (closest) {
      const input = this.subElements["paymentCheckbox"];
      const totalCost = this.subElements["totalCost"].innerHTML;

      this.subElements["paymentButton"].innerHTML = !input.checked
        ? `Оплатить ${totalCost} сом`
        : "Заказать";

      document.dispatchEvent(
        new CustomEvent("pay-now", { detail: input.checked })
      );
    }
  };

  openModal = (event) => {
    const modalButton = event.target.closest("[data-modal-button]");
    const isPayment = modalButton?.classList.contains("payment__button");
    const isDelivery = modalButton?.classList.contains("delivery__button");

    if (isPayment) {
      event.preventDefault();
      const paymentModal = new Payment();

      paymentModal.open();
    } else if (isDelivery) {
      event.preventDefault();

      const deliveryModal = new Delivery();
      deliveryModal.open();
    }
  };

  constructor({ cart, cardNumber, delivery }) {
    this.delivery = delivery;
    this.cardNumber = cardNumber;

    this.cart = cart;
    this.render();
  }

  render() {
    this.makeTemplate();
    this.saveDataElements();
    this.addEventListeners();
  }

  addEventListeners() {
    this.element.addEventListener("pointerup", this.checkPayment);

    this.element.addEventListener("click", this.openModal);
  }

  countData() {
    const totalCost = this.cart.reduce(
      (acc, { product: { price, discount }, amount, included }) =>
        included ? acc + amount * (price - discount) : acc + 0,
      0
    );

    const totalGoods = this.cart.reduce(
      (acc, { amount, included }) => (included ? acc + amount : acc + 0),
      0
    );
    const priceBeforeOff = this.cart.reduce(
      (acc, { product: { price }, amount, included }) =>
        included ? acc + price * amount : acc + 0,
      0
    );
    const totalOff = this.cart.reduce(
      (acc, { product: { discount }, amount, included }) =>
        included ? acc + discount * amount : acc + 0,
      0
    );

    return {
      totalCost: dividePrice(totalCost.toFixed(0)),
      totalGoods: `${this.makeGoodsText(totalGoods)}`,
      priceBeforeOff: `${dividePrice(priceBeforeOff.toFixed(0))} сом`,
      totalOff: totalOff === 0 ? 0 : `−${dividePrice(totalOff.toFixed(0))} сом`,
    };
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

  makeTemplate() {
    const div = document.createElement("div");

    const { totalCost, totalGoods, priceBeforeOff, totalOff } =
      this.countData();

    div.innerHTML = `<div class="cart__sidebar">
    <div class="sidebar__wrapper">
      <div class="sidebar__total">
        <h2 class="total__sum">Итого</h2>
        <h2 class="total__cost"><span data-element="totalCost">${totalCost}</span> <span>сом</span></h2>
      </div>
      <div class="total__goods total__subelements">
        <span class="goods__number" data-element="totalGoods">${totalGoods}</span>
        <span class="goods__cost" data-element="priceBeforeOff">${priceBeforeOff}</span>
      </div>
      <div class="total__sale total__subelements">
        <span class="sale__title">Скидка</span>
        <span class="sale__total" data-element="totalOff">${totalOff}</span>
      </div>
      <div class="total__delivery total__subelements">
        <span class="delivery__title">Доставка</span>
        <span class="delivery__cost">Бесплатно</span>
      </div>
    </div>
    <div class="sidebar__delivery">
      <div class="delivery__wrapper">
        <h3 class="delivery__type sidebar__subtitle" data-element="deliveryType">
        ${
          this.delivery.type === "courier"
            ? "Курьерская доставка"
            : "Доставка в пункт выдачи"
        }
        </h3>
        <button class="delivery__button button" data-modal-button>
          <svg
            class="sidebar__icon sidebar__icon_pen"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.1585 3.05991L16.9401 6.84154L6.72705 17.0546L2.73544 17.8529C2.38557 17.9229 2.07711 17.6144 2.14709 17.2646L2.94541 13.273L13.1585 3.05991ZM4.17707 13.9321L13.1585 4.95072L15.0493 6.84154L6.06789 15.8229L3.70436 16.2956L4.17707 13.9321Z"
              fill="#CB11AB"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.9948 7.78715L12.2132 4.00552L13.6313 2.5874C14.4145 1.8042 15.6843 1.8042 16.4675 2.5874L17.4129 3.53281C18.1961 4.31601 18.1961 5.58584 17.4129 6.36904L15.9948 7.78715ZM16.4675 5.42363C16.7286 5.16256 16.7286 4.73929 16.4675 4.47822L15.5221 3.53281C15.261 3.27174 14.8378 3.27174 14.5767 3.53281L14.104 4.00552L15.9948 5.89634L16.4675 5.42363Z"
              fill="#CB11AB"
            />
          </svg>
        </button>
      </div>
      <div class="delivery__address sidebar_fontsize">
        <span class="address" data-element="deliveryAddress">${
          addresses[this.delivery.type][this.delivery.number]
        }</span>
        <div class="date">
          <span class="address_reduced-word-spacing">5—8</span>
          <span>фев</span>
        </div>
      </div>
      <div class="delivery__additional-information">
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
          <span class="additional-information__tooltip-switcher"
            >бесплатно</span
          >
          <div class="additional-information__tooltip sidebar_fontsize">
            Если товары вам не подойдут, мы вернем их обратно на склад — это
            бесплатно
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar__payment">
      <div class="payment__wrapper">
        <h3 class="payment__type sidebar__subtitle">Оплата картой</h3>
        <button class="payment__button button" data-modal-button>
          <svg
            class="sidebar__icon sidebar__icon_pen"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M13.1585 3.05991L16.9401 6.84154L6.72705 17.0546L2.73544 17.8529C2.38557 17.9229 2.07711 17.6144 2.14709 17.2646L2.94541 13.273L13.1585 3.05991ZM4.17707 13.9321L13.1585 4.95072L15.0493 6.84154L6.06789 15.8229L3.70436 16.2956L4.17707 13.9321Z"
              fill="#CB11AB"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.9948 7.78715L12.2132 4.00552L13.6313 2.5874C14.4145 1.8042 15.6843 1.8042 16.4675 2.5874L17.4129 3.53281C18.1961 4.31601 18.1961 5.58584 17.4129 6.36904L15.9948 7.78715ZM16.4675 5.42363C16.7286 5.16256 16.7286 4.73929 16.4675 4.47822L15.5221 3.53281C15.261 3.27174 14.8378 3.27174 14.5767 3.53281L14.104 4.00552L15.9948 5.89634L16.4675 5.42363Z"
              fill="#CB11AB"
            />
          </svg>
        </button>
      </div>
      <div class="payment__card sidebar_fontsize"><div class="payment__card-icon" data-element="cardIcon">${
        payments[this.cardNumber].icon
      }</div><span class="payment__card-number" data-element="cardNumber">${
      payments[this.cardNumber].number
    }</span></div>
      <div class="payment__additional-information">
        <label class="checkbox">
          <input type="checkbox" class="checkbox__input" data-element="paymentCheckbox"/>
          <div class="checkbox__state">
            <div class="checkbox__control payment__checkbox">
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
            <div
              class="checkbox__title checkbox__title-default sidebar_fontsize"
            >
              Списать оплату сразу
            </div>
          </div>
          <div class="payment__additional-information-sub sidebar_fontsize">
            Спишем оплату с карты при получении
          </div>
        </label>
      </div>
    </div>
    <div class="sidebar__order">
      <button class="button button_customed" data-element="paymentButton">Заказать</button>
      <div class="sidebar__agreement">
        <div class="agreement__icon">
          <svg
            width="13"
            height="24"
            viewBox="0 0 13 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.7657 4.68031L4.59586 13.4814L0.257324 8.66919L1.74276 7.32998L4.6174 10.5185L11.2999 3.31964L12.7657 4.68031Z"
              fill="black"
            />
          </svg>
        </div>
        <div class="agreement__text sidebar_fontsize">
          Соглашаюсь
          <a href="#">с правилами пользования торговой площадкой</a>
          и <a href="#">возврата</a>
        </div>
      </div>
    </div>
  </div>`;

    this.element = div.firstElementChild;
  }

  saveDataElements() {
    const dataElements = this.element.querySelectorAll("[data-element]");

    for (const dataElement of dataElements) {
      const elementName = dataElement.dataset.element;

      this.subElements[elementName] = dataElement;
    }
  }

  update(
    cart = this.cart,
    cardNumber = this.cardNumber,
    delivery = this.delivery
  ) {
    this.cart = cart;
    this.cardNumber = cardNumber;
    this.delivery = delivery;

    const updatedGoodsInfo = this.countData();

    for (const name in updatedGoodsInfo) {
      this.subElements[name].innerHTML = updatedGoodsInfo[name];
    }

    this.subElements["cardIcon"].innerHTML = payments[cardNumber].icon;
    this.subElements["cardNumber"].innerHTML = payments[cardNumber].number;

    this.changeDelivery(this.delivery);
  }

  changeDelivery(typeAndAddress) {
    const { type, number } = typeAndAddress;

    this.subElements["deliveryType"].innerHTML =
      type === "courier" ? "Курьерская доставка" : "Доставка в пункт выдачи";
    this.subElements["deliveryAddress"].innerHTML = addresses[type][number];
  }
}
