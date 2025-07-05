import { useState, useEffect } from 'react'
import axios from 'axios'

function Card() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await axios.get('https://nodejs-prisma.ngo.k3s.lab/api/company', {httpsAgent: new https.Agent({ rejectUnauthorized: false }) })
        setPosts(data)
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [])

  if (loading) return (
    <div className="card">
      <p>Cargando posts...</p>
    </div>
  )

  if (error) return (
    <div className="card">
      <p>Error: {error}</p>
    </div>
  )

  return (
    <div className="card">
      <h2>Posts Recientes</h2>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>{post.rut}</h3>
          <p style={{ margin: 0 }}>{post.name}</p>
        </div>
      ))}
    </div>
  )
}

export default Card
