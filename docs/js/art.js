// Elk kledingstuk is een tekening van vormen. De sleutel is het id uit products.json.
const ART = {
    parka: {
        color: '#2D4BFF',
        viewBox: '0 0 200 240',
        body: `
      <path d="M62 74 L138 74 L148 214 L52 214 Z"/>
      <path d="M62 74 L28 156 L48 166 L68 112 Z"/>
      <path d="M138 74 L172 156 L152 166 L132 112 Z"/>
      <path d="M64 78 Q100 4 136 78 Q100 50 64 78 Z" fill-opacity=".7"/>
      <path d="M100 60 V214" stroke="#fff" stroke-opacity=".55" stroke-width="2"/>`
    },
    sneaker: {
        color: '#0E1C28',
        viewBox: '0 0 240 150',
        body: `
      <path d="M20 112 L28 62 Q58 54 88 66 L116 50 Q146 74 188 86 Q224 94 226 112 Z"/>
      <path d="M96 62 L112 80 M106 56 L122 74 M118 52 L132 68" stroke="#fff" stroke-opacity=".8" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 112 H226 V124 Q226 136 214 136 H28 Q14 136 14 124 Z" fill="#F2F5F6"/>`
    },
    chino: {
        color: '#B9A88A',
        viewBox: '0 0 200 260',
        body: `
      <path d="M62 20 H138 L148 70 L170 240 H112 L100 105 L88 240 H30 L52 70 Z"/>
      <rect x="62" y="20" width="76" height="12" fill="#000" fill-opacity=".14"/>
      <path d="M100 32 V105" stroke="#000" stroke-opacity=".2" stroke-width="2"/>`
    },
    hat: {
        color: '#7FA6A0',
        viewBox: '0 0 240 150',
        body: `
      <path d="M72 92 L82 38 Q120 26 158 38 L168 92 Z"/>
      <path d="M18 104 Q120 146 222 104 Q204 86 168 92 L72 92 Q36 86 18 104 Z" fill-opacity=".8"/>
      <path d="M73 82 L72 92 L168 92 L167 82 Q120 92 73 82 Z" fill="#000" fill-opacity=".28"/>`
    },

};



// Geeft de SVG-tekening voor een product-id. Onbekend id? Dan niks.
function garment(id) {
    const a = ART[id];
    if (!a) return '';
    return `<svg viewBox="${a.viewBox}" style="color:${a.color}" fill="currentColor" role="img" aria-label="${id}">${a.body}</svg>`;
}