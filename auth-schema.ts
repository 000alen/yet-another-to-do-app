import {
  pgTable,
  text,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

// User table - stores basic user information
export const user = pgTable("user", {
  id: text("id").primaryKey(),                    // Unique identifier for the user
  name: text("name").notNull(),                   // User's full name
  email: text("email").notNull().unique(),        // User's email address (unique)
  emailVerified: boolean("emailVerified").notNull(), // Email verification status
  image: text("image"),                           // User's profile image URL
  createdAt: timestamp("createdAt").notNull(),    // Account creation timestamp
  updatedAt: timestamp("updatedAt").notNull(),    // Last update timestamp
});

// Session table - manages user sessions
export const session = pgTable("session", {
  id: text("id").primaryKey(),                    // Unique session identifier
  expiresAt: timestamp("expiresAt").notNull(),    // Session expiration time
  ipAddress: text("ipAddress"),                   // User's IP address
  userAgent: text("userAgent"),                   // User's browser/client info
  userId: text("userId")                          // Reference to user
    .notNull()
    .references(() => user.id),
  activeOrganizationId: text("activeOrganizationId"), // Currently active organization
});

// Account table - handles authentication providers and credentials
export const account = pgTable("account", {
  id: text("id").primaryKey(),                    // Unique account identifier
  accountId: text("accountId").notNull(),         // External provider's account ID
  providerId: text("providerId").notNull(),       // Authentication provider ID
  userId: text("userId")                          // Reference to user
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),               // OAuth access token
  refreshToken: text("refreshToken"),             // OAuth refresh token
  idToken: text("idToken"),                       // OAuth ID token
  expiresAt: timestamp("expiresAt"),             // Token expiration time
  password: text("password"),                     // Hashed password (if applicable)
});

// Verification table - handles email/token verification
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),                    // Unique verification identifier
  identifier: text("identifier").notNull(),        // What's being verified (e.g., email)
  value: text("value").notNull(),                 // Verification token/code
  expiresAt: timestamp("expiresAt").notNull(),    // Verification expiration time
});

// Organization table - manages organizations/teams
export const organization = pgTable("organization", {
  id: text("id").primaryKey(),                    // Unique organization identifier
  name: text("name").notNull(),                   // Organization name
  slug: text("slug").unique(),                    // URL-friendly organization name
  logo: text("logo"),                             // Organization logo URL
  createdAt: timestamp("createdAt").notNull(),    // Creation timestamp
  metadata: text("metadata"),                      // Additional organization data
});

// Member table - manages organization membership
export const member = pgTable("member", {
  id: text("id").primaryKey(),                    // Unique member identifier
  organizationId: text("organizationId")          // Reference to organization
    .notNull()
    .references(() => organization.id),
  userId: text("userId").notNull(),               // Reference to user
  email: text("email").notNull(),                 // Member's email
  role: text("role").notNull(),                   // Member's role in organization
  createdAt: timestamp("createdAt").notNull(),    // Membership creation time
});

// Invitation table - manages organization invites
export const invitation = pgTable("invitation", {
  id: text("id").primaryKey(),                    // Unique invitation identifier
  organizationId: text("organizationId")          // Reference to organization
    .notNull()
    .references(() => organization.id),
  email: text("email").notNull(),                 // Invitee's email
  role: text("role"),                             // Proposed role for invitee
  status: text("status").notNull(),               // Invitation status
  expiresAt: timestamp("expiresAt").notNull(),    // Invitation expiration time
  inviterId: text("inviterId")                    // Reference to inviting user
    .notNull()
    .references(() => user.id),
});
