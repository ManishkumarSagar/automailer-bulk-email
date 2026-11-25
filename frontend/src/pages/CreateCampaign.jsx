import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiArrowLeft } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { createCampaignAPI } from '../services/campaignService'

export default function CreateCampaign() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', subject: '', body: '', scheduledAt: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createCampaignAPI({ ...form, recipientCount: 100 }) // dummy recipientCount for now
      setSuccess(true)
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      // alert("Failed to create campaign")
      console.error("Campaign Error:", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to create campaign")
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: '100vh', background: 'var(--canvas)' }}>
        <div style={{ textAlign: 'center', background: '#fff', padding: 40, borderRadius: 16, border: '1px solid var(--line)' }}>
          <FiCheckCircle style={{ fontSize: 50, color: 'var(--brand)' }} />
          <h2 style={{ marginTop: 16 }}>Campaign Scheduled!</h2>
          <p style={{ color: 'var(--muted)' }}>Your emails are queued for delivery.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 6, color: 'var(--muted)', cursor: 'pointer', marginBottom: 20 }}>
            <FiArrowLeft /> Back
          </button>
          
          <h1 className="page-title">Create Campaign</h1>
          <p className="page-subtitle">Schedule a personalized email blast</p>

          <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 28, borderRadius: 16, border: '1px solid var(--line)', marginTop: 24, maxWidth: 700 }}>
            
            <div style={{ marginBottom: 16 }}>
              <label style={styles.label}>Campaign Name</label>
              <input name="name" required value={form.name} onChange={handleChange} style={styles.input} placeholder="e.g. November Hiring Outreach" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={styles.label}>Email Subject</label>
              <input name="subject" required value={form.subject} onChange={handleChange} style={styles.input} placeholder="e.g. Opportunity at {{company}}" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={styles.label}>Email Body (HTML/Text)</label>
              <textarea name="body" required value={form.body} onChange={handleChange} style={{ ...styles.input, minHeight: 120 }} placeholder="Hello {{name}}, ..." />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={styles.label}>Schedule Date & Time</label>
              <input type="datetime-local" name="scheduledAt" required value={form.scheduledAt} onChange={handleChange} style={styles.input} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" disabled={loading} className="btn-primary-brand">
                {loading ? 'Scheduling...' : 'Schedule Campaign'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

const styles = {
  label: { display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--ink)', marginBottom: 6 },
  input: { width: '100%', padding: '10px 12px', border: '1px solid var(--line)', borderRadius: 8, fontSize: 14, outline: 'none', fontFamily: 'inherit' }
}