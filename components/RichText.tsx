import { PortableText, type PortableTextComponents } from "@portabletext/react";

type RichTextProps = {
  value: unknown;
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="rt-paragraph">{children}</p>,
    h2: ({ children }) => <h2 className="rt-h2">{children}</h2>,
    h3: ({ children }) => <h3 className="rt-h3">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="rt-blockquote">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "#";
      return (
        <a
          href={href}
          className="rt-link"
          target="_blank"
          rel="noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="rt-list">{children}</ul>,
    number: ({ children }) => <ol className="rt-list rt-list-number">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="rt-list-item">{children}</li>,
    number: ({ children }) => <li className="rt-list-item">{children}</li>,
  },
};

export default function RichText({ value }: RichTextProps) {
  if (!value) return null;

  return <PortableText value={value} components={components} />;
}