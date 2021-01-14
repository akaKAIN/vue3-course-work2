export type Titles = keyof ResumeForm;

export interface ResumeForm extends ResumeOption {
  title: string;
  avatar: string;
}

export interface ResumeOption {
  subtitle: string;
  text: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
