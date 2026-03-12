[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useErrorBoundary

# Function: useErrorBoundary()

> **useErrorBoundary**(`callback?`): `object`

Defined in: advanced/error-i18n.ts:9

useErrorBoundary - Capture errors in child components

## Parameters

### callback?

(`err`, `instance`, `info`) => `void`

Optional callback when error occurs

## Returns

`object`

Object with error state and reset function

### error

> **error**: `ShallowRef`\<`Error` \| `null`, `Error` \| `null`\>

### reset()

> **reset**: () => `void`

#### Returns

`void`
