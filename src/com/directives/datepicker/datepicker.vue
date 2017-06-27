<template>
    <div dp-datepicker>
        <div>
            <header>
                <div class="prev" @click="_toPrevMonth">
                    <i class="fa fa-chevron-left" aria-hidden="true"></i>
                </div>
                <div class="title">
                    {{ currentYear }}年{{ currentMonth }}月
                </div>
                <div class="next" @click="_toNextMonth">
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
                        @click="_selectDate($event, date.val, date)" :class="{today:date.val == today,'time-active':date.active,'disabled':date.disabled}">
                        {{ date.label }}
                    </td>
                </tr>
                </tbody>
            </table>

            <transition name="scale">

                <div class="time-body" v-if="timeShow">
                    <ul class= 'list'>
                        <li>
                            <ul class="time-list">
                                <li v-for="(item, i) in hours" @click="_selectTime('hours','currentHour', i)" :class="{'time-active':item.active}">{{item.label}}</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="time-list">
                                <li v-for="(item, i) in minutes" @click="_selectTime('minutes','currentMinute',i)" :class="{'time-active':item.active}">{{item.label}}</li>
                            </ul>
                        </li>
                        <li>
                            <ul class="time-list">
                                <li v-for="(item, i) in seconds" @click="_selectTime('seconds','currentSecond',i)" :class="{'time-active':item.active}">{{item.label}}</li>
                            </ul>
                        </li>
                    </ul>
                    <footer class="timer-footer">
                        <button @click="_changeTimeShow">取消</button>
                        <button @click="_sureTime">确定</button>
                    </footer>
                </div>
            </transition>

        </div>
    </div>
</template>
<script>
    import _ from 'helper/helper';

    const [BIG_MONTHS, SMALL_MONTHS] = [[1, 3, 5, 7, 8, 10, 12], [4, 6, 9, 11]];

    function getDays(month, year) {
        let days = 0;
        if (BIG_MONTHS.indexOf(month) > -1) {
            days = 31;
        } else if (SMALL_MONTHS.indexOf(month) > -1) {
            days = 30;
        } else {
            days = year % 100 === 0 ? (year % 400 === 0 ? 29 : 28 ) : (year % 4 === 0 ? 29 : 28);
        }
        return days;
    }

    function getHours() {
        let hoursArgs = [];
        for (let i = 0; i < 24; i++) {
            hoursArgs.push({
                label: i < 10 ? '0' + i : i,
                val: i,
                active: false
            });
        }
        return hoursArgs;
    }

    function getMinutesOrSeconds() {
        let minutesOrSecondsArgs = [];
        for (let i = 0; i < 60; i++) {
            minutesOrSecondsArgs.push({
                label: i < 10 ? '0' + i : i,
                val: i,
                active: false
            });
        }
        return minutesOrSecondsArgs;
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
                type: Array      //binding元素
            },

            position: {
                type: Object     //显示位置
            },

            onDateSelect: {       //选择之后触发
                type: Function
            },

            dateTime: {           //是否显示时间表
                type: Boolean,
                default: false
            },

            beforeClickDisabled: {  //今天之前是否可点击
                type: Boolean,
                default: false
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
                currentHour: '00',
                currentMinute: '00',
                currentSecond: '00',
                currentDate: '',
                today: `${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}`,
                hours: getHours(),
                minutes: getMinutesOrSeconds(),
                seconds: getMinutesOrSeconds(),
                timeShow: false
            };
        },

        computed: {
            currentTime() {
                return `${this.currentHour}:${this.currentMinute}:${this.currentSecond}`;
            }
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
                        val: `${this.currentYear}-${this.currentMonth}-${i}`,
                        active: false,
                        disabled: false
                    };

                    // 过去日期变成disabled
                    if (this.beforeClickDisabled) {
                        let nowDateNumber = new Date(Date.parse(`${CURRENT_YEAR}-${CURRENT_MONTH}-${CURRENT_DATE}`.replace(/-/g, '/')));
                        let dDateNumber = new Date(Date.parse(d.val.replace(/-/g, '/')));
                        if (nowDateNumber > dDateNumber) {
                            d.disabled = true;
                        }
                    }

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

                return this;
            },

            _toPrevMonth() {
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

            _toNextMonth() {
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

            _selectDate(e, val, date) {
                if (date.disabled || Object.keys(date).length == 0) return;

                this.currentDate = val;
                this.daysGroupAll.forEach((v, k) => {
                    v.forEach((v1, k1) => {
                        v1.active = false;
                    });
                });
                date.active = true;
                if (this.dateTime) {
                    this.timeShow = true;
                } else {
                    this.el[0].setAttribute('value', val);
                    this.onDateSelect(val, {year: this.currentYear, month: this.currentMonth, day: this.currentDay}, e);
                }
            },

            _selectTime(o1, o2, i) {
                this[o1].forEach(v => {
                    v.active = false;
                });
                this[o2] = this[o1][i].label;
                this[o1][i].active = true;
            },

            _changeTimeShow() {
                this.timeShow = false;
            },

            _sureTime() {
                let dateTime = this.currentDate + ' ' + this.currentTime;
                this.el[0].setAttribute('value', dateTime);
                this.onDateSelect(dateTime, {year: this.currentYear, month: this.currentMonth, day: this.currentDay});
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
                .time-active{
                    background: #5a80f8 ;
                    color:#fff;
                }
                .disabled{
                    color:#fff;
                    background: #e1e1e1;
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
                        max-height:154px;
                        overflow:auto;
                        li{
                            width:100%;
                            line-height: 30px;
                            text-align: center;
                            cursor: pointer;
                        }
                        .time-active{
                            background: #5a80f8 ;
                            color:#fff;
                        }
                    }
                }
            }
            .timer-footer{
                width:100%;
                margin-top:5px;
                button{
                    display: inline-block;
                    line-height:25px;
                    border-radius:3px;
                    padding:0 15px;
                    border:0;
                    color:#fff;
                    cursor:pointer;
                    &:first-of-type{
                        float: left;
                        background: #bdc8ca;
                     }
                    &:last-of-type{
                         float: right;
                         background: #5a80f8;
                     }
                }
                &:after{
                    content:'';
                    display:block;
                    clear:both;
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
    .scale-enter-active, .scale-leave-active {
        transition: transform 450ms cubic-bezier(0.23, 1, 0.32, 1);
        transform-origin:50% 0;
        transform: scale(1)
    }
    .scale-enter, .scale-leave-to {
        transform: scale(0)
    }
</style>
