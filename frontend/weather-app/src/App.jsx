import React, { useState } from 'react';
import { CloudRain, Sun, Droplets, MapPin, Search } from 'lucide-react';

export default function App() {
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const searchWeather = async (e) => {
        e.preventDefault();
        if(!city.trim()) return;
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`/api/weather/${encodeURIComponent(city)}`);
            if(!res.ok) {
                const e = await res.json();
                throw new Error(e.error || "City not found locally or externally.");
            }
            const data = await res.json();
            setWeather(data);
        } catch(err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (
        <div className="fade-in" style={{minHeight: '100vh', background: 'linear-gradient(to bottom right, #e0f2fe, #bae6fd)', fontFamily: 'system-ui, -apple-system, sans-serif', padding: '2rem'}}>
            <div style={{maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', alignItems: 'center'}}>
                <h1 style={{color: '#0369a1', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.75rem', margin: 0, fontSize: '1.8rem'}}>
                    <Sun color="#f59e0b" size={32}/> CRDAS Global Weather
                </h1>
                <div style={{display:'flex', gap:'1rem'}}>
                    <a href="/result" style={{color: '#0369a1', textDecoration: 'none', padding: '0.75rem 1.2rem', background: 'white', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>← Back to Result Portal</a>
                    <a href="/admin" target="_blank" rel="noreferrer" style={{color: 'white', textDecoration: 'none', padding: '0.75rem 1.2rem', background: '#0369a1', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}>Admin Cache Gateway</a>
                </div>
            </div>

            <div style={{maxWidth: '550px', margin: '0 auto'}}>
                <form onSubmit={searchWeather} style={{display: 'flex', gap: '0.75rem', marginBottom: '2.5rem'}}>
                    <input 
                        type="text" 
                        value={city} 
                        required
                        onChange={e=>setCity(e.target.value)}
                        placeholder="Search any global city (e.g. London, Delhi)"
                        style={{flex: 1, padding: '1.25rem', borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '1.1rem', outlineColor: '#0284c7'}}
                    />
                    <button type="submit" disabled={loading} style={{padding: '0 1.5rem', background: '#0284c7', color: 'white', border: 'none', borderRadius: '16px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(2, 132, 199, 0.4)'}}>
                        {loading ? 'Searching...' : <Search size={24} />}
                    </button>
                </form>

                {error && <div className="fade-in" style={{color: '#ef4444', textAlign: 'center', background: 'white', padding: '1.25rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontWeight: 'bold'}}>{error}</div>}

                {weather && (
                    <div className="fade-in" style={{background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(20px)', borderRadius: '32px', padding: '3rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.8)', textAlign: 'center'}}>
                        <div style={{display: 'inline-block', background: weather.servedFrom === 'Cache' ? '#10b981' : '#f59e0b', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '999px', fontSize: '0.95rem', fontWeight: 'bold', marginBottom: '2.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                            {weather.servedFrom === 'Cache' ? '⚡ Rendered locally from Gateway Cache' : '🔄 Data retrieved fresh from External API'}
                        </div>
                        
                        <h2 style={{fontSize: '2.8rem', color: '#0f172a', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem'}}>
                            <MapPin color="#0284c7" size={40}/> {weather.city}, {weather.country}
                        </h2>
                        <p style={{fontSize: '1.25rem', color: '#475569', margin: '0 0 2.5rem 0', fontWeight: 600, textTransform: 'capitalize'}}>{weather.condition}</p>

                        <div style={{fontSize: '6rem', fontWeight: '900', color: '#0f172a', marginBottom: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', textShadow: '0 10px 20px rgba(0,0,0,0.05)'}}>
                            {weather.condition.includes("Clear") ? <Sun size={80} color="#f59e0b" /> : <CloudRain size={80} color="#64748b" />}
                            {weather.temperature}°C
                        </div>

                        <div style={{display: 'flex', justifyContent: 'center', gap: '3rem', borderTop: '2px solid rgba(0,0,0,0.05)', paddingTop: '2.5rem'}}>
                            <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontSize: '1.2rem', fontWeight: 'bold'}}>
                                <Droplets color="#0ea5e9" size={28}/> Humidity level: {weather.humidity}%
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
