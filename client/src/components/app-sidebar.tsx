"use client";

import {
  BadgeCheck,
  BadgeDollarSignIcon,
  Bell,
  BoxIcon,
  ChevronRight,
  ChevronsUpDownIcon,
  CoinsIcon,
  FileIcon,
  FilePenLine,
  HandCoinsIcon,
  Landmark,
  LayoutDashboard,
  LogOutIcon,
  Sparkles,
  UserCheck2Icon,
  UserCircleIcon,
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
  SidebarMenuSubButton,
} from "./ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut } from "@/app/api/actions/signout";
import { GetUserForUUID } from "@/app/api/actions/getuser";
import { useEffect, useState } from "react";
import type { User } from "@/app/api/actions/getuser";

const data = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
    lists: [
      {
        title: "Dashboard",
        href: "/core",
      },
    ],
  },
  {
    title: "Produtos",
    icon: <BoxIcon />,
    lists: [
      {
        title: "Novo Produto",
        href: "/core/pages/products/registerProduct",
      },
      {
        title: "Categorias",
        href: "/core/pages/products/categories",
      },
      {
        title: "Listar Produtos",
        href: "/core/pages/products/listProducts",
      },
    ],
  },

  {
    title: "Clientes",
    icon: <UserCircleIcon />,
    lists: [
      {
        title: "Novo Cliente",
        href: "/core/pages/clients/registerClient",
      },
      {
        title: "Fornecedores",
        href: "/core/pages/clients/registerSupplier",
      },
      {
        title: "Listar Clientes",
        href: "#",
      },
    ],
  },

  {
    title: "Financeiro",
    icon: <Landmark />,
    lists: [
      {
        title: "Receitas",
        href: "#",
      },
      {
        title: "Despesas",
        href: "#",
      },
    ],
  },

  {
    title: "Fiscal",
    icon: <FileIcon />,
    lists: [
      {
        title: "Sintegra",
        href: "#",
      },
      {
        title: "Sped Fiscal",
        href: "#",
      },
    ],
  },

  {
    title: "Compras",
    icon: <BadgeDollarSignIcon />,
    lists: [
      {
        title: "Importar Compras",
        href: "#",
      },
    ],
  },

  {
    title: "Estoque",
    icon: <BadgeCheck />,
    lists: [
      {
        title: "Entrada de Estoque",
        href: "#",
      },
      {
        title: "Saida de Estoque",
        href: "#",
      },
    ],
  },

  {
    title: "Vendas",
    icon: <CoinsIcon />,
    lists: [
      {
        title: "Fazer Venda",
        href: "#",
      },
    ],
  },
];

const data2 = [
  {
    title: "Caixa",
    icon: <HandCoinsIcon />,
    lists: [
      {
        title: "Abrir caixa",
        href: "#",
      },
    ],
  },
  {
    title: "Venda",
    icon: <CoinsIcon className="bg-amber-300 rounded" />,
    lists: [
      {
        title: "Fazer Venda",
        href: "#",
      },
    ],
  },
];

const data3 = [
  {
    title: "Manuais do Sistemas",
    icon: <FilePenLine />,
    lists: [
      {
        title: "Documentação",
        href: "#",
      },
    ],
  },
];

const data4 = [
  {
    title: "Configurações",
    icon: <Sparkles />,
    lists: [
      {
        title: "Ajustes de Contas",
        href: "#",
      },
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
    <Sidebar variant="floating" collapsible="icon">
      <SidebarHeader className="">
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
        <SidebarGroup>
          <SidebarGroupLabel>Módulo Gestão:</SidebarGroupLabel>
          {data.map((item, index) => (
            <SidebarMenu key={index}>
              <Collapsible asChild>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <div className="font-medium">{item.title}</div>
                      <ChevronRight className="ml-auto transition-transform duration-200 hover:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        {item.lists?.map((list, index) => (
                          <SidebarMenuSubButton asChild key={index}>
                            <div>
                              <Link
                                href={list.href}
                                className="text-sm text-gray-600 dark:text-gray-300">
                                {list.title}
                              </Link>
                            </div>
                          </SidebarMenuSubButton>
                        ))}
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ))}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Módulo PDV:</SidebarGroupLabel>
          {data2.map((item, index) => (
            <SidebarMenu key={index}>
              <Collapsible asChild>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <div className="font-medium">{item.title}</div>
                      <ChevronRight className="ml-auto transition-transform duration-200 hover:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        {item.lists?.map((list, index) => (
                          <SidebarMenuSubButton asChild key={index}>
                            <div>
                              <Link
                                href={list.href}
                                className="text-sm text-gray-600 dark:text-gray-300">
                                {list.title}
                              </Link>
                            </div>
                          </SidebarMenuSubButton>
                        ))}
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ))}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Manuais do Sistema</SidebarGroupLabel>
          {data3.map((item, index) => (
            <SidebarMenu key={index}>
              <Collapsible asChild>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <div className="font-medium">{item.title}</div>
                      <ChevronRight className="ml-auto transition-transform duration-200 hover:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        {item.lists?.map((list, index) => (
                          <SidebarMenuSubButton asChild key={index}>
                            <div>
                              <Link
                                href={list.href}
                                className="text-sm text-gray-600 dark:text-gray-300">
                                {list.title}
                              </Link>
                            </div>
                          </SidebarMenuSubButton>
                        ))}
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ))}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Painel Administrador</SidebarGroupLabel>
          {data4.map((item, index) => (
            <SidebarMenu key={index}>
              <Collapsible asChild>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon}
                      <div className="font-medium">{item.title}</div>
                      <ChevronRight className="ml-auto transition-transform duration-200 hover:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuItem>
                        {item.lists?.map((list, index) => (
                          <SidebarMenuSubButton asChild key={index}>
                            <div>
                              <Link
                                href={list.href}
                                className="text-sm text-gray-600 dark:text-gray-300">
                                {list.title}
                              </Link>
                            </div>
                          </SidebarMenuSubButton>
                        ))}
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          ))}
        </SidebarGroup>
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
