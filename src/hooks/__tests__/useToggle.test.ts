import { describe, it, expect } from 'vitest'
import { useToggle } from '../basic/useToggle'
import { isRef } from 'vue'

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined()
  })

  it('should default to false', () => {
    const [state] = useToggle()
    expect(isRef(state)).toBe(true)
    expect(state.value).toBe(false)
  })

  it('should toggle state', () => {
    const [state, { toggle }] = useToggle()
    toggle()
    expect(state.value).toBe(true)
    toggle()
    expect(state.value).toBe(false)
  })

  it('should set specific value', () => {
    const [state, { set, setLeft, setRight }] = useToggle()
    set(true)
    expect(state.value).toBe(true)
    setLeft()
    expect(state.value).toBe(false)
    setRight()
    expect(state.value).toBe(true)
  })

  it('should support custom values', () => {
    const [state, { toggle }] = useToggle('Hello', 'World')
    expect(state.value).toBe('Hello')
    toggle()
    expect(state.value).toBe('World')
    toggle()
    expect(state.value).toBe('Hello')
  })
})
