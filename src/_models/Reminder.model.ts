export interface Reminder {
  id?: number;
  msg: string;
  start_date: Date;
  interval: number;
  period: string;
  snoozed: boolean;
  current: Date;
  contact_id: number;
  created_at: Date;
  updated_at: Date;
  recurring: boolean;
  end_date: Date;
  priority: number;
  match?: boolean;
  notified?: boolean;
}
