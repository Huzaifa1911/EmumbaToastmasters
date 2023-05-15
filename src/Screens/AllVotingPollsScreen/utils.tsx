export enum SheetTypes {
  POLL_TYPE_SHEET = 'POLL_TYPE_SHEET',
  CONTESTENTS_SHEET = 'CONTESTENTS_SHEET',
}

export type TSheetType = keyof typeof SheetTypes;
