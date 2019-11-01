const key = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}

function RadioGroup(el, setActive) {
    this.el = el;
    this.radios = Array.prototype.slice.call(el.querySelectorAll(".radio"));
    this.focused = el.querySelector(".radio[tabindex='0']");
    if (!this.focused) {
        this.focused = this.radios[0];
        this.focused.tabIndex = 0;
    }
    this.prevFocused = this.focused;
    this.focusedIndex = this.radios.indexOf(this.focused);

    this.el.addEventListener("click", handleClick.bind(this));
    this.el.addEventListener("keyup", handleKey.bind(this));
}

RadioGroup.prototype.switchFocus = function(index) {
    var prev = this.prevFocused = this.focused,
        curr = this.radios[index];
    
    prev.setAttribute("tabindex", "-1");
    prev.removeAttribute("aria-checked");
    curr.setAttribute("tabindex", "0");
    curr.setAttribute("aria-checked", true);
    //update state
    this.focused = curr;
    this.focusedIndex = index;
    //update focus
    this.focused.focus();
} 


function handleClick(e) {
    if (e.target.classList.contains("radio")) {
        this.switchFocus(this.radios.indexOf(e.target));
    }
};

function handleKey(e) {
    switch (e.keyCode) {
        case key.up:
        case key.left:
            e.preventDefault();
            this.focusedIndex = this.focusedIndex === 0 ? this.radios.length - 1 : this.focusedIndex - 1;
            this.switchFocus(this.focusedIndex);
            break;
        case key.down:
        case key.right:
            e.preventDefault();
            this.focusedIndex = this.focusedIndex === this.radios.length - 1 ? 0 : this.focusedIndex  + 1;
            this.switchFocus(this.focusedIndex);
            break;
    }
};

//instance
var radioGroup = new RadioGroup(document.querySelector(".radiogroup"));

//future considerations

