import { auth, signOut } from "@/auth"; // Import the auth utilities
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import UserForm from '@/components/UserForm';

export default async function Home() {
  // 1. Await the session directly on the server
  const session = await auth();

  // If no session exists, our middleware would have caught it, 
  // but it's good practice to handle the fallback UI just in case
  if (!session?.user) {
    return <div>Access Denied</div>;
  }

  await connectDB();
  const users = await User.find({}).lean() as any[];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      
      {/* Top Navigation Bar */}
      <nav className="w-full bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="font-bold text-xl tracking-tight">System<span className="text-blue-500">.</span></div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {/* Auth.js automatically grabs the user's avatar from GitHub/Google */}
            {session.user.image && (
              <img 
                src={session.user.image} 
                alt="Profile" 
                className="w-8 h-8 rounded-full border border-gray-200"
              />
            )}
            <span className="text-sm font-medium">{session.user.name}</span>
          </div>

          {/* Secure Logout Action */}
          <form action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}>
            <button type="submit" className="text-sm font-semibold text-gray-500 hover:text-red-500 transition-colors uppercase tracking-widest">
              Logout
            </button>
          </form>
        </div>
      </nav>

      {/* Main Content (Unchanged) */}
      <div className="p-8 flex justify-center gap-12">
        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold tracking-tight mb-6 uppercase text-gray-800">Add Connection</h2>
          <UserForm /> 
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-xl font-bold tracking-tight mb-6 uppercase text-gray-800">Directory</h2>
          <div className="flex flex-col gap-3">
            {users.map((user) => (
              <div key={String(user._id)} className="bg-white border border-gray-100 p-4 shadow-sm flex justify-between items-center rounded-lg">
                <span className="font-medium text-gray-800">{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
}