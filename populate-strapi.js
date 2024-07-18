import axios from "axios";

const STRAPI_URL = "http://localhost:1337";

async function populateArticles() {
  try {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    for (const post of posts) {
      await axios.post(
        `${STRAPI_URL}/api/articles`,
        {
          data: {
            title: post.title,
            content: post.body,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`Created article: ${post.title}`);
    }

    console.log("All articles created successfully!");
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

populateArticles();
