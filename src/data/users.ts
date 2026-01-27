import type { StatusType } from '../components/StatusBadge';

export interface Guarantor {
  fullName: string;
  phoneNumber: string;
  emailAddress: string;
  relationship: string;
}

export interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: StatusType;
  // Profile
  userId: string;
  fullName: string;
  userTier: number;
  accountBalance: string;
  accountNumber: string;
  bankName: string;
  // Personal Information
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
  // Education and Employment
  levelOfEducation: string;
  employmentStatus: string;
  sectorOfEmployment: string;
  durationOfEmployment: string;
  officeEmail: string;
  monthlyIncome: string;
  loanRepayment: string;
  // Socials
  twitter: string;
  facebook: string;
  instagram: string;
  // Guarantors
  guarantors: Guarantor[];
}

export const mockUsers: User[] = [
  {
    id: '1',
    organization: 'Lendsqr',
    username: 'Adedeji',
    email: 'adedeji@lendsqr.com',
    phoneNumber: '08078903721',
    dateJoined: 'May 15, 2020 10:00 AM',
    status: 'Inactive',
    userId: 'LSQFf587g90',
    fullName: 'Grace Effiom',
    userTier: 1,
    accountBalance: '₦200,000.00',
    accountNumber: '9912345678',
    bankName: 'Providus Bank',
    bvn: '07060780922',
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: "Parent's Apartment",
    levelOfEducation: 'B.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'FinTech',
    durationOfEmployment: '2 years',
    officeEmail: 'grace@lendsqr.com',
    monthlyIncome: '₦200,000.00 - ₦400,000.00',
    loanRepayment: '40,000',
    twitter: '@grace_effiom',
    facebook: 'Grace Effiom',
    instagram: '@grace_effiom',
    guarantors: [
      {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        emailAddress: 'debby@gmail.com',
        relationship: 'Sister',
      },
      {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        emailAddress: 'debby@gmail.com',
        relationship: 'Sister',
      },
    ],
  },
  {
    id: '2',
    organization: 'Irorun',
    username: 'Debby Ogana',
    email: 'debby2@irorun.com',
    phoneNumber: '08160780928',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Pending',
    userId: 'LSQFf587g91',
    fullName: 'Debby Ogana',
    userTier: 2,
    accountBalance: '₦150,000.00',
    accountNumber: '1234567890',
    bankName: 'GTBank',
    bvn: '08160780928',
    gender: 'Female',
    maritalStatus: 'Married',
    children: '2',
    typeOfResidence: 'Rented Apartment',
    levelOfEducation: 'M.Sc',
    employmentStatus: 'Employed',
    sectorOfEmployment: 'Banking',
    durationOfEmployment: '5 years',
    officeEmail: 'debby@irorun.com',
    monthlyIncome: '₦400,000.00 - ₦600,000.00',
    loanRepayment: '80,000',
    twitter: '@debby_ogana',
    facebook: 'Debby Ogana',
    instagram: '@debby_ogana',
    guarantors: [
      {
        fullName: 'Grace Effiom',
        phoneNumber: '07060780922',
        emailAddress: 'grace@gmail.com',
        relationship: 'Friend',
      },
    ],
  },
  {
    id: '3',
    organization: 'Lendstar',
    username: 'Grace Effiom',
    email: 'grace@lendstar.com',
    phoneNumber: '07060780922',
    dateJoined: 'Apr 30, 2020 10:00 AM',
    status: 'Blacklisted',
    userId: 'LSQFf587g92',
    fullName: 'Grace Effiom',
    userTier: 3,
    accountBalance: '₦500,000.00',
    accountNumber: '5678901234',
    bankName: 'Access Bank',
    bvn: '07060780922',
    gender: 'Female',
    maritalStatus: 'Single',
    children: 'None',
    typeOfResidence: 'Owner',
    levelOfEducation: 'Ph.D',
    employmentStatus: 'Self-employed',
    sectorOfEmployment: 'Technology',
    durationOfEmployment: '10 years',
    officeEmail: 'grace@lendstar.com',
    monthlyIncome: '₦800,000.00 - ₦1,000,000.00',
    loanRepayment: '150,000',
    twitter: '@grace_lendstar',
    facebook: 'Grace Lendstar',
    instagram: '@grace_lendstar',
    guarantors: [
      {
        fullName: 'Tosin Dokunmu',
        phoneNumber: '07003309226',
        emailAddress: 'tosin@gmail.com',
        relationship: 'Brother',
      },
    ],
  },
];

export const userStats = {
  users: 2453,
  activeUsers: 2453,
  usersWithLoans: 12453,
  usersWithSavings: 102453,
};

export const getUserDetailsById = (id: string): User | undefined => {
  return mockUsers.find((user) => user.id === id);
};
