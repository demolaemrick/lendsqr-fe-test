import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/Layout';
import { api, storage } from '../../services';
import type { User } from '../../data/users';
import {
  BackArrowIcon,
  UserAvatarIcon,
  StarFilledIcon,
  StarEmptyIcon,
} from '../../assets/icons';
import './UserDetails.scss';

type TabType =
  | 'general'
  | 'documents'
  | 'bankDetails'
  | 'loans'
  | 'savings'
  | 'appAndSystem';

const tabs: { id: TabType; label: string }[] = [
  { id: 'general', label: 'General Details' },
  { id: 'documents', label: 'Documents' },
  { id: 'bankDetails', label: 'Bank Details' },
  { id: 'loans', label: 'Loans' },
  { id: 'savings', label: 'Savings' },
  { id: 'appAndSystem', label: 'App and System' },
];

const UserDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fromCache, setFromCache] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      const cachedUser = storage.getUserDetails(id);
      if (cachedUser) {
        setUser(cachedUser);
        setFromCache(true);
        setLoading(false);
        return;
      }

      try {
        const fetchedUser = await api.getUserById(id);
        if (fetchedUser) {
          setUser(fetchedUser);
          storage.saveUserDetails(fetchedUser);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const renderStars = (tier: number) => {
    const stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        i <= tier ? <StarFilledIcon key={i} /> : <StarEmptyIcon key={i} />,
      );
    }
    return stars;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="user-details">
          <div
            className="user-details__back-link"
            onClick={() => navigate('/dashboard/users')}
          >
            <BackArrowIcon />
            <span>Back to Users</span>
          </div>
          <div className="user-details__loading">Loading user details...</div>
        </div>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <div className="user-details">
          <div
            className="user-details__back-link"
            onClick={() => navigate('/dashboard/users')}
          >
            <BackArrowIcon />
            <span>Back to Users</span>
          </div>
          <h1>User not found</h1>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="user-details">
        <div
          className="user-details__back-link"
          onClick={() => navigate('/dashboard/users')}
        >
          <BackArrowIcon />
          <span>Back to Users</span>
        </div>

        <div className="user-details__header">
          <h1 className="user-details__title">
            User Details
            {fromCache && (
              <span className="user-details__cache-badge">Cached</span>
            )}
          </h1>
          <div className="user-details__actions">
            <button className="user-details__action-btn user-details__action-btn--blacklist">
              Blacklist User
            </button>
            <button className="user-details__action-btn user-details__action-btn--activate">
              Activate User
            </button>
          </div>
        </div>

        <div className="user-details__card">
          <div className="user-details__profile">
            <div className="user-details__avatar">
              <UserAvatarIcon />
            </div>
            <div className="user-details__user-info">
              <div className="user-details__user-name">
                <h2>{user.fullName}</h2>
                <span>{user.userId}</span>
              </div>
              <div className="user-details__tier">
                <p>User's Tier</p>
                <div className="user-details__tier-stars">
                  {renderStars(user.userTier)}
                </div>
              </div>
              <div className="user-details__balance">
                <h3>{user.accountBalance}</h3>
                <span>
                  {user.accountNumber}/{user.bankName}
                </span>
              </div>
            </div>
          </div>

          <div className="user-details__tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`user-details__tab ${activeTab === tab.id ? 'user-details__tab--active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'general' && (
          <div className="user-details__content">
            <section className="user-details__section">
              <h3 className="user-details__section-title">
                Personal Information
              </h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__field-label">Full Name</div>
                  <div className="user-details__field-value">
                    {user.fullName}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Phone Number</div>
                  <div className="user-details__field-value">
                    {user.phoneNumber}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Email Address</div>
                  <div className="user-details__field-value">{user.email}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">BVN</div>
                  <div className="user-details__field-value">{user.bvn}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Gender</div>
                  <div className="user-details__field-value">{user.gender}</div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Marital Status
                  </div>
                  <div className="user-details__field-value">
                    {user.maritalStatus}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Children</div>
                  <div className="user-details__field-value">
                    {user.children}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Type of Residence
                  </div>
                  <div className="user-details__field-value">
                    {user.typeOfResidence}
                  </div>
                </div>
              </div>
            </section>

            <section className="user-details__section">
              <h3 className="user-details__section-title">
                Education and Employment
              </h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Level of Education
                  </div>
                  <div className="user-details__field-value">
                    {user.levelOfEducation}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Employment Status
                  </div>
                  <div className="user-details__field-value">
                    {user.employmentStatus}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Sector of Employment
                  </div>
                  <div className="user-details__field-value">
                    {user.sectorOfEmployment}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Duration of Employment
                  </div>
                  <div className="user-details__field-value">
                    {user.durationOfEmployment}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Office Email</div>
                  <div className="user-details__field-value">
                    {user.officeEmail}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Monthly Income
                  </div>
                  <div className="user-details__field-value">
                    {user.monthlyIncome}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">
                    Loan Repayment
                  </div>
                  <div className="user-details__field-value">
                    {user.loanRepayment}
                  </div>
                </div>
              </div>
            </section>

            <section className="user-details__section">
              <h3 className="user-details__section-title">Socials</h3>
              <div className="user-details__grid">
                <div className="user-details__field">
                  <div className="user-details__field-label">Twitter</div>
                  <div className="user-details__field-value">
                    {user.twitter}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Facebook</div>
                  <div className="user-details__field-value">
                    {user.facebook}
                  </div>
                </div>
                <div className="user-details__field">
                  <div className="user-details__field-label">Instagram</div>
                  <div className="user-details__field-value">
                    {user.instagram}
                  </div>
                </div>
              </div>
            </section>

            <section className="user-details__section">
              <h3 className="user-details__section-title">Guarantor</h3>
              {user.guarantors.map((guarantor, index) => (
                <div key={index} className="user-details__guarantor">
                  <div className="user-details__grid">
                    <div className="user-details__field">
                      <div className="user-details__field-label">Full Name</div>
                      <div className="user-details__field-value">
                        {guarantor.fullName}
                      </div>
                    </div>
                    <div className="user-details__field">
                      <div className="user-details__field-label">
                        Phone Number
                      </div>
                      <div className="user-details__field-value">
                        {guarantor.phoneNumber}
                      </div>
                    </div>
                    <div className="user-details__field">
                      <div className="user-details__field-label">
                        Email Address
                      </div>
                      <div className="user-details__field-value">
                        {guarantor.emailAddress}
                      </div>
                    </div>
                    <div className="user-details__field">
                      <div className="user-details__field-label">
                        Relationship
                      </div>
                      <div className="user-details__field-value">
                        {guarantor.relationship}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab !== 'general' && (
          <div className="user-details__content">
            <p>Content for {tabs.find((t) => t.id === activeTab)?.label} tab</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserDetails;
