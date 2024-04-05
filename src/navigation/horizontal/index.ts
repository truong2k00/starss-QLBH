import type { HorizontalNavItems } from "@layouts/types";

export default [
  {
    title: "Home",
    to: { name: "index" },
    icon: { icon: "tabler-smart-home" },
  },
  {
    title: "Account_Setting",
    to: { name: "Account_Setting" },
    icon: { icon: "tabler-smart-home" },
  },
  {
    title: "Table",
    icon: { icon: "mdi-table-cog" },
    children: [
      {
        title: "Product",
        to: {
          path: "/Admin/Product",
        },
      },
      {
        title: "Category",
        to: { path: "/Admin/Category" },
      },
      {
        title: "Role",
        to: { path: "/Admin/Roles" },
      },

      {
        title: "Status Bill",
        to: { path: "/Admin/StartusBill" },
      },
    ],
    badgeContent: "4",
    badgeClass: "bg-primary",
  },
  {
    title: "Second page",
    to: { name: "second-page" },
    icon: { icon: "tabler-file" },
  },
] as HorizontalNavItems;
