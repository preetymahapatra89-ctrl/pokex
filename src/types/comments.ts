export interface Reply {
  id: number;
  text: string;
  createdAt: string;
}
export interface Comment {
  id: number;
  text: string;
  // author: string;
  createdAt: string;
  likes: number;
  replies: Reply[];
}
