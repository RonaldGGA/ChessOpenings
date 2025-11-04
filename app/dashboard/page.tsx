// app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { DashboardContent } from "./components/dashboardContent";
import { LoadingError } from "./components/loadingError";
import { getDashboardData } from "@/lib/actions";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin?callbackUrl=/dashboard");
  }


  let dashboardData = null;
  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });

    if (!user) {
      redirect("/");
    }

    dashboardData = await getDashboardData(user.id);
    
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <LoadingError type="error" message="Failed to load dashboard data." />;
  }

    return <DashboardContent dashboardData={dashboardData} />;

}