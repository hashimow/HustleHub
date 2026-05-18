async function getMentors(query = "javascript developer") {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}&per_page=12`
  );
  const data = await response.json();

  if (!data.items) return [];

  return data.items.map((user) => ({
    id: user.id,
    login: user.login,
    name: user.login,
    avatar_url: user.avatar_url,
    bio: "Visit profile to learn more.",
    public_repos: "N/A",
    followers: "N/A",
    html_url: user.html_url,
  }));
}

export default getMentors;