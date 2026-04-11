export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // For now (no DB yet)
    console.log("User:", email, password);

    return Response.json({ message: "User created" });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}