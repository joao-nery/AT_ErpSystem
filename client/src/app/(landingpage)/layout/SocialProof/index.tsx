"use client";

import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { CircleUser, Star } from "lucide-react";

import Autoplay from "embla-carousel-autoplay";
import React from "react";

export function SocialProof() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: true,
    })
  );

  return (
    <main className="h-[500px] bg-white dark:bg-neutral-900 w-full flex flex-col justify-center items-center">
      <h1 className="text-xl text-center  font-semibold">
        Quem Usa AT-ERP Recomenda!
      </h1>
      <p className="text-muted-foreground">Avaliação dos nossos clientes</p>
      <section className="w-full p-5 flex mt-10 items-center justify-center">
        <Carousel
          className="max-w-[300px] md:max-w-[500px] lg:max-w-[800px]"
          plugins={[plugin.current]}>
          <CarouselContent>
            <CarouselItem>
              <Card className="p-5 dark:bg-neutral-800">
                <CardTitle className="flex items-center">
                  <div className="flex items-center gap-2">
                    <CircleUser />
                    <p>Maria Silva, Empresária</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                  </div>
                </CardTitle>
                <CardDescription>
                  A interface é super intuitiva e o suporte é excelente.
                  Recomendo para qualquer pequena empresa!
                </CardDescription>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="p-5 dark:bg-neutral-800">
                <CardTitle className="flex ">
                  <div className="flex items-center gap-2">
                    <CircleUser />
                    <p>Maria Silva, Empresária</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                  </div>
                </CardTitle>
                <CardDescription>
                  A interface é super intuitiva e o suporte é excelente.
                  Recomendo para qualquer pequena empresa!
                </CardDescription>
              </Card>
            </CarouselItem>

            <CarouselItem>
              <Card className="p-5 dark:bg-neutral-800">
                <CardTitle className="flex">
                  <div className="flex items-center gap-2">
                    <CircleUser />
                    <p>Maria Silva, Empresária</p>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                    <Star
                      fill="#FFD700"
                      className="text-muted-foreground w-5"
                    />
                  </div>
                </CardTitle>
                <CardDescription>
                  A interface é super intuitiva e o suporte é excelente.
                  Recomendo para qualquer pequena empresa!
                </CardDescription>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
}
