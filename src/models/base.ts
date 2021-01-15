export interface ResumeForm {
  title: string;
  subtitle: string;
  avatar: string;
  text: string;
}

export type Title = keyof ResumeForm;

export interface InputObject {
  title: Title;
  text: string;
}
