import { client } from "@/lib/sanity";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// 🔹 GET TASKS
export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json([], { status: 401 });
    }

    const tasks = await client.fetch(
      `*[_type == "task" && userId == $userId]`,
      { userId: session.user.id }
    );

    return Response.json(tasks);
  } catch (err) {
    console.error(err);
    return Response.json([], { status: 500 });
  }
}

// 🔹 CREATE TASK
export async function POST(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const task = await client.create({
      _type: "task",
      title: body.title,
      description: body.description,
      importance: body.importance,
      dueDate: body.dueDate,
      status: "notStarted",
      userId: session.user.id,
    });

    return Response.json(task);
  } catch (err) {
    console.error("POST ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// 🔹 UPDATE TASK
export async function PATCH(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const updated = await client
      .patch(body.id)
      .set({
        title: body.title,
        description: body.description,
        importance: body.importance,
        dueDate: body.dueDate,
        status: body.status,
      })
      .commit();

    return Response.json(updated);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

// 🔹 DELETE TASK
export async function DELETE(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await client.delete(body.id);

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}