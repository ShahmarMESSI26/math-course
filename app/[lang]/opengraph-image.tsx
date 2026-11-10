import { ImageResponse } from 'next/og';

// Картинка для превью ссылок в соцсетях и мессенджерах
export const alt = 'Shahmath';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const OLYMPIADS = ['IMO', 'JBMO', 'RFO', 'BOM', 'IZhO', 'EGMO'];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#1E2A78',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, fontWeight: 800 }}>
          <span>Shah</span>
          <span style={{ color: '#F2B33D' }}>math</span>
        </div>
        <div style={{ display: 'flex', fontSize: 36, marginTop: 16, color: '#DCE0F7' }}>Math Olympiad Training</div>
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          {OLYMPIADS.map((o) => (
            <div
              key={o}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 12,
                border: '2px solid rgba(242,179,61,0.8)',
                fontSize: 30,
                fontWeight: 700,
              }}
            >
              {o}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
