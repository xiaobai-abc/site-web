import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/shadcn-ui/ui/tooltip";
import { Button } from "@/shadcn-ui/ui/button";
import { Settings, ChevronRight, Sun, Moon } from "lucide-react";
import { cn } from "@/shadcn-ui/libs/utils";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorThemeSlice, setThemeMode } from "@/store/modules/themeSlice";
import SheetDemo from "./setting";
 
import NavCom from "./Nav";

export default function Header() {
  const dispatch = useDispatch();
  const { themeMode } = useSelector(selectorThemeSlice);
  const [open, setOpen] = useState(false);
  const sheetRef = useRef();


  useEffect(() => {}, []);

  // 点击设置
  function onClickSetting() {
    sheetRef.current.open();
  }

  function onItem(path, sub) {
    console.log(path, sub);
  }

  // 切换主题
  function handleTheme() {
    dispatch(setThemeMode(themeMode == "dark" ? "light" : "dark"));
  }

  return (
    <>
      <header className=" ">
        {/* <span className="text-xl font-sans font-bold">xiaobai-abc admin</span> */}
        {/* <NavCom></NavCom> */}
        {/* <Menubar
          className={cn(
            "fixed -top-10 flex p-2 mt-2 h-fit mx-auto z-[50]",
            "drop-shadow-xl rounded-lg transition-all duration-250",
            "hover:top-0 bg-background left-[50%] translate-x-[-50%]"
          )}
          onValueChange={onItem}
        >
          {Nav.map((item) => {
            return (
              <MenubarMenu value={item.key} key={item.key}>
                <MenubarTrigger>
                  <Link href={item.key}>{item.title}</Link>
                </MenubarTrigger>
              </MenubarMenu>
            );
          })}
        </Menubar> */}
        {/* <ChevronRight size={"1rem"} style={{ marginLeft: 6 }} /> */}

        <div
          className={cn(
            "fixed top-0 right-0  flex p-2 px-4 mt-2 mr-2 border z-[50]",
            "drop-shadow-xl rounded-lg transition-all duration-250",
            "right-[-7%] hover:right-0 bg-background"
          )}
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
                  className="mr-4 w-8 h-8 rounded-full"
                  onClick={onClickSetting}
                >
                  <Settings size={"1rem"} className="dc" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>操作</TooltipContent>
            </Tooltip>
            {/* <Tooltip>
              <TooltipTrigger asChild>
                <Avatar className="w-8 h-8">
                  <AvatarImage src="https://avatars.githubusercontent.com/u/68881895" />
                  <AvatarFallback>杨</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>用户</TooltipContent>
            </Tooltip> */}
          </TooltipProvider>
        </div>
      </header>

      <SheetDemo open={open} ref={sheetRef}></SheetDemo>
    </>
  );
}
