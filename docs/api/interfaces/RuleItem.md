[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / RuleItem

# Interface: RuleItem

Defined in: business/ui/useForm.ts:5

## Properties

### enum?

> `optional` **enum**: (`string` \| `number` \| `boolean` \| `null` \| `undefined`)[]

Defined in: business/ui/useForm.ts:12

***

### len?

> `optional` **len**: `number`

Defined in: business/ui/useForm.ts:11

***

### max?

> `optional` **max**: `number`

Defined in: business/ui/useForm.ts:10

***

### message?

> `optional` **message**: `string` \| (`a?`) => `string`

Defined in: business/ui/useForm.ts:14

***

### min?

> `optional` **min**: `number`

Defined in: business/ui/useForm.ts:9

***

### pattern?

> `optional` **pattern**: `RegExp`

Defined in: business/ui/useForm.ts:8

***

### required?

> `optional` **required**: `boolean`

Defined in: business/ui/useForm.ts:7

***

### trigger?

> `optional` **trigger**: `"blur"` \| `"change"` \| \[`"blur"`, `"change"`\]

Defined in: business/ui/useForm.ts:16

***

### type?

> `optional` **type**: [`RuleType`](../type-aliases/RuleType.md)

Defined in: business/ui/useForm.ts:6

***

### validator()?

> `optional` **validator**: (`rule`, `value`, `callback`, `source`, `options`) => `void` \| `Promise`\<`void`\>

Defined in: business/ui/useForm.ts:15

#### Parameters

##### rule

`RuleItem`

##### value

`any`

##### callback

(`error?`) => `void`

##### source

`any`

##### options

`any`

#### Returns

`void` \| `Promise`\<`void`\>

***

### whitespace?

> `optional` **whitespace**: `boolean`

Defined in: business/ui/useForm.ts:13
