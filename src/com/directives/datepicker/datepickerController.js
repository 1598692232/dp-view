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
        this._binding = binding;
        this._options = binding.value;
        console.log(binding);
        this._util = new Util();
        // this._date = new Date();
    }

    show () {
        if (!document.querySelector('[dp-datepicker]')) {
            this._util.createElement('dp-datepicker');
        }

        let Dob = Vue.extend(datepicker);
        let offset = _.screenPosition(this._el);
        this._vm = new Dob({
            propsData: {
                // id: this._date,
                el: [this._el],
                onDateSelect: this._options.onDateSelect,
                dateTime: this._options.dateTime || false,
                position: {
                    x: offset.left,
                    y: offset.top + offset.height
                }
            }
        }).$mount('[dp-datepicker]');
    }

    hide() {

    }
}
