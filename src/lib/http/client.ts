import axios from "axios";

const BASE_URL = "https://api.github.com";

// მარტივი ჩეკი შეგიძლია დაწერო, რომ .env ფაილში ნამდვილად არსებობს VITE_GITHUB_PAT_KEY
if (!import.meta.env.VITE_GITHUB_PAT_KEY) {
  throw new Error("VITE_GITHUB_PAT_KEY is not defined in .env file");
}

const GITHUBClient = axios.create({
  baseURL: BASE_URL,
  // აქვე შეგიძლია გადაცე ავტორიზაციის ჰედერი, არ მოგიწევს ყოველ ჯერზე გადაცემა
  headers: {
    Authorization: `token ${import.meta.env.VITE_GITHUB_PAT_KEY}`,
  },
});

export { GITHUBClient };
