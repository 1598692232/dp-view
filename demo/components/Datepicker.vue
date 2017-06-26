<template>
  <div class="demo">
        张士大夫士大夫
      <input type="text" v-datepicker="{}">
  </div>
</template>

<script>
    import datepicker from 'com/directives/datepicker';

    export default {
        directives: {
            datepicker
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

