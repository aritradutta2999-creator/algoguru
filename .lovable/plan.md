

## Profile & Session Management Plan

### What We'll Build

1. **Profile Page (`/profile`)** — A dedicated page where users can view and edit their display name and avatar image, with save functionality persisted to the database.

2. **Avatar Upload** — Create a storage bucket for profile avatars. Users can upload an image that gets stored securely and displayed across the app.

3. **User Dropdown Menu** — Replace the current simple logout button in the header (`UserMenu`) with a proper dropdown menu showing:
   - User avatar + name + email
   - "Profile Settings" link → navigates to `/profile`
   - "Sign Out" button

4. **Sidebar Footer** — Add a compact user info section at the bottom of the sidebar showing avatar, name, and a quick logout button.

### Technical Details

```text
Database (migration)
├── CREATE storage bucket "avatars" (public)
└── RLS policies for avatars bucket (auth users can upload/update/delete own files)

New Page: src/pages/Profile.tsx
├── Fetch profile from profiles table
├── Edit display_name (inline input)
├── Upload avatar (file input → storage bucket → update profiles.avatar_url)
└── Save changes with toast feedback

Updated: src/App.tsx
├── Add /profile route inside ProtectedRoute
├── Replace UserMenu with DropdownMenu (avatar, name, email, profile link, sign out)
└── Import DropdownMenu components

Updated: src/components/AppSidebar.tsx
└── Add user info footer (avatar + name + logout) at bottom of sidebar

Storage bucket RLS:
├── SELECT: public (bucket is public)
├── INSERT: authenticated, path starts with user's uid
├── UPDATE: authenticated, path starts with user's uid
└── DELETE: authenticated, path starts with user's uid
```

### User-Facing Changes
- Clicking your avatar/name in the header opens a dropdown with "Profile" and "Sign Out"
- The Profile page lets you change your name and upload a profile picture
- The sidebar shows your identity at the bottom with a quick logout
- All changes persist across sessions

