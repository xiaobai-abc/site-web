import { useEffect, useRef } from "react";

export default function TestPage() {
  const htmlRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <div className="w-full pt-[120px]">
      <div className="w-[70vw] br mx-auto"></div>
    </div>
  );
}

export async function getServerSideProps() {
  const fetch = require("../../api/fetch");

  // const mdHtml = await fetch("/home/md");

  return {
    props: {
      markdown: {}
    }
  };
}
