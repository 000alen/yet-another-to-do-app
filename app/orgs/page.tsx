"use client";

import { authClient } from "@/lib/auth-client";

export default function App() {
  const { data: organizations } = authClient.useListOrganizations();

  if (!organizations) return null;

  return (
    <div>
      {organizations.map((org) => (
        <p key={org.id}>{org.name}</p>
      ))}
    </div>
  );
}
