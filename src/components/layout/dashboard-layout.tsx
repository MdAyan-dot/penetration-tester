"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShieldCheck, LogOut, Settings } from "lucide-react";
import { SecurityModule, securityModules } from "@/lib/modules";
import SecurityModuleView from "@/components/modules/security-module-view";
import Welcome from "@/components/modules/welcome";

export default function DashboardLayout() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);

  const selectedModule =
    securityModules.find((mod) => mod.id === selectedModuleId) || null;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="size-6" />
            </div>
            <h1 className="font-headline text-2xl font-bold text-primary">
              PentestBoard
            </h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {securityModules.map((module) => (
              <SidebarMenuItem key={module.id}>
                <SidebarMenuButton
                  onClick={() => setSelectedModuleId(module.id)}
                  isActive={selectedModuleId === module.id}
                  tooltip={{ children: module.name, side: "right" }}
                >
                  <module.icon />
                  <span>{module.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 md:px-6">
          <SidebarTrigger className="md:hidden" />
          <div>
            <h2 className="font-headline text-xl font-semibold">
              {selectedModule ? selectedModule.name : "Dashboard"}
            </h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">SecAdmin</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@pentestboard.io
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {selectedModule ? (
            <SecurityModuleView
              key={selectedModule.id} // Add key to force re-mount
              module={selectedModule}
            />
          ) : (
            <Welcome onModuleSelect={setSelectedModuleId} />
          )}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
