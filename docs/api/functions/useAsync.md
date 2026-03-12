[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useAsync

# Function: useAsync()

> **useAsync**\<`T`\>(`fn`, `options?`): `AsyncReturn`\<`T`\>

Defined in: advanced/async.ts:29

useAsync - Async function wrapper with state management

Features:
- Automatic loading/error state management
- Cancellation support (via AbortController or simple flag)
- Immediate execution option
- Success/Error callbacks

## Type Parameters

### T

`T`

## Parameters

### fn

(...`args`) => `Promise`\<`T`\>

Async function to execute

### options?

`AsyncOptions`\<`T`\> = `{}`

Configuration options

## Returns

`AsyncReturn`\<`T`\>
