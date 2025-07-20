export default function EstanciaLogoSVG({ className = "w-10 h-10", color = "white" }: { className?: string; color?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main mountain curves */}
      <path 
        d="M30 80 C50 40, 80 30, 110 50 C130 35, 150 40, 170 70 C180 85, 175 100, 165 110 C150 125, 130 120, 115 110 C100 120, 80 125, 65 110 C45 95, 35 85, 30 80 Z" 
        fill={color}
        opacity="0.9"
      />
      
      {/* Secondary mountain layer */}
      <path 
        d="M40 90 C60 55, 85 45, 110 60 C125 50, 145 55, 160 80 C165 90, 160 100, 155 105 C145 115, 130 112, 120 105 C110 112, 95 115, 85 105 C70 95, 60 90, 55 87 C50 85, 45 87, 40 90 Z" 
        fill={color}
        opacity="0.7"
      />
      
      {/* ESTÂNCIA text */}
      <text 
        x="100" 
        y="140" 
        textAnchor="middle" 
        fontSize="18" 
        fontWeight="600" 
        fill={color} 
        letterSpacing="0.1em"
        fontFamily="Arial, sans-serif"
      >
        ESTÂNCIA
      </text>
      
      {/* Morro Grande text - stylized */}
      <text 
        x="100" 
        y="170" 
        textAnchor="middle" 
        fontSize="24" 
        fontWeight="bold" 
        fill={color} 
        fontFamily="Arial, sans-serif"
        style={{ fontStyle: 'italic' }}
      >
        Morro Grande
      </text>
    </svg>
  );
}