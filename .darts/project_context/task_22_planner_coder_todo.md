# Planner-Coder Todo — 22
**Requirement:** Create a new Login page in the Sitecore ASP.NET MVC brownfield project. The page must include the following specific elements: 1. AccessCode (Free Text box), 2. Create New Access Code (Hyper Link). The implementation should follow the project's existing MVC patterns, likely involving a Controller, a ViewModel to capture the AccessCode, and a Razor View (.cshtml) for the UI.

Acceptance Criteria:
- A new Sitecore MVC rendering (Controller or View) is created for the Login Page.
- The page renders a free text box for the 'AccessCode' field.
- The page renders a hyperlink with the text 'Create New Access Code'.
- The rendering is correctly bound to a Sitecore item and layout.

Technical Hints: Ensure the AccessCode field is mapped to a property in your ViewModel. Use Sitecore's Rendering parameters or Datasource if the hyperlink target needs to be CMS-configurable. Verify the project's routing allows for the new login page path.

---

## Wiring Manifest

### Existing (preserve every line when modifying these files)
- API.ConferenceRoom.csproj: Compile and Content items

### Planned (add exactly these in STEP 3 — decided now, not during coding)
- API.ConferenceRoom.csproj: add `<Compile Include="Areas\ConferenceRoom\Controllers\AccountController.cs" />`, `<Compile Include="Areas\ConferenceRoom\Models\LoginViewModel.cs" />`, `<Content Include="Areas\ConferenceRoom\Views\Account\Login.cshtml" />`

---

## All Tasks

| ID | Task | Files | Status | Depends On |
|---|---|---|---|---|
| T-001 | Backend — Login Model and Controller | Areas/ConferenceRoom/Models/LoginViewModel.cs, Areas/ConferenceRoom/Controllers/AccountController.cs, API.ConferenceRoom.csproj | pending | — |
| T-002 | Frontend UI — Login Razor View | Areas/ConferenceRoom/Views/Account/Login.cshtml | pending | T-001 |
