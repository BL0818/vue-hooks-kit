[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useMemoizedFn

# Function: useMemoizedFn()

> **useMemoizedFn**\<`T`\>(`fn`): `T`

Defined in: advanced/performance.ts:14

useMemoizedFn - Create a persistent function that maintains the same reference
ensuring the latest implementation is always called.

Performance Optimization:
- Avoids unnecessary re-renders in child components due to function prop changes.
- Especially useful when passing callbacks to optimized child components (memoized).

## Type Parameters

### T

`T` *extends* (...`args`) => `any`

## Parameters

### fn

`T`

The function to be memoized

## Returns

`T`

A persistent function reference
