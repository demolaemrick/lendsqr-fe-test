import './StatCard.scss';
import { formatNumber } from '../../utils';

export type StatCardColor = 'pink' | 'purple' | 'orange' | 'red';

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: StatCardColor;
}

const StatCard = ({ icon, label, value, color }: StatCardProps) => {
  return (
    <div className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${color}`}>{icon}</div>
      <div className="stat-card__label">{label}</div>
      <div className="stat-card__value">{formatNumber(value)}</div>
    </div>
  );
};

export default StatCard;
