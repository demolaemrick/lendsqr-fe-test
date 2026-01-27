import { useState, useRef, useEffect } from 'react';
import StatusBadge from '../StatusBadge';
import type { StatusType } from '../StatusBadge';
import {
  FilterIcon,
  MoreIcon,
  ViewIcon,
  BlacklistIcon,
  ActivateIcon,
} from '../../assets/icons';
import './DataTable.scss';

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: StatusType;
}

interface DataTableProps {
  data: User[];
  onViewDetails?: (user: User) => void;
  onBlacklist?: (user: User) => void;
  onActivate?: (user: User) => void;
}

const columns = [
  { key: 'organization', label: 'Organization' },
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'phoneNumber', label: 'Phone Number' },
  { key: 'dateJoined', label: 'Date Joined' },
  { key: 'status', label: 'Status' },
];

const DataTable = ({
  data,
  onViewDetails,
  onBlacklist,
  onActivate,
}: DataTableProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuToggle = (userId: string) => {
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const handleFilterToggle = (columnKey: string) => {
    setActiveFilter(activeFilter === columnKey ? null : columnKey);
  };

  return (
    <div className="data-table">
      <div className="data-table__wrapper">
        <table className="data-table__table">
          <thead className="data-table__header">
            <tr>
              {columns.map((column) => (
                <th key={column.key}>
                  <div
                    className="data-table__header-cell"
                    onClick={() => handleFilterToggle(column.key)}
                  >
                    <span>{column.label}</span>
                    <span className="data-table__filter-icon">
                      <FilterIcon />
                    </span>
                    {activeFilter === column.key && (
                      <div
                        className="filter-dropdown"
                        ref={filterRef}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="filter-dropdown__field">
                          <label className="filter-dropdown__label">
                            Organization
                          </label>
                          <select className="filter-dropdown__select">
                            <option value="">Select</option>
                            <option value="lendsqr">Lendsqr</option>
                            <option value="irorun">Irorun</option>
                            <option value="lendstar">Lendstar</option>
                          </select>
                        </div>
                        <div className="filter-dropdown__field">
                          <label className="filter-dropdown__label">
                            Username
                          </label>
                          <input
                            type="text"
                            className="filter-dropdown__input"
                            placeholder="User"
                          />
                        </div>
                        <div className="filter-dropdown__field">
                          <label className="filter-dropdown__label">
                            Email
                          </label>
                          <input
                            type="email"
                            className="filter-dropdown__input"
                            placeholder="Email"
                          />
                        </div>
                        <div className="filter-dropdown__field">
                          <label className="filter-dropdown__label">Date</label>
                          <input
                            type="date"
                            className="filter-dropdown__input"
                          />
                        </div>
                        <div className="filter-dropdown__field">
                          <label className="filter-dropdown__label">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            className="filter-dropdown__input"
                            placeholder="Phone Number"
                          />
                        </div>
                        <div className="filter-dropdown__field">
                          <label className="filter-dropdown__label">
                            Status
                          </label>
                          <select className="filter-dropdown__select">
                            <option value="">Select</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                            <option value="blacklisted">Blacklisted</option>
                          </select>
                        </div>
                        <div className="filter-dropdown__actions">
                          <button
                            className="filter-dropdown__button filter-dropdown__button--reset"
                            onClick={() => setActiveFilter(null)}
                          >
                            Reset
                          </button>
                          <button
                            className="filter-dropdown__button filter-dropdown__button--filter"
                            onClick={() => setActiveFilter(null)}
                          >
                            Filter
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className="data-table__body">
            {data.map((user) => (
              <tr key={user.id}>
                <td>{user.organization}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.dateJoined}</td>
                <td>
                  <StatusBadge status={user.status} />
                </td>
                <td className="data-table__actions">
                  <button
                    className="data-table__actions-button"
                    onClick={() => handleMenuToggle(user.id)}
                  >
                    <MoreIcon />
                  </button>
                  {activeMenu === user.id && (
                    <div className="data-table__actions-menu" ref={menuRef}>
                      <div
                        className="data-table__actions-menu-item"
                        onClick={() => {
                          onViewDetails?.(user);
                          setActiveMenu(null);
                        }}
                      >
                        <ViewIcon />
                        <span>View Details</span>
                      </div>
                      <div
                        className="data-table__actions-menu-item"
                        onClick={() => {
                          onBlacklist?.(user);
                          setActiveMenu(null);
                        }}
                      >
                        <BlacklistIcon />
                        <span>Blacklist User</span>
                      </div>
                      <div
                        className="data-table__actions-menu-item"
                        onClick={() => {
                          onActivate?.(user);
                          setActiveMenu(null);
                        }}
                      >
                        <ActivateIcon />
                        <span>Activate User</span>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
