import './Sidebar.scss';
import {
  BriefcaseIcon,
  HomeIcon,
  SidebarUsersIcon,
  GuarantorsIcon,
  LoansIcon,
  DecisionIcon,
  SavingsIcon,
  RequestsIcon,
  WhitelistIcon,
  KarmaIcon,
  OrgIcon,
  LoanProductsIcon,
  SavingsProductsIcon,
  FeesIcon,
  TransactionsIcon,
  ServicesIcon,
  ServiceAccountIcon,
  SettlementsIcon,
  ReportsIcon,
  PreferencesIcon,
  PricingIcon,
  AuditIcon,
  ChevronDownIcon,
} from '../../assets/icons';

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

interface MenuGroup {
  title: string;
  items: MenuItem[];
}

const menuGroups: MenuGroup[] = [
  {
    title: 'CUSTOMERS',
    items: [
      { icon: <SidebarUsersIcon />, label: 'Users', active: true },
      { icon: <GuarantorsIcon />, label: 'Guarantors' },
      { icon: <LoansIcon />, label: 'Loans' },
      { icon: <DecisionIcon />, label: 'Decision Models' },
      { icon: <SavingsIcon />, label: 'Savings' },
      { icon: <RequestsIcon />, label: 'Loan Requests' },
      { icon: <WhitelistIcon />, label: 'Whitelist' },
      { icon: <KarmaIcon />, label: 'Karma' },
    ],
  },
  {
    title: 'BUSINESSES',
    items: [
      { icon: <OrgIcon />, label: 'Organization' },
      { icon: <LoanProductsIcon />, label: 'Loan Products' },
      { icon: <SavingsProductsIcon />, label: 'Savings Products' },
      { icon: <FeesIcon />, label: 'Fees and Charges' },
      { icon: <TransactionsIcon />, label: 'Transactions' },
      { icon: <ServicesIcon />, label: 'Services' },
      { icon: <ServiceAccountIcon />, label: 'Service Account' },
      { icon: <SettlementsIcon />, label: 'Settlements' },
      { icon: <ReportsIcon />, label: 'Reports' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { icon: <PreferencesIcon />, label: 'Preferences' },
      { icon: <PricingIcon />, label: 'Fees and Pricing' },
      { icon: <AuditIcon />, label: 'Audit Logs' },
    ],
  },
];

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="sidebar__org-switch">
        <BriefcaseIcon />
        <span className="sidebar__org-switch-text">Switch Organization</span>
        <span className="sidebar__org-switch-arrow">
          <ChevronDownIcon />
        </span>
      </div>

      <div className="sidebar__dashboard">
        <HomeIcon />
        <span>Dashboard</span>
      </div>

      {menuGroups.map((group, groupIndex) => (
        <div key={groupIndex} className="sidebar__group">
          <div className="sidebar__group-title">{group.title}</div>
          {group.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className={`sidebar__menu-item ${item.active ? 'sidebar__menu-item--active' : ''}`}
            >
              {item.icon}
              <span className="sidebar__menu-item-text">{item.label}</span>
            </div>
          ))}
        </div>
      ))}
    </nav>
  );
};

export default Sidebar;
