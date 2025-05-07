import React, { useEffect, useState } from 'react';

const SuggestionBox = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollMessage = document.querySelector(".scroll-message");
      const elementPosition = document.getElementById("people-images")?.offsetTop;

      if (elementPosition) {
        const scrollPosition = window.scrollY;
        if (scrollPosition > elementPosition - window.innerHeight + 200) {
          scrollMessage.style.display = "block";
        } else {
          scrollMessage.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="flex items-center">
      <div className="scroll-message p-6 border-qumir border-2 rounded-3xl bg-riti text-center text-2xl">
        <div className="close-btn" onClick={handleClose}>
          <span className="close-icon">×</span>
        </div>
        <div>
          <p>¿Tienes una sugerencia?</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSf91IAN8xH9o4VQnELxAWdFbj6iYhXcgyOsRMGYHD8BrpZ8Qw/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Compártela💡
          </a>
          <p>¿Encontraste un error?</p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSdDCzuKpa-6jABQICgjvb9mYONlmQ1XKc24IuuLLlbmobTDpQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold"
          >
            Avísanos ⚠️
          </a>
        </div>      
        <img
            className="w-20 h-auto ml-4" 
            src="/assets/images/simigloboflotante.png"
            alt="Imagen 1"
        />
      </div>

    </div>
  );
};

export default SuggestionBox;