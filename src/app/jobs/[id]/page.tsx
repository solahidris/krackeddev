import JobDetailClient from './JobDetailClient';

// Required for static export with dynamic routes
export function generateStaticParams() {
  // Generate static params for all quest IDs
  const questIds = [
    'quest-1', 'quest-2', 'quest-3', 'quest-4', 'quest-5',
    'quest-6', 'quest-7', 'quest-8', 'quest-9', 'quest-10',
    'quest-11', 'quest-12', 'quest-13', 'quest-14', 'quest-15',
    'quest-16', 'quest-17', 'quest-18', 'quest-19', 'quest-20',
  ];
  
  return questIds.map((id) => ({
    id: id,
  }));
}

export default function JobDetailPage() {
  return <JobDetailClient />;
}

