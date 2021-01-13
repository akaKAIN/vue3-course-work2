export type Titles = keyof Form;

export interface Form {
  title: string;
  avatar: string;
  text: string;
  subtitle: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
