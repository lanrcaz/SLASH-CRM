# Data Import

The first Beta import should prioritize the CRM spine:

- clients
- services
- client-service assignments
- leads
- proposals
- activities

## Import Rules

- Do not hard-delete historical clients.
- Preserve lost and disqualified leads for reporting.
- Every active client must have at least one service assignment.
- Every open lead must have an owner and next follow-up date.
- MRR must come from active client-service assignments.

## Suggested Import Order

1. Services
2. Clients
3. Client-service assignments
4. Leads and proposals
5. Activities
