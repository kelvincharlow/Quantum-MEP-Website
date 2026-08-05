import { defineField, defineType } from "sanity";

export const sectorType = defineType({
  name: "sector",
  title: "Sector",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "string",
      description: "A concise description used when this sector is presented on the website.",
      validation: (rule) => rule.max(140),
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 100,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Website order",
      name: "websiteOrder",
      by: [{ field: "displayOrder", direction: "asc" }, { field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "description" },
  },
});
