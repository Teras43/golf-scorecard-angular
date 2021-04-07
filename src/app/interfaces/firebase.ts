export interface FirebaseApi {
  items: FirebaseIssue[];
  total_count: number;
}

export interface FirebaseIssue {
  created_at: string;
  number: string;
  title: string;
}