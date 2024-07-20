export type GetBikesQuery = {
  brand?: string;
  model?: string;
  minDisplacement?: number;
  maxDisplacement?: number;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
};
