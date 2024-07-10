import { AspectRatio } from "@/shadcn-ui/ui/aspect-ratio";
import { cn } from "@/shadcn-ui/libs/utils";
import styles from "./_index.module.css";
import DialogContent from "./_component/DialogContent";
import { useEffect, useRef, useState } from "react";
import axios from "@/api";

let observer = null;
const observerTarget = new WeakMap();

export default function copywriterPage(props) {
  const dialogRef = useRef(null);
  const [currentData, setCurrentData] = useState(null);
  const [writerList, setWriterList] = useState([]);
  // const writerList = props.data;

  useEffect(() => {
    axios.get("/write").then((resp) => {
      setWriterList(resp.data.list);
    });

    // 创建 Intersection Observer 实例
    observer = new IntersectionObserver(
      (entries, observer) => {
        // entries 是观察到的元素的信息数组
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 当目标元素进入视口时触发的操作
            const targetMap = observerTarget.get(entry.target);
            targetMap.handShow?.(); //操作元素展示
            // 这里可以执行加载和渲染的操作，例如替换元素内容、加载数据等
            // 例如：fetchDataAndRender();
            // observer.unobserve(entry.target); // 可选：一次性观察，加载后取消观察
          }
        });
      },
      {
        root: null, // 观察者的根元素，默认为视口
        rootMargin: "0px", // 根元素的边距
        threshold: 0.5 // 当元素可见比例达到 50% 时触发回调
      }
    );
  }, []);

  function onItemsClick(item) {
    setCurrentData(item);
    dialogRef.current.open();
  }

  return (
    <div className="w-[85vw] mx-auto pt-[100px]">
      <div className="w-full">
        <div className={cn(styles.container)}>
          {writerList.map((item) => {
            return (
              <VideoBlock
                item={item}
                onItemsClick={onItemsClick}
                key={item.id}
              ></VideoBlock>
            );
          })}
        </div>
      </div>
      <div className="h-[1500px]"></div>
      <DialogContent ref={dialogRef} className="p-0 bg-transparent">
        <div className={cn("w-[80vw] p-0 ")}>
          <div
            className={cn(
              "flex min-h-[60vh] itrems-center relative",
              "rounded-2xl overflow-hidden ",
              "slideDownAnimation"
            )}
          >
            {currentData && (
              <>
                <div className={cn("w-full")}>
                  <video
                    autoPlay
                    className={cn("object-cover")}
                    src={currentData.media}
                  ></video>
                </div>
                <div
                  className="absolute left-0 right-0 bottom-0 p-4 pt-6 "
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.7) 100%)"
                  }}
                >
                  <p className="text-[rgba(255,255,255,0.8)]">
                    {currentData.describe}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </div>
  );
}

// 视频项 props = {item, onVideoLoaded}
function VideoBlock(props) {
  const item = props.item;
  const videoRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [ifShow, setIfShow] = useState(false);

  useEffect(() => {
    observerTarget.set(videoRef.current, {
      handShow() {
        setIfShow(true);
      }
    });
    observer.observe(videoRef.current);
  }, []);

  return (
    <div
      onClick={() => props.onItemsClick?.(item)}
      key={item.id}
      className={cn(styles.items)}
      ref={videoRef}
    >
      {/* 比例 */}
      <AspectRatio ratio={3 / 4}>
        {/* video 加载完成展示 */}
        {ifShow && (
          <div className={cn(styles.view, loaded ? styles.loaded : "")}>
            <video
              src={item.media}
              className={cn("object-cover h-full", styles.write_video)}
              onLoadedData={() => setLoaded(true)}
            ></video>
            <div className={cn(styles.description)}>
              <p className="h-full w-full overflow-hidden flex items-center">
                <span>{item.describe}</span>
              </p>
            </div>
          </div>
        )}
      </AspectRatio>
    </div>
  );
}

// export async function getServerSideProps() {
//   const fetch = require("../../api/fetch");
//   const data = await fetch("/write");

//   return {
//     props: {
//       data
//     }
//   };
// }
