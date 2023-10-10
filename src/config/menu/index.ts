import { BsBoxSeam, BsGrid } from "react-icons/bs";

const mainMenuItems = [
  {
    name: "Dashboard",
    to: "/",
    icon: BsGrid,
  },
  {
    name: "Instructor",
    to: "",
    subMenu: [
      {
        name: "List",
        to: "/instructor",
      },
    ],
    icon: BsBoxSeam,
  },
  {
    name: "Institution",
    to: "",
    subMenu: [
      {
        name: "List",
        to: "/institution",
      },
    ],
    icon: BsBoxSeam,
  },
  {
    name: "Learner",
    to: "",
    subMenu: [
      {
        name: "List",
        to: "/learner",
      },
    ],
    icon: BsBoxSeam,
  },
  {
    name: "Course",
    to: "",
    subMenu: [
      {
        name: "List",
        to: "/course",
      },
      {
        name: "Add",
        to: "/course/add",
      },
      {
        name: "Set Token",
        to: "/course/set-token",
      },
      {
        name: "Distribute Token",
        to: "/course/attendance",
      },
    ],
    icon: BsBoxSeam,
  },
  {
    name: "Excel",
    to: "",
    subMenu: [
      {
        name: "List",
        to: "/excel",
      },
    ],
    icon: BsBoxSeam,
  },
];

export default mainMenuItems;
