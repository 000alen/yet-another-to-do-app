import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { Resend } from "resend";
import * as schema from "@/db/schema";
import * as authSchema from "../auth-schema";
import { getBaseUrl } from "./utils";
import { member } from "../auth-schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

// Initialize Resend email service with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Configure authentication system
export const auth = betterAuth({
  baseURL: getBaseUrl(),
  // Set up database adapter with PostgreSQL and schema
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      ...authSchema,
    }
  }),
  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
  },
  // Configure organization plugin with email invitation functionality
  plugins: [organization({
    async sendInvitationEmail(data) {
      // Generate invitation link
      const inviteLink = `https://yet-another-to-do-app.vercel.app/orgs/invitations/${data.id}`

      // Send invitation email using Resend
      await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [data.email],
        subject: `You're invited to join ${data.organization.name}`,
        html: `You're invited to join ${data.organization.name}! <a href="${inviteLink}">Click here to accept the invitation</a>`
      });
    },
  }
  )],
});

/**
 * Verifies if a user is a member of a specific organization
 * @param userId - The ID of the user to check
 * @param orgId - The ID of the organization
 * @throws {TRPCError} If user is not a member of the organization
 */
export const ensureUserIsMember = async (userId: string, orgId: string) => {
  const membership = await db.select().from(member).where(
    and(
      eq(member.userId, userId),
      eq(member.organizationId, orgId)
    )).limit(1);

  if (membership.length === 0) {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You are not a member of this organization.",
    });
  }
};
