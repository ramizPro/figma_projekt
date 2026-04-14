import { client } from "@/lib/sanity";
import { sendReminderEmail } from "@/lib/email";

export async function GET() {
  const now = new Date();

  const tasks = await client.fetch(`*[_type == "task"]`);

  for (const task of tasks) {
    const due = new Date(task.dueDate);
    const diff = due.getTime() - now.getTime();

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;

    // 1 dan prej
    if (diff > oneDay - 60000 && diff < oneDay + 60000) {
      await sendReminderEmail("USER_EMAIL", task);
    }

    // 1 ura prej
    if (diff > oneHour - 60000 && diff < oneHour + 60000) {
      await sendReminderEmail("USER_EMAIL", task);
    }
  }

  return Response.json({ success: true });
}