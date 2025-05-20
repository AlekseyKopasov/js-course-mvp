export default function Lecture() {
  const [content, setContent] = useState('')

  useEffect(() => {
    fetch('/lectures/9-closures.html')
      .then(res => res.text())
      .then(html => setContent(html))
  }, [])

  return (
    <div 
      className="p-6 max-w-4xl mx-auto prose"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}