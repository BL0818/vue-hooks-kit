[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useTable

# Function: useTable()

> **useTable**\<`T`\>(`options`): `object`

Defined in: business/ui/useTable.ts:30

## Type Parameters

### T

`T` = `any`

## Parameters

### options

[`UseTableOptions`](../interfaces/UseTableOptions.md)\<`T`\>

## Returns

`object`

### classes

> **classes**: [`TableClasses`](../interfaces/TableClasses.md)

### clearSelection()

> **clearSelection**: () => `void`

#### Returns

`void`

### data

> **data**: `any`

### error

> **error**: `Ref`\<`any`, `any`\>

### filters

> **filters**: `Record`\<`string`, `any`\>

### handleFilter()

> **handleFilter**: (`newFilters`) => `void`

#### Parameters

##### newFilters

`Record`\<`string`, `any`\>

#### Returns

`void`

### handleSelectionChange()

> **handleSelectionChange**: (`rows`) => `void`

#### Parameters

##### rows

`T`[]

#### Returns

`void`

### handleSort()

> **handleSort**: (`field`, `order`) => `void`

#### Parameters

##### field

`string`

##### order

`"asc"` | `"desc"` | `null`

#### Returns

`void`

### loading

> **loading**: `Ref`\<`boolean`, `boolean`\>

### pagination

> **pagination**: `object`

#### pagination.changeCurrent()

> **changeCurrent**: (`page`) => `void`

##### Parameters

###### page

`number`

##### Returns

`void`

#### pagination.changePageSize()

> **changePageSize**: (`size`) => `void`

##### Parameters

###### size

`number`

##### Returns

`void`

#### pagination.classes

> **classes**: [`PaginationClasses`](../interfaces/PaginationClasses.md) = `paginationClasses`

#### pagination.current

> **current**: `Ref`\<`number`, `number`\>

#### pagination.pageSize

> **pageSize**: `Ref`\<`number`, `number`\>

#### pagination.total

> **total**: `Ref`\<`number`, `number`\>

### refresh()

> **refresh**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

### reset()

> **reset**: () => `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

### run()

> **run**: (`params`) => `Promise`\<`void`\>

#### Parameters

##### params?

`any` = `{}`

#### Returns

`Promise`\<`void`\>

### selectedRowKeys

> **selectedRowKeys**: `Ref`\<`string`[], `string`[]\>

### selectedRows

> **selectedRows**: `any`

### sorter

> **sorter**: `object`

#### sorter.field

> **field**: `string`

#### sorter.order

> **order**: `"asc"` \| `"desc"` \| `null`
