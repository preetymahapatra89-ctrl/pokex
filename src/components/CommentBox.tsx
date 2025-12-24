import { useState, useEffect } from "react";
import type { Comment } from "../types/comments";
import ConfirmModal from "./ui/ConfirmModal";
import { ENV } from "../config/env";
const COMMENT_STORAGE_KEY = ENV.COMMENT_STORAGE_KEY;

export default function CommentSection() {
  const [input, setInput] = useState("");
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : [];
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");
  const [idRef] = useState(() => Date.now());
  const [showConfirm, setShowConfirm] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem(COMMENT_STORAGE_KEY, JSON.stringify(comments));
  }, [comments]);

  const handleCommentAdd = () => {
    if (!input.trim()) return;
    const newComments = {
      id: idRef,
      text: input,
      createdAt: new Date().toLocaleString(),
      likes: 0,
      replies: [],
    };
    setComments([...comments, newComments]);
    setInput("");
  };

  const handleCommentEdit = (commentId: number, text: string) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: text } : comment
    );
    setComments(updatedComments);
    setEditingId(null);
    setEditText("");
    //setText(text);
  };
  const handleCommentLike = (id: number) => {
    setComments((comment) =>
      comment.map((c) => (c.id === id ? { ...c, likes: c.likes + 1 } : c))
    );
  };

  const handleReplyComment = (id: number) => {
    if (!replyText.trim()) return;
    const newReply = {
      id: idRef,
      text: replyText,
      createdAt: new Date().toLocaleString(),
    };

    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, replies: [...(comment.replies || []), newReply] }
          : comment
      )
    );

    setReplyText("");
    setReplyingTo(null);
  };

  const handleCommentDelete = (id: number) => {
    setCommentToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (commentToDelete === null) return;

    setComments((prev) =>
      prev.filter((comment) => comment.id !== commentToDelete)
    );

    setShowConfirm(false);
    setCommentToDelete(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setCommentToDelete(null);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        💬 Interactive Comment Section
      </h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Write your comment here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />{" "}
        &nbsp; &nbsp;
        <button
          className="bg-blue-600 text-white px-4 rounded-lg"
          onClick={handleCommentAdd}
        >
          Add Comment
        </button>{" "}
        &nbsp; &nbsp;
        <button
          className="bg-blue-600 text-white px-3 rounded-lg"
          onClick={() => {
            setInput("");
          }}
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
          <li key={c.id} className="border p-3 rounded-lg">
            {/* <p className="font-semibold">{c.author}</p> */}
            {editingId === c.id ? (
              <div className="search-box">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />{" "}
                &nbsp;&nbsp;
                <button
                  className="bg-blue-600 text-white px-3 rounded-lg"
                  onClick={() => {
                    handleCommentEdit(c.id, editText);
                  }}
                >
                  Save
                </button>{" "}
                &nbsp; &nbsp;
                <button
                  className="bg-blue-600 text-white px-3 rounded-lg"
                  onClick={() => {
                    setEditingId(null);
                    setEditText(c.text); // load original text
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <p>
                {c.text} &nbsp;
                <span className="text-xs text-gray-500">{c.createdAt}</span>
              </p>
            )}
            {replyingTo === c.id && (
              <div className="search-box">
                <input
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                />
                &nbsp;
                <button
                  className="bg-blue-600 text-white px-3 rounded-lg"
                  onClick={() => handleReplyComment(c.id)}
                >
                  Post
                </button>
                &nbsp;
                <button
                  className="bg-blue-600 text-white px-3 rounded-lg"
                  onClick={() => setReplyingTo(null)}
                >
                  Cancel
                </button>
              </div>
            )}
            {/*  <span className="text-xs text-gray-500">
              {c.createdAt}
            </span> */}
            <div className="gap-3 text-sm mt-2 text-gray-600">
              <button
                className="bg-blue-600 text-white px-3 rounded-lg"
                onClick={() => {
                  handleCommentLike(c.id);
                }}
              >
                👍 {c.likes}
              </button>{" "}
              &nbsp;
              <button
                className="bg-blue-600 text-white px-3 rounded-lg"
                onClick={() => {
                  setReplyingTo(c.id);
                }}
              >
                Reply
              </button>{" "}
              &nbsp;
              <button
                className="bg-blue-600 text-white px-3 rounded-lg"
                onClick={() => {
                  setEditingId(c.id);
                  setEditText(c.text);
                }}
              >
                Edit
              </button>{" "}
              &nbsp;
              <button
                className="bg-blue-600 text-white px-3 rounded-lg"
                onClick={() => {
                  handleCommentDelete(c.id);
                }}
              >
                Delete
              </button>
            </div>
            {(c.replies ?? []).length > 0 && (
              <ul className="ml-6 mt-3 space-y-2">
                {c.replies.map((r) => (
                  <li key={r.id} className="text-right pl-3">
                    <p>
                      {r.text} &nbsp;
                      <span className="text-xs text-gray-500">
                        {r.createdAt}
                      </span>
                    </p>
                    {/* <span className="text-xs text-gray-500">
                      {r.createdAt}
                    </span> */}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>

      {/* Modal For Delete Confirmation */}
      <ConfirmModal
        open={showConfirm}
        title="Delete comment?"
        message="Are you sure you want to delete this comment?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
