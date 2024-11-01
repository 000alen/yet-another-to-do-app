"use client";

import * as React from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { slugify } from "@/lib/utils";
import Link from "next/link";

export default function OrgsPage() {
  const { data: organizations } = authClient.useListOrganizations();
  const [newOrgName, setNewOrgName] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  if (!organizations) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Organizations</h1>
      {organizations.length > 0 ? (
        <ul className="mb-4">
          {organizations.map((org) => (
            <OrgListItem key={org.id} org={org} />
          ))}
        </ul>
      ) : (
        <p className="mb-4">You have no organizations.</p>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Organization</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Create Organization</h2>
          <Input
            placeholder="Organization Name"
            value={newOrgName}
            onChange={(e) => setNewOrgName(e.target.value)}
            disabled={isCreating}
          />
          <Button
            className="mt-4"
            onClick={async () => {
              if (!newOrgName) return;
              setIsCreating(true);

              await authClient.organization.create(
                {
                  name: newOrgName,
                  slug: slugify(newOrgName),
                },
                {
                  onSuccess: () => {
                    setNewOrgName(""); // Reset the input field
                    setIsCreating(false);
                    // refetch(); // Refresh the organizations list
                  },
                  onError: (ctx) => {
                    alert(ctx.error.message);
                    setIsCreating(false);
                  },
                }
              );
            }}
            disabled={isCreating || !newOrgName}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function OrgListItem({ org }: { org: { id: string; name: string } }) {
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [isInviting, setIsInviting] = React.useState(false);

  const handleInvite = async () => {
    if (!inviteEmail) return;
    setIsInviting(true);

    await authClient.organization.inviteMember(
      {
        organizationId: org.id,
        email: inviteEmail,
        role: "member",
      },
      {
        onSuccess: () => {
          setInviteEmail("");
          setIsInviting(false);
          alert("Invitation sent successfully.");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
          setIsInviting(false);
        },
      }
    );
  };

  return (
    <li className="mb-2 flex items-center justify-between">
      <Link href={`/orgs/${org.id}`} className="text-blue-600 hover:underline">
        {org.name}
      </Link>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm">Invite</Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Invite to {org.name}</h2>
          <Input
            placeholder="Email address"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            disabled={isInviting}
          />
          <Button
            className="mt-4"
            onClick={handleInvite}
            disabled={isInviting || !inviteEmail}
          >
            {isInviting ? "Inviting..." : "Send Invite"}
          </Button>
        </DialogContent>
      </Dialog>
    </li>
  );
}
