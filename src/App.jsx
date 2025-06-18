import { useRef, useState } from 'react'
import Card from './components/Card.jsx'
import Input from './components/Input.jsx'
import Button from './components/Button.jsx'
import ScrollArea from './components/ScrollArea.jsx'

const REQUIRED_FIELDS = ['url']

export default function App() {
  const [stores, setStores] = useState([])
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [approvedStores, setApprovedStores] = useState([])
  const fileInput = useRef(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    setError('')
    if (!file || !file.name.toLowerCase().endsWith('.json')) {
      setError('Selecciona un archivo .json válido.')
      return
    }
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target.result)
        let entries = Array.isArray(raw) ? raw : raw.stores || raw.data
        if (!Array.isArray(entries)) {
          setError('El archivo JSON debe contener un array de objetos.')
          return
        }
        entries = entries.map((obj) => {
          const normalized = {}
          Object.entries(obj).forEach(([k, v]) => {
            normalized[k.trim().toLowerCase()] = v
          })
          const entry = {
            title: normalized.title || normalized.name || '',
            address: normalized.address || '',
            phone: normalized.phone || '',
            categoryName: normalized.categoryname || normalized.category || '',
            url: normalized.url || '',
          }
          return entry
        })
        for (let i = 0; i < entries.length; i++) {
          for (const field of REQUIRED_FIELDS) {
            if (!entries[i][field]) {
              setError(`Falta el campo "${field}" en la entrada ${i + 1}.`)
              return
            }
          }
        }
        setStores(entries)
      } catch {
        setError('Error al leer el archivo.')
      }
    }
    reader.readAsText(file)
  }

  const handleApprove = (idx) => {
    setApprovedStores((prev) => [
      ...prev,
      {
        title: stores[idx].title,
        address: stores[idx].address,
        phone: stores[idx].phone,
        categoryName: stores[idx].categoryName,
      },
    ])
    setStores((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleExport = () => {
    if (approvedStores.length === 0) return
    const text = approvedStores
      .map((s) => `${s.title}\n${s.address}\n${s.phone}\n${s.categoryName}`)
      .join('\n\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'approved_stores.txt'
    a.click()
    URL.revokeObjectURL(url)
    setApprovedStores([])
  }

  const handleDelete = (idx) => {
    setStores((prev) => prev.filter((_, i) => i !== idx))
  }

  const filtered = stores.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-4 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Metal Stores</h1>
        <Button
          className="self-start disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleExport}
          disabled={approvedStores.length === 0}
        >
          Exportar aprobadas
        </Button>
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
                    <Button onClick={() => window.open(store.url, '_blank')}>
                      Google Maps
                    </Button>
                    <Button variant="success" onClick={() => handleApprove(idx)}>
                      ✅
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(idx)}
                    >
                      ❌
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
