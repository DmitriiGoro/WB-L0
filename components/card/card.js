import { dividePrice } from "../../assets/utils/dividePrice.js";

export class Card {
  constructor(product) {
    this.product = product;
    this.makeTemplate();
  }

  makeTemplate() {
    const div = document.createElement("div");

    const { id, product, amount } = this.product;

    const { name, price, discount, size, color, remains, image, seller } =
      product;

    div.innerHTML = `<div class="card" data-product-id="${id}">
        <div class="card__checkbox">
          <label class="checkbox card__checkbox">
            <input type="checkbox" class="checkbox__input" checked data-checkbox="${id}"/>
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
              <div class="checkbox__title checkbox__title-default"></div>
            </div>
          </label>
        </div>
        <div class="card__preview">
          <img src="assets/images/${image}" />
          ${size ? `<span class="card__preview-size">${size}</span>` : ""}
        </div>
        <div class="card__info">
          <div class="card__info-wrapper">
            <h3 class="card__title">${name ? `${name}` : "Без названия"}</h3>
            ${
              size || color
                ? `<div class="card__additional-info card_fontsize">
              ${color ? `<span>Цвет: ${color}</span>` : ""}
              ${size ? `<span>Размер: ${size}</span>` : ""}
            </div>`
                : ""
            }

            <div class="card__saler">
              <div class="card__from">Коледино WB</div>
              <div class="card__company">
                ${seller.name ? `<span>${seller.name}</span>` : ""}
                <div class="card__info-icon">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="10" cy="10" r="7.5" stroke="#9797AF" />
                    <path
                      d="M9.88867 7.58691C9.62826 7.58691 9.41504 7.51042 9.24902 7.35742C9.08301 7.20117 9 7.01074 9 6.78613C9 6.55501 9.08301 6.36621 9.24902 6.21973C9.41504 6.07324 9.62826 6 9.88867 6C10.1523 6 10.3656 6.07324 10.5283 6.21973C10.6943 6.36621 10.7773 6.55501 10.7773 6.78613C10.7773 7.02051 10.6943 7.21257 10.5283 7.3623C10.3656 7.51204 10.1523 7.58691 9.88867 7.58691ZM10.6504 13.3779H9.10742V8.37793H10.6504V13.3779Z"
                      fill="#9797AF"
                    />
                  </svg>
                </div>
                <div class="card__company-tooltip">
                  <div class="tooltip__name">${seller.name}»</div>
                  <div class="tooltip__ogrn">ОГРН: ${seller.ogrn}</div>
                  <div class="tooltip__address">
                    ${seller.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div class="card__buttons">
            <div class="card__counter">
              <button
                class="card__button_minus card__button button"
                data-element-button="minusButton"
                ${amount === 1 ? `disabled` : ``}
              >
              −
              </button>
              <span class="card__total" data-element-changable="total">${amount}</span>
              <button
                class="card__button_plus card__button button"
                data-element-button="plusButton"
              >
                +
              </button>
            </div>
            ${
              remains <= 2
                ? `<div class="card__lost">Осталось ${remains} шт.</div>`
                : `<div class="card__lost" style="opacity: 0">Осталось 2 шт.</div>`
            }
            <div class="card__tabs">
              <button
                class="card__favourite button"
                data-element-tab="favouriteButton"
              >
                <svg
                  class="card__favourite-svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
              <button class="card__delete button" data-element-tab="deleteButton">
                <svg
                  class="card__delete-svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z"
                    fill="currentColor"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </div>

        <div class="card__price">
          <div class="card__current-price" data-element-changable="currentPrice" ${
            ((price - discount) * amount).toFixed(0).length > 3
              ? `data-font-size-16px`
              : `data-font-size-20px`
          }>${
      dividePrice(((price - discount) * amount).toFixed(0)) || 0
    } <span>сом</span></div>
          <div class="card__old-price" data-element-changable="oldPrice">${
            discount ? `${dividePrice((price * amount).toFixed(0))}` : ""
          } сом</div>
        </div>
      </div>`;

    this.element = div.firstElementChild;
  }
}
