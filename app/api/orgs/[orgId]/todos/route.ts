/* eslint-disable @typescript-eslint/no-unused-vars */

type Params = Promise<{ orgId: string }>;

export const GET = async (req: Request, { params }: { params: Params }) => {
    const { orgId } = await params;
};

export const POST = async (req: Request, { params }: { params: Params }) => {
    const { orgId } = await params;
};
