import { cookies } from "next/headers";
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default async function SidebarLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies()
    const isSidebarOpen = cookieStore.get('sidebar_state')?.value === 'true';

    return (
        <SidebarProvider defaultOpen={isSidebarOpen}>
            <AppSidebar />

            <SidebarInset className="overflow-hidden">
                {children}
            </SidebarInset>
        </SidebarProvider>
    )

}