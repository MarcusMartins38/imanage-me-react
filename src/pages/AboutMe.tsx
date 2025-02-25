import AboutMeBackground from "../assets/hacker_bro.png";
import GithubIcon from "../assets/icons/GithubIcon";
import LinkedinIcon from "../assets/icons/LinkedinIcon";
import MarcusProfile from "../assets/marcus_profile.jpg";

export default function AboutMe() {
    return (
        <main className="m-auto max-w-screen-lg px-4">
            <section className="flex items-center mb-8">
                <div className="px-10 w-full flex flex-col gap-2">
                    <h4 className="font-bold text-[18px]">Hello, I am</h4>
                    <h2 className="font-bold text-[32px]">Marcus Martins</h2>
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
                                className="text-[#71b7fb]"
                            />
                        </a>
                        <a
                            className="hover:opacity-80 transition-all duration-300"
                            target="_blank"
                            href="https://github.com/MarcusMartins38"
                        >
                            <GithubIcon size={32} className="text-[#f0f6fc]" />
                        </a>
                    </div>
                </div>
                <img src={AboutMeBackground} alt="" className="w-[30rem]" />
            </section>

            <section className="flex items-center">
                <img
                    src={MarcusProfile}
                    alt="Owner Profile"
                    className="w-[20rem] rounded-full"
                />
                <div className="flex flex-col gap-4 px-10 max-w-xl">
                    <h2 className="font-bold text-[32px]">About Me</h2>
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
        </main>
    );
}
