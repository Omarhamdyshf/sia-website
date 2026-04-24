# State Diagram: Activity Event Lifecycle

## ActivityEvent States (S1)

ActivityEvent nodes are immutable once created. There is no state machine for events themselves — they are append-only log entries.

```
CRUD Operation occurs
       |
       v
 [Create ActivityEvent node]
       |
       v
   PERSISTED (terminal)
```

### Event Creation Triggers

| Trigger                        | action     | entityType     |
|-------------------------------|------------|----------------|
| Organization created           | created    | organization   |
| Organization updated           | updated    | organization   |
| Organization deleted           | deleted    | organization   |
| Contact added to org           | created    | contact        |
| Contact updated                | updated    | contact        |
| Contact removed from org       | deleted    | contact        |
| File uploaded                  | created    | file           |
| File deleted                   | deleted    | file           |
| Note created                   | created    | note           |
| Note deleted                   | deleted    | note           |

### Event Details Field

The `details` JSON object captures what changed:

- **created**: Snapshot of key fields (e.g., `{ name: "Acme Corp", type: "partner" }`)
- **updated**: Changed fields with old/new values (e.g., `{ status: { from: "prospect", to: "active" } }`)
- **deleted**: Snapshot of key fields before deletion

## StepInstance State Machine (S4 — designed now, not implemented in S1)

See `erd-activity-system.md` for the full state machine diagram:

```
pending → in_progress → completed
pending → skipped
in_progress → skipped
```
