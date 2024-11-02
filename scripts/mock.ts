import dotenv from 'dotenv';
dotenv.config();

import { db } from "@/db";
import { todo } from "@/db/schema";

export const mockTodos = [
  // Parent Todo 1
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Design User Authentication Flow",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create a comprehensive user authentication flow including:" },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "JWT Token Generation" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "OAuth Integration (Google, GitHub)" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Password Reset Mechanism" }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "in_progress",
    dueAt: new Date("2024-12-15T17:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-10-01T09:30:00Z"),
    updatedAt: new Date("2024-11-01T14:45:00Z"),
    version: 2,
  },

  // Child Todo 1.1
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Implement JWT Token Generation",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Develop the backend service for generating JWT tokens upon user login." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "typescript" },
          content: [
            { type: "text", text: "import jwt from 'jsonwebtoken';\n\nconst generateToken = (userId: string) => {\n  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });\n};" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2024-12-05T12:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-10-05T11:20:00Z"),
    updatedAt: new Date("2024-10-10T10:15:00Z"),
    version: 1,
  },

  // Parent Todo 2
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Set Up OAuth Integration with Google",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Integrate Google OAuth for seamless user authentication." },
          ],
        },
        {
          type: "orderedList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Register the application with Google Developer Console." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Configure OAuth credentials in the backend." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement the OAuth callback endpoint." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2024-12-20T09:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-10-10T08:45:00Z"),
    updatedAt: new Date("2024-10-12T16:30:00Z"),
    version: 1,
  },

  // Parent Todo 3
  {
    id: "d4e5f6a7-b8c9-0123-def1-456789012345",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Create Password Reset Mechanism",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Steps to Implement Password Reset" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Implement a secure password reset feature following these steps:" },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "User requests a password reset via email." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Generate a unique, time-limited reset token." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Send the reset link containing the token to the user's email." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Verify the token and allow the user to set a new password." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "completed",
    dueAt: new Date("2024-11-30T15:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-10-15T13:10:00Z"),
    updatedAt: new Date("2024-11-01T10:25:00Z"),
    version: 3,
  },

  // Parent Todo 4
  {
    id: "e5f6a7b8-c9d0-1234-ef12-567890123456",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Archive Completed Tasks",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Set up an automated system to archive completed tasks after a certain period." },
          ],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "This helps in keeping the active task list clean and improves performance." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "javascript" },
          content: [
            { type: "text", text: "// Example: Archive tasks older than 30 days\nconst archiveOldTasks = async () => {\n  const thirtyDaysAgo = new Date();\n  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);\n  await db.update(todo)\n    .set({ status: 'archived', updatedAt: new Date() })\n    .where(and(\n      eq(todo.status, 'completed'),\n      lt(todo.completedAt, thirtyDaysAgo)\n    ));\n};" },
          ],
        },
      ],
    },
    status: "archived",
    dueAt: new Date("2024-11-15T11:00:00Z"),
    priority: "low",
    createdAt: new Date("2024-09-25T07:50:00Z"),
    updatedAt: new Date("2024-11-02T09:00:00Z"),
    version: 1,
  },

  // Additional Parent Todos
  // Parent Todo 5
  {
    id: "f6a7b8c9-d0e1-2345-f012-678901234567",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Optimize Database Queries",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Analyze and optimize database queries to improve application performance." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Identify slow-running queries using profiling tools." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement indexing strategies where necessary." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Refactor complex joins and nested queries." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Cache frequently accessed data." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2024-12-25T17:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-10-20T10:00:00Z"),
    updatedAt: new Date("2024-10-22T14:30:00Z"),
    version: 1,
  },

  // Child Todo 5.1
  {
    id: "g7b8c9d0-e1f2-3456-0123-789012345678",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "f6a7b8c9-d0e1-2345-f012-678901234567",
    title: "Implement Indexing on Users Table",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Add indexes to the 'email' and 'createdAt' columns in the Users table to speed up query performance." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "sql" },
          content: [
            { type: "text", text: "CREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_users_created_at ON users(created_at);" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2024-12-10T12:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-10-21T09:15:00Z"),
    updatedAt: new Date("2024-10-23T11:45:00Z"),
    version: 1,
  },

  // Parent Todo 6
  {
    id: "h8c9d0e1-f2g3-4567-1234-890123456789",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Implement Real-Time Notifications",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Develop a real-time notification system to keep users informed about important events." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Choose a real-time communication protocol (e.g., WebSockets, Server-Sent Events)." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Design notification schemas and events." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement backend services to emit notifications based on events." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Develop frontend components to display notifications in real-time." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-01-15T10:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-11-01T08:00:00Z"),
    updatedAt: new Date("2024-11-02T09:30:00Z"),
    version: 1,
  },

  // Child Todo 6.1
  {
    id: "i9d0e1f2-g3h4-5678-2345-901234567890",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "h8c9d0e1-f2g3-4567-1234-890123456789",
    title: "Set Up WebSocket Server",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Establish a WebSocket server to handle real-time connections." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "javascript" },
          content: [
            { type: "text", text: "const WebSocket = require('ws');\n\nconst wss = new WebSocket.Server({ port: 8080 });\n\nwss.on('connection', ws => {\n  console.log('Client connected');\n  ws.on('message', message => {\n    console.log(`Received message => ${message}`);\n  });\n  ws.send('Welcome to the real-time notification system!');\n});" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-01-05T14:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-03T10:20:00Z"),
    updatedAt: new Date("2024-11-04T11:00:00Z"),
    version: 1,
  },

  // Child Todo 6.2
  {
    id: "j0e1f2g3-h4i5-6789-3456-012345678901",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "h8c9d0e1-f2g3-4567-1234-890123456789",
    title: "Design Notification Event Schemas",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Define the structure of various notification events to be emitted by the server." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "json" },
          content: [
            { type: "text", text: "{\n  \"type\": \"TASK_ASSIGNED\",\n  \"payload\": {\n    \"taskId\": \"string\",\n    \"assigneeId\": \"string\",\n    \"assignedBy\": \"string\",\n    \"timestamp\": \"ISODateString\"\n  }\n}" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-01-10T09:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-04T12:30:00Z"),
    updatedAt: new Date("2024-11-05T13:15:00Z"),
    version: 1,
  },

  // Parent Todo 7
  {
    id: "k1f2g3h4-i5j6-7890-4567-123456789012",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Implement Task Dependency Management",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features for Managing Task Dependencies" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Develop functionalities to allow tasks to have dependencies on other tasks." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Define dependency relationships between tasks." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Prevent circular dependencies." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Visualize dependencies in the task UI." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Notify users when dependent tasks are completed." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-02-20T16:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-11-10T09:00:00Z"),
    updatedAt: new Date("2024-11-11T10:30:00Z"),
    version: 1,
  },

  // Child Todo 7.1
  {
    id: "l2g3h4i5-j6k7-8901-5678-234567890123",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "k1f2g3h4-i5j6-7890-4567-123456789012",
    title: "Prevent Circular Dependencies",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Implement logic to detect and prevent circular dependencies between tasks." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "typescript" },
          content: [
            { type: "text", text: "const hasCircularDependency = (taskId: string, dependencyId: string, db: any): boolean => {\n  if (taskId === dependencyId) return true;\n  const dependencies = db.getDependencies(dependencyId);\n  for (const dep of dependencies) {\n    if (hasCircularDependency(taskId, dep.id, db)) {\n      return true;\n    }\n  }\n  return false;\n};" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-02-10T11:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-12T14:00:00Z"),
    updatedAt: new Date("2024-11-13T15:30:00Z"),
    version: 1,
  },

  // Child Todo 7.2
  {
    id: "m3h4i5j6-k7l8-9012-6789-345678901234",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "k1f2g3h4-i5j6-7890-4567-123456789012",
    title: "Visualize Task Dependencies in UI",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create visual representations of task dependencies to enhance user experience." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Use graph libraries like D3.js or Cytoscape.js for visualization." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement interactive elements to allow users to manage dependencies." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-02-15T13:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-14T10:45:00Z"),
    updatedAt: new Date("2024-11-15T12:00:00Z"),
    version: 1,
  },

  // Parent Todo 8
  {
    id: "n4i5j6k7-l8m9-0123-7890-456789012345",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Enhance Security Measures",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Key Security Enhancements" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Implement additional security features to safeguard the application and user data." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Enable Two-Factor Authentication (2FA) for user logins." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement rate limiting on API endpoints to prevent brute-force attacks." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Conduct regular security audits and vulnerability assessments." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Encrypt sensitive data both in transit and at rest." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-03-01T18:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-11-20T09:30:00Z"),
    updatedAt: new Date("2024-11-21T10:15:00Z"),
    version: 1,
  },

  // Child Todo 8.1
  {
    id: "o5j6k7l8-m9n0-1234-8901-567890123456",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "n4i5j6k7-l8m9-0123-7890-456789012345",
    title: "Implement Two-Factor Authentication",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Add 2FA to enhance the security of user accounts." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Choose a 2FA method (e.g., SMS, Authenticator App)." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Integrate the chosen 2FA service with the authentication flow." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Ensure fallback options for users who lose access to their 2FA device." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-02-25T14:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-11-22T11:00:00Z"),
    updatedAt: new Date("2024-11-23T12:30:00Z"),
    version: 1,
  },

  // Child Todo 8.2
  {
    id: "p6k7l8m9-n0o1-2345-9012-678901234567",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "n4i5j6k7-l8m9-0123-7890-456789012345",
    title: "Set Up Rate Limiting on API Endpoints",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Implement rate limiting to protect API endpoints from abuse and brute-force attacks." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "javascript" },
          content: [
            { type: "text", text: "const rateLimit = require('express-rate-limit');\n\nconst apiLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000, // 15 minutes\n  max: 100, // limit each IP to 100 requests per windowMs\n  message: 'Too many requests from this IP, please try again after 15 minutes.'\n});\n\napp.use('/api/', apiLimiter);" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-02-28T16:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-24T13:15:00Z"),
    updatedAt: new Date("2024-11-25T14:45:00Z"),
    version: 1,
  },

  // Parent Todo 9
  {
    id: "q7l8m9n0-o1p2-3456-0123-789012345678",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Improve Application Performance",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Enhance the overall performance of the application through various optimizations." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement code splitting and lazy loading for frontend assets." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Optimize image sizes and formats for faster loading times." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Minify and compress JavaScript and CSS files." }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Implement caching strategies for both client and server-side data." }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-03-15T10:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-11-25T09:00:00Z"),
    updatedAt: new Date("2024-11-26T10:30:00Z"),
    version: 1,
  },

  // Child Todo 9.1
  {
    id: "r8m9n0o1-p2q3-4567-1234-890123456789",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "q7l8m9n0-o1p2-3456-0123-789012345678",
    title: "Implement Code Splitting with Webpack",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Configure Webpack to enable code splitting for improved load times." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "javascript" },
          content: [
            { type: "text", text: "module.exports = {\n  // ... other configurations\n  optimization: {\n    splitChunks: {\n      chunks: 'all',\n    },\n  },\n};" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-03-05T12:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-27T11:30:00Z"),
    updatedAt: new Date("2024-11-28T12:45:00Z"),
    version: 1,
  },

  // Child Todo 9.2
  {
    id: "s9n0o1p2-q3r4-5678-2345-901234567890",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "q7l8m9n0-o1p2-3456-0123-789012345678",
    title: "Optimize Images with WebP Format",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Convert and serve images in WebP format to reduce their size without compromising quality." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "javascript" },
          content: [
            { type: "text", text: "// Example using sharp library\nconst sharp = require('sharp');\n\nconst convertToWebP = async (inputPath, outputPath) => {\n  await sharp(inputPath)\n    .webp({ quality: 80 })\n    .toFile(outputPath);\n};" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-03-10T14:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-11-29T13:45:00Z"),
    updatedAt: new Date("2024-11-30T15:00:00Z"),
    version: 1,
  },

  // Parent Todo 10
  {
    id: "t0o1p2q3-r4s5-6789-3456-012345678901",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: null,
    title: "Develop Reporting Dashboard",
    content: {
      type: "doc",
      content: [
        {
          type: "heading",
          attrs: { level: 2 },
          content: [{ type: "text", text: "Features of the Reporting Dashboard" }],
        },
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create a comprehensive dashboard to display various reports and analytics." },
          ],
        },
        {
          type: "bulletList",
          content: [
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "User Activity Reports" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Task Completion Statistics" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Real-Time Performance Metrics" }],
                },
              ],
            },
            {
              type: "listItem",
              content: [
                {
                  type: "paragraph",
                  content: [{ type: "text", text: "Export Reports in Various Formats (PDF, CSV)" }],
                },
              ],
            },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-04-01T17:00:00Z"),
    priority: "high",
    createdAt: new Date("2024-12-01T10:00:00Z"),
    updatedAt: new Date("2024-12-02T11:30:00Z"),
    version: 1,
  },

  // Child Todo 10.1
  {
    id: "u1p2q3r4-s5t6-7890-4567-123456789012",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "t0o1p2q3-r4s5-6789-3456-012345678901",
    title: "Implement User Activity Reports",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Develop reports that track and display user activities within the application." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "typescript" },
          content: [
            { type: "text", text: "// Example API endpoint for fetching user activities\napp.get('/api/reports/user-activities', authenticate, async (req, res) => {\n  const userId = req.user.id;\n  const activities = await db.select().from(userActivities).where(eq(userActivities.userId, userId));\n  res.json(activities);\n});" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-03-25T15:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-12-03T12:00:00Z"),
    updatedAt: new Date("2024-12-04T13:30:00Z"),
    version: 1,
  },

  // Child Todo 10.2
  {
    id: "v2q3r4s5-t6u7-8901-5678-234567890123",
    userId: "KaIYM-x2x3wv5oxGokGrI",
    organizationId: "lfpHw8fb0S3njX6o_rhJG",
    parentId: "t0o1p2q3-r4s5-6789-3456-012345678901",
    title: "Design Dashboard UI Components",
    content: {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Create and style UI components for the reporting dashboard using the chosen frontend framework." },
          ],
        },
        {
          type: "codeBlock",
          attrs: { language: "jsx" },
          content: [
            { type: "text", text: "import React from 'react';\nimport { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';\n\nconst UserActivityChart = ({ data }) => (\n  <LineChart width={600} height={300} data={data}>\n    <XAxis dataKey=\"date\" />\n    <YAxis />\n    <Tooltip />\n    <Line type=\"monotone\" dataKey=\"activityCount\" stroke=\"#8884d8\" />\n  </LineChart>\n);\n\nexport default UserActivityChart;" },
          ],
        },
      ],
    },
    status: "open",
    dueAt: new Date("2025-03-20T14:00:00Z"),
    priority: "medium",
    createdAt: new Date("2024-12-05T14:15:00Z"),
    updatedAt: new Date("2024-12-06T15:45:00Z"),
    version: 1,
  },
];

const seedTodos = async () => {
  try {

    for (const data of mockTodos) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await db.insert(todo).values(data as any);
    }

    console.log("Extended mock todos have been inserted successfully.");
  } catch (error) {
    console.error("Error inserting extended mock todos:", error);
  }
};

seedTodos().catch(console.error);
