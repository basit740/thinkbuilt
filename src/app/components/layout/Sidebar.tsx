"use client";
import { NAV_LINKS } from "../../constants/index";
import Link from "next/link";
import { X } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  handleScroll: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const Sidebar = ({ isOpen, onClose, handleScroll }: SidebarProps) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-1/2 bg-black z-[80] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 pt-20 relative">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-200"
          >
            <X size={24} />
          </button>
          <ul className="space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={link.href}
                  onClick={(e) => {
                    handleScroll(e, link.href);
                    onClose();
                  }}
                  className="text-gray-50 text-lg font-medium hover:text-blue-400 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Get Started Button */}
          <div className="mt-8">
            <button
              type="button"
              className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors duration-200 w-full"
              onClick={() => {
                window.open(
                  "https://calendly.com/basit-thinkbuiltsol/technical-partner",
                  "_blank"
                );
                onClose();
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;