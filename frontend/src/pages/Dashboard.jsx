import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Link } from 'react-router-dom'
import { getAnalyticsAPI } from '../services/campaignService'
import { FiLoader } from 'react-icons/fi'

export default function Dashboard() {
  let user = {}
  try {
    const stored = localStorage.getItem('user')
    if (stored && stored !== 'undefined') user = JSON.parse(stored)
  } catch (e) {}

  const [stats, setStats] = useState({ totalCampaigns: 0, totalSent: 0, totalFailed: 0, totalPending: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnalyticsAPI()
      .then(data => setStats(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <h1 className="page-title">Welcome back, {user.name?.split(' ')[0] || 'User'} 👋</h1>
              <p className="page-subtitle">Here is what is happening with your campaigns</p>
            </div>
            <Link to="/import" className="btn-primary-brand">+ Import Contacts</Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 50, color: 'var(--muted)' }}>
              <FiLoader style={{ animation: 'spin 1s linear infinite', fontSize: 24 }} />
              <p>Loading analytics...</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              <div style={styles.card}>
                <div style={{ ...styles.value, color: 'var(--brand-dark)' }}>{stats.totalCampaigns}</div>
                <div style={styles.label}>Total Campaigns</div>
              </div>
              <div style={styles.card}>
                <div style={{ ...styles.value, color: '#16845b' }}>{stats.totalSent}</div>
                <div style={styles.label}>Emails Sent</div>
              </div>
              <div style={styles.card}>
                <div style={{ ...styles.value, color: '#d97706' }}>{stats.totalPending}</div>
                <div style={styles.label}>Emails Pending</div>
              </div>
              <div style={styles.card}>
                <div style={{ ...styles.value, color: '#c2413a' }}>{stats.totalFailed}</div>
                <div style={styles.label}>Emails Failed</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}

const styles = {
  card: { background: '#fff', border: '1px solid var(--line)', borderRadius: 12, padding: 24, boxShadow: '0 3px 14px rgba(15, 55, 50, .04)' },
  value: { fontSize: 32, fontWeight: 800, letterSpacing: '-.5px' },
  label: { fontSize: 12, color: 'var(--muted)', fontWeight: 700, marginTop: 4, textTransform: 'uppercase' }
}