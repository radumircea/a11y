function Modal(modal, open, close) {
    this.modal = modal;
    this.openBtn = document.querySelector(open);
    this.closeBtn =
        modal.querySelector(close) || modal.querySelector(".modal__close");
    this.overlay = modal.querySelector(".modal__overlay");
    const focusable =
        "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex], [contentEditable]";
    this.focusables = Array.prototype.slice.call(
        modal.querySelectorAll(focusable)
    );
    this.firstFocus = this.focusables[0];
    this.lastFocus = this.focusables[this.focusables.length - 1];
    this.openBtn.addEventListener("click", this.openHandler.bind(this));
    this.closeBtn.addEventListener("click", this.closeHandler.bind(this));
    this.overlay.addEventListener("click", this.closeHandler.bind(this));
    this.modal.addEventListener("keyup", this.closeHandler.bind(this));
    this.lastFocus.addEventListener("keydown", this.trapFocus.bind(this));
    this.firstFocus.addEventListener("keydown", this.trapFocus.bind(this));
}

Modal.prototype.openHandler = function () {
    this.previousFocus = document.activeElement;
    this.modal.classList.toggle("modal--open");
    this.modal.focus();
};

Modal.prototype.closeHandler = function (e) {
    //trigger: click + keyup
    if (e.type === "keyup" && !e.key === "Esc") return;
    this.modal.classList.toggle("modal--open");
    this.previousFocus.focus();
    this.previousFocus = null;
};

Modal.prototype.trapFocus = function (e) {
    if (e.keyCode === 9) {
        if (e.shiftKey && e.currentTarget === this.firstFocus) {
            e.preventDefault();
            this.lastFocus.focus();
        } else if (e.currentTarget === this.lastFocus) {
            e.preventDefault();
            this.firstFocus.focus();
        }
    }
};

//instance
let modal = new Modal(document.querySelector(".modal"), ".modal-open");