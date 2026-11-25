import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiArrowRight, FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import FileUploader from '../components/FileUploader'
import { importContactsAPI } from '../services/contactService'

export default function ImportContacts() {
  const navigate = useNavigate()
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(null)

  const handleUpload = async () => {
    if (!file) return
    setError('')
    setUploading(true)

    try {
      const result = await importContactsAPI(file)
      setSuccess(result)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to import contacts.')
      setUploading(false)
    }
  }

    return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <h1 className="page-title">Import Contacts</h1>
          <p className="page-subtitle">Upload a CSV or Excel file to add contacts to your list.</p>

          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 16, padding: 28, marginTop: 24, maxWidth: 720 }}>
            
            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 10px' }}>
                <FiCheckCircle style={{ fontSize: 48, color: 'var(--success)', marginBottom: 10 }} />
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: 'var(--success)' }}>Import Successful!</h2>
                <p style={{ fontSize: 14, color: '#4b5563', marginTop: 8 }}>
                  Successfully imported <strong>{success.importedCount}</strong> contacts.
                </p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary-brand" style={{ marginTop: 20 }}>
                  Go to Dashboard
                </button>
              </div>
            ) : (
              // YAHAN <> KA USE MAT KAREIN, DIRECT COMPONENTS RAKHEIN
              <div>
                <FileUploader onFileSelected={setFile} disabled={uploading} />

                {error && (
                  <div style={{ marginTop: 14, color: '#c2413a', fontSize: 13, display: 'flex', gap: 6 }}>
                    <FiAlertCircle /> {error}
                  </div>
                )}

                <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end' }}>
                  <button 
                    onClick={handleUpload} 
                    disabled={!file || uploading} 
                    className="btn-primary-brand"
                    style={{ opacity: (!file || uploading) ? 0.5 : 1 }}
                  >
                    {uploading ? 'Importing...' : <>Import Contacts <FiArrowRight /></>}
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </>
  )
}