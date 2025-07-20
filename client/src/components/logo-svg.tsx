export default function EstanciaLogoSVG({ className = "w-10 h-10", color = "white" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 300 200" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main mountain - left peak */}
      <path 
        d="M20 90 C35 45, 65 35, 90 55 C105 40, 120 45, 140 65 C145 75, 142 85, 135 90 C125 100, 110 98, 100 90 C90 98, 75 100, 65 90 C50 80, 35 85, 20 90 Z" 
        fill={color}
        opacity="1"
      />
      
      {/* Main mountain - right peak */}
      <path 
        d="M140 65 C155 30, 185 25, 210 45 C225 30, 240 35, 260 60 C265 70, 262 80, 255 85 C245 95, 230 93, 220 85 C210 93, 195 95, 185 85 C170 75, 155 80, 140 65 Z" 
        fill={color}
        opacity="1"
      />
      
      {/* ESTÂNCIA text */}
      <g>
        <text 
          x="150" 
          y="120" 
          textAnchor="middle" 
          fontSize="16" 
          fontWeight="700" 
          fill={color} 
          letterSpacing="0.15em"
          fontFamily="system-ui, -apple-system, sans-serif"
        >
          ESTÂNCIA
        </text>
      </g>
      
      {/* Morro Grande text - stylized handwritten style */}
      <g>
        <text 
          x="150" 
          y="150" 
          textAnchor="middle" 
          fontSize="28" 
          fontWeight="400" 
          fill={color} 
          fontFamily="cursive, Georgia, serif"
          style={{ 
            fontStyle: 'italic',
            transform: 'rotate(-2deg)',
            transformOrigin: 'center'
          }}
        >
          Morro Grande
        </text>
      </g>
      
      {/* Decorative elements - small dots/accents */}
      <circle cx="80" cy="120" r="1.5" fill={color} opacity="0.6" />
      <circle cx="220" cy="120" r="1.5" fill={color} opacity="0.6" />
    </svg>
  );
}