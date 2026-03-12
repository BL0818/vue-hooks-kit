[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useActive

# Function: useActive()

> **useActive**(`target`, `activeClass?`, `normalClass?`): `object`

Defined in: advanced/style.ts:38

useActive - Track element active state (mousedown/touch)

## Parameters

### target

The target element

`HTMLElement` | `Ref`\<`HTMLElement` \| `null`, `HTMLElement` \| `null`\>

### activeClass?

`string` = `''`

The class to apply when active

### normalClass?

`string` = `''`

The class to apply when inactive

## Returns

`object`

### className

> **className**: `ComputedRef`\<`string`\>

### isActive

> **isActive**: `Ref`\<`boolean`, `boolean`\>
