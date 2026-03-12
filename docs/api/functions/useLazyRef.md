[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useLazyRef

# Function: useLazyRef()

> **useLazyRef**\<`T`\>(`factory`): `Ref`\<`T`\>

Defined in: advanced/performance.ts:69

useLazyRef - Lazy initialization for Ref

Optimization Strategy:
- Delays the creation/calculation of the initial value until the `.value` is first accessed.
- Useful for expensive initializations or resources that might not be needed immediately.

## Type Parameters

### T

`T`

## Parameters

### factory

() => `T`

Factory function to create the initial value

## Returns

`Ref`\<`T`\>

A Ref that initializes lazily
