[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useToggle

# Function: useToggle()

> **useToggle**\<`T`, `U`\>(`defaultValue?`, `reverseValue?`): readonly \[\[`T` \| `U`\] *extends* \[`Ref`\<`any`, `any`\>\] ? `IfAny`\<`Ref`\<`any`, `any`\> & `T` \| `U`, `Ref`\<`Ref`\<`any`, `any`\> & `T` \| `U`, `Ref`\<`any`, `any`\> & `T` \| `U`\>, `Ref`\<`any`, `any`\> & `T` \| `U`\> : `Ref`\<`UnwrapRef`\<`T`\> \| `UnwrapRef`\<`U`\>, `T` \| `U` \| `UnwrapRef`\<`T`\> \| `UnwrapRef`\<`U`\>\>, [`UseToggleActions`](../interfaces/UseToggleActions.md)\<`T`, `U`\>\]

Defined in: basic/useToggle.ts:17

useToggle
Used to toggle state between two values.

## Type Parameters

### T

`T` = `boolean`

### U

`U` = `boolean`

## Parameters

### defaultValue?

`T` = `...`

Default value (default: false)

### reverseValue?

`U`

Reverse value (default: !defaultValue)

## Returns

readonly \[\[`T` \| `U`\] *extends* \[`Ref`\<`any`, `any`\>\] ? `IfAny`\<`Ref`\<`any`, `any`\> & `T` \| `U`, `Ref`\<`Ref`\<`any`, `any`\> & `T` \| `U`, `Ref`\<`any`, `any`\> & `T` \| `U`\>, `Ref`\<`any`, `any`\> & `T` \| `U`\> : `Ref`\<`UnwrapRef`\<`T`\> \| `UnwrapRef`\<`U`\>, `T` \| `U` \| `UnwrapRef`\<`T`\> \| `UnwrapRef`\<`U`\>\>, [`UseToggleActions`](../interfaces/UseToggleActions.md)\<`T`, `U`\>\]
