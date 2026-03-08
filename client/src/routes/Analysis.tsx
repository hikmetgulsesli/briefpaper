import { useParams } from 'react-router-dom'

export default function Analysis() {
  const { id } = useParams()
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Analysis: {id}</h1>
      <p>Analysis details will appear here.</p>
    </div>
  )
}
