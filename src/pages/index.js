import Image from "next/image";
import Head from "next/head";
import { useState } from "react";
import axios from "@/api";

export default function Home(props) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div className="box-border">
        网站建设中 ....
        <div>其实第一页不知道放点啥</div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const fetch = require("../api/fetch");
  const data = await fetch("/home");
  console.log(data);
  return {
    props: data
  };
}
