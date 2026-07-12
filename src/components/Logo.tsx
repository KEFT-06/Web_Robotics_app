import React from 'react';
import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Logo({ className, iconOnly = false, size = 'md' }: LogoProps) {
  
  const sizeClasses = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
    xl: 'h-28',
  };

  const iconSizeClasses = {
    sm: 'w-8 h-auto',
    md: 'w-10 h-auto',
    lg: 'w-14 h-auto',
    xl: 'w-20 h-auto',
  };

  if (iconOnly) {
    return (
      <svg 
        viewBox="20 5 170 45" 
        className={cn("shrink-0", iconSizeClasses[size], className)} 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g strokeWidth="2.5">
          <rect x="25" y="10" width="55" height="15" stroke="#06b6d4" />
          <rect x="60" y="17" width="55" height="15" stroke="currentColor" className="text-text-main" />
          <rect x="95" y="24" width="55" height="15" stroke="#06b6d4" />
          <rect x="130" y="31" width="55" height="15" stroke="currentColor" className="text-text-main" />
        </g>
      </svg>
    );
  }

  return (
    <svg 
      viewBox="0 0 220 95" 
      className={cn("shrink-0", sizeClasses[size], className)} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g strokeWidth="1.5">
        <rect x="25" y="10" width="55" height="15" stroke="#06b6d4" />
        <rect x="60" y="17" width="55" height="15" stroke="currentColor" className="text-text-main" />
        <rect x="95" y="24" width="55" height="15" stroke="#06b6d4" />
        <rect x="130" y="31" width="55" height="15" stroke="currentColor" className="text-text-main" />
      </g>
      
      <text x="12" y="72" fontFamily="Playfair Display, Georgia, serif" fontSize="52" fontWeight="400" fill="currentColor" className="text-text-main" letterSpacing="-0.02em">
        Sparte
      </text>
      
      <text x="96" y="90" fontFamily="Playfair Display, Georgia, serif" fontSize="18" fontStyle="italic" fill="#06b6d4" letterSpacing="0.05em">
        ROBOTICS
      </text>
    </svg>
  );
}
