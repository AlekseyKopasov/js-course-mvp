import Lecture from './components/Lecture'
import mdContent from '../public/lectures/9-closures.md?raw'

export default function App() {
  return <Lecture content={mdContent} />
}