[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useRequest

# Function: useRequest()

> **useRequest**\<`T`\>(`service`, `options?`): `object`

Defined in: basic/network.ts:20

## Type Parameters

### T

`T` = `any`

## Parameters

### service

`AxiosRequestConfig`\<`any`\> | (...`args`) => `AxiosRequestConfig`\<`any`\> \| `Promise`\<`T`\>

### options?

[`UseRequestOptions`](../interfaces/UseRequestOptions.md)\<`T`\> = `{}`

## Returns

`object`

### cancel()

> **cancel**: () => `void`

#### Returns

`void`

### data

> **data**: `Ref`\<`any`, `any`\> *extends* `T` \| `undefined` ? `ShallowRef`\<`undefined`, `undefined`\> \| `T` *extends* `T` & `Ref`\<`any`, `any`\> ? `IfAny`\<`T`, `ShallowRef`\<`T`, `T`\>, `T`\> : `ShallowRef`\<`T`, `T`\> : `ShallowRef`\<`T` \| `undefined`, `T` \| `undefined`\>

### error

> **error**: `ShallowRef`\<`unknown`, `unknown`\>

### loading

> **loading**: `Ref`\<`boolean`, `boolean`\>

### refresh()

> **refresh**: () => `void`

#### Returns

`void`

### run()

> **run**: (...`params`) => `void`

#### Parameters

##### params

...`any`[]

#### Returns

`void`

### runAsync()

> **runAsync**: (...`params`) => `Promise`\<`T`\>

#### Parameters

##### params

...`any`[]

#### Returns

`Promise`\<`T`\>
