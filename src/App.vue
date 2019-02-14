<template>
  <div id="app">
    <Board :key="boardKey" v-on:reset-board="boardKey = !boardKey"/>
  </div>
</template>

<script>
import Board from './components/Board'

export default {
  name: 'App',
  data () {
    return {
      boardKey: false
    }
  },
  components: {
    Board
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
