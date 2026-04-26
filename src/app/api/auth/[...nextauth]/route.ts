import { handlers } from "@/auth";

// This automatically creates all the GET and POST routes needed for authentication
export const { GET, POST } = handlers;