[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useReactiveRef

# Function: useReactiveRef()

> **useReactiveRef**\<`T`\>(`initialState`): `object`

Defined in: advanced/performance.ts:39

useReactiveRef - Performance optimized deep reactive state

Optimization Strategy:
- Uses `shallowRef` internally to avoid deep proxy conversion overhead.
- Provides a `mutate` method to batch updates and manually trigger reactivity.
- Suitable for large data structures or high-frequency update scenarios where
  Vue's default deep reactivity might cause performance issues.

## Type Parameters

### T

`T`

## Parameters

### initialState

`T`

Initial state

## Returns

Object containing the shallow ref and a mutate function

### mutate()

> **mutate**: (`mutator`) => `void`

Mutate the state and trigger reactivity.
This allows modifying deep properties without the overhead of deep reactivity proxies.

#### Parameters

##### mutator

(`state`) => `void`

Function to modify the state

#### Returns

`void`

### state

> **state**: `Ref`\<`any`, `any`\> *extends* `T` ? `T` *extends* `T` & `Ref`\<`any`, `any`\> ? `IfAny`\<`T`, `ShallowRef`\<`T`, `T`\>, `T`\> : `ShallowRef`\<`T`, `T`\> : `ShallowRef`\<`T`, `T`\>
