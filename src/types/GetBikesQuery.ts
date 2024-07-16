export type GetBikesQuery = {
  brand?: string;
  model?: string;
  lowDisplacement?: number;
  highDisplacement?: number;
  lowPrice?: number;
  highPrice?: number;
  page?: number;
  pageSize?: number;
};
