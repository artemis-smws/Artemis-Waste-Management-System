import Card from "../card";

interface Props {
  className: string;
}

export default function Features({ className }: Props) {
  const style: React.CSSProperties = {
    display: "grid",
    width: "100%",
    height: "100%",
    gridTemplateColumns: "33% 33% 33%",
    padding: "10px 10px",
  };
  const cardBodyClassStyle = "bg-green"

  return (
    <div id="features" className={className + " py-5"}>
      <h1 style={{ fontWeight: "bold" }}>KEY FEATURES</h1>
      <div style={style}>
        {/* row 1 */}
        <section className="d-flex flex-column align-items-center justify-content-center h-100">
          <Card
            cardHeader="REAL TIME MAPPING"
            img="./dashboard-card-img.png"
            className="landingPageCard w-100 h-100"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
            nibh et tellus lobortis volutpat at in elit. Aenean sed neque
            sapien.t
          </Card>
        </section>
        {/* row 2 */}
        <section className="d-flex flex-column justify-content-between align-items-center h-100">
          <Card
            cardHeader="REAL TIME MAPPING"
            img="./map-card-img.png"
            className="landingPageCard"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
            nibh et tellus lobortis volutpat at in elit. Aenean sed neque
            sapien.t
          </Card>
          <Card
            cardHeader="REAL TIME MAPPING"
            img="./mobile-card-img.png"
            className="landingPageCard"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
            nibh et tellus lobortis volutpat at in elit. Aenean sed neque
            sapien.t
          </Card>
        </section>
        {/* row 3 */}
        <section className="d-flex flex-column justify-content-between align-items-center h-100">
          <Card
            cardHeader="REAL TIME MAPPING"
            img="./iot-card-img.png"
            className="landingPageCard"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
            nibh et tellus lobortis volutpat at in elit. Aenean sed neque
            sapien.t
          </Card>
          <Card
            cardHeader="REAL TIME MAPPING"
            img="./web-card-img.png"
            className="landingPageCard"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut
            nibh et tellus lobortis volutpat at in elit. Aenean sed neque
            sapien.t
          </Card>
        </section>
      </div>
    </div>
  );
}
