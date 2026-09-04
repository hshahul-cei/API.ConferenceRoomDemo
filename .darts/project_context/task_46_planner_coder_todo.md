# Planner-Coder Todo — 46
**Requirement:** Need to upgrade the project c# code version to C# 6

---

## Wiring Manifest

### Existing (preserve every line when modifying these files)
- API.ConferenceRoom.csproj: TargetFrameworkVersion v4.8, Roslyn compiler packages (1.0.0)
- web.config: targetFramework 4.8 and 4.5.2 mixed

### Planned (add exactly these in STEP 3 — decided now, not during coding)
- API.ConferenceRoom.csproj: upgrade Microsoft.Net.Compilers to 4.2.0, Microsoft.CodeDom.Providers.DotNetCompilerPlatform to 4.1.0
- web.config: ensure consistent targetFramework 4.8
- Codebase: Use C# 6 features (string interpolation, null-conditional operator, auto-property initializers, nameof)

---

## All Tasks

| ID | Task | Files | Status | Depends On |
|---|---|---|---|---|
| T-001 | Upgrade Project Configuration & Dependencies | API.ConferenceRoom.csproj, packages.config, web.config | pending | — |
| T-002 | Refactor Code to C# 6 Syntax | Areas/ConferenceRoom/Controllers/AccountController.cs, Code/ConferenceRoom/SitecoreHelpers.cs, Areas/ConferenceRoom/Models/LoginViewModel.cs | pending | T-001 |
