import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLoader, FiSend, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getCampaignsAPI } from '../services/campaignService'

export default function Campaigns() {
  const navigate = useNavigate()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCampaignsAPI()
      .then(data => setCampaigns(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 className="page-title">Campaigns</h1>
              <p className="page-subtitle">View and manage your email campaigns</p>
            </div>
            <button onClick={() => navigate('/campaigns/new')} className="btn-primary-brand">
              <FiSend /> Create Campaign
            </button>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
                <FiLoader style={{ animation: 'spin 1s linear infinite', fontSize: 24 }} />
                <p>Loading campaigns...</p>
              </div>
            ) : campaigns.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
                No campaigns created yet.
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#eaf6f3', color: '#285c53', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Campaign Name</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Subject</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Recipients</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Status</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Scheduled Date</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map(camp => (
                    <tr key={camp._id} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{camp.name}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{camp.subject}</td>
                      <td style={{ padding: '12px 16px' }}>{camp.totalRecipients}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ 
                          display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                          background: camp.status === 'completed' ? '#e6f4f1' : camp.status === 'processing' ? '#ffedd5' : '#f1f5f9',
                          color: camp.status === 'completed' ? '#16845b' : camp.status === 'processing' ? '#c2410c' : '#64748b'
                        }}>
                          {camp.status === 'completed' ? <FiCheckCircle /> : camp.status === 'processing' ? <FiClock /> : <FiXCircle />}
                          {camp.status.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>
                        {new Date(camp.scheduledAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  )
}