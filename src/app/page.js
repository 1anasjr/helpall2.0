import Image from "next/image";
import Slider from "./components/Slider";
import Feed from "./components/Feed";



export default function Home() {
  return (
    <main>
       <Slider/>
       <Feed/> 
    </main>
  );
}
