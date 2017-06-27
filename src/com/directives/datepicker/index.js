/**
 * Created by ex-pengzhiliang001 on 2017-06-26.
 */
import Dob from './datepickerController';
import _ from 'helper/helper';

document.addEventListener('click', (e) => {
    if (!_.closest(e.target, '[dp-datepicker]') && e.target.attributes['dp-date'] == undefined) {
        if (document.querySelector('[dp-datepicker]')) {
            _.removeElement('[dp-datepicker]');
        }
    }
}, false);

export default {
    bind(el, binding, vn) {
        let date = null;
        vn.elm.setAttribute('dp-date', '');
        el.addEventListener('click', () => {
            console.log(vn, 9999);
            date = new Dob(el, binding);
            date.show();
        });
    }
};
