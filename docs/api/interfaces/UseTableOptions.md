[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / UseTableOptions

# Interface: UseTableOptions\<T\>

Defined in: business/ui/useTable.ts:9

## Type Parameters

### T

`T` = `any`

## Properties

### defaultParams?

> `optional` **defaultParams**: `Record`\<`string`, `any`\>

Defined in: business/ui/useTable.ts:12

***

### fetchData()

> **fetchData**: (`params`) => `Promise`\<[`TableResponse`](TableResponse.md)\<`T`\>\>

Defined in: business/ui/useTable.ts:10

#### Parameters

##### params

`any`

#### Returns

`Promise`\<[`TableResponse`](TableResponse.md)\<`T`\>\>

***

### manual?

> `optional` **manual**: `boolean`

Defined in: business/ui/useTable.ts:13

***

### pagination?

> `optional` **pagination**: [`UsePaginationOptions`](UsePaginationOptions.md)

Defined in: business/ui/useTable.ts:11

***

### rowKey?

> `optional` **rowKey**: `string` \| (`record`) => `string`

Defined in: business/ui/useTable.ts:14
