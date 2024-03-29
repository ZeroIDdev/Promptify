"use client";
import { useState, useEffect } from "react";
import { useSession,getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter()
  const [posts, setPosts] = useState([]);
  // if (session) {
  //   localStorage.setItem('session',JSON.stringify(session))
  // }
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async(post) => {
    const hasConfirm = confirm("Are sure to delete?")

    if (hasConfirm) {
      try {
        await fetch(`api/prompt/${post._id.toString()}`,{
          method:'DELETE'
        })

        const filteredPosts = posts.filter((p)=> p._id !== post._id)
        setPosts(filteredPosts)
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (session?.user.id) {
      fetchPosts();
    }

    // const session = localStorage.getItem('session')

    // if (session) {
    //   getSession({ session: JSON.parse(session) });
    // }
  }, []);
  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
