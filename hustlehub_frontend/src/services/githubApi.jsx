const githubUsers = [
  "torvalds",
  "gaearon",
  "yyx990803",
  "kentcdodds",
  "tj"
];

async function getMentors() {
  const mentors = [];

  for (const username of githubUsers) {
    const response = await fetch(
      `https://api.github.com/users/${username}`
    );

    const data = await response.json();

    mentors.push(data);
  }

  return mentors;
}

export default getMentors;