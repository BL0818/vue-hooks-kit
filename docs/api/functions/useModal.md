[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useModal

# Function: useModal()

> **useModal**\<`T`\>(`options?`): `object`

Defined in: business/ui/useModal.ts:18

## Type Parameters

### T

`T` = `any`

## Parameters

### options?

[`UseModalOptions`](../interfaces/UseModalOptions.md) = `{}`

## Returns

`object`

### classes

> **classes**: [`ModalClasses`](../interfaces/ModalClasses.md)

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
