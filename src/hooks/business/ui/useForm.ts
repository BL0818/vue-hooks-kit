import { reactive, ref, toRaw } from 'vue'

export type RuleType = 'string' | 'number' | 'boolean' | 'method' | 'regexp' | 'integer' | 'float' | 'array' | 'object' | 'enum' | 'date' | 'url' | 'hex' | 'email' | 'any'

export interface RuleItem {
  type?: RuleType
  required?: boolean
  pattern?: RegExp
  min?: number
  max?: number
  len?: number
  enum?: Array<string | number | boolean | null | undefined>
  whitespace?: boolean
  message?: string | ((a?: any) => string)
  validator?: (rule: RuleItem, value: any, callback: (error?: string | Error) => void, source: any, options: any) => void | Promise<void>
  trigger?: 'blur' | 'change' | ['blur', 'change']
}

export type Rules = Record<string, RuleItem | RuleItem[]>

export interface UseFormOptions<T = any> {
  initialModel?: T
  rules?: Rules
}

export interface FormClasses {
  form: string
  item: string
  label: string
  content: string
  error: string
  input: string
  select: string
  checkbox: string
  radio: string
  button: string
  buttonPrimary: string
}

export function useForm<T extends Record<string, any> = any>(options: UseFormOptions<T> = {}) {
  const { initialModel = {} as T, rules = {} } = options

  const model = reactive<T>({ ...initialModel })
  const errors = reactive<Record<string, string>>({})
  const loading = ref(false)

  // Simple validation logic (simplified version of async-validator)
  const validateField = async (field: string) => {
    const value = model[field]
    const fieldRules = rules[field]
    if (!fieldRules) return true

    const rulesArray = Array.isArray(fieldRules) ? fieldRules : [fieldRules]
    
    for (const rule of rulesArray) {
      if (rule.required && (value === undefined || value === null || value === '')) {
        errors[field] = rule.message || `${field} is required`
        return false
      }
      if (rule.pattern && !rule.pattern.test(value)) {
        errors[field] = rule.message || `${field} format is invalid`
        return false
      }
      if (rule.validator) {
        try {
           await new Promise<void>((resolve, reject) => {
             rule.validator!(rule, value, (err) => {
               if (err) reject(err)
               else resolve()
             }, model, {})
           })
        } catch (err: any) {
          errors[field] = err.message || rule.message || 'Validation failed'
          return false
        }
      }
    }
    
    delete errors[field]
    return true
  }

  const validate = async () => {
    let isValid = true
    const fields = Object.keys(rules)
    
    // Clear previous errors?
    // Object.keys(errors).forEach(key => delete errors[key])

    for (const field of fields) {
      const valid = await validateField(field)
      if (!valid) isValid = false
    }
    return isValid
  }

  const resetFields = () => {
    Object.assign(model, initialModel)
    Object.keys(errors).forEach(key => delete errors[key])
  }

  const resetField = (field: string) => {
    if (field in initialModel) {
      model[field] = initialModel[field]
    } else {
      delete model[field]
    }
    delete errors[field]
  }

  const clearValidate = (props?: string | string[]) => {
    if (props) {
      const keys = Array.isArray(props) ? props : [props]
      keys.forEach(key => delete errors[key])
    } else {
      Object.keys(errors).forEach(key => delete errors[key])
    }
  }

  const submit = async (submitFn: (values: T) => Promise<void>) => {
    loading.value = true
    try {
      const valid = await validate()
      if (valid) {
        await submitFn(toRaw(model))
      }
    } catch (err) {
      console.error('Submit error:', err)
    } finally {
      loading.value = false
    }
  }

  // UnoCSS Classes
  const classes: FormClasses = {
    form: 'space-y-4',
    item: 'flex flex-col gap-1',
    label: 'text-sm font-medium text-gray-700',
    content: 'relative',
    error: 'text-xs text-red-500 mt-1',
    input: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow disabled:bg-gray-100 disabled:cursor-not-allowed',
    select: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white',
    checkbox: 'rounded border-gray-300 text-primary focus:ring-primary h-4 w-4',
    radio: 'border-gray-300 text-primary focus:ring-primary h-4 w-4',
    button: 'px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
    buttonPrimary: 'bg-primary text-white hover:bg-primary-600 focus:ring-primary',
  }

  return {
    model,
    errors,
    loading,
    validate,
    validateField,
    resetFields,
    resetField,
    clearValidate,
    submit,
    classes,
    initialModel,
  }
}
