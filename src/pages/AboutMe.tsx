import { useSelector } from "react-redux";
import AboutMeBackground from "../assets/hacker_bro.png";
import GithubIcon from "../assets/icons/GithubIcon";
import LinkedinIcon from "../assets/icons/LinkedinIcon";
import MarcusProfile from "../assets/marcus_profile.jpg";
import { RootState } from "../redux/store";
import InfoCard from "../components/InfoCard";
import ComputerIcon from "../assets/icons/ComputerIcon";
import ReactIcon from "../assets/icons/ReactIcon";
import NodeIcon from "../assets/icons/NodeIcon";
import AdviceMessage from "../components/AdviceMessage";

export default function AboutMe() {
    const theme = useSelector((state: RootState) => state.ui.theme);

    return (
        <main className="m-auto max-w-screen-lg px-4 py-8">
            <section
                className="flex flex-col lg:flex-row items-center mb-8"
                data-testid="aboutme-introduction-testid"
            >
                <div className="px-10 w-full flex flex-col gap-2">
                    <h4 className="font-bold text-[18px] text-[#FFA688]">
                        Hello, I am
                    </h4>
                    <h2 className="font-bold text-[32px] text-[#FFA688]">
                        Marcus Martins
                    </h2>
                    <p>
                        I'm a Software Engineer with a degree in Computer
                        Science, specializing in React and TypeScript.
                    </p>
                    <div className="flex flex-row items-center">
                        <a
                            className="hover:opacity-80 transition-all duration-300 mr-1"
                            target="_blank"
                            href="https://www.linkedin.com/in/marcus-martins-software-engineer/?locale=en_US"
                        >
                            <LinkedinIcon
                                size={32}
                                className={`${theme === "dark" ? "text-[#71b7fb]" : "text-[#0E73AA]"}`}
                            />
                        </a>
                        <a
                            className="hover:opacity-80 transition-all duration-300"
                            target="_blank"
                            href="https://github.com/MarcusMartins38"
                        >
                            <GithubIcon
                                size={32}
                                className={`${theme === "dark" ? "text-[#f0f6fc]" : "text-[#2C2C3A]"}`}
                            />
                        </a>
                    </div>
                </div>
                <img src={AboutMeBackground} alt="" className="w-[30rem]" />
            </section>

            <section className="flex flex-col-reverse lg:flex-row items-center">
                <img
                    src={MarcusProfile}
                    alt="Owner Profile"
                    className="w-[20rem] rounded-full"
                />
                <div className="flex flex-col gap-4 px-10 max-w-xl">
                    <h2 className="font-bold text-[32px] text-[#FFA688]">
                        About Me
                    </h2>
                    <p>
                        I'm a Software Engineer with a strong focus on React.js
                        and Typescript. I have a passion for creating beautiful
                        and intuitive user interfaces, leading significant
                        design changes to make them both user-friendly and
                        visually appealing.
                    </p>
                    <p>
                        Actually, I love JavaScript/Typescript in general, so
                        I've already worked with Node.js using the Express.js
                        framework and NestJS as well. I've also had to work with
                        other languages, such as PHP with Laravel and Python
                        with Django. I believe we should make the best use of
                        the tools we have, so adapting and overcoming challenges
                        we face daily is not a problem for me.
                    </p>
                </div>
            </section>

            <section className="flex flex-col lg:flex-row items-center justify-between lg:my-24">
                <InfoCard
                    className="my-6 lg:my-0 max-w-80"
                    svg={<ComputerIcon size={100} />}
                    title="Computer Science"
                    description="I graduated in early 2023. By then, I was already
                        working as a Software Engineer. My graduation was
                        slightly delayed due to the pandemic."
                />

                <InfoCard
                    className="my-6 lg:my-0 max-w-80"
                    color="#00D8FF"
                    svg={<ReactIcon size={100} />}
                    title="Web Development"
                    description="My specialty is Frontend development, and I love working
                        with React. I've been using it with TypeScript for over
                        four years, and want to learn and improve more my
                        skills."
                />

                <InfoCard
                    className="my-6 lg:my-0 max-w-80"
                    color="#6cc24a"
                    svg={<NodeIcon size={100} />}
                    title="FullStack"
                    description="A big part of my experience also involves backend
                        development, strengthening my adaptability. I love the
                        JavaScript/TypeScript ecosystem, so working on the
                        backend is no problem for me."
                />
            </section>

            <AdviceMessage className="m-auto w-auto" />
        </main>
    );
}
