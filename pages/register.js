import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password })
    })
    if (res.ok) router.push('/login')
    else alert('Error registering')
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre" className="w-full p-2 border rounded" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" type="password" className="w-full p-2 border rounded" />
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Crear cuenta</button>
      </form>
    </div>
  )
}
