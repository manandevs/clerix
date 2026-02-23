"use client"

import { UserProfile } from "@clerk/nextjs"

export default function ProfilePage() {
  return <div className="min-h-screen w-full flex justify-center items-center p-2">
    <UserProfile />
  </div>
}
