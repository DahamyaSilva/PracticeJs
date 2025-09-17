import React, { useRef, useEffect, useState } from 'react';

const AnimeJsTest = () => {
  const boxesRef = useRef([]);
  const circleRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);
  const buttonsRef = useRef([]);
  const pathRef = useRef(null);
  const morphRef = useRef(null);
  const particlesRef = useRef([]);
  const progressRef = useRef(null);
  const cardsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js';
    script.onload = () => {
      setIsLoaded(true);
      initialAnimation();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initialAnimation = () => {
    if (!window.anime) return;
    
    window.anime({
      targets: titleRef.current,
      opacity: [0, 1],
      translateY: [-50, 0],
      duration: 1000,
      easing: 'easeOutExpo'
    });
    
    window.anime({
      targets: buttonsRef.current,
      opacity: [0, 1],
      scale: [0, 1],
      delay: window.anime.stagger(50, {start: 500}),
      duration: 800,
      easing: 'easeOutElastic(1, .8)'
    });
  };

  // 1. Basic transforms with spring physics
  const springAnimation = () => {
    if (!window.anime) return;
    
    window.anime({
      targets: boxesRef.current,
      translateX: [0, 200, 0],
      rotateZ: [0, 360],
      scale: [1, 0.5, 1],
      duration: 2000,
      delay: window.anime.stagger(200),
      easing: 'spring(1, 80, 10, 0)'
    });
  };

  // 2. Path animation (SVG)
  const pathAnimation = () => {
    if (!window.anime || !pathRef.current) return;
    
    window.anime({
      targets: pathRef.current,
      strokeDashoffset: [window.anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 2000,
      complete: () => {
        window.anime({
          targets: pathRef.current,
          fill: ['transparent', '#ff6b6b'],
          duration: 800
        });
      }
    });
  };

  // 3. Morphing animation
  const morphAnimation = () => {
    if (!window.anime || !morphRef.current) return;
    
    const morphPath = morphRef.current;
    const paths = [
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z',
      'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z'
    ];
    
    paths.forEach((path, index) => {
      setTimeout(() => {
        window.anime({
          targets: morphPath,
          d: path,
          duration: 800,
          easing: 'easeInOutQuart'
        });
      }, index * 1000);
    });
  };

  // 4. Particle system
  const particleAnimation = () => {
    if (!window.anime) return;
    
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        window.anime({
          targets: particle,
          translateX: () => window.anime.random(-200, 200),
          translateY: () => window.anime.random(-200, 200),
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
          duration: 2000,
          delay: index * 100,
          easing: 'easeOutExpo'
        });
      }
    });
  };

  // 5. Progress bar with custom property
  const progressAnimation = () => {
    if (!window.anime) return;
    
    const progressObj = { value: 0 };
    
    window.anime({
      targets: progressObj,
      value: 100,
      duration: 3000,
      easing: 'easeInOutQuart',
      update: () => {
        setProgress(Math.round(progressObj.value));
        if (progressRef.current) {
          progressRef.current.style.width = `${progressObj.value}%`;
        }
      }
    });
  };

  // 6. Card flip with 3D transform
  const cardFlipAnimation = () => {
    if (!window.anime) return;
    
    cardsRef.current.forEach((card, index) => {
      if (card) {
        window.anime({
          targets: card,
          rotateY: [0, 180, 360],
          rotateX: [0, 90, 0],
          duration: 1500,
          delay: index * 200,
          easing: 'easeInOutSine'
        });
      }
    });
  };

  // 7. Timeline with complex sequence
  const timelineAnimation = () => {
    if (!window.anime) return;
    
    const tl = window.anime.timeline({
      easing: 'easeOutExpo',
      duration: 750
    });

    tl.add({
      targets: boxesRef.current,
      translateY: -100,
      scale: 0.5,
      delay: window.anime.stagger(100)
    })
    .add({
      targets: circleRef.current,
      scale: 2,
      rotate: '2turn'
    }, '-=500')
    .add({
      targets: textRef.current,
      opacity: 1,
      translateX: [-300, 0],
      color: ['#ffffff', '#ff6b6b']
    }, '-=400')
    .add({
      targets: [boxesRef.current, circleRef.current],
      translateY: 0,
      scale: 1,
      delay: window.anime.stagger(50)
    });
  };

  // 8. Elastic bounce with custom bezier
  const elasticAnimation = () => {
    if (!window.anime) return;
    
    window.anime({
      targets: boxesRef.current,
      translateY: [0, -150],
      scaleX: [1, 1.2, 1],
      scaleY: [1, 0.8, 1],
      duration: 1200,
      delay: window.anime.stagger(100),
      easing: 'cubicBezier(.5, .05, .1, .3)',
      direction: 'alternate',
      loop: 2
    });
  };

  // 9. Function-based values
  const randomAnimation = () => {
    if (!window.anime) return;
    
    window.anime({
      targets: particlesRef.current,
      translateX: () => window.anime.random(-300, 300),
      translateY: () => window.anime.random(-300, 300),
      rotate: () => window.anime.random(0, 360),
      scale: () => window.anime.random(0.2, 2),
      backgroundColor: () => {
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        return colors[Math.floor(Math.random() * colors.length)];
      },
      duration: 1500,
      easing: 'easeOutQuart'
    });
  };

  const resetAll = () => {
    if (!window.anime) return;
    
    const allTargets = [
      ...boxesRef.current,
      circleRef.current,
      textRef.current,
      pathRef.current,
      morphRef.current,
      ...particlesRef.current,
      ...cardsRef.current
    ].filter(Boolean);
    
    window.anime.set(allTargets, {
      translateX: 0,
      translateY: 0,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      opacity: 1,
      backgroundColor: '#ff6b6b'
    });
    
    setProgress(0);
    if (progressRef.current) progressRef.current.style.width = '0%';
    if (textRef.current) textRef.current.innerHTML = 'Hello Anime.js!';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 
          ref={titleRef}
          className="text-white text-5xl font-bold text-center mb-12 opacity-0"
        >
          Complete Anime.js Showcase
        </h1>
        
        {/* Basic Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-white text-xl mb-6">Basic Animations</h3>
            <div className="flex justify-center mb-6">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  ref={(el) => boxesRef.current[index] = el}
                  className="w-16 h-16 bg-red-400 mx-3 rounded-xl shadow-2xl"
                />
              ))}
            </div>
            <div
              ref={circleRef}
              className="w-20 h-20 bg-teal-400 rounded-full mx-auto shadow-2xl"
            />
          </div>

          {/* SVG Animations */}
          <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-white text-xl mb-6">SVG Path Animation</h3>
            <svg className="w-full h-32" viewBox="0 0 100 100">
              <path
                ref={pathRef}
                d="M10,50 Q30,10 50,50 T90,50"
                stroke="#4ecdc4"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>
            
            <svg className="w-24 h-24 mx-auto mt-4" viewBox="0 0 24 24">
              <path
                ref={morphRef}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                fill="#ff6b6b"
              />
            </svg>
          </div>
        </div>

        {/* Particles */}
        <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h3 className="text-white text-xl mb-6">Particle System</h3>
          <div className="relative h-40 overflow-hidden">
            {[...Array(20)].map((_, index) => (
              <div
                key={index}
                ref={(el) => particlesRef.current[index] = el}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                style={{ 
                  left: '50%', 
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h3 className="text-white text-xl mb-6">Custom Property Animation</h3>
          <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              ref={progressRef}
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full rounded-full transition-all duration-100"
              style={{ width: '0%' }}
            />
          </div>
          <p className="text-white text-center mt-4 text-xl">{progress}%</p>
        </div>

        {/* 3D Cards */}
        <div className="bg-black/20 rounded-2xl p-8 backdrop-blur-sm mb-12">
          <h3 className="text-white text-xl mb-6">3D Card Flips</h3>
          <div className="flex justify-center space-x-4">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                ref={(el) => cardsRef.current[index] = el}
                className="w-24 h-32 bg-gradient-to-br from-pink-500 to-violet-500 rounded-lg shadow-2xl flex items-center justify-center text-white font-bold text-xl"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Text Animation */}
        <div className="text-center mb-12">
          <div
            ref={textRef}
            className="text-white text-3xl font-bold opacity-0"
          >
            Hello Anime.js!
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { text: 'Spring Physics', action: springAnimation },
            { text: 'SVG Path', action: pathAnimation },
            { text: 'Morph Shape', action: morphAnimation },
            { text: 'Particles', action: particleAnimation },
            { text: 'Progress Bar', action: progressAnimation },
            { text: 'Card Flip 3D', action: cardFlipAnimation },
            { text: 'Timeline', action: timelineAnimation },
            { text: 'Elastic Bounce', action: elasticAnimation },
            { text: 'Random Values', action: randomAnimation },
            { text: 'Reset All', action: resetAll }
          ].map((button, index) => (
            <button
              key={button.text}
              ref={(el) => buttonsRef.current[index] = el}
              onClick={button.action}
              disabled={!isLoaded}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed opacity-0 text-sm"
            >
              {button.text}
            </button>
          ))}
        </div>
        
        {!isLoaded && (
          <div className="text-white text-center mt-8 text-xl">
            Loading Anime.js...
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimeJsTest;