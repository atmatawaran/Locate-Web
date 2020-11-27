import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi";

export const SidebarData = [
    {
        title: "Map",
        path: '/',
        icon: <FaIcons.FaMap/>,
        cName: 'nav-text'
    },
    {
        title: "Authentication",
        path: '/authenticate-users',
        icon: <HiIcons.HiUsers/>,
        cName: 'nav-text'
    },
    {
        title: "Cable",
        path: '/activities-cable',
        icon: <MdIcons.MdPlayArrow/>,
        cName: 'nav-text'
    },
    {
        title: "Cabinet",
        path: '/activities-cabinet',
        icon: <MdIcons.MdPlayArrow/>,
        cName: 'nav-text'
    },
    {
        title: "DP",
        path: '/activities-dp',
        icon: <MdIcons.MdPlayArrow/>,
        cName: 'nav-text'
    },
    {
        title: "Manhole",
        path: '/activities-manhole',
        icon: <MdIcons.MdPlayArrow/>,
        cName: 'nav-text'
    },
    {
        title: "Pole",
        path: '/activities-pole',
        icon: <MdIcons.MdPlayArrow/>,
        cName: 'nav-text'
    },
]
