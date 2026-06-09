import { DashboardCategoryChart } from "./dashboard-category-chart";
import { DashboardHeader } from "./dashboard-header";
import { DashboardRecentOrders } from "./dashboard-recent-orders";
import { DashboardSalesOverview } from "./dashboard-sales-overview";
import { DashboardStatsGrid } from "./dashboard-stats-grid";
import { DashboardTopProducts } from "./dashboard-top-products";

function Dashboard() {
  return (
    <div className="space-y-4 md:space-y-6 xl:space-y-7">
      <DashboardHeader />
      <DashboardStatsGrid />

      <div className="grid gap-4 md:gap-6 2xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.85fr)]">
        <div className="min-w-0">
          <DashboardSalesOverview />
        </div>
        <div className="min-w-0">
          <DashboardCategoryChart />
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 2xl:grid-cols-2">
        <div className="min-w-0">
          <DashboardRecentOrders />
        </div>
        <div className="min-w-0">
          <DashboardTopProducts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
