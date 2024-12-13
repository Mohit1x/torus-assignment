export type User = {
  id: number;
  name: string;
  email: string;
  status: string;
  region: string;
  created_at: string;
};

export type analyticsData = {
  overviewCardData: {
    total_users: number;
    active_users: number;
    deleted_users: number;
  };
  userRegistrationTrend: {
    month: string;
    users_registered: number;
  }[];
  activeInavtiveUsers: {
    active_users: number;
    inactive_users: number;
  };
  usersByRegion: Record<string, number>;
  regions: string[];
};
