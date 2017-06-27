/**
 * Created by ex-pengzhiliang001 on 2017-06-26.
 */

export default {
    css(dom, css, style) {
        dom.style[css] = !/^(?:opacity|zIndex)$/.test(css) ? style + 'px' : style;
    },

    hasClass() {

    },

    addClass() {

    },

    removeClass() {

    },

    $(el, root = document) {
        return typeof el == 'string' ? root.querySelector(el) : el;
    },

    screenPosition(dom) {
        return dom.getBoundingClientRect();
    },

    domPosition(dom) {

    },

    bodyPosition(dom) {
        return {
            x: dom.offsetLeft,
            y: dom.offsetTop
        };
    },

    closest(el, selector) {
        var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

        while (el) {
            if (matchesSelector.call(el, selector)) {
                break;
            }
            el = el.parentElement;
        }
        return el;
    },

    removeElement(attr, duration = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.body.removeChild(document.querySelector(attr));
            }, duration);
        });
    }
};
