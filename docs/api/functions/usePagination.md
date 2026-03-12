[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / usePagination

# Function: usePagination()

> **usePagination**(`options?`): `object`

Defined in: business/data/usePagination.ts:22

## Parameters

### options?

[`UsePaginationOptions`](../interfaces/UsePaginationOptions.md) = `{}`

## Returns

`object`

### changeCurrent()

> **changeCurrent**: (`page`) => `void`

#### Parameters

##### page

`number`

#### Returns

`void`

### changePageSize()

> **changePageSize**: (`size`) => `void`

#### Parameters

##### size

`number`

#### Returns

`void`

### classes

> **classes**: [`PaginationClasses`](../interfaces/PaginationClasses.md)

### current

> **current**: `Ref`\<`number`, `number`\>

### offset

> **offset**: `ComputedRef`\<`number`\>

### pageSize

> **pageSize**: `Ref`\<`number`, `number`\>

### pageSizes

> **pageSizes**: `number`[]

### setTotal()

> **setTotal**: (`val`) => `void`

#### Parameters

##### val

`number`

#### Returns

`void`

### total

> **total**: `Ref`\<`number`, `number`\>

### totalPages

> **totalPages**: `ComputedRef`\<`number`\>
