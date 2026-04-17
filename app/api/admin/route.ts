import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { client } from "@/lib/sanity";

export async function GET() {
  const session: any = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await client.fetch(`*[_type == "user"]`);
  const tasks = await client.fetch(`*[_type == "task"]`);

  return Response.json({
    usersCount: users.length,
    users,
    tasks,
  });
}
export async function DELETE(req: Request) {
  const session: any = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "admin") {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id, type } = await req.json();

  if (type === "user") {
    await client.delete(id);
  }

  if (type === "task") {
    await client.delete(id);
  }

  return Response.json({ success: true });
}