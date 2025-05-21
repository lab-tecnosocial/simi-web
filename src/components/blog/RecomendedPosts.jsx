import posts from "../../components/data/posts.json";

const RecomendedPosts = () => {
  // Filter only the featured posts & take the first 3
  const featuredPosts = posts.filter(post => post.featured).slice(0, 3);
  const lastFeatPst = featuredPosts.length - 1;

  // Ensure at least 1 post before rendering
  if (featuredPosts.length < 1) return <p className="text-center text-lg text-gray-600">No hay suficientes blogs destacados.</p>;

  return (
    <section className="mt-16 container mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold font-nunito mb-6 text-black">Blogs destacados</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Large Blog Post */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img src={`/${featuredPosts[lastFeatPst].image}`} alt={featuredPosts[lastFeatPst].title} className="w-full aspect-[4/3] rounded-lg object-cover mb-4" />
          <h3 className="text-3xl font-bold font-nunito text-black mb-2">
            <a href={`/blog/${featuredPosts[lastFeatPst].id}`} className="font-nunito text-black no-underline hover:no-underline">
              {featuredPosts[lastFeatPst].title}
            </a>
          </h3>
          <p className="text-green-600 font-semibold inline-block text-lg">{featuredPosts[lastFeatPst].topic}</p>
          <span className="text-gray-500 text-lg"> | {featuredPosts[lastFeatPst].date}</span>
        </div>

        {/* Right Column: Two Smaller Blog Posts */}
        <div className="grid grid-rows-2 gap-6">
          {featuredPosts.slice(0, featuredPosts.length - 1).map((post, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex">
              <img src={`/${post.image}`} alt={post.title} className="w-2/5 rounded-lg object-cover" />
              <div className="w-3/5 pl-4">
                <h3 className="text-xl font-bold text-black mb-2">
                  <a href={`/blog/${post.id}`} className="text-black no-underline hover:no-underline">
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4 text-lg" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 80) }}>...</p>
                <p className="text-green-600 font-semibold inline-block text-lg">{post.topic}</p>
                <span className="text-gray-500 text-lg"> | {post.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecomendedPosts;
