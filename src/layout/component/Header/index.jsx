import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn-ui/ui/tooltip";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  // MenubarShortcut,
  MenubarTrigger
} from "@/shadcn-ui/ui/menubar";
import { Button } from "@/shadcn-ui/ui/button";
import { Settings, ChevronRight, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn-ui/ui/avatar";
import { cn } from "@/shadcn-ui/libs/utils";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorThemeSlice, setThemeMode } from "@/store/modules/themeSlice";

export default function Header() {
  const { themeMode } = useSelector(selectorThemeSlice);
  const dispatch = useDispatch();
  useEffect(() => {}, []);

  function onItem(items, sub) {
    console.log(items, sub);
  }

  // 切换主题
  function handleTheme() {
    dispatch(setThemeMode(themeMode == "dark" ? "light" : "dark"));
  }

  return (
    <header className=" ">
      {/* <span className="text-xl font-sans font-bold">xiaobai-abc admin</span> */}

      <Menubar
        className={cn(
          "fixed top-0 left-0 bg-white flex p-2 mt-2 ml-2 h-fit",
          "drop-shadow-xl rounded-lg transition-all duration-250",
          "left-[-66px] hover:left-0"
        )}
        style={{
          backgroundColor: "hsl(var(--popover))"
        }}
      >
        <MenubarMenu>
          <MenubarTrigger>首页</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>啊啊啊</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <ChevronRight size={"1rem"} style={{ marginLeft: 6 }} />
      </Menubar>

      <div
        className={cn(
          "fixed top-0 right-0 bg-white flex p-2 px-4 mt-2 mr-2 border",
          "drop-shadow-xl rounded-lg transition-all duration-250",
          "right-[-7%] hover:right-0"
        )}
        style={{
          backgroundColor: "hsl(var(--popover))"
        }}
      >
        <TooltipProvider delayDuration={250}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="mr-4 w-8 h-8 rounded-full "
                onClick={handleTheme}
              >
                {themeMode === "dark" ? (
                  <Moon size={"1rem"} />
                ) : (
                  <Sun size={"1rem"} />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>主题色</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="mr-4 w-8 h-8 rounded-full "
              >
                <Settings size={"1rem"} className="dc" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>操作</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://avatars.githubusercontent.com/u/68881895" />
                <AvatarFallback>杨</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>用户</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
