export interface File {
  id: string,
  name: string,
  status: string,
}

export interface ListProps {
  files: Array<File>,
  onCancel: (arg: string) => void,
  onTryAgain: (arg: string) => void,
  accept: Array<string>,
}

export interface ItemProps {
  name: string,
  status: string,
  onCancel: () => void,
  onTryAgain: () => void,
  accept: Array<string>,
}
