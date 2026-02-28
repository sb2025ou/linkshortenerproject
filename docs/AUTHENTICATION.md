# Authentication Standards

This document outlines all authentication guidelines for the Link Shortener project. All authentication must be handled exclusively through Clerk.

## Core Principles

### 1. Clerk Exclusivity
- **Clerk is the only authentication provider** allowed in this project
- No custom authentication implementations
- No alternative auth services (Auth0, Firebase, etc.)
- All user identity management flows through Clerk
- Never store passwords or sensitive auth credentials manually

### 2. Protected Routes

#### Dashboard Route
- The `/dashboard` page is a **protected route**
- Requires user authentication to access
- Unauthenticated users must be redirected to sign-in
- Use Clerk's `auth()` middleware to enforce protection

#### Homepage Redirect Logic
- Users accessing `/` (homepage) while **logged in** should be redirected to `/dashboard`
- Unauthenticated users can access the homepage
- Implement redirect logic in the root layout or page component
- Use `auth()` to check authentication status

### 3. Authentication UI

#### Sign In & Sign Up Modals
- Sign in and sign up flows **must launch as modals**
- Use Clerk's `<SignIn />` and `<SignUp />` components
- Configure modal mode in Clerk components
- Never use full-page authentication forms
- Keep UI experience lightweight and non-disruptive

#### Modal Configuration
```typescript
// Example modal implementation
<SignIn 
  mode="modal"
  appearance={{
    // Customize appearance as needed
  }}
/>

<SignUp 
  mode="modal"
  appearance={{
    // Customize appearance as needed
  }}
/>
```

## Implementation Patterns

### Checking Authentication Status
```typescript
import { auth } from "@clerk/nextjs/server";

export async function protectedFunction() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("User not authenticated");
  }
  
  // Proceed with authenticated logic
}
```

### Route Protection
Use Clerk's middleware to protect routes:
```typescript
// middleware.ts or in layout files
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function checkAuth() {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
}
```

### Client-Side Auth Checks
```typescript
import { useAuth } from "@clerk/nextjs";

export function MyComponent() {
  const { isLoaded, userId } = useAuth();
  
  if (!isLoaded) return <div>Loading...</div>;
  
  if (!userId) return <div>Sign in required</div>;
  
  return <div>Welcome back!</div>;
}
```

## Security Guidelines

- Never expose Clerk secret keys in client code
- Always validate user identity on the server side
- Use Clerk's built-in CSRF protection
- Store user IDs from `auth()` for database references
- Validate user ownership of resources before operations
- Follow Clerk's best practices for session management

## Configuration

Ensure the following environment variables are set:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_SIGN_IN_URL
NEXT_PUBLIC_CLERK_SIGN_UP_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
```

## Common Scenarios

### Protecting an API Route
```typescript
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Handle authenticated request
}
```

### Redirecting Logged-In Users from Homepage
```typescript
// In app/page.tsx or layout
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect("/dashboard");
  }
  
  return (
    // Homepage content for unauthenticated users
  );
}
```

## Testing & Validation

- Test authentication flows with Clerk's test mode
- Verify protected routes redirect unauthenticated users
- Confirm redirect from homepage when logged in works
- Test modal UI displays correctly
- Validate user sessions persist across page navigation
- Check ESLint passes with no auth-related warnings

---

**Last Updated**: February 26, 2026  
**Version**: 1.0.0
