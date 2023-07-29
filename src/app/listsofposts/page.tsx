import Image from "next/image";
import { cache } from "react";

const getPostsData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
};

const getUserData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

const getDogData = async () => {
  const response = await fetch("https://dog.ceo/api/breeds/image/random", {
    cache: "no-store",
  });
  return response.json();
};

export default async function ListOfPosts() {
  const [posts, users, dog] = await Promise.all([
    getPostsData(),
    getUserData(),
    getDogData(),
  ]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image src={dog.message} alt="dog" width={300} height={300} />
      {posts.map((post: any) => {
        return <p key={post.id}>{post.title}</p>;
      })}

      <div>
        {users.map((user: any) => {
          return <p key={user.id}>{user.name}</p>;
        })}
      </div>
    </main>
  );
}
