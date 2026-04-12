export default {
  name: "task",
  title: "Task",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "description", type: "string", title: "Description" },
    {
      name: "importance",
      title: "Importance",
      type: "string",
      options: {
        list: [
          { title: "Important", value: "important" },
          { title: "Normal", value: "normal" },
          { title: "Non-urgent", value: "nonUrgent" },
        ],
      },
    },
    { name: "dueDate", type: "date", title: "Due date" },
    { name: "status", type: "string", title: "Status" }, // notStarted | inProgress | finished
    { name: "userId", type: "string", title: "User ID" },
  ],
};