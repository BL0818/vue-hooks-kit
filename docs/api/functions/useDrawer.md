[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useDrawer

# Function: useDrawer()

> **useDrawer**\<`T`\>(`options?`): `object`

Defined in: business/ui/useDrawer.ts:19

## Type Parameters

### T

`T` = `any`

## Parameters

### options?

[`UseDrawerOptions`](../interfaces/UseDrawerOptions.md) = `{}`

## Returns

`object`

### classes

> **classes**: [`DrawerClasses`](../interfaces/DrawerClasses.md)

### close()

> **close**: () => `void`

#### Returns

`void`

### open()

> **open**: (`args?`) => `void`

#### Parameters

##### args?

`T`

#### Returns

`void`

### params

> **params**: \[`T` \| `null`\] *extends* \[`Ref`\<`any`, `any`\>\] ? `IfAny`\<`Ref`\<`any`, `any`\> & `T`, `Ref`\<`Ref`\<`any`, `any`\> & `T`, `Ref`\<`any`, `any`\> & `T`\>, `Ref`\<`any`, `any`\> & `T`\> : `Ref`\<`UnwrapRef`\<`T`\> \| `null`, `T` \| `UnwrapRef`\<`T`\> \| `null`\>

### toggle()

> **toggle**: () => `void`

#### Returns

`void`

### visible

> **visible**: `Ref`\<`boolean`, `boolean`\>
