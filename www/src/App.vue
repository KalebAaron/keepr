<template>
  <div id="app">
    <img src="./assets/logo.jpg">
    <div class="user-name">
    <h3>Hello: {{this.user.name}}</h3>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
      user() {
        return this.$store.state.user
      },
  },
  mounted(){
    this.$store.dispatch('getAuth')
},
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b2b2b0;
  margin-top: 0px;
  margin-bottom: 0px;
  background-color: #161615;
  height: 100%;
  width: 100%;
}
.user-name{
  text-align: right;
}
</style>
