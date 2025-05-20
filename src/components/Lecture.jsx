import ReactMarkdown from 'react-markdown'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import { useEffect } from 'react'

export default function Lecture({ content }) {
  useEffect(() => Prism.highlightAll(), [content])
  
  return (
    <article className="prose max-w-4xl mx-auto p-4">
      <ReactMarkdown
        children={content}
        components={{
          code({ node, inline, className, children, ...props }) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      />
    </article>
  )
}
