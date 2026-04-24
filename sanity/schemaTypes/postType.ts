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
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "coords",
      title: "Koordinaten",
      type: "object",
      fields: [
        defineField({
          name: "lat",
          title: "Breitengrad",
          type: "number",
        }),
        defineField({
          name: "lng",
          title: "Längengrad",
          type: "number",
        }),
      ],
    }),

    defineField({
      name: "images",
      title: "Bilder",
      type: "array",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "audio",
      title: "Audio-Datei",
      type: "file",
      options: {
        accept: "audio/*",
      },
    }),

    defineField({
      name: "audioTitle",
      title: "Audiotitel",
      type: "string",
    }),

    defineField({
      name: "transcriptSegments",
      title: "Transkript-Abschnitte",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "time",
              title: "Zeit in Sekunden",
              type: "number",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              time: "time",
              text: "text",
            },
            prepare({ time, text }) {
              return {
                title: `${time ?? 0}s`,
                subtitle: text,
              };
            },
          },
        },
      ],
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
