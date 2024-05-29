import { Sidebar } from 'flowbite-react';
import { HiHand, HiHome, HiOutlineMinusSm, HiOutlinePlusSm, HiViewGrid } from 'react-icons/hi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export default function Layout() {
  return (
    <>
      <Sidebar id="sidebar" aria-label="Sidebar" className="fixed top-0 left-0 z-40 w-64 transition-transform -translate-x-full sm:translate-x-0">
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

      <div className="h-full mx-auto my-4 max-w-screen-xl">
        <Outlet />
      </div>
    </>
  )
}
