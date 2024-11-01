"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function InvitePage({ invitationId }: { invitationId: string }) {
  const router = useRouter();

  async function acceptInvitation() {
    await authClient.organization.acceptInvitation(
      {
        invitationId,
      },
      {
        onSuccess: () => {
          router.push("/orgs");
        },
      }
    );
  }

  return (
    <div>
      <h1>Accept invitation</h1>
      <button onClick={acceptInvitation}>Accept</button>
    </div>
  );
}
