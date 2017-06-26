/**
 * Created by ex-pengzhiliang001 on 2017-06-26.
 */
import Dob from './datepickerController';

export default {
    bind(el, binding) {
        el.addEventListener('click', () => {
            let date = new Dob(el, binding);
            date.show();
        });
    }
};
