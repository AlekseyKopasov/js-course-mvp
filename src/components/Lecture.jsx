import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'prism-react-renderer'
import 'prism-themes/themes/prism-night-owl.css'

export default function Lecture({ content }) {
  return (
    <div className="markdown-body p-6 max-w-4xl mx-auto">
      <ReactMarkdown
        children={content}
        components={{
          code({ node, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                children={String(children).replace(/\n$/, '')}
                theme={nightOwlTheme}
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </div>
  )
}