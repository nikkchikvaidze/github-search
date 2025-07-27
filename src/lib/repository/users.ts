import type { ApiUser, User } from "../../types/user";
import { GITHUBClient } from "../http/client";

const UsersRepository = {
  async getAll(
    pageNumber: number,
    searchTerm?: string,
  ): Promise<{ items: User[]; totalPages: number }> {
    const { data } = await GITHUBClient.get(
      `search/users?q=followers:%3E=1000&sort=followers&order=desc&per_page=15&page=${pageNumber}${
        searchTerm ? `&q=` + searchTerm : ""
      } `,
    );

    if (!data.items.length) {
      return {
        totalPages: 0,
        items: [],
      };
    } else {
      return {
        totalPages: data.total_count,
        items: data.items.map(
          // ts გარემოში ვართ, any ს ვიყენებთ მხოლოდ იმ შმთხვევაში როცა რაიმე მოდული არ ასაპორტებს ტიპებს
          // !არ გამოვიყენოთ any
          //  მარტივად შეგიძლია ტიპი აღწერო, მაგალითად
          //  type SomeType = { login: string; id: number; avatar_url: string };
          ({ login: username, id, avatar_url: avatar }: any) => ({
            username,
            id,
            avatar,
          }),
        ),
      };
    }
  },

  async getUserByUsername(username: string): Promise<ApiUser> {
    const { data } = await GITHUBClient.get(`users/${username}`);

    return {
      name: data.name,
      username: data.login,
      avatar: data.avatar_url,
      bio: data.bio,
      blog: data.blog,
      company: data.company,
      createDate: data.created_at,
      email: data.email,
      followers: data.followers,
      following: data.following,
      id: data.id,
      location: data.location,
      publicGists: data.public_gists,
      repos: data.public_repos,
      twitterUsername: data.twitter_username,
      link: data.html_url,
    };
  },
};

export { UsersRepository };
