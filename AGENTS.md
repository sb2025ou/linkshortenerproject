# Agent Instructions for Link Shortener Project

This document provides comprehensive coding standards and guidelines for LLM agents working on this project. All agents must adhere to these standards to maintain code quality, consistency, and project integrity.

## Quick Reference

- **Framework**: Next.js 16.1.6 with React 19
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS v4 with shadcn components
- **Database**: Drizzle ORM with Neon PostgreSQL
- **Authentication**: Clerk
- **Code Quality**: ESLint 9.x

## Documentation Structure

All coding standards are organized into separate markdown files in the `/docs` directory for easy reference and maintenance. ALWAYS refer to the relevant .md file BEFORE generating any code.

### Core Standards

- **[AUTHENTICATION.md](docs/AUTHENTICATION.md)** - Authentication patterns, Clerk integration, protected routes, sign-in/sign-up modals
- **[ui-components.md](docs/ui-components.md)** - shadcn UI component usage, installation, implementation patterns, styling conventions



## High-Level Project Structure

```
├── app/                      # Next.js App Router
│   ├── (routes)/             # Grouped route segments
│   ├── api/                  # API routes
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Reusable React components
│   ├── ui/                   # shadcn UI components
│   └── [Feature]/            # Feature-specific components
├── db/                       # Database layer
│   ├── schema.ts             # Drizzle schema definitions
│   └── index.ts              # Database client
├── lib/                      # Utility functions
│   └── utils.ts              # Helper functions
├── docs/                     # Coding standards & guidelines
└── public/                   # Static assets
```

## Before You Start

1. **Read the Relevant Documentation**: Identify which parts of the codebase you'll be working with and read the corresponding standards document.
2. **Follow TypeScript Strictness**: All code must compile with `strict: true` and pass type checking.
3. **Run ESLint**: Execute `npm run lint` before committing and fix all warnings.
4. **Test Your Changes**: Ensure code changes don't break existing functionality.


## Key Principles

### 1. Type Safety First
- Use TypeScript strict mode exclusively
- Define interfaces for all major data structures
- Avoid `any` type; use `unknown` with type guards instead
- Leverage discriminated unions for complex state

### 2. Component Purity
- Favor functional components with hooks
- Keep components focused with single responsibility
- Use server components to reduce client-side JavaScript
- Separate concerns between UI and business logic

### 3. Database Integrity
- Define schema first; code follows
- Use migrations for all schema changes
- Implement proper foreign key relationships
- Create indexes for common query patterns

### 4. API Consistency
- Use RESTful patterns consistently
- Implement standardized error responses
- Validate all user inputs
- Document request/response schemas

### 5. Code Clarity
- Write self-documenting code with clear intent
- Add comments for complex logic only
- Use descriptive names for variables and functions
- Keep functions small and focused

### 6. Security Awareness
- Never expose sensitive data in client code
- Validate and sanitize all inputs
- Use Clerk for secure authentication
- Follow OWASP principles

## Common Tasks

### Adding a New Feature


### Fixing a Bug
1. Identify the affected domain (component, API, database)
2. Review relevant standards document
3. Implement fix following established patterns
4. Ensure types are correct
5. Test fix thoroughly


### Refactoring Code
1. Understand current structure
2. Verify TypeScript compilation passes
3. Refactor following standards for target domain
4. Run full test suite
5. Ensure no performance degradation

## Environment Setup

Ensure the following are installed and working:
- Node.js 18+
- npm 9+
- TypeScript 5.x
- All dependencies from `package.json`

Required environment variables:
- Database connection string (Neon PostgreSQL)
- Clerk API keys
- Any feature-specific keys

## Code Review Checklist

Before submitting code for review, verify:

- ✅ TypeScript compiles without errors or warnings
- ✅ ESLint passes: `npm run lint`
- ✅ No `any` types (except absolute necessity)
- ✅ Functions have proper types/interfaces
- ✅ Components follow React standards
- ✅ Database changes include migrations
- ✅ API endpoints have error handling
- ✅ No hardcoded values or secrets
- ✅ Naming follows conventions
- ✅ Comments explain "why" not "what"
- ✅ Git commit follows format standards
- ✅ No console.log statements in production code

## Updating Standards

When standards need to be updated:
1. Update the relevant document in `/docs`
2. Ensure changes are consistent across all related documents
3. Document the reason for the change
4. Notify the team of breaking changes
5. Update this AGENTS.md if necessary

## Questions or Clarification?

Refer to the specific standards document for your area of work. If something is unclear:
1. Check if there's an example in the codebase
2. Review the full standards document multiple times
3. Ask for clarification before proceeding

---

**Last Updated**: February 24, 2026  
**Version**: 1.0.0
