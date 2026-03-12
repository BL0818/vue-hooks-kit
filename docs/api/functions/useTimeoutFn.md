[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useTimeoutFn

# Function: useTimeoutFn()

> **useTimeoutFn**(`cb`, `interval`, `options?`): `object`

Defined in: basic/utils.ts:101

## Parameters

### cb

() => `void`

### interval

`number` | `Ref`\<`number`, `number`\>

### options?

#### immediate?

`boolean`

## Returns

`object`

### isPending

> **isPending**: `Ref`\<`boolean`, `boolean`\>

### start()

> **start**: (...`args`) => `void`

#### Parameters

##### args

...`any`[]

#### Returns

`void`

### stop()

> **stop**: () => `void` = `clear`

#### Returns

`void`
