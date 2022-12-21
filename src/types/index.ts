export type Range = {
  from: string | number | null;
  to: string | number | null;
};

export interface IFilter {
  brands: string[] | null;
  destinations: string[] | null;
  sexs: string[] | null;
  populars: string[] | null;
  year: Range | null;
  count: Range | null;
}
