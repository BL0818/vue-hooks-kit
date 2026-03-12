[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useHover

# Function: useHover()

> **useHover**(`target`, `hoverClass?`, `normalClass?`): `object`

Defined in: advanced/style.ts:12

useHover - Track element hover state and apply UnoCSS classes

## Parameters

### target

The target element (Ref or HTMLElement)

`HTMLElement` | `Ref`\<`HTMLElement` \| `null`, `HTMLElement` \| `null`\>

### hoverClass?

`string` = `''`

The class to apply when hovered (e.g. 'bg-blue-500')

### normalClass?

`string` = `''`

The class to apply when not hovered (optional)

## Returns

`object`

Object containing isHovered state and the current className

### className

> **className**: `ComputedRef`\<`string`\>

### isHovered

> **isHovered**: `Ref`\<`boolean`, `boolean`\>
