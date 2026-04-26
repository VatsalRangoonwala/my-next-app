import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { notFound } from 'next/navigation';

// Next.js v16 passes the dynamic URL parameters directly to the component via props
export default async function UserProfile({ params }: { params: { id: string } }) {
  await connectDB();
  
  // We use the ID from the URL to fetch the specific user
  const user = await User.findById(params.id).lean();

  // If someone types a random ID in the URL, gracefully trigger a 404 page
  if (!user) {
    notFound(); 
  }

  return (
    <main className="min-h-screen p-8 bg-white text-gray-900">
      <div className="max-w-2xl mx-auto border border-gray-200 p-8 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight mb-2 uppercase text-gray-800">
          {user.name}
        </h1>
        <p className="text-gray-500 font-mono text-sm mb-6 bg-gray-50 inline-block px-3 py-1 border border-gray-100">
          {user.email}
        </p>
        
        <div className="mt-8 pt-8 border-t border-gray-100">
          <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-4">
            System Details
          </h3>
          <p className="text-sm text-gray-600">Database ID: {String(user._id)}</p>
        </div>
      </div>
    </main>
  );
}