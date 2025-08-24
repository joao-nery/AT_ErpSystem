"use client";

import {
  BadgeCheck,
  Bell,
  BoxIcon,
  ChartAreaIcon,
  ChevronRight,
  ChevronsUpDownIcon,
  HandCoinsIcon,
  LogOutIcon,
  Users,
} from "lucide-react";
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroupLabel,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "@/app/(erp)/core/actions/signout";
import { GetUserForUUID } from "@/app/(erp)/core/actions/getuser";
import { useEffect, useState } from "react";
import type { User } from "@/app/(erp)/core/actions/getuser";

const configsAppSidebar = [
  {
    module: "Meu Painel",
    title: "Inicio",
    icon: <ChartAreaIcon />,
    lists: [{ title: "Dashboard", href: "/core" }],
  },
  {
    module: "Dia a Dia",
    title: "Operações",
    icon: <HandCoinsIcon />,
    lists: [
      { title: "Registrar Venda", href: "/core/pages/sale" },
      { title: "Contas a Pagar", href: "/core/pages/accounts_payable" },
      { title: "Contas a Receber", href: "/core/pages/accounts_receivable" },
    ],
  },
  {
    module: "Organização",
    title: "Cadastros",
    icon: <BoxIcon />,
    lists: [
      {
        title: "Produtos",
        href: "/core/pages/products",
      },
      {
        title: "Clientes",
        href: "/core/pages/customers",
      },
      { title: "Categorias", href: "/core/pages/categories" },
    ],
  },
];

export function AppSidebar() {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const resolveToken = async () => {
      const token = await GetUserForUUID();
      const arrToken = [token];
      setUser(arrToken);
    };

    resolveToken();
  }, []);

  function signOut() {
    LogOut();
  }

  return (
    <Sidebar variant="floating" collapsible="icon" suppressHydrationWarning>
      <SidebarHeader>
        <SidebarMenuButton size="lg">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            ⌘
          </div>
          <div className="grid grid-cols-2 gap-1 flex-1 font-medium text-sm leading-tight ">
            <Link href="/core">ERP System</Link>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {configsAppSidebar.map((item, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{item.module}</SidebarGroupLabel>
            <SidebarMenu>
              <Collapsible defaultOpen>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className="flex justify-between"
                    tooltip={item.title}>
                    <div className="flex items-center gap-2">
                      <span className="cursor-pointer">{item.icon}</span>
                      <p className="text-[15px]">{item.title}</p>
                    </div>
                    <ChevronRight />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* --- Conteúdo Colapisável --- */}
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.lists.map((list, listIndex) => (
                      <div key={listIndex}>
                        <Link
                          className="text-[14px] text-muted-foreground flex items-center gap-2 px-3 py-1 hover:bg-muted hover:text-primary"
                          href={list.href}>
                          {list.title}
                        </Link>
                      </div>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroup>
        ))}

        {user.map((item, index) => (
          <div key={index}>
            {item.role == "admin" && (
              <Link
                href="/admin"
                className="px-5 text-blue-400 hover:underline">
                Painel administrativo
              </Link>
            )}
          </div>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg">
                  <Avatar className="rounded-lg">
                    <AvatarImage src="#" alt="#" />
                    <AvatarFallback>
                      {user.map((item) => item.name.split("")[0])}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-[12px] leading-tight">
                    <span className="font-medium">
                      {user.map((item) => item.email)}
                    </span>
                    <span className="text-muted-foreground font-medium">
                      {user.map((item) => item.name)}
                    </span>
                  </div>
                  <ChevronsUpDownIcon className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent sideOffset={4} side="bottom">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Users />
                  <Link href="#">
                    <span>Usuários</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <BadgeCheck />
                  <Link href="/core/pages/user/accountSettings">
                    <span>Conta</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell />
                  <span>Notificações</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOutIcon />
                  <span onClick={signOut}>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
