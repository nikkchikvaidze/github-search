export interface User {
  username: string;
  id: number;
  avatar: string;
}

export interface ApiUser extends User {
  name: string;
  createDate: string;
  bio: string;
  email: string;
  blog: string;
  company: string;
  following: number;
  followers: number;
  location: string;
  publicGists: number;
  repos: number;
  twitterUsername: string;
  link: string;
}

export interface FavoriteUser extends User {
  followers: number;
  repositories: number;
  link: string;
  name: string;
}
