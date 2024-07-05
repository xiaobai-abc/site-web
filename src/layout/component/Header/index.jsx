import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorThemeSlice, setThemeMode } from "@/store/modules/themeSlice";
import SheetDemo from "./setting";
import NavCom from "./Nav";
import axios from "axios";

export default function Header() {
  const dispatch = useDispatch();
  const { themeMode } = useSelector(selectorThemeSlice);
  const sheetRef = useRef();

  useEffect(() => {


  }, []);

  // 点击设置
  function onClickSetting() {
    sheetRef.current.open();
  }

  // 切换主题
  function handleTheme() {
    dispatch(setThemeMode(themeMode == "dark" ? "light" : "dark"));
  }

  return (
    <>
      <header className=" ">
        <NavCom
          themeMode={themeMode}
          onHandleSetting={onClickSetting}
          onThemeToggle={handleTheme}
        ></NavCom>
      </header>

      <SheetDemo ref={sheetRef}></SheetDemo>
    </>
  );
}
