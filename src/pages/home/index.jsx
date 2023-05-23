import React from "react";

export default function Home(props) {
  return (
    <div className="container bg-gradient-to-r from-cyan-700">
      <div className="flex justify-center py-12">
        <div className="carousel carousel-center py-4 space-x-0.5 bg-neutral">
          <div className="carousel-item">
            <img
              src="/img/plantstrat.jpg"
              className="rounded-box h-96 w-11/12"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/img/tealstrat.jpg"
              className="rounded-box h-96 w-11/12"
            />
          </div>
          <div className="carousel-item">
            <img src="/img/stagebg.jpg" className="rounded-box h-96 w-11/12" />
          </div>
          <div className="carousel-item">
            <img
              src="/img/player-feed.jpg"
              className="rounded-box h-96 w-11/12"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/img/stairwell.jpg"
              className="rounded-box h-96 w-11/12"
            />
          </div>
          <div className="carousel-item">
            <img src="/img/beach.jpg" className="rounded-box h-96 w-11/12" />
          </div>
          <div className="carousel-item">
            <img src="/img/vinylcol.jpg" className="rounded-box h-96 w-11/12" />
          </div>
        </div>
      </div>

      <div className="flex items-center pb-20">
        <div className="ml-12 h-3/6 w-4/6 flex justify-center">
          <img
            src="/img/clifftele.jpg"
            className="rounded-box h-1/2 w-1/2 drop-shadow-2xl"
          />
        </div>

        <div className="mr-20 w-3/6">
          <p className="indent-8 text-xl text-zinc-300">
            Get taught by talented and knowledgable instructors from across the
            globe. Try out our courses on practical music instrument skills...
            Or dive deeper into music theory and the methods to compose your own
            arrangements
          </p>
        </div>
      </div>

      <div
        className="p-28 bg-fixed bg-cover"
        style={{ backgroundImage: "url('/img/studio.jpg')" }}
      >
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 flex items-center">
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-lg leading-7 text-zinc-200">
                  Instructors form across the globe
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-cyan-200 sm:text-5xl">
                  Over 500
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-lg leading-7 text-zinc-200">
                  With given course work from the best instructors.
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-cyan-200 sm:text-5xl">
                  Learn Quick!
                </dd>
              </div>
              <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                <dt className="text-lg leading-7 text-zinc-200">
                  Such as Fender, PRS, and more!
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-cyan-200 sm:text-5xl">
                  International Partners
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
