import { client } from "@/lib/sanity";

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    // check če user že obstaja
    const existingUser = await client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    );

    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // ustvari userja
    const user = await client.create({
      _type: "user",
      email,
      password, 
    });

    return Response.json({ success: true, user });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}