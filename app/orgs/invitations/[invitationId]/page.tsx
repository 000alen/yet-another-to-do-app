import InvitePage from "@/components/invite-page";

export default async function Page({
  params,
}: {
  params: Promise<{ invitationId: string }>;
}) {
  const { invitationId } = await params;
  return <InvitePage invitationId={invitationId} />;
}
