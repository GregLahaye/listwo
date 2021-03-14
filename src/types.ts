export interface IListMap {
  [key: string]: IList;
}

export interface IList {
  id: string | null;
  title: string;
}

export interface IItem {
  id: string | null;
  title: string;
  timestamp: number;
}
