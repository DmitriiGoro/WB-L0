export class Delivery {
  subElements = {};
  onTabClick = (event) => {
    const closest = event.target.closest(".modal__tab");

    if (closest && closest.getAttribute("data-element") === "pickUpButton") {
      this.subElements["courier"].classList.remove("modal__delivery-visible");
      this.subElements["pick-up"].classList.add("modal__delivery-visible");
      this.subElements["courierButton"].classList.remove("modal__tab-active");
      this.subElements["pickUpButton"].classList.add("modal__tab-active");
    } else if (
      closest &&
      closest.getAttribute("data-element") === "courierButton"
    ) {
      this.subElements["pick-up"].classList.remove("modal__delivery-visible");
      this.subElements["courier"].classList.add("modal__delivery-visible");
      this.subElements["pickUpButton"].classList.remove("modal__tab-active");
      this.subElements["courierButton"].classList.add("modal__tab-active");
    }
  };

  sendAddressChoice = (event) => {
    const tab = event.target.closest("[data-tab]");

    if (tab) {
      const customEvent = this.makeCustomEvent(tab.dataset.tab);

      document.body.dispatchEvent(customEvent);
      this.close();
    }
  };

  onCloseClick = (event) => {
    const modalClose = event.target.closest(".modal__close");

    if (modalClose) {
      this.close();
    }
  };

  constructor() {
    this.render();
  }

  makeCustomEvent(type = "pickup") {
    const inputs = this.element.querySelectorAll(`[data-${type}]`);
    let checkedInput;

    for (const input of inputs) {
      if (input.checked) {
        checkedInput = input;
      }
    }

    const customEvent = new CustomEvent("delivery-changed", {
      bubbles: true,
      detail: { type, number: checkedInput.dataset[type] },
    });

    return customEvent;
  }

  open() {
    document.body.append(this.element);
  }

  close() {
    document.body.removeEventListener("keydown", this.closeByEsc);
    this.element.remove();
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="modal-wrapper">
    <div class="modal__overlay"></div>
    <div class="modal modal-delivery">
      <div class="modal__header">
        <h3>Способ доставки</h3>
        <div class="modal__header-icon modal__close">
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.92961 18.1568C4.53909 18.5473 4.53909 19.1805 4.92961 19.571C5.32014 19.9615 5.9533 19.9615 6.34383 19.571L12.0008 13.914L17.658 19.5711C18.0485 19.9616 18.6817 19.9616 19.0722 19.5711C19.4627 19.1806 19.4627 18.5474 19.0722 18.1569L13.4151 12.4998L19.0717 6.84309C19.4623 6.45257 19.4623 5.8194 19.0717 5.42888C18.6812 5.03835 18.0481 5.03836 17.6575 5.42888L12.0008 11.0856L6.34427 5.42899C5.95374 5.03846 5.32058 5.03846 4.93005 5.42899C4.53953 5.81951 4.53953 6.45267 4.93005 6.8432L10.5866 12.4998L4.92961 18.1568Z"
              fill="#9797AF"
            />
          </svg>
        </div>
      </div>
      <div class="modal__tabs">
        <button class="modal__tab modal__tab-pick-up modal__tab-active" data-element="pickUpButton">В пункт выдачи</button> 
        <button class="modal__tab modal__tab-courier" data-element="courierButton">Курьером</button>
      </div>
      <div class="modal__inner modal__inner-delivery">
        <h3 class="modal__title">Мои адреса</h3>
        <div
          class="modal__delivery modal__delivery-pick-up modal__delivery-visible"
          data-element="pick-up"
        >
          <div class="modal__list" data-element="list">
            <div class="modal__address">
              <div class="modal__address-wrapper">
                <label for="p-1" class="modal__radio-delivery">
                  <input
                    type="radio"
                    id="p-1"
                    name="1"
                    tabindex="1"
                    checked
                    data-pickup="1"
                  />
                  <span
                    >г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д.
                    67/1</span
                  >
                </label>

                <div class="modal__delete-button">
                  <svg
                    class="card__delete-svg card__delete-svg_delivery"
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
                </div>
              </div>
              <div class="modal__address_additional">
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
                <span>Пункт выдачи</span>
              </div>
            </div>
            <div class="modal__address">
              <div class="modal__address-wrapper">
                <label for="p-2" class="modal__radio-delivery">
                  <input
                    type="radio"
                    id="p-2"
                    name="1"
                    data-pickup="2"
                    tabindex="2"
                  />

                  <span
                    >г. Бишкек, микрорайон Джал, улица Ахунбаева Исы, д.
                    67/1</span
                  >
                </label>
                <div class="modal__delete-button">
                  <svg
                    class="card__delete-svg card__delete-svg_delivery"
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
                </div>
              </div>
              <div class="modal__address_additional">
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
                <span>4.99</span> <span>Пункт выдачи</span>
              </div>
            </div>
            <div class="modal__address">
              <div class="modal__address-wrapper">
                <label for="p-3" class="modal__radio-delivery">
                  <input
                    type="radio"
                    id="p-3"
                    name="1"
                    data-pickup="3"
                    tabindex="3"
                  />

                  <span>г. Бишкек, улица Табышалиева, д. 57</span>
                </label>
                <div class="modal__delete-button">
                  <svg
                    class="card__delete-svg card__delete-svg_delivery"
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
                </div>
              </div>
              <div class="modal__address_additional">
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
                <span>4.99</span><span> Пункт выдачи</span>
              </div>
            </div>
          </div>
          <div class="modal__button-container">
            <button
              data-tab="pickup"
              class="modal__button button button_customed modal__button_pick-up"
            >
              Выбрать
            </button>
          </div>
        </div>

        <div
          class="modal__delivery modal__delivery-courier"
          data-element="courier"
        >
          <div class="modal__list" data-element="list">
            <div class="modal__address modal__address_courier">
              <label for="c-1" class="modal__radio-delivery">
                <input
                  type="radio"
                  id="c-1"
                  name="2"
                  tabindex="1"
                  checked
                  data-courier="1"
                />
                <div></div>
                <span>Бишкек, улица Табышалиева, 57</span>
              </label>
              <div class="modal__delete-button">
                <svg
                  class="card__delete-svg card__delete-svg_delivery"
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
              </div>
            </div>
            <div class="modal__address modal__address_courier">
              <label for="c-2" class="modal__radio-delivery">
                <input
                  type="radio"
                  id="c-2"
                  name="2"
                  data-courier="2"
                  tabindex="2"
                />

                <span>Бишкек, улица Жукеева-Пудовкина, 77/1</span>
              </label>
              <div class="modal__delete-button">
                <svg
                  class="card__delete-svg card__delete-svg_delivery"
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
              </div>
            </div>
            <div class="modal__address modal__address_courier">
              <label for="c-3" class="modal__radio-delivery">
                <input
                  type="radio"
                  id="c-3"
                  name="2"
                  data-courier="3"
                  tabindex="3"
                />

                <span
                  >Бишкек, микрорайон Джал, улица Ахунбаева Исы, 67/1</span
                >
              </label>
              <div class="modal__delete-button">
                <svg
                  class="card__delete-svg card__delete-svg_delivery"
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
              </div>
            </div>
          </div>
          <div class="modal__button-container">
            <button class="modal__button button button_customed" data-tab="courier">
              Выбрать
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>`;

    this.element = div.firstElementChild;
  }

  render() {
    this.makeTemplate();
    this.addEventListeners();
    this.saveSubElements();
  }

  saveSubElements() {
    const dataElements = this.element.querySelectorAll("[data-element]");

    for (const element of dataElements) {
      const name = element.dataset.element;
      this.subElements[name] = element;
    }
  }

  addEventListeners() {
    this.element.addEventListener("click", this.sendAddressChoice);

    this.element.addEventListener("click", this.onTabClick);

    this.element.addEventListener("click", this.onCloseClick);

    document.body.addEventListener("keydown", this.closeByEsc);
  }

  closeByEsc = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}
