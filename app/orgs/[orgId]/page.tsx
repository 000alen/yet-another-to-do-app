import { ToDoPage } from "@/components/to-do-page";
// import { createAsyncCaller } from "@/trpc/routers/_app";

export default async function Page({
  params,
}: {
  params: Promise<{ orgId: string }>;
}) {
  const { orgId } = await params;
  // const trpc = await createAsyncCaller();

  return <ToDoPage orgId={orgId} />;
}
