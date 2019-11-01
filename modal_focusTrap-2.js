function Modal(modal, trigger) {
    //internal
    const focusable =
        "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, [tabindex], [contentEditable]",
        focusables = Array.prototype.slice.call(
            modal.querySelectorAll(focusable)
        ),
        extras = {
            create: function(action, _this) {
                return function (e) {
                    if (action._if(e)) _this[action._do]();
                };
            },
            escKey: {
                _if: function (e) {
                    return e.key === "Escape";
                },
                _do: "close"
            }
        };
    //refs
    this.modal = modal;
    this.openBtn = document.querySelector(trigger);
    this.closeBtn = this.modal.querySelector(".modal__close");
    this.overlay = this.modal.querySelector(".modal__overlay");
    this.first = focusables[0];
    this.last = focusables[focusables.length - 1];

    this.modal.setAttribute("tabindex", "-1");
    //open
    this.openBtn.addEventListener("click", this.open.bind(this));
    //close
    this.closeBtn.addEventListener("click", this.close.bind(this));
    this.overlay.addEventListener("click", this.close.bind(this));
    this.modal.addEventListener("keyup", extras.create(extras.escKey, this));
    // this.modal.addEventListener("keyup", this.closeEsc.bind(this));
    //trap focus
    this.first.addEventListener("keydown", this.trap.bind(this));
    this.last.addEventListener("keydown", this.trap.bind(this));
}

Modal.prototype.open = function () {
    this.prevFocus = document.activeElement;
    this.modal.classList.add("modal--open");
    this.modal.focus(); //instead of focusing on first focusable
};

Modal.prototype.close = function () {
    this.modal.classList.remove("modal--open");
    this.prevFocus.focus();
};

Modal.prototype.closeEsc = function (e) {
    if (e.key === "Escape") {
        e.preventDefault();
        this.close();
    }
};

Modal.prototype.trap = function (e) {
    console.log(e.key);
    if (e.key === "Tab") {
        if (e.shiftKey) {
            if (document.activeElement === this.first) {
                e.preventDefault();
                this.last.focus();
            }
        } else {
            if (document.activeElement === this.last) {
                e.preventDefault();
                this.first.focus();
            }
        }
    }
};

//instance
let modal = new Modal(document.querySelector(".modal"), ".modal-open");