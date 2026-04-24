# Sequence Diagrams: Sprint 1 Core Flows

## 1. Login Flow

```
User          shadcn-admin SignIn    refine AuthProvider    Mujarrad API
 |                  |                       |                    |
 |--credentials---->|                       |                    |
 |                  |---login(params)------>|                    |
 |                  |                       |--POST /auth/login->|
 |                  |                       |<---{ token, user }-|
 |                  |                       |--store JWT--------->localStorage
 |                  |<--{ success, redirectTo: "/" }             |
 |<--redirect to dashboard                 |                    |
```

### Google OAuth Variant
```
User          shadcn-admin SignIn    refine AuthProvider    Google    Mujarrad API
 |                  |                       |                  |           |
 |--click Google--->|                       |                  |           |
 |                  |---login({provider:"google"})              |           |
 |                  |                       |--OAuth popup----->|           |
 |                  |                       |<--idToken---------|           |
 |                  |                       |--POST /auth/oauth/google---->|
 |                  |                       |<---{ token, user }-----------|
 |                  |                       |--store JWT-------->localStorage
 |                  |<--{ success, redirectTo: "/" }             |
 |<--redirect to dashboard                                      |
```

## 2. Organization CRUD Flow

### Create
```
User    OrgCreateForm    refine useForm    refine DataProvider    Mujarrad API
 |           |                  |                   |                   |
 |--fill form-->|               |                   |                   |
 |--submit----->|               |                   |                   |
 |              |--handleSubmit->|                   |                   |
 |              |               |--create({resource:"organizations", variables})
 |              |               |                   |--POST /spaces/sia-portal/nodes
 |              |               |                   |  (org node + contact nodes)
 |              |               |                   |<--{ node }--------|
 |              |               |                   |--create ActivityEvent node
 |              |               |<--{ data }--------|                   |
 |              |               |--notification.open("success")        |
 |              |<--close panel, invalidate list    |                   |
 |<--see new org in table       |                   |                   |
```

### The data provider's `create` for organizations handles multi-node creation:
1. Create Organization node
2. For each contact: create Contact node, create `has_contact` relationship
3. Create ActivityEvent node with action="created"
4. Return the organization data

## 3. File Upload Flow

```
User    Uppy UI    @uppy/tus    Cloudflare R2    refine DataProvider    Mujarrad    Local ETL    Typesense
 |         |           |             |                   |                 |            |            |
 |--drop file->|       |             |                   |                 |            |            |
 |         |--validate type/size     |                   |                 |            |            |
 |         |--start tus->|           |                   |                 |            |            |
 |         |           |--POST /tus->|                   |                 |            |            |
 |         |           |<-Location---|                   |                 |            |            |
 |         |           |--PATCH chunks-->|               |                 |            |            |
 |         |<-progress--|           |                    |                 |            |            |
 |<-progress bar        |           |                    |                 |            |            |
 |         |           |--complete->|                    |                 |            |            |
 |         |--onComplete callback   |                    |                 |            |            |
 |         |           |            |                    |                 |            |            |
 |         |           |  create FileRecord via data provider             |            |            |
 |         |           |            |   |--create({resource:"files",...})->|            |            |
 |         |           |            |   |                 |--POST node--->|            |            |
 |         |           |            |   |                 |<--{ node }----|            |            |
 |         |           |            |   |                 |--create ActivityEvent      |            |
 |         |           |            |   |<--{ data }------|               |            |            |
 |         |           |            |                    |                 |            |            |
 |         |           |            |  (async, independent)               |            |            |
 |         |           |            |                    |                 |  poll/event |            |
 |         |           |            |<---detect new file-|                 |<-----------|            |
 |         |           |            |---download file--->|                 |            |            |
 |         |           |            |                    |                 |--extract text (Docling) |
 |         |           |            |                    |                 |--fallback OCR if needed |
 |         |           |            |                    |                 |--index---->|            |
 |         |           |            |                    |                 |            |<-indexed---|
```

## 4. Global Search Flow

```
User    Cmd+K Palette    Typesense Search Adapter    Typesense API
 |           |                      |                      |
 |--Cmd+K--->|                      |                      |
 |--type query-->|                  |                      |
 |           |--debounce(300ms)---->|                      |
 |           |                      |--POST /multi_search->|
 |           |                      |  (3 collections:     |
 |           |                      |   organizations,     |
 |           |                      |   contacts, files)   |
 |           |                      |<--results[]----------|
 |           |<--grouped results----|                      |
 |<--display Organizations/Contacts/Files sections         |
 |--arrow keys to navigate          |                      |
 |--Enter on result                  |                      |
 |<--navigate to detail page         |                      |
```
