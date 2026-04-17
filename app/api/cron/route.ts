import { client } from "@/lib/sanity";
import { sendReminderEmail } from "@/lib/email";

export async function GET() {
  const now = new Date();
  const oneDay = 24 * 60 * 60 * 1000;

  const tasks = await client.fetch(`
    *[_type == "task" && status == "in progress" && defined(dueDate)]{
      _id,
      title,
      description,
      dueDate,
      userId,
      reminderSent
    }
  `);

  for (const task of tasks) {
    const due = new Date(task.dueDate);
    const diff = due.getTime() - now.getTime();

    if (
      !task.reminderSent &&
      diff < oneDay &&
      diff > oneDay - 60000
    ) {
      const user = await client.fetch(
        `*[_type == "user" && _id == $id][0]{email}`,
        { id: task.userId }
      );

      if (!user?.email) continue;

      await sendReminderEmail(user.email, task);

      await client
        .patch(task._id)
        .set({ reminderSent: true })
        .commit();
    }
  }

  return Response.json({ success: true });
}