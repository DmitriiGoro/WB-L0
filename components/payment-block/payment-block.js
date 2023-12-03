export class Payment {
  static payment;

  onButtonClick = (event) => {
    const button = event.target.closest(".modal__button");
    const closeButton = event.target.closest(".modal__close");

    if (button) {
      const inputs = this.element.querySelectorAll("input");

      let checkedInput;

      for (const input of inputs) {
        if (input.checked) {
          checkedInput = input;
        }
      }

      const customEvent = new CustomEvent("payment-changed", {
        bubbles: true,
        detail: checkedInput.dataset.card,
      });

      document.body.dispatchEvent(customEvent);
      this.close();
    } else if (closeButton) {
      this.close();
    }
  };

  constructor() {
    if (Payment.payment) {
      return Payment.payment;
    }
    this.render();
  }

  open() {
    document.body.append(this.element);
    document.body.classList.add("modal-open");
  }

  close() {
    this.element.remove();
    document.body.classList.remove("modal-open");
  }

  makeTemplate() {
    const div = document.createElement("div");

    div.innerHTML = `<div class="modal-wrapper">
    <div class="modal__overlay"></div>
    <div class="modal">
      <div class="modal__header">
        <h3>Способ оплаты</h3>
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
      <div class="modal__inner">
        <div class="modal__payment">
          <div class="modal__cards" data-element="cards">
            <label for="m-option" class="modal__radio">
              <input
                type="radio"
                id="m-option"
                name="1"
                tabindex="1"
                checked
                data-card="1"
              />
              <div>
                <svg
                  class="modal__icon"
                  width="30"
                  height="11"
                  viewBox="0 0 30 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.682 2.34377L14.8652 6.2583H14.6814V1.50031H12.0859V9.50239H14.238C14.8219 9.50239 15.341 9.16717 15.5898 8.64811L17.4174 4.74439H17.6012V9.50239H20.1966V1.50031H18.0121C17.4498 1.50031 16.9199 1.83553 16.682 2.34377Z"
                    fill="#319B42"
                  />
                  <path
                    d="M6.97268 2.54923L5.90207 6.2583H5.71823L4.6368 2.54923C4.45296 1.92204 3.8798 1.50031 3.23095 1.50031H0.667969V9.50239H3.26339V4.74439H3.44723L4.9396 9.50239H6.66988L8.16225 4.74439H8.34609V9.50239H10.9415V1.50031H8.37853C7.72968 1.50031 7.14571 1.92204 6.97268 2.54923Z"
                    fill="#319B42"
                  />
                  <path
                    d="M21.3247 5.06739V9.50239H23.9209V6.90629H26.7119C27.9235 6.90629 28.9512 6.13828 29.3298 5.06739H21.3247Z"
                    fill="#319B42"
                  />
                  <path
                    d="M26.636 1.50031H20.8594C21.2164 3.40411 22.8823 4.74543 24.8836 4.74543H29.3729C29.4054 4.57235 29.427 4.37765 29.427 4.18294C29.427 2.6361 28.183 1.50031 26.636 1.50031Z"
                    fill="url(#paint0_linear_17_1071)"
                  />
                  <defs>
                    <linearGradient
                      id="paint0_linear_17_1071"
                      x1="20.8594"
                      y1="3.12287"
                      x2="29.427"
                      y2="3.12287"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#00A3E1" />
                      <stop offset="0.3042" stop-color="#009ADD" />
                      <stop offset="0.7987" stop-color="#0082D4" />
                      <stop offset="1" stop-color="#0076CF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span>1234 56•• •••• 1234</span>
            </label>
            <label for="v-option" class="modal__radio">
              <input type="radio" id="v-option" name="1" data-card="2" tabindex="2" />
              <svg
                class="modal__icon"
                width="32"
                height="13"
                viewBox="0 0 32 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.4709 4.67817C16.453 6.08581 17.7254 6.87134 18.6838 7.33838C19.6686 7.81763 19.9994 8.12493 19.9956 8.55341C19.9881 9.20931 19.21 9.49869 18.4818 9.50995C17.2113 9.52967 16.4727 9.16698 15.8855 8.89262L15.4279 11.0341C16.017 11.3057 17.108 11.5425 18.2394 11.5528C20.8949 11.5528 22.6323 10.242 22.6418 8.2095C22.6521 5.6301 19.0738 5.48725 19.0982 4.33426C19.1067 3.98472 19.4403 3.61163 20.1713 3.51674C20.5331 3.46886 21.532 3.43217 22.6643 3.95366L23.1087 1.88176C22.4998 1.65997 21.7171 1.44757 20.7427 1.44757C18.2431 1.44757 16.485 2.77627 16.4709 4.67817ZM27.3796 1.6261C26.8947 1.6261 26.4859 1.90899 26.3037 2.3431L22.5102 11.4006H25.1638L25.6919 9.94125H28.9347L29.241 11.4006H31.5799L29.5389 1.6261H27.3796ZM27.7507 4.26659L28.5165 7.93694H26.4192L27.7507 4.26659ZM13.2535 1.6261L11.1618 11.4006H13.6904L15.7812 1.6261H13.2535ZM9.51266 1.6261L6.88061 8.27897L5.81595 2.62215C5.69101 1.99074 5.19768 1.6261 4.64982 1.6261H0.347122L0.286962 1.90992C1.17028 2.10159 2.17385 2.41077 2.78179 2.74153C3.15386 2.94353 3.2601 3.12018 3.38222 3.60037L5.39874 11.4006H8.07123L12.1682 1.6261H9.51266Z"
                  fill="#1434CB"
                />
              </svg>

              <span>1234 56•• •••• 1234</span>
            </label>
            <label for="mc-option" class="modal__radio">
              <input type="radio" id="mc-option" name="1" data-card="3" tabindex="3" />
              <svg
                class="modal__icon"
                width="24"
                height="15"
                viewBox="0 0 24 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M22.9337 11.8367V11.5649H22.8629L22.781 11.7514L22.6996 11.5649H22.6286V11.8367H22.6788V11.632L22.7554 11.8086H22.8075L22.884 11.6315V11.8367H22.9339H22.9337ZM22.4846 11.8367V11.6115H22.5752V11.5656H22.3438V11.6115H22.4343V11.8367H22.4846Z"
                  fill="#F79410"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8883 13.0014H8.76367V1.99463H14.8884L14.8883 13.0014Z"
                  fill="#FF5F00"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.15147 7.49987C9.15147 5.26713 10.1969 3.27821 11.8248 1.99643C10.5928 1.02498 9.06814 0.497414 7.49923 0.499764C3.63356 0.499764 0.5 3.63376 0.5 7.49987C0.5 11.3659 3.63356 14.4999 7.49923 14.4999C9.06814 14.5023 10.5929 13.9747 11.8249 13.0032C10.1971 11.7217 9.15147 9.73269 9.15147 7.49987Z"
                  fill="#EB001B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.1497 7.49987C23.1497 11.3659 20.0161 14.4999 16.1505 14.4999C14.5814 14.5022 13.0565 13.9747 11.8242 13.0032C13.4526 11.7215 14.498 9.73269 14.498 7.49987C14.498 5.26699 13.4526 3.27821 11.8242 1.99643C13.0564 1.02498 14.5813 0.497487 16.1504 0.499763C20.016 0.499763 23.1496 3.63376 23.1496 7.49987"
                  fill="#F79410"
                />
              </svg>

              <span>1234 56•• •••• 1234</span>
            </label>
            <label for="ma-option" class="modal__radio">
              <input type="radio" id="ma-option" name="1" data-card="4" tabindex="4" />
              <svg
                class="modal__icon"
                width="24"
                height="15"
                viewBox="0 0 24 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.8883 13.0017H8.76367V1.99487H14.8884L14.8883 13.0017Z"
                  fill="#6C6BBD"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.15147 7.50012C9.15147 5.26738 10.1969 3.27845 11.8248 1.99668C10.5928 1.02523 9.06814 0.497658 7.49923 0.500008C3.63356 0.500008 0.5 3.63401 0.5 7.50012C0.5 11.3662 3.63356 14.5002 7.49923 14.5002C9.06814 14.5025 10.5929 13.9749 11.8249 13.0035C10.1971 11.7219 9.15147 9.73293 9.15147 7.50012Z"
                  fill="#EB001B"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M23.1497 7.50012C23.1497 11.3662 20.0161 14.5002 16.1505 14.5002C14.5814 14.5024 13.0565 13.9749 11.8242 13.0035C13.4526 11.7217 14.498 9.73293 14.498 7.50012C14.498 5.26723 13.4526 3.27845 11.8242 1.99668C13.0564 1.02523 14.5813 0.497731 16.1504 0.500007C20.016 0.500007 23.1496 3.63401 23.1496 7.50012"
                  fill="#0099DF"
                />
              </svg>

              <span>1234 56•• •••• 1234</span>
            </label>
          </div>
          <div class="modal__button-container">
            <button class="modal__button button button_customed">
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

    this.chosenCard = 1;
    Payment.payment = this;
  }

  addEventListeners() {
    this.element.addEventListener("click", this.onButtonClick);

    document.body.addEventListener("keydown", this.closeByEsc);
  }

  closeByEsc = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  };
}
