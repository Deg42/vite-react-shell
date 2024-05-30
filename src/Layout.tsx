import { CustomFlowbiteTheme, Sidebar } from 'flowbite-react';
import { HiHand, HiHome, HiOutlineMinusSm, HiOutlinePlusSm, HiViewGrid } from 'react-icons/hi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function Layout() {

  const customTheme: CustomFlowbiteTheme["sidebar"] = {
    "root": {
      "base": "h-full fixed top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0",
      "inner": "h-full overflow-y-auto overflow-x-hidden rounded-none bg-slate-200 px-3 py-4 dark:bg-gray-800"
    },
    "item": {
      "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-slate-400 dark:text-white dark:hover:bg-gray-700",
      "active": "bg-slate-300 dark:bg-gray-700",
    },
    "collapse": {
      "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-slate-400 dark:text-white dark:hover:bg-gray-700",
    }
  }


  return (
    <>
      <Sidebar theme={customTheme} id="sidebar" aria-label="Sidebar">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/">
              <Sidebar.Item as={"span"} icon={HiHome} active={useLocation().pathname === "/"} >Home</Sidebar.Item>
            </Link>
            <Sidebar.Collapse
              icon={HiHand}
              label="Drag And Drop"
              renderChevronIcon={(theme, open) => {
                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
              }}
            >
              <Link to="/Grid3X3"><Sidebar.Item as={"span"} icon={HiViewGrid} active={useLocation().pathname === "/Grid3X3"}>Grid 3x3</Sidebar.Item></Link>
            </Sidebar.Collapse>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      <div className="h-full ml-8 md:ml-72 my-4 max-w-screen-xl">
        <Outlet />
      </div>
    </>
  )
}
