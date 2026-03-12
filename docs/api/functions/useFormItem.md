[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useFormItem

# Function: useFormItem()

> **useFormItem**(`form`, `field`): `object`

Defined in: business/ui/useFormItem.ts:4

## Parameters

### form

#### classes

[`FormClasses`](../interfaces/FormClasses.md)

#### clearValidate

(`props?`) => `void`

#### errors

`Record`\<`string`, `string`\>

#### initialModel

`Record`\<`string`, `any`\>

#### loading

`Ref`\<`boolean`, `boolean`\>

#### model

`Record`\<`string`, `any`\>

#### resetField

(`field`) => `void`

#### resetFields

() => `void`

#### submit

(`submitFn`) => `Promise`\<`void`\>

#### validate

() => `Promise`\<`boolean`\>

#### validateField

(`field`) => `Promise`\<`boolean`\>

### field

`string`

## Returns

`object`

### clearValidate()

> **clearValidate**: () => `void`

#### Returns

`void`

### error

> **error**: `ComputedRef`\<`string`\>

### reset()

> **reset**: () => `void`

#### Returns

`void`

### validate()

> **validate**: () => `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

### value

> **value**: `WritableComputedRef`\<`any`, `any`\>
