import { NavLink } from 'react-router-dom'
import { FiHome, FiUploadCloud, FiUsers, FiFileText, FiSend } from 'react-icons/fi'

const links = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/import', label: 'Import Contacts', icon: <FiUploadCloud /> },
  { to: '/contacts', label: 'All Contacts', icon: <FiUsers /> },
  { to: '/templates', label: 'Email Templates', icon: <FiFileText /> },
  { to: '/campaigns', label: 'Campaigns', icon: <FiSend /> },
]

export default function Sidebar() {
  return (
    <aside style={{
      width: 240, background: '#fff', borderRight: '1px solid var(--line)',
      padding: '20px 14px', minHeight: 'calc(100vh - 64px)'
    }}>
      <div style={{ fontSize: 10, letterSpacing: 1.4, color: '#a1a1aa', fontWeight: 800, padding: '0 10px', marginBottom: 12 }}>
        MENU
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {links.map(l => (
          <NavLink key={l.to} to={l.to} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 8, fontSize: 13, fontWeight: 600,
            color: isActive ? 'var(--brand-dark)' : '#52525b',
            background: isActive ? 'var(--brand-soft)' : 'transparent'
          })}>
            {l.icon} {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}