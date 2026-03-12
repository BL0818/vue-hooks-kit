import { computed, inject, type Ref } from 'vue'
import type { useForm } from './useForm'

export function useFormItem(form: ReturnType<typeof useForm>, field: string) {
  const value = computed({
    get: () => form.model[field],
    set: (val) => {
      form.model[field] = val
      // Optional: trigger validation on change?
      // form.validateField(field)
    }
  })

  const error = computed(() => form.errors[field])

  const validate = () => form.validateField(field)

  const reset = () => {
    form.resetField(field)
  }

  const clearValidate = () => {
    form.clearValidate(field)
  }

  return {
    value,
    error,
    validate,
    reset,
    clearValidate
  }
}
