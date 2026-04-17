import { client } from "@/lib/sanity";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json([], { status: 401 });
    }

    const tasks = await client.fetch(
      `*[_type == "task" && userId == $userId] | order(_createdAt desc)`,
      { userId: session.user.id }
    );

    return Response.json(tasks);
  } catch (err) {
    console.error("GET ERROR:", err);
    return Response.json([], { status: 500 });
  }
}

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

export async function PATCH(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body._id) {
      return Response.json({ error: "Missing _id" }, { status: 400 });
    }

    console.log("PATCH BODY:", body); // debug

    const updated = await client
      .patch(body._id)
      .set({
        ...(body.title && { title: body.title }),
        ...(body.description && { description: body.description }),
        ...(body.importance && { importance: body.importance }),
        ...(body.dueDate && { dueDate: body.dueDate }),
        ...(body.status && { status: body.status }),
      })
      .commit();

    return Response.json(updated);
  } catch (err) {
    console.error("PATCH ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    if (!body._id) {
      return Response.json({ error: "Missing _id" }, { status: 400 });
    }

    await client.delete(body._id); 

    return Response.json({ success: true });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}