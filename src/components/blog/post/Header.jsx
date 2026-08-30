const Header = ({ post, imageSrc }) => {
    return (
      <section className="container mx-auto px-16 mt-2 mb-10 ml-4">
        <h1 className="text-4xl font-bold text-black font-nunito mr-8">{post.title}</h1>
        <p className="text-2xl text-[#5B5959]  mt-4 mb-4 font-nunito">Versión en español</p>
        <p className="text-2xl text-[#5B5959]  mt-4 mb-4 font-nunito">Escrito por: {post.author}</p>

        {/* Mostrar traducción si existe */}
        {post.translate && (
          <p className="text-2xl text-[#5B5959] mt-4 mb-4 font-nunito">Traducción por: {post.translate}</p>
        )}
  
        <div className="w-full max-w-screen-lg mx-auto">
          <div className="relative w-full aspect-[5/3] overflow-hidden rounded-lg">
            <img
              src={imageSrc}
              alt={post.title}
              className="inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    );
  };
  
  export default Header;
  