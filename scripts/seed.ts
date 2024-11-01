import { todo } from "@/db/schema";
import { user, organization } from "../auth-schema";
import { db } from "@/db";
import { eq } from "drizzle-orm"


async function seed() {
  // Start a transaction
  await db.transaction(async (tx) => {
    // Insert mock users
    const users = await tx.select().from(user).where(eq(user.email, "alen@uni.minerva.edu"));
    const organizations = await tx.select().from(organization).where(eq(organization.name, "alen's org"));

    console.log(users);


    // Insert mock todos
    const todos = await tx
      .insert(todo)
      .values([
        {
          userId: users[0].id,
          organizationId: organizations[0].id,
          parentId: null,
          title: 'Set up project repository',
          content: { text: 'Initialize Git repository and push initial commit.' },
          status: 'open',
          dueAt: new Date('2023-12-31'),
          priority: 'high',
        },
        {
          userId: users[0].id,
          organizationId: organizations[0].id,
          parentId: null,
          title: 'Design landing page',
          content: { text: 'Create wireframes for the landing page.' },
          status: 'in_progress',
          dueAt: new Date('2023-11-15'),
          priority: 'medium',
        },
        {
          userId: users[0].id,
          organizationId: organizations[0].id,
          parentId: null,
          title: 'Conduct team meeting',
          content: { text: 'Discuss project milestones and deliverables.' },
          status: 'completed',
          dueAt: new Date('2023-10-01'),
          priority: 'low',
        },
        {
          userId: users[0].id,
          organizationId: organizations[0].id,
          parentId: null,
          title: 'Set up CI/CD pipeline',
          content: { text: 'Implement continuous integration and deployment.' },
          status: 'open',
          dueAt: new Date('2024-01-10'),
          priority: 'high',
        },
        // Add more todos as needed
      ])
      .returning();

    console.log(todos);

    // Insert nested (child) todos
    await tx
      .insert(todo)
      .values([
        {
          userId: users[0].id,
          organizationId: organizations[0].id,
          parentId: todos[0].id, // Child of the first todo
          title: 'Write README',
          content: { text: 'Document the project setup in README.md.' },
          status: 'open',
          dueAt: new Date('2023-10-05'),
          priority: 'medium',
        },
        {
          userId: users[0].id,
          organizationId: organizations[0].id,
          parentId: todos[0].id, // Child of the second todo
          title: 'Design logo',
          content: { text: 'Create a logo for the landing page.' },
          status: 'in_progress',
          dueAt: new Date('2023-11-01'),
          priority: 'medium',
        },
        // Add more nested todos as needed
      ]);



    console.log('Seeding completed successfully!');
  });

}

seed().catch(console.error);