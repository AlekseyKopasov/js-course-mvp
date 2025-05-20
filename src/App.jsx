import { useState, useEffect } from 'react'
import Lecture from './components/Lecture'

export default function App() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/lectures/9-closures.html')
      .then(res => res.text())
      .then(text => setContent(text))
  }, [])

  return <Lecture content={content} />
}