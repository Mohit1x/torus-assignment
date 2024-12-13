import { useSelector } from "react-redux";
import Header from "../components/Header";

import { RootState, useAppDispatch } from "../redux/store";
import { useEffect } from "react";
import { fetchAnalyticsData } from "../redux/analyticsSlice";
import UserRegistrationsChart from "../components/analytics charts/UserRegistrationsChart";
import UserStatusPieChart from "../components/analytics charts/UserStatusPieChart";
import UserRegionChart from "../components/analytics charts/UserRegionChart";

const AnalyticsPage = () => {
  const dispatch = useAppDispatch();

  const { analyticsData, isLoading, error } = useSelector(
    (state: RootState) => state.analytics
  );
  const userStatus = useSelector(
    (state: RootState) => state.filtered.userStatus
  );

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  const registrationData = analyticsData?.userRegistrationTrend || [];
  const regionData = analyticsData?.usersByRegion || {};

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-full max-w-6xl">
          <UserRegistrationsChart data={registrationData} />
        </div>
        <div className="w-full max-w-6xl mt-10">
          <UserRegionChart data={regionData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
