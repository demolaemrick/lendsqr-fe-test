import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import StatCard from '../../components/StatCard';
import { DataTable, Pagination } from '../../components/DataTable';
import { api } from '../../services';
import type { User } from '../../data/users';
import type { UserStats } from '../../services/api';
import {
  UsersIcon,
  ActiveUsersIcon,
  UsersWithLoansIcon,
  UsersWithSavingsIcon,
} from '../../assets/icons';
import './Users.scss';

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [usersResponse, statsResponse] = await Promise.all([
          api.getAllUsers(),
          api.getStats(),
        ]);
        setUsers(usersResponse);
        setTotalItems(usersResponse.length);
        setStats(statsResponse);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(totalItems / pageSize) || 1;

  // Get paginated data for display
  const paginatedUsers = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleViewDetails = (user: { id: string }) => {
    navigate(`/dashboard/users/${user.id}`);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="users-page">
          <h1 className="users-page__title">Users</h1>
          <div className="users-page__loading">Loading users...</div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="users-page">
        <h1 className="users-page__title">Users</h1>

        <div className="users-page__stats">
          <StatCard
            icon={<UsersIcon />}
            label="Users"
            value={stats?.users || 0}
            color="pink"
          />
          <StatCard
            icon={<ActiveUsersIcon />}
            label="Active Users"
            value={stats?.activeUsers || 0}
            color="purple"
          />
          <StatCard
            icon={<UsersWithLoansIcon />}
            label="Users with Loans"
            value={stats?.usersWithLoans || 0}
            color="orange"
          />
          <StatCard
            icon={<UsersWithSavingsIcon />}
            label="Users with Savings"
            value={stats?.usersWithSavings || 0}
            color="red"
          />
        </div>

        <div className="users-page__table-container">
          <DataTable
            data={paginatedUsers}
            onViewDetails={handleViewDetails}
            onBlacklist={(user) => console.log('Blacklist:', user)}
            onActivate={(user) => console.log('Activate:', user)}
          />
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </div>
    </DashboardLayout>
  );
};

export default Users;
