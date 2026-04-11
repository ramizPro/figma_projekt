export default {
  name: "task",
  title: "Task",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "completed",
      title: "Completed",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
  ],
};