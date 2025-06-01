import React, { Suspense, lazy } from 'react';
import ReactMarkdown from 'react-markdown';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import styles from './LectureViewer.module.scss';

// Ленивая загрузка SyntaxHighlighter
const SyntaxHighlighter = lazy(
  async () =>
    await import('react-syntax-highlighter').then(mod => ({
      default: mod.Prism,
    }))
);

interface LectureViewerProps {
  content: string;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const CodeBlock = ({ node, inline, className, children, ...props }: CodeProps) => {
  const match = /language-(\w+)/.exec(className || '');

  if (!inline && match) {
    return (
      <Suspense
        fallback={
          <pre>
            <code>{String(children)}</code>
          </pre>
        }
      >
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag="div"
          children={String(children).replace(/\n$/, '')}
          {...props}
        />
      </Suspense>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export const LectureViewer = React.memo(({ content }: LectureViewerProps) => {
  return (
    <div className={styles.container}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code: CodeBlock,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
