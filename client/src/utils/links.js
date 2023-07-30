import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'
import { FaStickyNote } from "react-icons/fa";
import { AiFillFileImage } from "react-icons/ai";

const links = [
  { id: 1, text: "stats", path: "/", icon: <IoBarChartSharp /> },
  { id: 2, text: "all projects", path: "all-projects", icon: <MdQueryStats /> },
  { id: 3, text: "add projects", path: "add-project", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
  { id: 5, text: "notes", path: "notes", icon: <FaStickyNote /> },
  { id: 6, text: "file", path: "file", icon: <AiFillFileImage /> },
];

export const linksClub = [
  // { id: 1, text: "stats", path: "/club", icon: <IoBarChartSharp /> },
  // { id: 2, text: "all events", path: "all-projects", icon: <MdQueryStats /> },
  // { id: 3, text: "add event", path: "add-project", icon: <FaWpforms /> },
  { id: 1, text: "announcements", path: "/club", icon: <FaWpforms /> },
  { id: 4, text: "profile", path: "profile", icon: <ImProfile /> },
];

export default links
