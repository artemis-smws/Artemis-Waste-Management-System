import Card from "../card";

interface Props {
  className: string
}

export default function Features({ className }: Props) {

  const cardBodyClassStyle = "bg-green";

  return (
    <div id="features" className={className + " py-5 "}>
      <h1 style={{ fontWeight: "bold" }}>KEY FEATURES</h1>
      <section className="w-100 h-100 d-flex align-items-center justify-content-evenly">
        <Card
          cardHeader="Website Admin Dashboard"
          img="./dashboard-card-img.png"
          className="featureCard mx-1"
        >
          The web admin dashboard is the central hub for managing and monitoring
          all aspects of your waste management system. From tracking waste
          production rate to monitoring ArteMIS Trash bins status.
        </Card>
        <Card
          cardHeader="Real Time Mapping"
          img="./map-card-img.png"
          className="featureCard mx-1"
        >
          Look on where your ArteMIS is located in our Real-time maps. Monitor your ArteMIS 
          trash bin's status at the same time be informed on it's activity
        </Card>
        <Card
          cardHeader="ArteMIS is now in Mobile!"
          img="./mobile-card-img.png"
          className="featureCard mx-1"
        >
          Access ArteMIS not only through the Web but also through the access of your phones.
          Monitor and analyze ArteMIS with ease of access. If you're a volunteer, easily 
          send waste information and get notification about the ArteMIS bin updates. 
          <button className="btn btn-success my-3">Download ArteMIS - Mobile now!</button>
        </Card>
        <Card
          cardHeader="IoT ArteMIS trash bin"
          img="./iot-card-img.png"
          className="featureCard mx-1"
        >
          Throw your waste in a modern way. ArteMIS trash bin easily monitors capacity 
          of the bin and alerts the ArteMIS System about its status in real-time. Track
          where your bin is placed through its built-in GPS.
        </Card>
        <Card
          cardHeader="ArteMIS Website"
          img="./web-card-img.png"
          className="featureCard mx-1"
        >
          Access ArteMIS through your favorite browser. You can now also monitor the status 
          of the ArteMIS trash bins installed within the environment. Get to monitor 
          the status of your environment covered by the ArteMIS ecosystem. 
        </Card>
      </section>
    </div>
  );
}
