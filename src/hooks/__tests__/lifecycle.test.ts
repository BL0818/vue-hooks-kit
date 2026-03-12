import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { useMounted, useUnmount, useUpdate } from '../basic/lifecycle'

describe('Lifecycle Hooks', () => {
  it('useMounted', async () => {
    const fn = vi.fn()
    const Component = defineComponent({
      setup() {
        useMounted(fn)
        return {}
      },
      template: '<div></div>'
    })

    mount(Component)
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('useUnmount', async () => {
    const fn = vi.fn()
    const Component = defineComponent({
      setup() {
        useUnmount(fn)
        return {}
      },
      template: '<div></div>'
    })

    const wrapper = mount(Component)
    expect(fn).toHaveBeenCalledTimes(0)
    
    wrapper.unmount()
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('useUpdate', async () => {
    const fn = vi.fn()
    const Component = defineComponent({
      setup() {
        const count = ref(0)
        useUpdate(fn)
        return { count }
      },
      template: '<div @click="count++">{{ count }}</div>'
    })

    const wrapper = mount(Component)
    expect(fn).toHaveBeenCalledTimes(0)

    await wrapper.trigger('click')
    expect(fn).toHaveBeenCalledTimes(1)
  })
})
