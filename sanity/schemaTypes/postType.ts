import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Beitrag",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "kind",
      title: "Beitragstyp",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Audio", value: "audio" },
          { title: "Foto", value: "photo" },
          { title: "Stiller Moment", value: "still" },
        ],
        layout: "radio",
      },
      initialValue: "text",
    }),

    defineField({
      name: "date",
      title: "Datum",
      type: "date",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "location",
      title: "Ort",
      type: "string",
    }),

    defineField({
      name: "excerpt",
      title: "Kurztext",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "content",
      title: "Inhalt",
      type: "text",
      rows: 12,
    }),

    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "audio",
      title: "Audio-Datei (URL)",
      type: "string",
    }),

    defineField({
      name: "audioTitle",
      title: "Audiotitel",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "location",
      media: "images.0",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle,
        media,
      };
    },
  },
});