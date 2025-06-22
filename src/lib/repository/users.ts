import type { User } from "../../types/user";
import { GITHUBClient } from "../http/client";

const UsersRepository = {
  async getAll(
    pageNumber: number,
    searchTerm?: string
  ): Promise<{ items: User[]; totalPages: number }> {
    const { data } = await GITHUBClient.get(
      `search/users?q=followers:%3E=1000&sort=followers&order=desc&per_page=15&page=${pageNumber}${
        searchTerm ? `&q=` + searchTerm : ""
      } `,
      //   "search/users?q=followers:%3E=1000&sort=followers&order=desc&per_page=15&page=1&q=torvalds",
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_PAT_KEY}`,
        },
      }
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
          ({
            login: username,
            followers,
            repos,
            id,
            avatar_url: avatar,
          }: any) => ({
            username,
            followers,
            repos,
            id,
            avatar,
          })
        ),
      };
    }
  },

  async getUserByUsername(username: string): Promise<any> {
    const { data } = await GITHUBClient.get(
      `users/${username}`,
      //   "search/users?q=followers:%3E=1000&sort=followers&order=desc&per_page=15&page=1&q=torvalds",
      {
        headers: {
          Authorization: `token ${import.meta.env.VITE_GITHUB_PAT_KEY}`,
        },
      }
    );

    return data;
  },
};

export { UsersRepository };
