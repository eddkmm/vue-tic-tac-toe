import Vue from 'vue'
import Cell from '@/components/Cell'

describe('Cell.vue', () => {
  it('should render initial Cell', () => {
    const Constructor = Vue.extend(Cell)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent).toEqual('')
    expect(vm.$el.className).toEqual('ttt-cell')
  })
})
