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
    }

    // l2camel(str) {
    //     return str.replace(/-(\w)/g, (all, c, index) => {
    //         console.log(all, c, index, 999);
    //         return index > 0 ? c.toUpperCase() : c;
    //     });
    // },

    // css(element, name, value) {
    //     if (typeof name === 'object') {
    //         for (var key in name) {
    //             this.css(element, key, name[key]);
    //         }
    //     } else {
    //         var camel = this.l2camel(name);
    //
    //         if (typeof value === 'undefined') {
    //             console.log(window.getComputedStyle(element).getPropertyValue(camel));
    //             return window.getComputedStyle(element).getPropertyValue(camel);
    //         } else {
    //             value += (typeof value === 'number' && !/^(?:opacity|zIndex)$/.test(camel) ? 'px' : '');
    //             element.style[camel] = value;
    //         }
    //     }
    // }
};
