[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / UseRequestOptions

# Interface: UseRequestOptions\<T\>

Defined in: basic/network.ts:7

## Type Parameters

### T

`T` = `any`

## Properties

### cacheKey?

> `optional` **cacheKey**: `string`

Defined in: basic/network.ts:13

***

### cacheTime?

> `optional` **cacheTime**: `number`

Defined in: basic/network.ts:14

***

### initialData?

> `optional` **initialData**: `T`

Defined in: basic/network.ts:9

***

### loadingKeep?

> `optional` **loadingKeep**: `number`

Defined in: basic/network.ts:17

***

### manual?

> `optional` **manual**: `boolean`

Defined in: basic/network.ts:8

***

### onError()?

> `optional` **onError**: (`error`, `params`) => `void`

Defined in: basic/network.ts:11

#### Parameters

##### error

`unknown`

##### params

`any`[]

#### Returns

`void`

***

### onFinally()?

> `optional` **onFinally**: () => `void`

Defined in: basic/network.ts:12

#### Returns

`void`

***

### onSuccess()?

> `optional` **onSuccess**: (`data`, `params`) => `void`

Defined in: basic/network.ts:10

#### Parameters

##### data

`T`

##### params

`any`[]

#### Returns

`void`

***

### retryCount?

> `optional` **retryCount**: `number`

Defined in: basic/network.ts:15

***

### retryDelay?

> `optional` **retryDelay**: `number`

Defined in: basic/network.ts:16
