"use client";
import { Web3Button } from "@web3modal/react";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      <div className="navbar font-bold z-30">
        <div className="navbar-start">
          <div className="dropdown hover:bg-primary hover:text-white rounded-lg">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-primary text-white rounded-box w-52"
            >
              <li>
                <Link href={"/play"}>Play</Link>
              </li>
              <li>
                <Link href={"/leaderboard"}>Leaderboard</Link>
              </li>
              <li tabIndex={0}>
                <Link href={"/Profile"} className="justify-between ">
                  Profile
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                  </svg>
                </Link>
                <ul className="p-2 bg-primary ">
                  <li>
                    <Link href={"/Profile/stats"}>Stats</Link>
                  </li>
                  <li>
                    <Link href="/Profile/mint">Mint</Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link href={"/about"}>About</Link>
              </li>
            </ul>
          </div>
          <Link
            href="/"
            className="btn btn-ghost normal-case text-xl hover:bg-primary hover:text-white"
          >
            Scroll Kingdoms
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1  ">
            <li className="hover:bg-primary rounded-lg hover:text-white">
              <Link href={"/play"}>Play</Link>
            </li>

            <li className="hover:bg-primary rounded-lg hover:text-white">
              <Link href={"/leaderboard"}>Leaderboard</Link>
            </li>
            <li
              tabIndex={0}
              className=" hover:bg-primary rounded-lg hover:text-white"
            >
              <Link href={"/Profile"}>
                Profile
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </Link>
              <ul className="p-2 bg-primary text-white">
                <li className="">
                  <Link href={"/Profile/stats"}>Stats</Link>
                </li>
                <li>
                  <Link href="/Profile/mint">Mint</Link>
                </li>
              </ul>
            </li>
            <li className="hover:bg-primary rounded-lg hover:text-white">
              <Link href={"/about"}>About</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end mr-4">
          <Web3Button label="Connect Wallet" avatar="hide" icon="hide" />
        </div>
      </div>
    </>
  );
}
