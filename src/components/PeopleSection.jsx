import React from 'react';

const PeopleSection = ({ image }) => {
  return (
    <section id="people-images" className="w-full">
      <img
        src={image?.src}
        width={image?.width}
        height={image?.height}
        className="w-full h-auto object-cover"
        alt="Personajes Simi"
      />
    </section>
  );
};

export default PeopleSection;