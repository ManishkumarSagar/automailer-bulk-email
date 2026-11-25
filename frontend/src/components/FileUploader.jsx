import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUploadCloud, FiFile, FiX, FiAlertCircle } from 'react-icons/fi'

const ACCEPTED = {
  'text/csv': ['.csv'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
  'application/vnd.ms-excel': ['.xls'],
}

export default function FileUploader({ onFileSelected, disabled = false }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('')
    if (rejectedFiles.length > 0) {
      setError('Invalid file type or size (max 10MB). Only CSV, XLSX, XLS allowed.')
      return
    }
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0])
      onFileSelected?.(acceptedFiles[0])
    }
  }, [onFileSelected])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: ACCEPTED, maxFiles: 1, maxSize: 10 * 1024 * 1024, disabled
  })

  const removeFile = (e) => {
    e.stopPropagation()
    setFile(null)
    setError('')
    onFileSelected?.(null)
  }

  if (file) {
    return (
      <div style={styles.fileCard}>
        <div style={styles.fileIcon}><FiFile /></div>
        <div style={styles.fileInfo}>
          <div style={styles.fileName}>{file.name}</div>
          <div style={styles.fileMeta}>{(file.size / 1024).toFixed(1)} KB · Ready</div>
        </div>
        <button onClick={removeFile} style={styles.removeBtn}><FiX /></button>
      </div>
    )
  }

  return (
    <div>
      <div {...getRootProps()} style={{
        ...styles.dropzone,
        ...(isDragActive ? styles.dropzoneActive : {}),
        ...(disabled ? { opacity: 0.6, cursor: 'not-allowed' } : {})
      }}>
        <input {...getInputProps()} />
        <div style={styles.icon}><FiUploadCloud /></div>
        <div style={styles.title}>{isDragActive ? 'Drop file here' : 'Drag & drop your contact file'}</div>
        <div style={styles.subtitle}>or <span style={{ color: 'var(--brand)', fontWeight: 'bold' }}>click to browse</span></div>
        <div style={styles.formats}>
          <span style={styles.chip}>CSV</span>
          <span style={styles.chip}>XLSX</span>
          <span style={styles.chip}>XLS</span>
        </div>
      </div>
      {error && <div style={styles.error}><FiAlertCircle /> {error}</div>}
    </div>
  )
}

const styles = {
  dropzone: {
    border: '2px dashed #cde8e2', borderRadius: 14, padding: '44px 24px',
    textAlign: 'center', background: '#f4faf8', cursor: 'pointer', transition: 'all .18s ease'
  },
  dropzoneActive: {
    borderColor: 'var(--brand)', background: 'var(--brand-soft)', transform: 'scale(1.01)'
  },
  icon: { fontSize: 40, color: 'var(--brand)', marginBottom: 10, display: 'flex', justifyContent: 'center' },
  title: { fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 },
  subtitle: { fontSize: 13, color: 'var(--muted)', marginBottom: 14 },
  formats: { display: 'flex', gap: 6, justifyContent: 'center' },
  chip: { fontSize: 10, fontWeight: 750, padding: '3px 9px', borderRadius: 20, background: 'var(--brand-soft)', color: 'var(--brand-dark)' },
  error: { display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, background: '#fef2f2', color: '#c2413a', padding: '9px 12px', borderRadius: 8, fontSize: 12 },
  fileCard: { display: 'flex', alignItems: 'center', gap: 12, border: '1px solid var(--line)', background: '#fff', borderRadius: 12, padding: 14 },
  fileIcon: { width: 42, height: 42, borderRadius: 10, background: 'var(--brand-soft)', color: 'var(--brand-dark)', display: 'grid', placeItems: 'center', fontSize: 20 },
  fileInfo: { flex: 1, minWidth: 0 },
  fileName: { fontSize: 14, fontWeight: 700, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  fileMeta: { fontSize: 12, color: 'var(--muted)', marginTop: 2 },
  removeBtn: { background: '#edf3f1', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#4b625d' }
}