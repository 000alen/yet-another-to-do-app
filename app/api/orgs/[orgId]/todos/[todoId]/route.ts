type Params = Promise<{ orgId: string, todoId: string }>;

export const GET = async (req: Request, { params }: { params: Params }) => {
    const { orgId, todoId } = await params;
};

export const PUT = async (req: Request, { params }: { params: Params }) => {
    const { orgId, todoId } = await params;
};
