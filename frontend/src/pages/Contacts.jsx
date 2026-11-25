import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch, FiSend, FiLoader } from 'react-icons/fi'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { getContactsAPI } from '../services/contactService'

export default function Contacts() {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    getContactsAPI()
      .then(data => setContacts(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="app-main">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 className="page-title">All Contacts</h1>
              <p className="page-subtitle">Manage your imported contact list</p>
            </div>
            <button onClick={() => navigate('/campaigns/new')} className="btn-primary-brand">
              <FiSend /> Create Campaign
            </button>
          </div>

          <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden' }}>
            <div style={{ padding: 16, borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 10, background: '#fbfdfc' }}>
              <FiSearch color="#8da09c" />
              <input 
                type="text" 
                placeholder="Search by name, email, or company..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontSize: 14 }}
              />
            </div>

            {loading ? (
              <div style={{ padding: 40, textAlign: 'center', color: 'var(--muted)' }}>
                <FiLoader style={{ animation: 'spin 1s linear infinite', fontSize: 24 }} />
                <p>Loading contacts...</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#eaf6f3', color: '#285c53', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Name</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Email</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Company</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid var(--line)' }}>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.length === 0 ? (
                    <tr><td colSpan="4" style={{ padding: 30, textAlign: 'center', color: 'var(--muted)' }}>No contacts found.</td></tr>
                  ) : (
                    filteredContacts.map(c => (
                      <tr key={c._id} style={{ borderBottom: '1px solid var(--line)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{c.name}</td>
                        <td style={{ padding: '12px 16px', color: 'var(--muted)' }}>{c.email}</td>
                        <td style={{ padding: '12px 16px' }}>{c.company}</td>
                        <td style={{ padding: '12px 16px' }}>{c.position}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
    </>
  )
}