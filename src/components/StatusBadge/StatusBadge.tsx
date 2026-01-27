import './StatusBadge.scss';

export type StatusType = 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';

interface StatusBadgeProps {
  status: StatusType;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClass = status.toLowerCase();

  return (
    <span className={`status-badge status-badge--${statusClass}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
