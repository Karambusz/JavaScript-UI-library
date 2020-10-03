import $ from '../core';

$.prototype.addAttribute = function(attributeName, attributeValue = '') {
    for (let i = 0; i < this.length; i++) {
        console.log(this);
        if (!this[i].hasAttribute(attributeName)) {
            this[i].setAttribute(attributeName, attributeValue);
        } else {
            continue;
        }
        
    }
    return this;
};

$.prototype.removeAttribute = function(attributeName) {
    for (let i = 0; i < this.length; i++) {
        if (this[i].hasAttribute(attributeName)) {
            this[i].removeAttribute(attributeName);
        } else {
            continue;
        }
        
    }
    return this;
};
