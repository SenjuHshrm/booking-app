export interface IReport {
  reporter: string;
  reported: string;
  msg: string;
  action: 'no-action' | 'warning' | 'suspend' | 'terminate';
}
