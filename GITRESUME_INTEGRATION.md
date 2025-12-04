---

## 📨 For KrackedDevs Team (Quick Start)

> **This section is for the KrackedDevs developer/owner.** Everything below explains what you need to do on your end.

### What This Integration Does

- Users can **"Login with GitResu.me"** on your platform
- After login, you receive their **GitHub username**
- You can then fetch their public profile from `gitresu.me/[username]`

### What You Need To Do (3 Steps)

#### Step 1: Add a Login Button

Add a button/link on your site that says **"Login with GitResu.me"** and redirects to:

```
https://gitresu.me/login?partner=krackeddevs&redirect_uri=https://krackeddevs.com/auth/callback
```

**Important:**

- Replace `https://krackeddevs.com/auth/callback` with your actual callback URL
- The `redirect_uri` must match one of the allowed URLs we've configured (see below)

#### Step 2: Create a Callback Page

Create a page at `/auth/callback` (or wherever your `redirect_uri` points to) that:

1. Reads the `username` from the URL query parameter
2. Stores it in your database or session
3. Redirects the user to wherever they should go next

**Example (pseudocode):**

```javascript
// When user lands on https://krackeddevs.com/auth/callback?username=solahidris

const username = getQueryParam("username"); // "solahidris"

// Save to your database
await saveUser({ gitresumeUsername: username });

// Redirect to your dashboard or home
redirect("/dashboard");
```

#### Step 3: Use the Username

Once you have the username, you can:

- **Display their profile**: Link to `https://gitresu.me/[username]`
- **Fetch their data**: Use our public API (if available) or scrape their public profile
- **Show their avatar**: `https://github.com/[username].png`

### Allowed Redirect URLs

We've whitelisted these URLs for your integration:

| Environment | Allowed URL                     |
| ----------- | ------------------------------- |
| Production  | `https://krackeddevs.com/*`     |
| Production  | `https://www.krackeddevs.com/*` |
| Development | `http://localhost:3001/*`       |

> Need a different URL? Let us know and we'll add it.

### What Happens During Login

1. User clicks "Login with GitResu.me" on your site
2. User is redirected to GitResu.me
3. User logs in with GitHub (creates a GitResu.me account if new)
4. User sees an **ID Card** showing their profile preview
5. User clicks "Continue to KrackedDevs"
6. User is redirected back to your `redirect_uri` with `?username=xxx`

### Example URLs

**Login URL (you send users here):**

```
https://gitresu.me/login?partner=krackeddevs&redirect_uri=https://krackeddevs.com/auth/callback
```

**Callback URL (we send users back here):**

```
https://krackeddevs.com/auth/callback?username=solahidris
```

### Testing Locally

For local development, use:

```
http://localhost:3000/login?partner=krackeddevs&redirect_uri=http://localhost:3001/auth/callback
```

(Assuming GitResu.me runs on port 3000 and KrackedDevs runs on port 3001)

### Questions?

Contact the GitResu.me team if you need:

- Additional redirect URLs whitelisted
- Help with implementation
- Access to more user data (we can discuss)

---
