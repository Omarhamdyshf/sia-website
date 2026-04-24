# Refine Resource & Provider Configurations

## Resource Definitions

```typescript
const resources: ResourceProps[] = [
  {
    name: "organizations",
    list: "/organizations",
    create: "/organizations/create",
    edit: "/organizations/edit/:id",
    show: "/organizations/:id",
    meta: { label: "Organizations", icon: <Building2 />, canDelete: true },
  },
  {
    name: "contacts",
    meta: { parent: "organizations", hide: true },
  },
  {
    name: "files",
    meta: { parent: "organizations", hide: true },
  },
  {
    name: "notes",
    meta: { parent: "organizations", hide: true },
  },
  {
    name: "activity-events",
    meta: { hide: true },
  },
];
```

- `contacts`, `files`, `notes`, `activity-events` are hidden sub-resources — accessed via organization detail tabs, not top-level nav.
- Only `organizations` appears in sidebar navigation.
- Dashboard is a custom route outside resource definitions.

## DataProvider Interface Mapping

Each refine method maps to Mujarrad API calls:

| refine Method | Mujarrad API Call | Notes |
|---------------|-------------------|-------|
| `getList({ resource, pagination, filters, sorters })` | `GET /spaces/sia-portal/nodes?context={resource}&...` | Map filters/sorters to query params |
| `getOne({ resource, id })` | `GET /spaces/sia-portal/nodes/{id}` | Return `node.nodeDetails` as data |
| `create({ resource, variables })` | `POST /spaces/sia-portal/nodes` with `{ context, type: "REGULAR", nodeDetails: variables }` | Also creates relationships if org+contacts |
| `update({ resource, id, variables })` | `PATCH /spaces/sia-portal/nodes/{id}` with `{ nodeDetails: variables }` | |
| `deleteOne({ resource, id })` | `DELETE /spaces/sia-portal/nodes/{id}` | |
| `getApiUrl()` | Returns `https://mujarrad.onrender.com/api` | |

### Filter Mapping
| refine Filter Operator | Mujarrad Query |
|------------------------|----------------|
| `eq` | `?filter[field]=value` |
| `contains` | `?search[field]=value` |
| `in` | `?filter[field]=val1,val2` |

### Sorter Mapping
| refine Sorter | Mujarrad Query |
|---------------|----------------|
| `{ field, order: "asc" }` | `?sort=field` |
| `{ field, order: "desc" }` | `?sort=-field` |

### Pagination Mapping
| refine Pagination | Mujarrad Query |
|-------------------|----------------|
| `{ current: 1, pageSize: 10 }` | `?page=1&limit=10` |

## AuthProvider Interface Mapping

| refine Method | Implementation |
|---------------|----------------|
| `login({ email, password })` | `POST /api/auth/login` → store JWT in localStorage |
| `login({ provider: "google", idToken })` | `POST /api/auth/oauth/google` → store JWT |
| `logout()` | Clear JWT from localStorage, redirect to `/login` |
| `check()` | Check JWT exists and not expired → `{ authenticated: true/false }` |
| `getIdentity()` | Decode JWT or `GET /api/auth/me` → `{ id, name, email, avatar }` |
| `getPermissions()` | Return `["admin"]` (single-user system) |
| `onError(error)` | If 401 → `{ logout: true }` |

## Notification Provider (sonner adapter)

```typescript
const notificationProvider: NotificationProvider = {
  open({ message, type, description }) {
    if (type === "success") toast.success(message, { description });
    if (type === "error") toast.error(message, { description });
    if (type === "progress") toast.loading(message, { description });
  },
  close(key) {
    toast.dismiss(key);
  },
};
```

## I18n Provider (react-i18next adapter)

```typescript
const i18nProvider: I18nProvider = {
  translate: (key, options, defaultMessage) =>
    i18next.t(key, { defaultValue: defaultMessage, ...options }),
  changeLocale: (lang) => i18next.changeLanguage(lang),
  getLocale: () => i18next.language,
};
```
