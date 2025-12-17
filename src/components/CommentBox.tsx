import { useState, useEffect } from "react";
import type {Comment} from "../types/comments";
const COMMENT_STORAGE_KEY = "comments";

export default function CommentSection() {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");

 /*  useEffect(() => {
    const savedComments = localStorage.getItem(COMMENT_STORAGE_KEY);
     if (savedComments) {
      setComments(JSON.parse(savedComments));
      console.log(savedComments);
    }
  }, []); */

  useEffect(() => {
    console.log('a');
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments))
    console.log(localStorage.getItem(COMMENT_STORAGE_KEY));
  }, [comments]); 

  const handleCommentAdd = () => {
      if(!input.trim() ) return;
      const newComments = {
      id: Date.now(),
      text:input,
      createdAt: new Date().toLocaleString(),
      // likes:0,
      // replies: [],
    };
    setComments([...comments, newComments]);
  }

  const handleCommentEdit = (commentId: number, text: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId
        ? { ...comment, text: text }
        : comment
    );
    setComments(updatedComments); 
    setEditingId(null);   
    setEditText(""); 
    setText(text);      

  }
  

  return (

    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">💬 Interactive Comment Section</h2>
      <div className="search-box">
        <input type="text" placeholder="Write your comment here..." value={input} 
          onChange={(e) => setInput(e.target.value)}  
        /> &nbsp; &nbsp; 
        <button className="bg-blue-600 text-white px-4 rounded"
          onClick={handleCommentAdd}
        >
          Add Comment
        </button>
         <button
            className="bg-blue-600 text-white px-3 rounded"
            onClick={() => {
             setInput("") }}
          >
            Cancel
          </button>
      </div>

      {/* Comment List */}
      <ul className="mt-6 space-y-3">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet</p>
        )}

        {comments.map((c) => (
          <li key={c.id} className="border p-3 rounded">
            {/* <p className="font-semibold">{c.author}</p> */}
            {editingId === c.id ? (
              <div className="search-box">
                <input
                value={editText} onChange={(e) => setEditText(e.target.value)}
                /> &nbsp;&nbsp;
                <button
                  className="bg-blue-600 text-white px-3 rounded"
                  onClick={() => {handleCommentEdit(c.id, editText)}}
                >
                  Save
                </button>
                 <button
                  className="bg-blue-600 text-white px-3 rounded"
                  onClick={() => {
                    setEditingId(null);
                    setEditText(c.text); // load original text
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
                <p>{c.text}</p> 
                )
              }
            <span className="text-xs text-gray-500">
              {c.createdAt}
            </span>
            <div className="flex gap-3 text-sm mt-2 text-gray-600">
              {/* <button >👍 0</button>
              <button >Reply</button> */}
              <button onClick={() => {setEditingId(c.id), setEditText(c.text)}}>Edit</button>
              {/* <button  className="text-red-500">Delete</button> */}
            </div>
          </li>
        ))

        }
      </ul>
    </div>
  )
}