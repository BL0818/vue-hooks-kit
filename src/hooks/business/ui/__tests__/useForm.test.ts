import { describe, it, expect } from 'vitest'
import { useForm } from '../useForm'

describe('useForm', () => {
  it('should validate required fields', async () => {
    const { model, validate, errors } = useForm({
      initialModel: { name: '' },
      rules: { name: { required: true, message: 'Name is required' } }
    })
    
    const valid = await validate()
    expect(valid).toBe(false)
    expect(errors.name).toBe('Name is required')
    
    model.name = 'John'
    const valid2 = await validate()
    expect(valid2).toBe(true)
    expect(errors.name).toBeUndefined()
  })

  it('should reset fields', () => {
    const { model, resetFields } = useForm({
      initialModel: { name: 'John' }
    })
    model.name = 'Jane'
    resetFields()
    expect(model.name).toBe('John')
  })
})
