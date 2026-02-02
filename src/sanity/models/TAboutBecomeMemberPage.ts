import { TypedObject } from "sanity";

export type TAboutPage = {
  _id: string;
  _type: "aboutPage";
  language: string;
  preamble?: string;
  sections?: Array<{
    _key: string;
    title: string;
    content?: TypedObject[];
  }>;
  boardTitle?: string;
  boardMembers?: Array<{
    _key: string;
    name: string;
    role?: string;
  }>;
};

export type TBecomeMemberPage = {
  _id: string;
  _type: "becomeMemberPage";
  language: string;
  preamble?: string;
  sections?: Array<{
    _key: string;
    title: string;
    content?: TypedObject[];
  }>;
  addressTitle?: string;
  address?: TypedObject[];
};
