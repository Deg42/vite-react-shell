import { Button, Drawer, Sidebar } from 'flowbite-react';
import { useState } from "react";
import { FaChess, FaCrown, FaDrumstickBite } from "react-icons/fa";
import { HiCurrencyDollar, HiHome, HiMail, HiMenu, HiViewBoards, HiViewGrid } from 'react-icons/hi';
import { HiPaintBrush } from "react-icons/hi2";
import { Link, Outlet, useLocation } from 'react-router-dom';

export default function Layout() {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex m-4 items-center">
        <Button onClick={() => setIsOpen(true)}> <HiMenu className="h-6 w-6" /></Button>
      </div>
      <Drawer open={isOpen} onClose={handleClose} backdrop={false}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar aria-label="Sidebar with multi-level dropdown"
            className="[&>div]:bg-transparent [&>div]:p-0">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <Link to="/"><Sidebar.Item as={"span"} icon={HiHome} active={useLocation().pathname === "/"}>Home</Sidebar.Item></Link>
                <Link to="/Board"><Sidebar.Item as={"span"} icon={HiViewBoards} active={useLocation().pathname === "/Board"}>Board</Sidebar.Item></Link>
                <Link to="/ApiPlatform"><Sidebar.Item as={"span"} icon={HiMail} active={useLocation().pathname === "/ApiPlatform"}>API Platform</Sidebar.Item></Link>
                <Link to="/Grid3X3"><Sidebar.Item as={"span"} icon={HiViewGrid} active={useLocation().pathname === "/Grid3X3"}>Grid 3x3</Sidebar.Item></Link>
                <Link to="/Chess"><Sidebar.Item as={"span"} icon={FaChess} active={useLocation().pathname === "/Chess"}>Chess</Sidebar.Item></Link>
                <Link to="/Dinosaurs"><Sidebar.Item as={"span"} icon={FaDrumstickBite} active={useLocation().pathname === "/Dinosaurs"}>Dinosaurs</Sidebar.Item></Link>
                <Link to="/Canvas"><Sidebar.Item as={"span"} icon={HiPaintBrush} active={useLocation().pathname === "/Canvas"}>Canvas</Sidebar.Item></Link>
                <Link to="/Balatro"><Sidebar.Item as={"span"} icon={FaCrown} active={useLocation().pathname === "/Balatro"}>Balatro</Sidebar.Item></Link>
                <Link to="/Roulette"><Sidebar.Item as={"span"} icon={HiCurrencyDollar} active={useLocation().pathname === "/Roulette"}>Roulette</Sidebar.Item></Link>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </Drawer.Items>
      </Drawer>

      <div className={`h-full ml-6 md:ml-80 my-4 max-w-screen-xl transition-all duration-300 ease-in-out ${isOpen ? "transform translate-x-64" : ""}`}>
        <Outlet />
      </div>
    </>
  )
}
