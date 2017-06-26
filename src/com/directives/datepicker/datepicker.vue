<template>
    <div dp-datepicker>
        <header>
            <div class="prev">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
            <div class="title">
                {{ currentYear }}
            </div>
            <div class="next">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
        </header>
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
            <tbody id="dp-render-date">
                <tr v-for="(item, k) in daysGroupAll">
                    <td v-for="(date, i) in item" :data-date="date.val">
                         {{ date.label }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
//    import 'assets/css/font-awesome.css';
//    import _ from 'helper/helper';

    const [BIG_MONTHS, SMALL_MONTHS] = [[1, 3, 5, 7, 8, 10, 12], [4, 6, 9, 11]];

    function getDays(month, year) {
        var days = 0;
        if (BIG_MONTHS.indexOf(month) > -1) {
            days = 31;
        } else if (SMALL_MONTHS.indexOf(month) > -1) {
            days = 30;
        } else {
            days = year % 100 === 0 ? (year % 400 === 0 ? 29 : 28 ) : (year % 4 === 0 ? 29 : 28);
        }
        return days;
    }

    const date = new Date();
    const [CURRENT_YEAR,
        CURRENT_MONTH,
        CURRENT_DAYS,
        CURRENT_DAY,
        CURRENT_DATE] = [
            date.getFullYear(),
            date.getMonth() + 1,
            getDays(date.getMonth() + 1),
            date.getDay(),
            date.getDate()];

    export default {
        props: {

        },

        data() {
            return {
                calendarDays: [],
                daysGroupAll: [],
                currentYear: CURRENT_YEAR,
                currentMonth: CURRENT_MONTH,
                currentDay: CURRENT_DATE,
                currentDate: `${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}`
            };
        },

        mounted() {
            this.renderDate(CURRENT_DAY, CURRENT_DAYS);
        },

        methods: {
            renderDate(date, days) {
                for (let i = 1; i <= days; i++) {
                    let d = {
                        label: i,
                        val: `${this.currentYear}-${this.currentMonth}-${i}`
                    };
                    this.calendarDays.push(d);
                }

                for (let i = 0; i < date; i++) {
                    this.calendarDays.unshift({});
                }

                let lastTds = 5 * 7 - this.calendarDays.length;

                for (let i = 0; i < lastTds; i++) {
                    this.calendarDays.push({});
                }

                let daysGroup = [];
                for (let i = 0; i < this.calendarDays.length; i++) {
                    daysGroup.push(this.calendarDays[i]);
                    if ((i + 1) % 7 === 0) {
                        this.daysGroupAll.push(daysGroup);
                        daysGroup = [];
                    }
                }
            }
        }
    };
</script>
<style lang="less">
    [dp-datepicker]{
        position: fixed;
        left:10%;
        width:300px;
        margin:0 auto;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 1px 6px rgba(0,0,0,.2);
        font-size: 12px;
        text-align:center;
        padding: 10px;
        line-height: 2;
        transform-origin:50% 0;
        transform: scale(0);
        animation:datepicker-animate 450ms cubic-bezier(0.23, 1, 0.32, 1) forwards;
        header{
            width:100%;
            & > div {
                float: left;
                cursor: pointer;
            }
            .prev{
                width:10%;
                &:hover{
                    background: #e2dee2;
                 }
            }
            .title{
                width:80%;
            }
            .next{
                width:10%;
                &:hover{
                     background: #e2dee2;
                 }
            }
        }
        table {
            width:100%;
            tbody{
                td{
                    cursor: pointer;
                }
            }
        }
    }

    @keyframes datepicker-animate {
        0% {
            transform: scale(0);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
