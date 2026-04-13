import React, { useState } from 'react';
import { FileText, Sun } from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('home'); // 'home' -> 'auth' -> 'result'
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState(null);

  const startAuth = () => setStep('auth');

  const fetchResult = async (e) => {
      e.preventDefault();
      if (!studentId.trim() || !password.trim()) return;
      
      setLoading(true);
      try {
          const res = await fetch(`/api/result/${studentId}`);
          const data = await res.json();
          setResultData(data);
          setStep('result');
      } catch(err) {
          console.error(err);
      }
      setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
       
       <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '1rem 0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
           <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ width: '50px', height: '50px', backgroundColor: '#1e3a8a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontWeight: '900', fontSize: '1.5rem', fontFamily: 'Georgia, serif' }}>UA</div>
                 <div>
                    <h1 style={{ margin: 0, fontSize: '1.3rem', color: '#1e3a8a', fontWeight: '800' }}>University of Arcadia</h1>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '500' }}>Office of the Controller of Examinations</span>
                 </div>
              </div>
              <div style={{display:'flex', gap:'1.5rem', alignItems:'center'}}>
                <a href="/weather" style={{ color: '#0f172a', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold', display:'flex', alignItems:'center', gap:'0.25rem' }}><Sun size={16} color="#f59e0b"/> Global Weather Apps</a>
                <a href="/admin" target="_blank" style={{ color: '#1e3a8a', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 'bold' }}>Admin Gateway Portal →</a>
              </div>
           </div>
       </header>

       <main style={{ maxWidth: '1000px', margin: '3rem auto', padding: '0 2rem' }}>
          
          {step === 'home' && (
             <div className="fade-in" style={{ backgroundColor: 'white', padding: '4rem 3rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                <FileText size={56} color="#1e3a8a" style={{ marginBottom: '1.5rem', display: 'inline-block' }} />
                <h2 style={{ fontSize: '2rem', color: '#0f172a', marginBottom: '1rem', fontWeight: 'bold' }}>Annual Examination Results</h2>
                <p style={{ color: '#475569', fontSize: '1.15rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.6' }}>
                   The final academic results for the Spring Term 2026 have been published and are now available securely online for all registered candidates.
                </p>
                <button onClick={startAuth} style={{ border: 'none', backgroundColor: '#1e3a8a', color: 'white', padding: '1rem 3rem', fontSize: '1.1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 6px -1px rgba(30, 58, 138, 0.4)', transition: 'background-color 0.2s' }}>
                   Download Your Result
                </button>
             </div>
          )}

          {step === 'auth' && (
             <div className="fade-in" style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '450px', margin: '0 auto', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}>
                <h2 style={{ fontSize: '1.6rem', color: '#0f172a', marginBottom: '0.5rem', borderBottom: '2px solid #f1f5f9', paddingBottom: '1rem', fontWeight: 'bold' }}>Candidate Login</h2>
                <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: '1.5' }}>Please verify your identity to securely access your academic records through the portal.</p>
                
                <form onSubmit={fetchResult} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: '#475569', fontWeight: 'bold', marginBottom: '0.5rem' }}>Roll Number / Student ID</label>
                      <input type="text" required value={studentId} onChange={e=>setStudentId(e.target.value)} placeholder="e.g., STU-1100" style={{ width: '100%', padding: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', outlineColor: '#1e3a8a', backgroundColor: '#f8fafc', color: 'black' }} />
                   </div>
                   <div>
                      <label style={{ display: 'block', fontSize: '0.9rem', color: '#475569', fontWeight: 'bold', marginBottom: '0.5rem' }}>Date of Birth (Password)</label>
                      <input type="password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="DD/MM/YYYY" style={{ width: '100%', padding: '0.85rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '1rem', outlineColor: '#1e3a8a', backgroundColor: '#f8fafc', color: 'black' }} />
                   </div>

                   <button type="submit" disabled={loading} style={{ border: 'none', backgroundColor: loading ? '#94a3b8' : '#1e3a8a', color: 'white', padding: '1rem', fontSize: '1.05rem', borderRadius: '6px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', marginTop: '1rem', transition: 'background-color 0.2s' }}>
                      {loading ? 'Authenticating & Fetching Securely...' : 'Authenticate & View Result'}
                   </button>
                </form>
                <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
                   <button style={{background:'transparent', border:'none', color: '#64748b', cursor:'pointer'}} onClick={() => setStep('home')}>← Cancel</button>
                </div>
             </div>
          )}

          {step === 'result' && resultData && (
              <div className="fade-in" style={{ backgroundColor: 'white', padding: '4rem 3rem', borderRadius: '4px', border: '1px solid #e2e8f0', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', margin: '0 auto', maxWidth: '850px' }}>
                 
                 <div style={{ textAlign: 'center', borderBottom: '3px solid #0f172a', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
                    <h1 style={{ margin: 0, fontSize: '2.4rem', fontFamily: '"Times New Roman", Times, serif', textTransform: 'uppercase', color: '#0f172a', letterSpacing: '1px' }}>University of Arcadia</h1>
                    <h3 style={{ margin: '0.5rem 0 0 0', fontWeight: 'bold', color: '#334155', fontSize: '1.1rem', letterSpacing: '1px' }}>STATEMENT OF MARKS</h3>
                    <p style={{ margin: '0.5rem 0 0 0', color: '#475569', fontWeight: '500' }}>SPRING EXAMINATION - {resultData.year}</p>
                 </div>

                 <table style={{ width: '100%', marginBottom: '2.5rem', fontSize: '1.05rem', borderCollapse: 'collapse', color: '#0f172a' }}>
                    <tbody>
                      <tr>
                         <td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: '#475569', width: '25%' }}>Name of Candidate:</td>
                         <td style={{ padding: '0.5rem 0', textTransform: 'uppercase', fontWeight: 'bold', borderBottom: '1px dashed #cbd5e1' }}>{resultData.fullName}</td>
                         <td style={{ padding: '0.5rem 0', fontWeight: 'bold', color: '#475569', width: '20%', textAlign: 'right', paddingRight: '1rem' }}>Roll No:</td>
                         <td style={{ padding: '0.5rem 0', fontWeight: 'bold', borderBottom: '1px dashed #cbd5e1' }}>{resultData.studentId}</td>
                      </tr>
                      <tr>
                         <td style={{ padding: '1rem 0 0.5rem 0', fontWeight: 'bold', color: '#475569' }}>Registered Course:</td>
                         <td colSpan="3" style={{ padding: '1rem 0 0.5rem 0', borderBottom: '1px dashed #cbd5e1', fontWeight: 'bold' }}>{resultData.course}</td>
                      </tr>
                    </tbody>
                 </table>

                 <table style={{ width: '100%', borderCollapse: 'collapse', border: '2px solid #0f172a', textAlign: 'left', marginBottom: '2.5rem', color: '#0f172a' }}>
                    <thead style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #0f172a' }}>
                       <tr>
                          <th style={{ padding: '1rem', borderRight: '1px solid #94a3b8', width: '20%' }}>Subject Code</th>
                          <th style={{ padding: '1rem', borderRight: '1px solid #94a3b8', width: '50%' }}>Subject Title</th>
                          <th style={{ padding: '1rem', textAlign: 'center', borderRight: '1px solid #94a3b8' }}>Max Marks</th>
                          <th style={{ padding: '1rem', textAlign: 'center' }}>Marks Obtained</th>
                       </tr>
                    </thead>
                    <tbody>
                       {resultData.subjects.map((subj, index) => (
                          <tr key={index} style={{ borderBottom: '1px solid #cbd5e1' }}>
                             <td style={{ padding: '1rem', borderRight: '1px solid #cbd5e1', fontWeight: 'bold', color: '#334155' }}>{subj.code}</td>
                             <td style={{ padding: '1rem', borderRight: '1px solid #cbd5e1' }}>{subj.name}</td>
                             <td style={{ padding: '1rem', textAlign: 'center', borderRight: '1px solid #cbd5e1' }}>{subj.max}</td>
                             <td style={{ padding: '1rem', textAlign: 'center', fontWeight: 'bold' }}>{subj.score}</td>
                          </tr>
                       ))}
                       <tr style={{ backgroundColor: '#f1f5f9', fontWeight: 'bold', borderTop: '2px solid #0f172a' }}>
                           <td colSpan="2" style={{ padding: '1rem', textAlign: 'right', borderRight: '1px solid #cbd5e1' }}>GRAND TOTAL</td>
                           <td style={{ padding: '1rem', textAlign: 'center', borderRight: '1px solid #cbd5e1' }}>{resultData.maxScore}</td>
                           <td style={{ padding: '1rem', textAlign: 'center', fontSize: '1.2rem', color: '#1e3a8a' }}>{resultData.totalScore}</td>
                       </tr>
                    </tbody>
                 </table>

                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#0f172a' }}>
                     <div>
                        <p style={{ margin: '0.2rem 0', fontSize: '1.05rem' }}><strong>Percentage:</strong> {resultData.percentage}%</p>
                        <p style={{ margin: '0.2rem 0', fontSize: '1.05rem' }}><strong>Letter Grade:</strong> {resultData.grade}</p>
                        <p style={{ margin: '1.5rem 0 0 0', fontWeight: 'bold', color: '#0f172a', textTransform: 'uppercase', fontSize: '1.1rem' }}>FINAL RESULT: <span style={{borderBottom: '2px solid #0f172a', paddingBottom:'2px'}}>{resultData.remarks}</span></p>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <p style={{ color: '#475569', fontSize: '0.95rem', margin: '0 0 0.5rem 0' }}>Date of Issue: {resultData.issuedAt}</p>
                        <div style={{ padding: '1.5rem 1rem 0.5rem 1rem', borderTop: '1px solid #0f172a', display: 'inline-block', minWidth: '180px', marginTop: '1rem' }}>
                           <i style={{fontWeight: 'bold', color: '#334155'}}>Controller of Exams</i>
                        </div>
                     </div>
                 </div>

                 <div style={{ textAlign: 'center', marginTop: '4rem', display: 'flex', justifyContent: 'center', gap: '1rem' }} className="no-print">
                    <button style={{ border: '1px solid #cbd5e1', background: 'white', color: '#475569', padding: '0.85rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} onClick={() => window.print()}>🖨️ Print Document</button>
                    <button style={{ border: 'none', background: '#e2e8f0', color: '#334155', padding: '0.85rem 1.5rem', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { setStep('home'); setStudentId(''); setPassword(''); setResultData(null); }}>Exit Secure Session</button>
                 </div>
              </div>
          )}

       </main>
    </div>
  );
}
