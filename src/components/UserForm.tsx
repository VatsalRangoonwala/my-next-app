"use client"; // This is the magic word. It ships this specific component to the browser.

import { useState } from "react";
import { createUserAction } from "@/lib/actions";

export default function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault(); // Stop standard browser form submission
    setError("");
    setIsLoading(true);

    // Call our Server Action directly!
    const result = await createUserAction(name, email);

    if (result?.error) {
      setError(result.error);
    } else {
      // Clear the form on success
      setName("");
      setEmail("");
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 shadow-sm border border-gray-100"
    >
      {/* Dynamic Error Rendering */}
      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 border border-red-100">
          {error}
        </div>
      )}

      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        disabled={isLoading}
        className="border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors disabled:bg-gray-50"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        disabled={isLoading}
        className="border-b border-gray-300 py-2 focus:outline-none focus:border-black transition-colors disabled:bg-gray-50"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="mt-4 bg-black text-white py-2 px-4 hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm font-semibold disabled:bg-gray-400 flex justify-center"
      >
        {isLoading ? (
          <span className="animate-pulse">Processing...</span>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
