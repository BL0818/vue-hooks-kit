[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / usePromise

# Function: usePromise()

> **usePromise**\<`T`\>(`promiseFactory`): `object`

Defined in: advanced/async.ts:108

usePromise - Manage a Promise's lifecycle

Wraps a Promise factory to provide reactive state.
Similar to useAsync but focused on Promise objects/factories.

## Type Parameters

### T

`T`

## Parameters

### promiseFactory

() => `Promise`\<`T`\>

Factory function returning a Promise

## Returns

`object`

### data

> **data**: `ShallowRef`\<`T` \| `null`\>

### error

> **error**: `ShallowRef`\<`any`\>

### loading

> **loading**: `Ref`\<`boolean`, `boolean`\>

### refresh()

> **refresh**: (...`args`) => `Promise`\<`T` \| `null`\> = `execute`

#### Parameters

##### args

...`any`[]

#### Returns

`Promise`\<`T` \| `null`\>
