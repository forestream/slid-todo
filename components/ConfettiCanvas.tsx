import React, { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  r: number;
  d: number;
  color: string;
  tilt: number;
  tiltAngleIncremental: number;
  tiltAngle: number;
}

interface ConfettiState {
  particles: Particle[];
  ctx: CanvasRenderingContext2D | null;
  width: number;
  height: number;
  angle: number;
  tiltAngle: number;
  animationHandler: number;
}

interface ConfettiCanvasProps {
  isActive: boolean;
}

const particleColors = [
  'DodgerBlue',
  'OliveDrab',
  'Gold',
  'pink',
  'SlateBlue',
  'lightblue',
  'Violet',
  'PaleGreen',
  'SteelBlue',
  'SandyBrown',
  'Chocolate',
  'Crimson',
];

const randomFromTo = (from: number, to: number) => Math.floor(Math.random() * (to - from + 1) + from);

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height - height,
  r: randomFromTo(10, 15),
  d: Math.random() * 150 + 10,
  color: particleColors[randomFromTo(0, particleColors.length - 1)],
  tilt: Math.floor(Math.random() * 10) - 10,
  tiltAngleIncremental: Math.random() * 0.07 + 0.05,
  tiltAngle: 0,
});

const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiRef = useRef<ConfettiState>({
    particles: [],
    ctx: null,
    width: window.innerWidth,
    height: window.innerHeight,
    angle: 0,
    tiltAngle: 0,
    animationHandler: 0,
  });

  const drawParticle = useCallback((particle: Particle) => {
    const { ctx } = confettiRef.current;
    if (!ctx) return;

    ctx.beginPath();
    ctx.lineWidth = particle.r / 2;
    ctx.strokeStyle = particle.color;
    ctx.moveTo(particle.x + particle.tilt + particle.r / 4, particle.y);
    ctx.lineTo(particle.x + particle.tilt, particle.y + particle.tilt + particle.r / 4);
    ctx.stroke();
  }, []);

  const stopAnimation = useCallback(() => {
    const confetti = confettiRef.current;
    cancelAnimationFrame(confetti.animationHandler);
    confetti.ctx?.clearRect(0, 0, confetti.width, confetti.height);
  }, []);

  const updateParticles = useCallback(() => {
    const confetti = confettiRef.current;
    confetti.angle += 0.01;
    confetti.tiltAngle += 0.1;

    let remainingParticles = 0;
    confetti.particles.forEach((particle) => {
      particle.tiltAngle += particle.tiltAngleIncremental;
      particle.y += (Math.cos(confetti.angle + particle.d) + 3 + particle.r / 2) / 3;
      particle.x += Math.sin(confetti.angle);
      particle.tilt = Math.sin(particle.tiltAngle) * 15;

      if (particle.y <= confetti.height) {
        remainingParticles++;
      }

      if (particle.x > confetti.width + 20 || particle.x < -20 || particle.y > confetti.height) {
        particle.x = Math.random() * confetti.width;
        particle.y = -10;
        particle.tilt = Math.floor(Math.random() * 10) - 10;
      }
    });

    if (remainingParticles === 0) {
      stopAnimation();
    }
  }, [stopAnimation]); // stopAnimation을 의존성에 추가

  // animationLoop를 먼저 선언
  const animationLoop = useCallback(() => {
    const confetti = confettiRef.current;
    if (!confetti.ctx) return;

    confetti.ctx.clearRect(0, 0, confetti.width, confetti.height);
    confetti.particles.forEach(drawParticle);
    updateParticles();
    confetti.animationHandler = requestAnimationFrame(animationLoop);
  }, [drawParticle, updateParticles]);

  const startAnimation = useCallback(() => {
    const confetti = confettiRef.current;
    confetti.particles = Array.from({ length: 150 }, () => createParticle(confetti.width, confetti.height));
    confetti.animationHandler = requestAnimationFrame(animationLoop);
  }, [animationLoop]);

  useEffect(() => {
    const confetti = confettiRef.current;
    const canvas = canvasRef.current;
    if (canvas) {
      confetti.ctx = canvas.getContext('2d');
      confetti.width = window.innerWidth;
      confetti.height = window.innerHeight;
      canvas.width = confetti.width;
      canvas.height = confetti.height;

      const resizeHandler = () => {
        confetti.width = window.innerWidth;
        confetti.height = window.innerHeight;
        canvas.width = confetti.width;
        canvas.height = confetti.height;
      };

      window.addEventListener('resize', resizeHandler);

      if (isActive) {
        startAnimation();
      } else {
        stopAnimation();
      }

      return () => {
        stopAnimation();
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [isActive, startAnimation, stopAnimation]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ConfettiCanvas;
