import React, {createContext, useContext, useState} from "react";

export function getBreadcrumbsAndTitle(menuId: any, pathName: any) {
  const result: { breadcrumbs: { pathname: string, title: string }[], title: string } = {
    breadcrumbs: [],
    title: "",
  };
  
  const menu = document.getElementById(menuId);
  if (!menu) {
    return result;
  }
  
  const activeLinksArray = Array.from(
    menu.getElementsByClassName("active") || []
  );
  const activeLinks = activeLinksArray.filter((el) => el.tagName === "A");
  if (!activeLinks) {
    return result;
  }
  
  activeLinks.forEach((link: any) => {
    const titleSpans: any = link.getElementsByClassName("menu-text");
    if (titleSpans) {
      const titleSpan: any = Array.from(titleSpans).find(
        (t: any) => t.innerHTML && t.innerHTML.trim().length > 0
      );
      if (titleSpan) {
        result.breadcrumbs.push({
          pathname: link.pathname,
          title: titleSpan.innerHTML,
        });
      }
    }
  });
  result.title = getTitle(result.breadcrumbs, pathName);
  return result;
}

export function getTitle(breadCrumbs: any, pathname: any) {
  if (!breadCrumbs || !pathname) {
    return "";
  }
  
  const length = breadCrumbs.length;
  if (!length) {
    return "";
  }
  
  return breadCrumbs[length - 1].title;
}

const SubheaderContext = createContext<any>(null);

export function useSubheader() {
  return useContext(SubheaderContext);
}

export const SubheaderConsumer = SubheaderContext.Consumer;

export function MetronicSubheaderProvider({children}: any) {
  const [title, setTitle] = useState("");
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const value = {title, setTitle, breadcrumbs, setBreadcrumbs};
  return (
    <SubheaderContext.Provider value={value}>
      {children}
    </SubheaderContext.Provider>
  );
}
