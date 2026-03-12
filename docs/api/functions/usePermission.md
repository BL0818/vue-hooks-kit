[**VueHooksKit**](../README.md)

***

[VueHooksKit](../README.md) / usePermission

# Function: usePermission()

> **usePermission**(): `object`

Defined in: business/access/usePermission.ts:4

## Returns

`object`

### checkPermissionClass()

> **checkPermissionClass**: (`permission`) => `""` \| `"!hidden"`

#### Parameters

##### permission

`string` | `string`[]

#### Returns

`""` \| `"!hidden"`

### checkRoleClass()

> **checkRoleClass**: (`role`) => `""` \| `"!hidden"`

#### Parameters

##### role

`string` | `string`[]

#### Returns

`""` \| `"!hidden"`

### hasPermission()

> **hasPermission**: (`permission`) => `boolean`

#### Parameters

##### permission

`string` | `string`[]

#### Returns

`boolean`

### hasRole()

> **hasRole**: (`role`) => `boolean`

#### Parameters

##### role

`string` | `string`[]

#### Returns

`boolean`

### permissions

> **permissions**: `ComputedRef`\<`string`[]\>

### roles

> **roles**: `ComputedRef`\<`string`[]\>
