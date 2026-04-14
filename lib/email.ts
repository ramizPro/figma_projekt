import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendReminderEmail = async (to: string, task: any) => {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject: `Reminder: ${task.title}`,
    html: `
      <h2>${task.title}</h2>
      <p>${task.description}</p>
      <p>Due: ${task.dueDate}</p>
    `,
  });
};