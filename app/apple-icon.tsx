import { ImageResponse } from 'next/og'

export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: 'linear-gradient(135deg, #0284c7 0%, #0c4a6e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 36,
          fontWeight: 800,
          fontFamily: 'sans-serif',
        }}
      >
        HV
      </div>
    ),
    {
      ...size,
    }
  )
}
