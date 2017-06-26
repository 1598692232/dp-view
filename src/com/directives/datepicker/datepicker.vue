<template>
    <div dp-datepicker>
        <table>
            <thead>
                <tr>
                    <td>日</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>四</td>
                    <td>五</td>
                    <td>六</td>
                </tr>
            </thead>
            <tbody id="render-date">

            </tbody>
        </table>
    </div>
</template>
<script>
//    import _ from 'helper/helper';

    const date = new Date();
    const [CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAYS] = [date.getFullYear(), date.getMonth() + 1, date.getDay()];
    console.log(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAYS, 9999);

    export default {
        props: {

        },

        data() {
            return {

            };
        },

        mounted() {

        }
    };
</script>
<style>

</style>
