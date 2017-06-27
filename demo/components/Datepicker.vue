<template>
  <div class="demo">
        张士大夫士大夫
      <input type="text" v-datepicker="{onDateSelect:onDateSelect,dateTime:true}" class="datepicker">
      <input type="text" v-datepicker="{onDateSelect:onDateSelect,beforeClickDisabled: true}"  class="datepicker">
      <input type="text" v-datepicker="{onDateSelect:onDateSelect}"  class="datepicker">
      <input type="text" v-datepicker="{onDateSelect:onDateSelect}"  class="datepicker">
      <input type="text" v-datepicker="{onDateSelect:onDateSelect}"  class="datepicker">
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

