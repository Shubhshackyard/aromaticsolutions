import { marked } from 'marked';

marked.setOptions({
  breaks: true,
  gfm: true,
});

export default function MarkdownRenderer({ content }) {
  const html = marked.parse(content || '');

  return <div className="prose-custom" dangerouslySetInnerHTML={{ __html: html }} />;
}
