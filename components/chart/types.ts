export type Datum = {
  timestamp: Date;
  value: number;
};

export type Dataset = {
  id: string | number;
  label: string;
  data: Datum[];
  color: string;
};