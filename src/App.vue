<template>
  <div id="app">
    <birthday-input />
  </div>
</template>

<script>
  import BirthdayInput from './components/BDayInput.vue'

  export default {
    name: 'app',
    components: {
      BirthdayInput
    },
    created() {
      document.title = 'Birthday Input Concept | Agentur-VIDA'
    }
  }
</script>

<style lang="scss">
  $main-font: 'Avenir',
  Helvetica,
  Arial,
  sans-serif;

  body,
  html {
    background: #f6f6f7;
    font-family: $main-font;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;

    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }
  }

  #app {
    align-items: center;
    display: flex;
    min-height: 100vh;
    justify-content: center;
    width: 100%;
  }
</style>