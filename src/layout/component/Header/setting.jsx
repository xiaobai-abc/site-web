import { Button } from "@/shadcn-ui/ui/button";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/shadcn-ui/ui/sheet";
import { forwardRef, useState, useImperativeHandle, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorThemeSlice,
  getThemeColorList,
  setThemeColor
} from "@/store/modules/themeSlice";

export default forwardRef(function SheetDemo(props, ref) {
  const [sheetOpen, setOpen] = useState(false);
  const { themeColor } = useSelector(selectorThemeSlice);
  const dispatch = useDispatch();
  const colorList = useSelector(getThemeColorList);

  useEffect(() => {
   
  }, []);

  useImperativeHandle(ref, () => ({
    open() {
      setOpen(true);
    },
    close() {
      setOpen(false);
    }
  }));

  return (
    <Sheet open={sheetOpen} onOpenChange={setOpen}>
      <SheetContent aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>基本配置</SheetTitle>
        </SheetHeader>
        <div className="mt-2">
          <div>
            <span className="text-sm text-foreground">颜色配置</span>
            <span className="ml-2 text-sm">{themeColor.name}</span>
          </div>
          <div className="mt-2 flex flex-wrap">
            {colorList.map((item) => {
              return (
                <div
                  key={item.name}
                  onClick={(e) => {
                    dispatch(setThemeColor(item));
                  }}
                  className="w-5 h-5 mr-2 mb-2 cursor-pointer transition-all hover:scale-125 hover:shadow-lg"
                  style={{
                    backgroundColor: `hsl(${item.showColor})`
                  }}
                ></div>
              );
            })}
          </div>
        </div>
        {/* <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
});
