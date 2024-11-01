import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import { Resend } from "resend";
import * as schema from "@/db/schema";
import * as authSchema from "../auth-schema";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      ...authSchema,
    }
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [organization({
    async sendInvitationEmail(data) {
      const inviteLink = `https://yet-another-to-do-app.vercel.app/orgs/invitations/${data.id}`

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
