import { client } from "@/lib/sanity";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json();
    if (!email || !username || !password) {
      return Response.json({ error: "All fields required" }, { status: 400 });
    }

    if (!email.includes("@")) {
      return Response.json({ error: "Invalid email" }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: "Password too short (min 6)" }, { status: 400 });
    }

    const existing = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    await client.create({
      _type: "user",
      email,
      username,
      password: hashedPassword,
    });

    return Response.json({ message: "User created" });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}