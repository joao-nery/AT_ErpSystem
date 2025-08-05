import { Button } from "@/components/ui/button";

import Link from "next/link";

export function Hero() {
  return (
    <main className="h-[calc(100dvh-64px)] flex items-center justify-center">
      <section className="flex flex-col justify-center items-center gap-10">
        <h1
          className="
        text-4xl  w-[398px]
        md:text-5xl  md:w-[650px]
        lg:text-6xl  lg:w-[750px]
        xl:text-7xl xl:w-[1150px]
        text-center font-bold
        ">
          Um projeto OpenSource que viza ajudar aqueles que não podem!
        </h1>

        {/* <Image
          src="/Macbook Pro.png"
          width="400"
          height="0"
          alt="Macbook Pro"
          className="
            w-[340px]
            md:w-[460px]
            lg:w-[560px]
          "
        /> */}

        <Button
          className="
            w-[200px] h-[50px] rounded-[60px]
            md:w-[250px] md:h-[70px] md:text-lg
            xl:w-[300px] xl:h-[80px] xl:text-xl
          bg-rose-600 hover:bg-rose-700">
          <Link href="pages/register" className="">
            Acesse grátis agora!
          </Link>
        </Button>
      </section>
    </main>
  );
}
