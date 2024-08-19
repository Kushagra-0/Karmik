"use client"

import { useState } from 'react';

const images = [
  { src: '1.png', alt: 'Food Loss' },
  { src: '2.png', alt: 'Food Loss' },
  { src: '3.png', alt: 'Food Loss' }
];

function Card() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageSelect = (index: number) => {
    setCurrentImageIndex(index);
  };

  const names = ['DO', 'NOT', 'WASTE'];

  return (
    <div className="w-96 p-4 rounded-lg">
      <img
        src={images[currentImageIndex].src} 
        alt={images[currentImageIndex].alt} 
        className="w-full h-auto rounded-2xl"
      />
      <div className="flex justify-between mt-8">
        {names.map((name, index) => (
          <button 
            key={index} 
            onClick={() => handleImageSelect(index)} 
            className={`w-24 h-12 rounded-full border ${index === currentImageIndex ? 'bg-white text-[#FFA500] border-4 border-[#FFA500]' : 'bg-white text-black'} hover:border-[#FFA508] hover:border-4`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Card;

