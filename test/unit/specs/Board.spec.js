import Vue from 'vue'
import Board from '@/components/Board'

describe('Board.vue', () => {
  it('should render initial Board', () => {
    const Constructor = Vue.extend(Board)
    const vm = new Constructor().$mount()

    expect(vm.$el.textContent).toContain('Tik Tak Toe')
    expect(vm.$el.querySelector('button:first-of-type').textContent).toEqual('Play with a Human (turn based)')
    expect(vm.$el.querySelector('button:last-of-type').textContent).toEqual('Play with an AI')
  })

  it('should be able to start game', () => {
    const Constructor = Vue.extend(Board)
    const vm = new Constructor().$mount()

    vm.startGame(false)

    Vue.nextTick(function () {
        expect(vm.$el.querySelector('.ttt-board-container').textContent).toContain('Player X\'s Turn')
    })
  })
})
