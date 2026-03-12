[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / useI18n

# Function: useI18n()

> **useI18n**(`options?`): `object`

Defined in: advanced/error-i18n.ts:49

useI18n - Lightweight Internationalization Hook

Features:
- Reactive locale switching
- Nested message support (dot notation)
- UnoCSS support via direction/locale class hints

## Parameters

### options?

Initial options (only used if providing root)

#### locale

`string`

#### messages

[`I18nMessages`](../type-aliases/I18nMessages.md)

## Returns

`object`

### locale

> **locale**: `Ref`\<`string`, `string`\>

### messages

> **messages**: `Ref`\<[`I18nMessages`](../type-aliases/I18nMessages.md), [`I18nMessages`](../type-aliases/I18nMessages.md)\>

### setLocale()

> **setLocale**: (`l`) => `void`

#### Parameters

##### l

`string`

#### Returns

`void`

### t()

> **t**: (`key`, ...`args`) => `any`

#### Parameters

##### key

`string`

##### args

...`any`[]

#### Returns

`any`
