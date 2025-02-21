import Sidebar from "../components/Sidebar";
import AboutMeBackground from "../assets/Hacker-bro.png";

export default function AboutMe() {
  return (
    <div>
      <Sidebar />

      <main>
        <img src={AboutMeBackground} alt="" />
      </main>
    </div>
  );
}
