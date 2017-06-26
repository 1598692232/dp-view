/**
 * Created by ex-pengzhiliang001 on 2017-06-26.
 */
import Vue from 'vue';
import Util from 'helper/util';
import datepicker from './datepicker.vue';

export default class DatepickerController {
	constructor(el, binding) {
		this._vm = null;
		this._el = el;
		this._binding = binding;
		this._util = new Util();
	}

	show () {
		if (!document.querySelector('[dp-datepicker]')) {
			this._util.createElement('dp-datepicker');
		}

		let Dob = Vue.extend(datepicker);
		this._vm = new Dob().$mount('[dp-datepicker]');
	}
}
