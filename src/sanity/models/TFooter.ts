export type TFooter = {
  documents: Array<{
    _key?: string;
    asset: {
      _ref: string;
      _type: "reference";
    };
    title?: string;
    _type: "file";
  }>;
  address: string[];
  links: Array<{
    _key?: string;
    title: string;
    url: string;
    _type: "object";
  }>;
};
