export default function copywriterPage() {
  const writerList = [];

  return (
    <div className="w-[85vw] mx-auto pt-[100px]">
      <div className="w-full br">
        <div className="writer_box flex flex-wrap"></div>
      </div>
      <div className="h-[1500px] br">

      </div>
    </div>
  );
}




export function getServerSideProps() {
  return {
    props: {},
  };
}