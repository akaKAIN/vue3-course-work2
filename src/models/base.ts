interface TextObject {
  text: string;
}

interface TitleObject {
  title: string;
}

interface AvatarObject {
  avatar: string;
}

export interface ResumeForm extends TitleObject, AvatarObject, TextObject {
  subtitle: string;
}

export type Title = keyof ResumeForm;

export interface InputObject extends TextObject {
  title: Title;
}

export interface Resume extends TitleObject, AvatarObject {
  options: ResumeOptionItem[];
}

export interface ResumeOptionItem extends TitleObject, TextObject {}

export interface UrlData {
  urlComments: string;
  urlDB: string;
  nameDB: string;
  format: string;
}
export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}
