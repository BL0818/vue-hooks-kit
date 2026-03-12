[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useForm

# Function: useForm()

> **useForm**\<`T`\>(`options?`): `object`

Defined in: business/ui/useForm.ts:40

## Type Parameters

### T

`T` *extends* `Record`\<`string`, `any`\> = `any`

## Parameters

### options?

[`UseFormOptions`](../interfaces/UseFormOptions.md)\<`T`\> = `{}`

## Returns

`object`

### classes

> **classes**: [`FormClasses`](../interfaces/FormClasses.md)

### clearValidate()

> **clearValidate**: (`props?`) => `void`

#### Parameters

##### props?

`string` | `string`[]

#### Returns

`void`

### errors

> **errors**: `Record`\<`string`, `string`\>

### initialModel

> **initialModel**: `T`

### loading

> **loading**: `Ref`\<`boolean`, `boolean`\>

### model

> **model**: `Reactive`\<`T`\>

### resetField()

> **resetField**: (`field`) => `void`

#### Parameters

##### field

`string`

#### Returns

`void`

### resetFields()

> **resetFields**: () => `void`

#### Returns

`void`

### submit()

> **submit**: (`submitFn`) => `Promise`\<`void`\>

#### Parameters

##### submitFn

(`values`) => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

### validate()

> **validate**: () => `Promise`\<`boolean`\>

#### Returns

`Promise`\<`boolean`\>

### validateField()

> **validateField**: (`field`) => `Promise`\<`boolean`\>

#### Parameters

##### field

`string`

#### Returns

`Promise`\<`boolean`\>
