import { allReadAlert, updateAlert } from "@/lib/actions/alertAction";
import { NextRequest } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const { type } = await request.json();
  let result;

  if (type === "no-all") {
    result = await updateAlert(id);
  } else {
    result = await allReadAlert(id);
  }

  if (result.state) {
    return Response.json({ data: result }, { status: 200 });
  }
  return Response.json({ error: result }, { status: 500 });
}
