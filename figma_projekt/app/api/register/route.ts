import { client } from "@/lib/sanity";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth/next";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    await client.create({
      _type: "user",
      email,
      password: hashedPassword,
    });

    return Response.json({ message: "User created" });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}