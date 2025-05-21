import posts from "../../components/data/posts.json"; // Import posts data

const RecentPosts = () => {
  // Filter posts that are NOT featured & take the last 3
  //const recentPosts = posts.filter(post => !post.featured).slice(-3).reverse();
  const recentPosts = posts.slice(-3).reverse();

  // Ensure there are enough posts before rendering
  if (recentPosts.length < 1) return <p className="text-center text-lg text-gray-600">No hay suficientes publicaciones recientes.</p>;

  return (
    <section className="mt-16 container mx-auto px-4 mb-20">
      <h2 className="text-3xl font-bold font-nunito mb-6 text-black">Publicados Recientemente</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {recentPosts.map((post, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <img src={`../${post.image}`} alt={post.title} className="w-full aspect-[4/3] rounded-lg object-cover mb-4" />
            <h3 className="text-3xl font-bold font-nunito text-black mb-2">
              <a href={`/blog/${post.id}`} className="font-nunito text-black no-underline hover:no-underline">
                {post.title}
              </a>
            </h3>
            <p className="text-green-600 font-semibold inline-block text-lg">{post.topic}</p>
            <span className="text-gray-500 text-lg"> | {post.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
