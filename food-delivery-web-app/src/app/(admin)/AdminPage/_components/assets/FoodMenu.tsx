export type AdminMenuType = {
  adminMenu: string;
};
export const FoodMenu = ({ adminMenu }: AdminMenuType) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.25 0.75H1.66667C1.16041 0.75 0.75 1.16041 0.75 1.66667V8.08333C0.75 8.58959 1.16041 9 1.66667 9H6.25C6.75626 9 7.16667 8.58959 7.16667 8.08333V1.66667C7.16667 1.16041 6.75626 0.75 6.25 0.75Z"
        stroke="#09090B"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={adminMenu === "/AdminPage/foodMenu" ? { stroke: "white" } : {}}
      />
      <path
        d="M16.3333 0.75H11.75C11.2437 0.75 10.8333 1.16041 10.8333 1.66667V4.41667C10.8333 4.92293 11.2437 5.33333 11.75 5.33333H16.3333C16.8396 5.33333 17.25 4.92293 17.25 4.41667V1.66667C17.25 1.16041 16.8396 0.75 16.3333 0.75Z"
        stroke="#09090B"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={adminMenu === "/AdminPage/foodMenu" ? { stroke: "white" } : {}}
      />
      <path
        d="M16.3333 9H11.75C11.2437 9 10.8333 9.41041 10.8333 9.91667V16.3333C10.8333 16.8396 11.2437 17.25 11.75 17.25H16.3333C16.8396 17.25 17.25 16.8396 17.25 16.3333V9.91667C17.25 9.41041 16.8396 9 16.3333 9Z"
        stroke="#09090B"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={adminMenu === "/AdminPage/foodMenu" ? { stroke: "white" } : {}}
      />
      <path
        d="M6.25 12.6667H1.66667C1.16041 12.6667 0.75 13.0771 0.75 13.5833V16.3333C0.75 16.8396 1.16041 17.25 1.66667 17.25H6.25C6.75626 17.25 7.16667 16.8396 7.16667 16.3333V13.5833C7.16667 13.0771 6.75626 12.6667 6.25 12.6667Z"
        stroke="#09090B"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={adminMenu === "/AdminPage/foodMenu" ? { stroke: "white" } : {}}
      />
    </svg>
  );
};
