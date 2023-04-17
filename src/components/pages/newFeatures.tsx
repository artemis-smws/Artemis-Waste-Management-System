import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import React, { useRef } from "react";
import Card from "../card";

interface Props {
  className: string;
}

export default function NewFeatures({ className }: Props) {
  const sectionBootstrap =
    "h-100 w-100 d-flex flex-column align-items-center justify-content-center";
  const ref: any = useRef();

  return (
    <div id="features" className={className + " py-3"}>
      <h1>Key Features</h1>
      <Parallax pages={5} ref={ref} horizontal>
        <ParallaxLayer offset={0}>
          <section
            onClick={() => {
              ref.current.scrollTo(1);
            }}
            className={sectionBootstrap}
          >
            <Card
              cardHeader="Website Admin Dashboard"
              img="./dashboard-card-img.png"
              className="featureCard mx-1"
            >
              The web admin dashboard is the central hub for managing and
              monitoring all aspects of your waste management system. From
              tracking waste production rate to monitoring ArteMIS Trash bins
              status.
            </Card>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={1}>
          <section
            onClick={() => {
              ref.current.scrollTo(2);
            }}
            className={sectionBootstrap}
          >
            <Card
              cardHeader="Real Time Mapping"
              img="./map-card-img.png"
              className="featureCard mx-1"
            >
              Look on where your ArteMIS is located in our Real-time maps.
              Monitor your ArteMIS trash bin's status at the same time be
              informed on it's activity
            </Card>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={2}>
          <section
            onClick={() => {
              ref.current.scrollTo(3);
            }}
            className={sectionBootstrap}
          >
            <Card
              cardHeader="ArteMIS is now in Mobile!"
              img="./mobile-card-img.png"
              className="featureCard mx-1"
            >
              Access ArteMIS not only through the Web but also through the
              access of your phones. Monitor and analyze ArteMIS with ease of
              access. If you're a volunteer, easily send waste information and
              get notification about the ArteMIS bin updates.
              <button className="btn btn-success my-3">
                Download ArteMIS - Mobile now!
              </button>
            </Card>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={3}>
          <section
            onClick={() => {
              ref.current.scrollTo(4);
            }}
            className={sectionBootstrap}
          >
            <Card
              cardHeader="IoT ArteMIS trash bin"
              img="./iot-card-img.png"
              className="featureCard mx-1"
            >
              Throw your waste in a modern way. ArteMIS trash bin easily
              monitors capacity of the bin and alerts the ArteMIS System about
              its status in real-time. Track where your bin is placed through
              its built-in GPS.
            </Card>
          </section>
        </ParallaxLayer>
        <ParallaxLayer offset={4}>
          <section
            onClick={() => {
              ref.current.scrollTo(0);
            }}
            className={sectionBootstrap}
          >
            <Card
              cardHeader="ArteMIS Website"
              img="./web-card-img.png"
              className="featureCard mx-1"
            >
              Access ArteMIS through your favorite browser. You can now also
              monitor the status of the ArteMIS trash bins installed within the
              environment. Get to monitor the status of your environment covered
              by the ArteMIS ecosystem.
            </Card>
          </section>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}
