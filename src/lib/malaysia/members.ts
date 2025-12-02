// Static mocked member data for Malaysia Snapchat-style map
export type MalaysiaMember = {
  id: string;
  name: string;
  avatarUrl: string;
  x: number; // Normalized coordinate 0-1 (relative to SVG width)
  y: number; // Normalized coordinate 0-1 (relative to SVG height)
  region?: string;
  bio?: string;
  level?: number;
  role?: string;
  joinedDate?: string;
  stats?: {
    posts?: number;
    comments?: number;
    likes?: number;
  };
};

// Generate avatar URL using ui-avatars.com
function getAvatarUrl(name: string, size: number = 128): string {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&size=${size}&background=random&color=fff&bold=true`;
}

export const MALAYSIA_MEMBERS: MalaysiaMember[] = [
  // Kuala Lumpur area (5 members) - clustered around center of Peninsular Malaysia
  {
    id: 'kl-1',
    name: 'Alex Tan',
    avatarUrl: getAvatarUrl('Alex Tan'),
    x: 0.18, // Approximate KL area in normalized coordinates
    y: 0.45,
    region: 'Kuala Lumpur',
    bio: 'Full-stack developer passionate about building innovative web applications.',
    level: 42,
    role: 'Senior Developer',
    joinedDate: '2023-01-15',
    stats: { posts: 156, comments: 342, likes: 1289 },
  },
  {
    id: 'kl-2',
    name: 'Sarah Lim',
    avatarUrl: getAvatarUrl('Sarah Lim'),
    x: 0.20,
    y: 0.47,
    region: 'Kuala Lumpur',
    bio: 'UI/UX designer creating beautiful and functional digital experiences.',
    level: 38,
    role: 'Design Lead',
    joinedDate: '2023-03-22',
    stats: { posts: 89, comments: 201, likes: 856 },
  },
  {
    id: 'kl-3',
    name: 'David Chen',
    avatarUrl: getAvatarUrl('David Chen'),
    x: 0.19,
    y: 0.49,
    region: 'Kuala Lumpur',
    bio: 'Tech enthusiast and startup founder. Always learning something new.',
    level: 55,
    role: 'Founder',
    joinedDate: '2022-11-08',
    stats: { posts: 234, comments: 567, likes: 2156 },
  },
  {
    id: 'kl-4',
    name: 'Emma Wong',
    avatarUrl: getAvatarUrl('Emma Wong'),
    x: 0.21,
    y: 0.46,
    region: 'Kuala Lumpur',
    bio: 'Data scientist exploring the world of AI and machine learning.',
    level: 35,
    role: 'Data Scientist',
    joinedDate: '2023-06-10',
    stats: { posts: 67, comments: 145, likes: 523 },
  },
  {
    id: 'kl-5',
    name: 'James Lee',
    avatarUrl: getAvatarUrl('James Lee'),
    x: 0.19,
    y: 0.48,
    region: 'Kuala Lumpur',
    bio: 'Mobile app developer building apps that make a difference.',
    level: 31,
    role: 'Mobile Developer',
    joinedDate: '2023-08-05',
    stats: { posts: 45, comments: 98, likes: 312 },
  },
  // Kedah area (1 member)
  {
    id: 'kedah-1',
    name: 'Maya Rahman',
    avatarUrl: getAvatarUrl('Maya Rahman'),
    x: 0.15, // Approximate Kedah area
    y: 0.25,
    region: 'Kedah',
    bio: 'Freelance developer and open-source contributor.',
    level: 28,
    role: 'Freelancer',
    joinedDate: '2023-09-12',
    stats: { posts: 34, comments: 78, likes: 245 },
  },
  // Additional members in other regions
  {
    id: 'penang-1',
    name: 'Ryan Ng',
    avatarUrl: getAvatarUrl('Ryan Ng'),
    x: 0.16,
    y: 0.35,
    region: 'Penang',
    bio: 'Backend engineer specializing in scalable systems.',
    level: 40,
    role: 'Backend Engineer',
    joinedDate: '2023-02-18',
    stats: { posts: 112, comments: 289, likes: 987 },
  },
  {
    id: 'sabah-1',
    name: 'Lisa Chong',
    avatarUrl: getAvatarUrl('Lisa Chong'),
    x: 0.65, // East Malaysia (Borneo)
    y: 0.40,
    region: 'Sabah',
    bio: 'Product manager passionate about user-centered design.',
    level: 33,
    role: 'Product Manager',
    joinedDate: '2023-05-20',
    stats: { posts: 78, comments: 156, likes: 654 },
  },
  {
    id: 'sarawak-1',
    name: 'Kevin Teo',
    avatarUrl: getAvatarUrl('Kevin Teo'),
    x: 0.70,
    y: 0.50,
    region: 'Sarawak',
    bio: 'DevOps engineer automating everything possible.',
    level: 36,
    role: 'DevOps Engineer',
    joinedDate: '2023-04-14',
    stats: { posts: 92, comments: 203, likes: 721 },
  },
];

