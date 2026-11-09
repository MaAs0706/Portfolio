
import { useEffect, useState } from "react";

const MEDIUM_FEED =
  "https://medium.com/feed/@aswanthmadhav07";

export function useMediumArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiUrl =
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            MEDIUM_FEED
          )}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error("Unable to fetch Medium articles.");
        }

        const data = await response.json();

        if (data.status !== "ok") {
          throw new Error("Medium feed could not be loaded.");
        }

        const formattedArticles = data.items.map((item) => {
          const image =
            item.thumbnail ||
            item.enclosure?.link ||
            "";

          const description = item.description
            ?.replace(/<[^>]*>/g, "")
            ?.replace(/&nbsp;/g, " ")
            ?.trim() || "";

          return {
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            categories: item.categories || [],
            image,
            description: description.slice(0, 180),
          };
        });

        setArticles(formattedArticles);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return { articles, loading, error };
}
