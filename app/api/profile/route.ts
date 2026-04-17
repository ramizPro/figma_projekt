import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { client } from "@/lib/sanity";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { username, email, password } = body;

    let updateData: any = {
      name: username,
      email: email,
    };

    if (password && password.trim() !== "") {
      const hashed = await bcrypt.hash(password, 10);
      updateData.password = hashed;
    }

    const updatedUser = await client
      .patch(session.user.id)
      .set(updateData)
      .commit();

    return Response.json({ success: true, user: updatedUser });

  } catch (err: any) {
    console.error("PROFILE UPDATE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.delete(session.user.id);

    return Response.json({ success: true });

  } catch (err: any) {
    console.error("PROFILE DELETE ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}