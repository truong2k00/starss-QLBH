import type { VerticalNavItems } from "@/@layouts/types";

export default [
  {
    title: "Home",
    to: { name: "index" },
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
        to: { path: "/Admin/statusBill" },
      },
      {
        title: "Bill",
        to: { path: "/Admin/bill" },
      },
    ],
    badgeContent: "5",
    badgeClass: "bg-primary",
  },
  {
    title: "Second page",
    to: { name: "second-page" },
    icon: { icon: "tabler-file" },
  },
] as VerticalNavItems;
