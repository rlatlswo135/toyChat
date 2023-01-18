import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
} from "react";
import tw from "tailwind-styled-components";

type ChatMenusProps = {
  menus: {
    icon: ReactNode;
    text: string;
    click: () => void;
  }[];
  setter: Dispatch<SetStateAction<boolean>>;
};

export function ChatMenus({ menus, setter }: ChatMenusProps) {
  const menuRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const node = e.target instanceof Element && e.target;
      const ref = menuRef.current;

      if (node && ref && !ref.contains(node)) {
        setter(false);
      }
    };
    setTimeout(() => {
      document.addEventListener("click", handler);
    }, 300);
    return () => {
      document.removeEventListener("click", handler);
    };
  });
  return (
    <Div
      ref={(ele) => {
        if (ele) {
          menuRef.current = ele;
        }
      }}
    >
      {menus.map((menu, idx) => {
        const { icon, text, click } = menu;
        return (
          <Menu onClick={click} key={`chatmenu-${idx}`}>
            {icon}
            <span className="ml-3">{text}</span>
          </Menu>
        );
      })}
    </Div>
  );
}

const Div = tw.ul`
absolute border-2 flex flex-col left-3/4 max-w-52 w-52 border-gray-400/20 bg-gray-400/80
`;

const Menu = tw.li`
flex items-center py-2 px-8 border-b-2 text-center border-gray-500/70
hover:bg-gray-500 hover:cursor-pointer
`;
