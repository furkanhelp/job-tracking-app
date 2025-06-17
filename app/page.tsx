import Logo from '../assets/logo.svg';
import Image from "next/image";
import LandingImg from "../assets/main.svg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <main>
      <header className="max-w-2xl max-auto px-4 sm:px-2 py-2">
        <Image src={Logo} alt="logo" />
      </header>
      <section className="min-h-screen flex items-center justify-center px-4 ">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="text-left">
            <h1 className="text-5xl font-bold  mb-4">
              Job Tracking App
            </h1>
            <p className=" mb-6 leading-loose max-w-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              sit, minima, eos esse omnis iste rem nobis perspiciatis soluta
              quia perferendis cupiditate ut ea asperiores natus incidunt quos
              repellat vitae?
            </p>
            <Button asChild className="mt-4">
              <Link href="/add-job">Get Started</Link>
            </Button>
          </div>

          {/* Right image */}
          <div className="hidden lg:flex justify-center">
            <Image
              src={LandingImg}
              alt="landing"
              className="w-[900px] h-auto object-contain hidden lg:block"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
