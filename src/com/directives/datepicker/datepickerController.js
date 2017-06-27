/**
 * Created by ex-pengzhiliang001 on 2017-06-26.
 */
import Vue from 'vue';
import Util from 'helper/util';
import datepicker from './datepicker.vue';
import _ from 'helper/helper';

export default class DatepickerController {
    constructor(el, binding) {
        this._vm = null;
        this._el = el;
        this._options = binding.value;
        this._util = new Util();
    }

    show () {
        if (!document.querySelector('[dp-datepicker]')) {
            this._util.createElement('dp-datepicker');
        }

        let Dob = Vue.extend(datepicker);
        let offset = _.screenPosition(this._el);
        console.log(offset, 99);
        this._vm = new Dob({
            propsData: {
                el: [this._el],
                onDateSelect: this._options.onDateSelect,
                position: {
                    x: offset.left,
                    y: offset.top + offset.height
                }
            }
        }).$mount('[dp-datepicker]');
    }
}
