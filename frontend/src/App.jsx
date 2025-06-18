import { useEffect, useRef, useState } from 'react'
import Card from './components/Card.jsx'
import Input from './components/Input.jsx'
import Button from './components/Button.jsx'
import ScrollArea from './components/ScrollArea.jsx'
import { Trash2 } from 'lucide-react'

const STORAGE_KEY = 'metalStores'

export default function App() {
  const [stores, setStores] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const fileInput = useRef(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setStores(JSON.parse(saved))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  const handleFile = (e) => {
    const file = e.target.files[0]
    setError('')
    if (!file || !file.name.endsWith('.json')) {
      setError('Selecciona un archivo .json válido.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result)
        if (
          !Array.isArray(json) ||
          !json.every((o) =>
            o.title && o.address && o.phone && o.categoryName && o.url
          )
        ) {
          setError('Archivo JSON inválido.')
          return
        }
        setStores(json)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(json))
      } catch {
        setError('Error al leer el archivo.')
      }
    }
    reader.readAsText(file)
  }

  const handleDelete = (title) => {
    const updated = stores.filter((s) => s.title !== title)
    setStores(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const filtered = stores.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Metal Stores</h1>
        {stores.length === 0 && (
          <Input type="file" accept=".json" onChange={handleFile} ref={fileInput} />
        )}
        {error && <p className="text-red-600">{error}</p>}
        {stores.length > 0 && (
          <>
            <Input
              placeholder="Buscar por nombre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ScrollArea className="flex flex-col gap-4 max-h-[70vh]">
              {filtered.map((store, idx) => (
                <Card key={idx} className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold">{store.title}</h2>
                  <p>{store.address}</p>
                  <p>{store.phone}</p>
                  <p>
                    <span className="font-semibold">Categoría:</span> {store.categoryName}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => window.open(store.url, '_blank')}>Google Maps</Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(store.title)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </ScrollArea>
          </>
        )}
      </div>
    </div>
  )
}
