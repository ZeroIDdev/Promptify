"use client";

import { useState, useEffect,useRef } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
  <div className="mt-16 prompt_layout">
    {data.map((post)=>
      <PromptCard
      key={post._id}
      post={post}
      />
    )}
  </div>)
};

const Feed = () => {
  const [post,setPost] = useState([])
  const searchRef = useRef(null)
  const handleSearchChange = async(e) => {
    e.preventDefault()
    try {
      const res = await fetch(`/api/prompt/search?q=${searchRef.current.value}`)
      const data = await res.json()
      console.log(searchRef.current.value);
      console.log(data);
      setPost(data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/prompt')
        const data = await response.json()
        console.log(data)
        setPost(data)
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts()
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex-center" onSubmit={handleSearchChange}>
        <input
          type="text"
          placeholder="Search for a tag or a username"
          ref={searchRef}
          required
          className="search_input"
        />
      </form>
      {
        post.length>0&&
      <PromptCardList data={post} handleTagClick={() => {}} />
        
      }
    </section>
  );
};

export default Feed;
