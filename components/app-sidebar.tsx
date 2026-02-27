"use client"

import * as React from "react"
import {
  IconAlertTriangle,
  IconBell,
  IconBox,
  IconBuildingBank,
  IconChartBar,
  IconCirclePlusFilled,
  IconClipboardList,
  IconCreditCard,
  IconDashboard,
  IconDatabase,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconMail,
  IconPackages,
  IconPuzzle,
  IconRadar,
  IconReport,
  IconSearch,
  IconSettings,
  IconShieldLock,
  IconShoppingCart,
  IconUsers,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useUser } from "@clerk/nextjs"
import { Button } from "./ui/button"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  const data = {
    user: {
      name: user?.firstName || "Clerix Admin",
      email: user?.primaryEmailAddress?.emailAddress || "admin@clerix.com",
      avatar: user?.imageUrl || "/avatars/default.jpg",
    },

    // Core Privacy Features
    navMain: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
      { title: "Privacy Score", url: "/dashboard/score", icon: IconShieldLock },
      { title: "Threat Radar", url: "/dashboard/dark-web", icon: IconRadar },
      { title: "Broker Network", url: "/dashboard/brokers", icon: IconBuildingBank },
      { title: "Lifecycle", url: "/dashboard/lifecycle", icon: IconListDetails },
      { title: "Analytics", url: "/dashboard/analytics", icon: IconChartBar },
    ],

    // Newly Added: Product Management
    navProduct: [
      { title: "Products", url: "/dashboard/products", icon: IconBox },
      { title: "Inventory", url: "/dashboard/inventory", icon: IconPackages },
      { title: "Orders", url: "/dashboard/orders", icon: IconShoppingCart },
    ],

    // Enterprise & System Security
    navSystem: [
      { title: "Team & Access", url: "/dashboard/team", icon: IconUsers },
      { title: "Audit Logs", url: "/dashboard/audit", icon: IconClipboardList },
      { title: "Extension Sync", url: "/dashboard/extension", icon: IconPuzzle },
      { title: "Crisis Mode", url: "/dashboard/crisis", icon: IconAlertTriangle },
    ],

    // Workspace & Tools
    documents: [
      { name: "Projects", url: "/dashboard/projects", icon: IconFolder },
      { name: "Data Library", url: "/dashboard/data-library", icon: IconDatabase },
      { name: "Reports", url: "/dashboard/reports", icon: IconReport },
      { name: "Word Assistant", url: "/dashboard/word-assistant", icon: IconFileWord },
    ],

    navSecondary: [
      { title: "Notifications", url: "/dashboard/notifications", icon: IconBell },
      { title: "Billing", url: "/dashboard/billing", icon: IconCreditCard },
      { title: "Settings", url: "/dashboard/settings", icon: IconSettings },
      { title: "Get Help", url: "/dashboard/help", icon: IconHelp },
      { title: "Search", url: "/dashboard/search", icon: IconSearch },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5 text-primary" />
                <span className="text-base font-bold tracking-tight">Clerix System</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hide">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Quick Create"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Quick Create</span>
            </SidebarMenuButton>
            <Button
              size="icon"
              className="size-8 group-data-[collapsible=icon]:opacity-0"
              variant="outline"
            >
              <IconMail />
              <span className="sr-only">Inbox</span>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Core Features */}
        <NavMain items={data.navMain} />

        {/* Requested Product Management Section */}
        <div className="px-4 py-2 mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
          Product Management
        </div>
        <NavMain items={data.navProduct} />

        {/* System & Enterprise */}
        <div className="px-4 py-2 mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
          Enterprise Security
        </div>
        <NavMain items={data.navSystem} />

        {/* Documents & Assets */}
        <div className="px-4 py-2 mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
          Workspace
        </div>
        <NavDocuments items={data.documents} />

        {/* Settings & Secondary Nav */}
        <NavSecondary items={data.navSecondary} className="mt-auto border-t border-border/50 pt-4" />
      </SidebarContent>

      <SidebarFooter className="border-t border-border/50">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}