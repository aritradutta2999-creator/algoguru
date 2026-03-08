

## Security Assessment & Hardening Plan

### Current Security Status

Your project is already in a **strong security position**:
- **No SQL injection risk** — the database client uses parameterized queries automatically; no raw SQL is ever built from user input
- **RLS (Row Level Security)** is enabled on the profiles table with proper policies
- **No XSS vulnerabilities** — no user-supplied HTML is rendered; the only `dangerouslySetInnerHTML` is in a UI library component generating safe CSS
- **Auth is enforced** on all content routes via `ProtectedRoute`
- **SECURITY DEFINER** functions have `search_path` locked down
- Automated security scan: **0 issues found**

### Proposed Hardening Improvements

1. **Add input validation with Zod on the Auth form** — validate email format, password strength (min 8 chars, mixed case/numbers), and name length before sending to the backend. Prevents malformed data and gives users better feedback.

2. **Fix RLS: add DELETE policy on profiles** — currently users cannot delete their own profile. Add a restrictive delete policy so only the owning user can delete, preventing orphaned data issues.

3. **Add rate-limit UX protection on auth forms** — disable the submit button for a few seconds after failed attempts to discourage brute-force from the client side. (Server-side rate limiting is already handled by the authentication system.)

4. **Sanitize user metadata display** — the `UserMenu` renders `user.user_metadata` values (name, avatar URL). Add validation that avatar URLs are valid HTTPS URLs before rendering in an `<img>` tag, and truncate/escape display names.

5. **Add Content Security headers via meta tags** — add `<meta>` referrer policy to prevent leaking auth tokens in referrer headers.

### Technical Details

```text
Auth Form (Auth.tsx)
├── Add Zod schema: email, password (min 8, regex), name (max 100)
├── Show inline validation errors
└── Add 3-second cooldown after failed login

UserMenu (App.tsx)  
├── Validate avatar_url is https:// before rendering
└── Sanitize display name (truncate, strip HTML entities)

Database (migration)
└── ADD POLICY "Users can delete own profile" ON profiles
    FOR DELETE USING (auth.uid() = user_id)

index.html
└── Add <meta name="referrer" content="strict-origin-when-cross-origin">
```

### What This Does NOT Change
- No changes to your content/learning pages — they render static data, no security concern
- No changes to the database client — it's already safe by design
- No changes to RLS on SELECT/INSERT/UPDATE — those are correct

