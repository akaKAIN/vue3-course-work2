import { Resume, UrlData } from "@/models/base";
import axios, { AxiosResponse } from "axios";

export default class ApiService {
  static readonly urls: UrlData = {
    urlComments: "https://jsonplaceholder.typicode.com/comments?_limit=42",
    urlDB: "https://vue3-work-with-db-default-rtdb.firebaseio.com/",
    nameDB: "resume",
    format: "json"
  };

  private static get _resumeUrl(): string {
    return `${ApiService.urls.urlDB}${ApiService.urls.nameDB}.${ApiService.urls.format}`;
  }

  private static get _commentUrl(): string {
    return ApiService.urls.urlComments;
  }

  static getComments(): Promise<AxiosResponse> {
    return axios.get(ApiService._commentUrl);
  }

  static patchResume(form: Resume): Promise<AxiosResponse> {
    return axios.patch(ApiService._resumeUrl, form);
  }

  static getResume(): Promise<AxiosResponse> {
    return axios.get(ApiService._resumeUrl);
  }
}
