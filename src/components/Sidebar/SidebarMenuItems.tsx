import { FC, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  matchPath,
  useLocation,
  useParams,
} from "react-router-dom";

type Props = {
  className?: string;
  menuItem: any;
};
const SidebarMenuItem: FC<Props> = ({ className, menuItem }) => {
  const menuItemRef = useRef<HTMLLIElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let { "*": slug } = useParams();
  const { pathname } = useLocation();

  console.log(slug);

  const classes =
    "mb-1 flex px-5 py-[12px] rounded-[10px] items-center duration-600 hover:text-blue-800 focus:text-blue-800 hover:bg-blue-100 focus:bg-blue-100 hover:no-underline focus:no-underline hover:fill-white leading-none ";

  useEffect(() => {
    if (
      menuItem.subMenu &&
      menuItem.subMenu.filter((item: any) => {
        return (
          pathname?.includes(item.to as string) ||
          (item.additionalChildRoutes?.filter(
            (route: any) =>
              route.includes(pathname as string) || matchPath(route, pathname)
          )?.length as number) > 0
        );
      }).length > 0
    ) {
      setDropdownOpen(true);
    } else if (
      menuItem.subMenu ||
      menuItemRef.current?.classList.contains("mm-active")
    ) {
      setDropdownOpen(false);
      menuItemRef.current?.classList.remove("mm-active");
      if (menuItemRef.current?.firstChild) {
        // @ts-ignore
        menuItemRef.current?.firstChild?.setAttribute("aria-expanded", "false");
      }
    }
  }, [pathname]);

  console.log(menuItemRef.current);

  return (
    <li className={className} ref={menuItemRef}>
      {menuItem.subMenu ? (
        <Link to="#" className={`${classes} has-arrow text-gray-600`}>
          {menuItem.icon && (
            <span className="text-xl mr-3 w-[20px]">
              <menuItem.icon />
            </span>
          )}
          <span className="ml-1 font-medium">{menuItem.name}</span>
        </Link>
      ) : (
        <NavLink
          to={menuItem.to || "#"}
          className={({ isActive }: any) =>
            `${classes} ${
              isActive ? "text-blue-800 bg-blue-100" : "text-gray-600"
            }`
          }
        >
          {menuItem.icon && (
            <span className="text-xl mr-3 w-[20px]">
              {" "}
              <menuItem.icon />
            </span>
          )}
          <span className="mx-2 font-medium">{menuItem.name}</span>
        </NavLink>
      )}

      {menuItem.subMenu && (
        <ul className={`ml-8 ${dropdownOpen ? "mm-show" : "mm-collapse"}`}>
          {menuItem.subMenu.map((item: any, index: any) => {
            return (
              <SidebarMenuItem key={index} menuItem={item} className="mb-1" />
            );
          })}
        </ul>
      )}
    </li>
  );
};
export default SidebarMenuItem;
