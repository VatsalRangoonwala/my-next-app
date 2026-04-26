import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#E0E5EC]">
      {/* Container utilizing a modern claymorphism structure */}
      <div className="bg-[#E0E5EC] p-10 rounded-[2rem] shadow-[10px_10px_20px_#a3b1c6,-10px_-10px_20px_#ffffff] flex flex-col items-center gap-6 w-full max-w-sm border border-white/20">
        
        {/* Playful, 3D-styled logo container */}
        <div className="w-20 h-20 rounded-[1.5rem] bg-[#E0E5EC] shadow-[inset_6px_6px_12px_#a3b1c6,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center mb-2">
          <span className="text-4xl font-extrabold text-blue-500 tracking-tighter shadow-sm">
            P.
          </span>
        </div>

        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800 tracking-tight">Welcome Back</h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">Sign in to your workspace</p>
        </div>

        <form 
          className="w-full"
          action={async () => {
            "use server";
            // This triggers the GitHub OAuth flow and redirects to home on success
            await signIn("github", { redirectTo: "/" });
          }} 
        >
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white rounded-2xl py-3.5 px-4 font-bold tracking-wide shadow-[6px_6px_12px_#a3b1c6,-6px_-6px_12px_#ffffff,inset_2px_2px_4px_rgba(255,255,255,0.3),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] transition-all hover:scale-[0.98] active:scale-[0.95]"
          >
            Sign in with GitHub
          </button>
        </form>

      </div>
    </main>
  );
}