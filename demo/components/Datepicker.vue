<template>
  <div class="demo">
      <header>datepicker</header>
      <input type="text" v-datepicker="{onDateSelect:onDateSelect,dateTime:true, minTime:'seconds'}" class="datepicker">
      <input type="text" v-datepicker="{onDateSelect:onDateSelect,beforeClickDisabled: true}" class="datepicker">
      <input type="text" v-datepicker="{onDateSelect:onDateSelect,beforeClickDisabled: true,dateTime:true}" class="datepicker">
  </div>
</template>

<script>
    import datepicker from 'com/directives/datepicker';

    export default {
        directives: {
            datepicker
        },

        methods: {
            onDateSelect: function(val) {
                console.log(val);
            }
        }
    };
</script>
<style>
    input{
        line-height:44px;
        border:1px solid #b4b472;
        border-radius: 3px;
        padding:0 10px;
    }
</style>

