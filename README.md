# Yet Another To Do App

Yet Another To Do App is a collaborative task management application built with Next.js, leveraging Drizzle ORM for database interactions and Better Auth for authentication. The app allows users to create and manage organizations, to-do lists, and invitations, facilitating efficient task organization and collaboration among team members.

**You can find a demo [here](https://www.loom.com/share/1dd27d55f280451882af89e38da718a8?sid=9d8bf4de-e283-4d4b-9c2d-6836625fd5aa) and you can find the app running [here](https://yet-another-to-do-app.vercel.app/).**

## Features

- User authentication with email and password.
- Organization management, including creation and invitation of members.
- CRUD operations for to-do items, with support for subtasks.
- Rich text editing capabilities for to-do content using TipTap.
- Responsive design for a seamless user experience across devices.

## Technologies Used

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Drizzle ORM, PostgreSQL
- **Authentication:** Better Auth
- **State Management:** TRPC with React Query

## Directory Structure

The project follows a structured directory layout:

```
.
├── app
│   ├── api
│   ├── auth
│   ├── orgs
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components
├── db
│   ├── index.ts
│   └── schema.ts
├── lib
│   ├── auth-client.ts
│   ├── auth.ts
│   ├── trpc-client.ts
│   ├── types.ts
│   └── utils.ts
├── trpc
│   └── routers
│       └── _app.ts
└── auth-schema.ts
```

## Important Logic Location

- **Authentication Logic:** The authentication logic is primarily handled in `lib/auth.ts`, which configures Better Auth with the necessary adapters and plugins.
- **Database Interactions:** The database schema and ORM configuration can be found in `db/schema.ts` and `db/index.ts`, respectively. Here, Drizzle ORM manages the PostgreSQL database interactions.
- **TRPC Router Logic:** The core API logic using TRPC is located in `trpc/routers/_app.ts`. This file contains the router that defines all the procedures for fetching and manipulating todos, organizations, and invitations. The authorization checks and data fetching are all managed here, ensuring that only authorized users can access their respective data.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/000alen/yet-another-to-do-app.git
   cd yet-another-to-do-app
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Setup Environment Variables:**
   Create a `.env.local` file in the root directory and add the following variables:

   ```plaintext
   DATABASE_URL=postgres://<username>:<password>@localhost:5432/<dbname>
   NEXT_PUBLIC_APP_DOMAIN=localhost:3000
   RESEND_API_KEY=<your-resend-api-key>
   ```

4. **Run database migrations:**
   Ensure your PostgreSQL database is running and then run migrations using Drizzle ORM commands (if applicable).

5. **Start the development server:**

   ```bash
   pnpm dev
   ```

6. **Open your browser and navigate to:**
   ```
   http://localhost:3000
   ```

## Usage

### Authentication

- Navigate to the login or signup page to create a new account or log in to your existing account.

### Organization Management

- After logging in, you can create a new organization or join an existing one via invitations.

### Task Management

- Inside each organization, you can create to-do lists, manage tasks, and organize them hierarchically with subtasks.
- Rich text editing is enabled for task content, allowing users to format their notes and descriptions.

### Invitations

- Users can invite others to join their organization, and manage pending invitations from the invitations page.

## API Reference

The application uses **TRPC** for its API routes, which enables type-safe communication between the frontend and backend. The key endpoints are defined in `trpc/routers/_app.ts`.

### Example TRPC Endpoints

- **getTodos**

  - Fetches all todos for a specified organization, with optional filtering by parent todo.

- **createTodo**

  - Creates a new todo within a specified organization.

- **updateTodo**

  - Updates an existing todo by ID.

- **deleteTodo**
  - Deletes a todo by ID.

## Acknowledgements

- **Next.js** for a powerful React framework.
- **Drizzle ORM** for simplified database interactions.
- **Better Auth** for robust authentication solutions.
