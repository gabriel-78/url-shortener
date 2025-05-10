export type Link = {
  id: string;
  originalUrl: string;
  shortenerlUrl: string;
  accessQuantity: number;
};

export type CreateLink = {
  originalUrl: string;
  shortenerUrl: string;
};
