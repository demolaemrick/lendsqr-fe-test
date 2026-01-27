import { faker } from '@faker-js/faker';
import type { User, Guarantor } from '../data/users';

// Generate consistent mock data
faker.seed(12345);

const statuses: User['status'][] = [
  'Active',
  'Inactive',
  'Pending',
  'Blacklisted',
];
const organizations = [
  'Lendsqr',
  'Irorun',
  'Lendstar',
  'Kredi',
  'Paystack',
  'Flutterwave',
];
const genders = ['Male', 'Female'];
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
const residenceTypes = [
  "Parent's Apartment",
  'Rented Apartment',
  'Owner',
  'Shared',
];
const educationLevels = ['High School', 'B.Sc', 'M.Sc', 'Ph.D', 'HND', 'OND'];
const employmentStatuses = [
  'Employed',
  'Self-employed',
  'Unemployed',
  'Student',
];
const sectors = [
  'FinTech',
  'Banking',
  'Technology',
  'Healthcare',
  'Education',
  'Retail',
];

// Generate a single guarantor
const generateGuarantor = (): Guarantor => ({
  fullName: faker.person.fullName(),
  phoneNumber: faker.phone.number({ style: 'national' }),
  emailAddress: faker.internet.email().toLowerCase(),
  relationship: faker.helpers.arrayElement([
    'Brother',
    'Sister',
    'Friend',
    'Colleague',
    'Parent',
  ]),
});

// Generate a single user
const generateUser = (id: number): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = `${firstName} ${lastName}`;
  const organization = faker.helpers.arrayElement(organizations);

  return {
    id: String(id),
    organization,
    username: faker.internet.username({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phoneNumber: faker.phone.number({ style: 'national' }),
    dateJoined: faker.date.past({ years: 3 }).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    status: faker.helpers.arrayElement(statuses),
    userId: `LSQFf${faker.string.alphanumeric(6)}`,
    fullName,
    userTier: faker.number.int({ min: 1, max: 3 }),
    accountBalance: `₦${faker.number.int({ min: 50000, max: 500000 }).toLocaleString()}.00`,
    accountNumber: faker.string.numeric(10),
    bankName: faker.helpers.arrayElement([
      'Providus Bank',
      'GTBank',
      'Access Bank',
      'First Bank',
      'UBA',
      'Zenith Bank',
    ]),
    bvn: faker.string.numeric(11),
    gender: faker.helpers.arrayElement(genders),
    maritalStatus: faker.helpers.arrayElement(maritalStatuses),
    children: faker.helpers.arrayElement(['None', '1', '2', '3', '4+']),
    typeOfResidence: faker.helpers.arrayElement(residenceTypes),
    levelOfEducation: faker.helpers.arrayElement(educationLevels),
    employmentStatus: faker.helpers.arrayElement(employmentStatuses),
    sectorOfEmployment: faker.helpers.arrayElement(sectors),
    durationOfEmployment: `${faker.number.int({ min: 1, max: 10 })} years`,
    officeEmail: faker.internet
      .email({
        firstName,
        lastName,
        provider: organization.toLowerCase() + '.com',
      })
      .toLowerCase(),
    monthlyIncome: `₦${faker.number.int({ min: 100, max: 500 }) * 1000}.00 - ₦${faker.number.int({ min: 500, max: 1000 }) * 1000}.00`,
    loanRepayment: faker.number
      .int({ min: 10000, max: 200000 })
      .toLocaleString(),
    twitter: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    facebook: fullName,
    instagram: `@${firstName.toLowerCase()}_${lastName.toLowerCase()}`,
    guarantors: [generateGuarantor(), generateGuarantor()],
  };
};

// Generate all 500 users (cached)
let cachedUsers: User[] | null = null;

const generateAllUsers = (): User[] => {
  if (cachedUsers) return cachedUsers;

  faker.seed(12345); // Reset seed for consistent data
  cachedUsers = Array.from({ length: 500 }, (_, i) => generateUser(i + 1));
  return cachedUsers;
};

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface UserStats {
  users: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

// Mock API functions
export const api = {
  async getUsers(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<PaginatedResponse<User>> {
    await delay(300);

    const allUsers = generateAllUsers();
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedUsers = allUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total: allUsers.length,
      page,
      pageSize,
      totalPages: Math.ceil(allUsers.length / pageSize),
    };
  },

  async getAllUsers(): Promise<User[]> {
    await delay(500);
    return generateAllUsers();
  },

  async getUserById(id: string): Promise<User | null> {
    await delay(200);

    const allUsers = generateAllUsers();
    return allUsers.find((user) => user.id === id) || null;
  },

  async getStats(): Promise<UserStats> {
    await delay(100);

    const allUsers = generateAllUsers();
    const activeUsers = allUsers.filter((u) => u.status === 'Active').length;

    return {
      users: allUsers.length,
      activeUsers,
      usersWithLoans: Math.floor(allUsers.length * 0.6), 
      usersWithSavings: Math.floor(allUsers.length * 0.8), 
    };
  },
};

export default api;
