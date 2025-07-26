import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  title?: string;
  subtitle?: string;
  gradient?: boolean;
  hoverable?: boolean;
}

export default function EnhancedCard({ 
  children, 
  className = '', 
  icon, 
  title, 
  subtitle,
  gradient = false,
  hoverable = true 
}: EnhancedCardProps) {
  return (
    <Card 
      className={`
        relative overflow-hidden group
        ${gradient ? 'bg-gradient-to-br from-white via-primary-50 to-primary-100' : 'bg-white/80 backdrop-blur-lg'}
        ${hoverable ? 'hover:shadow-2xl hover:shadow-primary-500/20 hover:-translate-y-2' : ''}
        border border-primary-200/30 
        transition-all duration-500 ease-out
        ${className}
      `}
    >
      {/* Shimmer effect on hover */}
      {hoverable && (
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      )}
      
      {/* Glass effect border */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-400/10 via-transparent to-primary-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative z-10 p-6">
        {/* Header with icon and title */}
        {(icon || title) && (
          <div className="flex items-center mb-4">
            {icon && (
              <div className="mr-3 p-2 rounded-lg bg-primary-100/50 text-primary-600 group-hover:scale-110 transition-transform duration-300">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary-700 transition-colors duration-300">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="slide-in-up">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}