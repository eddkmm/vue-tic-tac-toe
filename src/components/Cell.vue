<template>
  <div class="ttt-cell" :class="{'ttt-cell-played': cellPlayed}" @click="$emit('cell-clicked', $event, cellId)">{{cellValue}}</div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    cellId: Number,
    cellValue: String,
    cellPlayed: Boolean,
    cellDisabled: Boolean
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .ttt-cell {
    display: flex;
    flex: 0 0 32%;
    height: 50px;
    justify-content: center;
    align-items: center;
    border: solid 1px;
  }

  .ttt-cell-played {
    background-color: #dddddd;
  }

  .ttt-cell > input {
    width: 10px;
  }
</style>
