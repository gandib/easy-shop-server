export type TImageFiles = { [fieldname: string]: Express.Multer.File[] };

export type TProductFilterRequest = {
  name?: string | undefined;
  price?: string | undefined;
  category?: string | undefined;
  searchTerm?: string | undefined;
  description?: string | undefined;
  shop?: string | undefined;
  flash?: string | undefined;
};
