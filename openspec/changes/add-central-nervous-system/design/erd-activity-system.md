# ERD: Full Activity & Process Tracking System

Designed now in S1, implemented incrementally (S1: events only, S3: timeline upgrade, S4: process types and steps).

## Entities

### ProcessType (REGULAR node) — S4
| Attribute       | Type     | Required | Notes                                       |
|-----------------|----------|----------|---------------------------------------------|
| id              | string   | yes      | Mujarrad node ID                            |
| name            | string   | yes      | e.g. "Partner Onboarding", "Document Signing"|
| description     | string   | no       |                                             |
| isActive        | boolean  | yes      | Can be deactivated without deletion         |
| createdAt       | datetime | yes      |                                             |
| updatedAt       | datetime | yes      |                                             |

### StepDefinition (REGULAR node) — S4
| Attribute       | Type     | Required | Notes                                       |
|-----------------|----------|----------|---------------------------------------------|
| id              | string   | yes      | Mujarrad node ID                            |
| name            | string   | yes      | e.g. "Intake", "Due Diligence", "Board Review"|
| order           | number   | yes      | Position in the process sequence            |
| description     | string   | no       |                                             |
| isMandatory     | boolean  | yes      | Whether this step can be skipped            |
| createdAt       | datetime | yes      |                                             |

### StepInstance (REGULAR node) — S4
| Attribute       | Type     | Required | Notes                                       |
|-----------------|----------|----------|---------------------------------------------|
| id              | string   | yes      | Mujarrad node ID                            |
| status          | string   | yes      | "pending" | "in_progress" | "completed" | "skipped" |
| startedAt       | datetime | no       | When status changed to in_progress          |
| completedAt     | datetime | no       | When status changed to completed/skipped    |
| completedBy     | string   | no       | User ID                                     |
| notes           | string   | no       | Optional notes on completion                |
| createdAt       | datetime | yes      |                                             |

### ActivityEvent (REGULAR node) — S1
(See erd-s1.md for full schema)

## Relationships

```
ProcessType     --[has_step]---------> StepDefinition  (1:N, ordered)
Organization    --[has_process]------> ProcessType      (M:N via StepInstance)
StepDefinition  --[has_instance]-----> StepInstance     (1:N, one per org per process)
StepInstance    --[for_organization]-> Organization     (N:1)
StepInstance    --[has_activity]-----> ActivityEvent     (0:N)
Organization    --[has_activity]-----> ActivityEvent     (1:N)
```

## State Machine: StepInstance

```
          start()           complete()
pending ---------> in_progress ---------> completed
   |                    |
   | skip()             | skip()
   v                    v
 skipped             skipped
```

Transitions:
- `pending → in_progress`: User starts the step. Sets `startedAt`.
- `in_progress → completed`: User completes the step. Sets `completedAt`, `completedBy`.
- `pending → skipped`: User skips a non-mandatory step. Sets `completedAt`.
- `in_progress → skipped`: User abandons and skips. Sets `completedAt`.
- No backward transitions (completed/skipped are terminal).

## Phased Implementation

### S1 (this sprint)
- ActivityEvent nodes only
- Automatic event logging on all CRUD operations
- Simple chronological list on Activity tab
- ERD designed for full system (this document)

### S3
- Upgrade Activity tab to custom shadcn/ui vertical timeline
- Infinite scroll, filtering by event type

### S4
- ProcessType and StepDefinition CRUD (configurable by user)
- StepInstance tracking per organization per process
- Progress indicators on Activity tab
- Unified stream of events + step completions
