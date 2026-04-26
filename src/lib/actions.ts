"use server"; 

import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { revalidatePath } from 'next/cache';

// We now accept simple strings and return a predictable object
export async function createUserAction(name: string, email: string) {
  if (!name || !email) return { error: "Name and email are required." }; 

  try {
    await connectDB();
    await User.create({ name, email });
    
    revalidatePath('/'); 
    return { success: true }; // Tell the frontend it worked
  } catch (error: any) {
    console.error("Database error:", error);
    
    // Catch MongoDB duplicate key error specifically
    if (error.code === 11000) {
      return { error: "This email is already in the system." };
    }
    
    return { error: "An unexpected server error occurred." };
  }
}