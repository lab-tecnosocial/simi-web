const Content = ({ content }) => {
    return (
      <section className="container mx-auto px-20 mt-10 mb-20">
        <div className="prose prose-lg max-w-none text-[#4B4B4B] text-xl font-nunito" dangerouslySetInnerHTML={{ __html: content }} />
      </section>
    );
  };
  
  export default Content;
  