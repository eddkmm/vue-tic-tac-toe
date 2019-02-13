<template>
  <div class="ttt-main-container">
    Tik Tak Toe
    <div
      v-if="gameStarted"
      class="ttt-board-container">
      Player {{playersTurn}}'s Turn
      <div class="ttt-board">
        <Cell
          v-for="(n, index) in 9"
          v-on:cell-clicked="processTurn"
          :key="index"
          :cell-id="index"
          :cell-value="cellArray[index].value"
          :cell-played="lastCellPlayed === index"
          :cell-disabled="cellArray[index].disabled"
        />
        <h2 v-if="winner">{{winner !== 'TIE' ? `${winner} wins!` : 'Tie!'}}</h2>
      </div>
    </div>
    <div
      v-else
      class="ttt-pregame">
      <button @click="startGame(false)">Play with a Human (turn based)</button>
      <button @click="startGame(true)">Play with an AI</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import Cell from './Cell'
export default {
  name: 'Board',
  data () {
    return {
      gameStarted: false,
      aiGame: false,
      playersTurn: '',
      turnCount: 0,
      lastCellPlayed: undefined,
      cellArray: _.times(9, (index) => {
        return {
          index,
          value: '',
          disabled: false
        }
      }),
      winner: ''
    }
  },
  methods: {
    startGame: function (aiGame) {
      this.gameStarted = true
      this.playersTurn = aiGame ? 'O' : 'X'
      this.aiGame = aiGame
      this.turnCount = 0

      this.processAiTurn()
    },
    processAiTurn: function () {
      if (this.playersTurn === 'O' && this.aiGame) {
        console.log('processAiTurn')

        this.processTurn(undefined, this.turnCount ? this.minimax(this.cellArray, 'O').index : 4)
      }
    },
    processTurn: function (event, cellId) {
      if (this.winner || this.cellArray[cellId] === undefined || this.cellArray[cellId].disabled) {
        return
      }

      this.lastCellPlayed = cellId

      this.turnCount++

      this.$set(this.cellArray, cellId, {
        index: cellId,
        value: this.playersTurn,
        disabled: true
      })

      if (this.isWinner(this.cellArray, this.playersTurn)) {
        this.winner = this.playersTurn
      } else if (_.every(this.cellArray, ['disabled', true])) {
        this.winner = 'TIE'
      } else {
        this.playersTurn = this.playersTurn === 'X' ? 'O' : 'X'

        this.processAiTurn()
      }
    },
    getAvailableCells: function (cells) {
      return cells.filter(c => c.value === '')
    },
    isWinner: function (cells, player) {
      if (
        (_.get(cells, '[0].value') === player && _.get(cells, '[1].value') === player && _.get(cells, '[2].value') === player) ||
        (_.get(cells, '[3].value') === player && _.get(cells, '[4].value') === player && _.get(cells, '[5].value') === player) ||
        (_.get(cells, '[6].value') === player && _.get(cells, '[7].value') === player && _.get(cells, '[8].value') === player) ||
        (_.get(cells, '[0].value') === player && _.get(cells, '[3].value') === player && _.get(cells, '[6].value') === player) ||
        (_.get(cells, '[1].value') === player && _.get(cells, '[4].value') === player && _.get(cells, '[7].value') === player) ||
        (_.get(cells, '[2].value') === player && _.get(cells, '[5].value') === player && _.get(cells, '[8].value') === player) ||
        (_.get(cells, '[0].value') === player && _.get(cells, '[4].value') === player && _.get(cells, '[8].value') === player) ||
        (_.get(cells, '[2].value') === player && _.get(cells, '[4].value') === player && _.get(cells, '[6].value') === player)
      ) {
        return true
      } else {
        return false
      }
    },
    minimax: function (clonedCellArray, player) {
      clonedCellArray = _.cloneDeep(clonedCellArray)

      const availableCells = this.getAvailableCells(clonedCellArray)

      // check for terminal states
      if (this.isWinner(clonedCellArray, 'X')) {
        return {score: -10}
      } else if (this.isWinner(clonedCellArray, 'O')) {
        return {score: 10}
      } else if (!availableCells.length) {
        return {score: 0}
      }

      // an array to collect all the objects
      const moves = []
      const ties = {}

      // loop through available spots
      for (let i = 0; i < availableCells.length; i++) {
        // create an object for each and store the index of that spot that was stored as a number in the object's index key
        const move = {}
        const j = availableCells[i].index
        move.index = j

        // set the empty spot to the current player
        clonedCellArray[j].value = player

        // if collect the score resulted from calling minimax on the opponent of the current player
        const result = this.minimax(clonedCellArray, player === 'O' ? 'X' : 'O')
        move.score = result.score

        if (!ties[`${move.score}`]) {
          ties[`${move.score}`] = []
        }

        // push the object to the array and keep track of ties (so we can randomly choose from them to give the human player a chance)
        moves.push(move)
        ties[`${move.score}`].push(move)
      }

      console.log(moves)

      // if it is the computer's turn loop over the moves and choose the move with the highest score
      let bestMove
      let bestScore

      if (player === 'O') {
        bestScore = -10000

        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score > bestScore) {
            bestScore = moves[i].score
            bestMove = i
          }
        }
      } else {
        // else loop over the moves and choose the move with the lowest score
        bestScore = 10000

        for (let i = 0; i < moves.length; i++) {
          if (moves[i].score < bestScore) {
            bestScore = moves[i].score
            bestMove = i
          }
        }
      }

      // return the chosen move (object) from the array to the higher depth
      return moves[bestMove]
    }
  },
  components: {
    Cell
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.ttt-board-container {
  padding: 50px;
}

.ttt-pregame {
  padding: 50px;
}

.ttt-board {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
  padding: 25px;
  max-width: 150px;
}
</style>
