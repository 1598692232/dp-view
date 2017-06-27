<template>
    <div dp-datepicker>
        <div>
            <header>
                <div class="prev" @click="toPrevMonth">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div class="title">
                    {{ currentYear }}年{{ currentMonth }}月
                </div>
                <div class="next" @click="toNextMonth">
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
                    <td v-for="(date, i) in item" :data-date="date.val"
                        @click="_selectDate($event, date.val, k, i)" :class="{today:date.val==currentDate}">
                        {{ date.label }}
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="time-body">
                <ul class= 'list'>
                    <li>
                        <ul class="time-list">
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                            <li>1</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
//    import 'assets/css/font-awesome.css';
    import _ from 'helper/helper';

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
    const CURRENT_DATE =  date.getDate();
    date.setDate(1);
    const [CURRENT_YEAR,
        CURRENT_MONTH,
        CURRENT_DAYS,
        START_DAY] = [
            date.getFullYear(),
            date.getMonth() + 1,
            getDays(date.getMonth() + 1),
            date.getDay()];

    export default {
        props: {
            el: {
                type: Array
            },

            position: {
                type: Object
            },

            onDateSelect: {
                type: Function
            }
        },

        data() {
            return {
                calendarDays: [],
                daysGroupAll: [],
                currentYear: CURRENT_YEAR,
                currentMonth: CURRENT_MONTH,
                m: CURRENT_MONTH - 1,
                currentDay: CURRENT_DATE,
                currentDate: `${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}`
            };
        },

        mounted() {
            this._renderDate(START_DAY, CURRENT_DAYS);
            let $picker = _.$('[dp-datepicker]');
            _.css($picker, 'left', this.position.x);
            _.css($picker, 'top', this.position.y);
        },

        methods: {
            _renderDate(date, days) {
                this.calendarDays = [];
                this.daysGroupAll = [];
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

                let lastTds = 6 * 7 - this.calendarDays.length;

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
                console.log(this.daysGroupAll, 8484);

                return this;
            },

            toPrevMonth() {
                this.currentMonth--;
                if (this.currentMonth == 0) {
                    this.currentYear--;
                    this.currentMonth = 12;
                    this.m = 11;
                    date.setYear(this.currentYear);
                    date.setMonth(this.m);
                } else {
                    date.setMonth(--this.m);
                }
                let days = getDays(this.currentMonth, this.currentYear);
                date.setDate(1);
                this._renderDate(date.getDay(), days);
            },

            toNextMonth() {
                this.currentMonth++;
                if (this.currentMonth == 13) {
                    this.currentYear++;
                    this.currentMonth = 1;
                    this.m = 0;
                    date.setYear(this.currentYear);
                    date.setMonth(this.m);
                } else {
                    date.setMonth(++this.m);
                }
                let days = getDays(this.currentMonth, this.currentYear);
                date.setDate(1);
                this._renderDate(date.getDay(), days);
            },

            _selectDate(e, val, k, i) {
                this.el[0].setAttribute('value', val);
                this.onDateSelect(val, {year: this.currentYear, month: this.currentMonth, day: this.currentDay}, e);
            }
        }
    };
</script>
<style lang="less">
    [dp-datepicker]{
        position: fixed;
        /*left:10%;*/
        width:250px;
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
        & > div{
            position: relative;
        }
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
                .today{
                    background: #eb5370;
                    color: #fff;
                }
            }
        }
        .time-body{
            position: absolute;
            left: 0;
            top: 0;
            width:100%;
            height:100%;
            background: #fff;
            .list{
                &:after{
                    content:'';
                    display: block;
                    clear: both;
                 }
                width:100%;
                li{
                    list-style: none;
                    width:33.33%;
                    float:left;
                    .time-list{
                        position: relative;
                        width:100%;
                        max-height:184px;
                        overflow:auto;
                        li{
                            width:100%;
                            line-height: 30px;
                            text-align: center;
                        }
                    }
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
