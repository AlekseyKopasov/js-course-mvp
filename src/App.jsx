import { useState, useEffect } from 'react'
import Lecture from './components/Lecture'

export default function App() {
  const [content, setContent] = useState('')

useEffect(() => {
  fetch(import.meta.env.BASE_URL + 'lectures/9-closures.md')
    .then(res => res.ok ? res.text() : Promise.reject('File not found'))
    .then(setContent)
    .catch(console.error);
}, []);

  return <Lecture content={content} />
}