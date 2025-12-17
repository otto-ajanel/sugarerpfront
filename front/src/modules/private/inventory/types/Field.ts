export type Field = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'selection' | 'selectionadd' | 'boolean';
  placeholder?: string;
  options?: { label: string; value: any }[];
  style?: string;
  total?: boolean;
  functionAdd?: () => void;
};
