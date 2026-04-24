# Admin Shell Spec Delta

## ADDED Requirements

### Requirement: Authentication via refine Auth Provider
The system SHALL authenticate the user via the refine auth provider, which wraps Mujarrad JWT issuance and Google OAuth.

#### Scenario: Successful login with credentials
- **WHEN** Omar submits valid email and password on the shadcn-admin sign-in page
- **THEN** the refine auth provider calls Mujarrad's login endpoint, stores the JWT, and redirects to the dashboard

#### Scenario: Google OAuth login
- **WHEN** Omar clicks "Sign in with Google" on the shadcn-admin sign-in page
- **THEN** the refine auth provider completes the Google OAuth flow via Mujarrad and redirects to the dashboard

#### Scenario: Expired or missing token
- **WHEN** the refine auth provider's `check` method detects an expired or missing token
- **THEN** the system redirects to the login page and clears any stale auth state via the provider's `logout` method

### Requirement: Protected Routes via refine `<Authenticated>`
The system SHALL prevent unauthenticated access to all routes except the login page using refine's `<Authenticated>` component.

#### Scenario: Unauthenticated access attempt
- **WHEN** an unauthenticated user navigates to any protected route
- **THEN** the refine `<Authenticated>` component redirects to the login page

#### Scenario: Authenticated user access
- **WHEN** an authenticated user navigates to a protected route
- **THEN** the refine `<Authenticated>` component renders the route content normally

### Requirement: App Shell Layout from shadcn-admin
The system SHALL render a persistent sidebar, top header, and main content area on all authenticated pages using shadcn-admin's layout components.

#### Scenario: Sidebar navigation
- **WHEN** Omar is logged in
- **THEN** the sidebar displays navigation links driven by refine resource definitions: Dashboard, Organizations, and Search

#### Scenario: Responsive sidebar collapse
- **WHEN** the viewport width is below the tablet breakpoint
- **THEN** the sidebar collapses to a hamburger menu using shadcn-admin's responsive layout

### Requirement: Routing via refine Resources
The system SHALL define routes through refine resource definitions, with shadcn-admin providing the layout structure.

#### Scenario: Resource-driven routing
- **WHEN** a new resource is defined in the refine configuration
- **THEN** the corresponding list, create, edit, and show routes are available without manual route registration

### Requirement: Dark Mode
The system SHALL support light and dark color themes via shadcn-admin's theme provider with a toggle in the header.

#### Scenario: Toggle dark mode
- **WHEN** Omar clicks the theme toggle
- **THEN** the app switches between light and dark mode and persists the preference

### Requirement: Error Pages
The system SHALL display appropriate error pages from shadcn-admin for common HTTP error states.

#### Scenario: 404 page
- **WHEN** Omar navigates to a non-existent route
- **THEN** the system displays the shadcn-admin 404 error page

#### Scenario: 403 page
- **WHEN** the refine auth provider denies access to a resource
- **THEN** the system displays the shadcn-admin 403 error page

### Requirement: Dashboard
The system SHALL display a dashboard as the default authenticated landing page.

#### Scenario: Dashboard summary
- **WHEN** Omar navigates to the dashboard
- **THEN** the page displays summary cards for total organizations, total files, and recent activity fetched via refine `useList` hooks

### Requirement: Toast Notifications via sonner
The system SHALL display toast notifications for all CRUD operations via the refine notification provider backed by sonner.

#### Scenario: Successful operation toast
- **WHEN** a CRUD operation succeeds (e.g., organization created)
- **THEN** a sonner success toast appears with a confirmation message
