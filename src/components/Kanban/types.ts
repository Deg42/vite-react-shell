export interface Task {
  _id?: string;
  title: string;
  checks: CheckItem[];
  status: number;
}

export interface CheckItem {
  _id?: string;
  label: string;
  done: boolean;
}

export interface Column {
  id: number;
  title: string;
}