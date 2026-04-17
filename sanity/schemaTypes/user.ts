export default {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(50),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) =>
        Rule.required().email().error('Enter a valid email'),
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      hidden: true, // 👈 skrije v Sanity UI (ker je hash)
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      initialValue: 'user', // 👈 default
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'User', value: 'user' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    },
  ],

  preview: {
    select: {
      title: 'email',
      subtitle: 'role',
    },
  },
};