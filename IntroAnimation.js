import React, { useEffect, useCallback } from 'react';
import './IntroAnimation.css';

const shapes = [
  { className: 'shape needle', style: { top: '20%', left: '60%' } },
  { className: 'shape thread', style: { top: '70%', left: '30%' } },
  { className: 'shape button', style: { top: '40%', left: '80%' } },
  { className: 'shape scissors', style: { top: '65%', left: '65%' } },
  { className: 'shape yarn', style: { top: '30%', left: '20%' } },
];

export default function IntroAnimation({ onFinish }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      onFinish();
    }
  }, [onFinish]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="intro-animation">
      <div className="intro-center">
        <h1 className="intro-title">Handmade Store</h1>
        <p className="intro-hint">اضغط Enter أو Space للدخول</p>
        {shapes.map((shape, idx) => (
          <span key={idx} className={shape.className} style={shape.style} />
        ))}
      </div>
    </div>
  );
} 