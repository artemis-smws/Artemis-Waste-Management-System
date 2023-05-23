import Card from "../../components/card";
import Footer from "../../components/layout/footer";

interface Props {
  className?: string;
}
export default function Contact({ className }: Props) {
  const divStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    padding: "10px",
  };
  const bodyTextStyle: React.CSSProperties = {
    margin: "0",
    color : 'white'
  };

  return (
    <section
      style={{ display: "grid", gridTemplateColumns: "75% 30%" }}
      className={
        "justify-content-end align-items-end bg-tertiary-grey " + className
      }
    >
      <div className="h-100 d-flex flex-column justify-content-end align-items-center ">
        <h1 className="py-3">
          Arte<span className="text-green">MIS</span> Team
        </h1>
        <section
          style={{ borderRadius: "0 30px 30px 0" }}
          className="h-100 p-3 bg-green d-flex flex-column justify-content-evenly align-items-center w-100">
          <div style={divStyle}>
            <Card
              img="./assets/img/profile-placeholder.png"
              className="contactCard"
              cardHeader="Kairus Noah E. Tecson"
            >
              <p style={bodyTextStyle}>Project Leader</p>
              <p style={bodyTextStyle}>Lead Programmer</p>
            </Card>
            <Card
              img="./assets/img/profile-placeholder.png"
              className="contactCard"
              cardHeader="John Luis Gomez"
            >
              <p style={bodyTextStyle}>UI/UX Designer</p>
              <p style={bodyTextStyle}>IoT Engineer</p>
            </Card>
            <Card
              img="./assets/img/profile-placeholder.png"
              className="contactCard"
              cardHeader="Nino Andrey Amboy"
            >
              <p style={bodyTextStyle}>Data Analyst</p>
              <p style={bodyTextStyle}>Mobile Developer</p>
            </Card>
          </div>
          <div style={divStyle}>
            <Card
              img="./assets/img/profile-placeholder.png"
              className="contactCard"
              cardHeader="John Carlo Endaya"
            >
              <p style={bodyTextStyle}>Documentation</p>
              <p style={bodyTextStyle}>IoT Engineer</p>
            </Card>
            <Card
              img="./assets/img/profile-placeholder.png"
              className="contactCard"
              cardHeader="Joshua Clemente"
            >
              <p style={bodyTextStyle}>Programmer</p>
              <p style={bodyTextStyle}>Web Developer</p>
            </Card>
            <Card
              img="./assets/img/profile-placeholder.png"
              className="contactCard"
              cardHeader="Mark Angelo Maligalig"
            >
              <p style={bodyTextStyle}>Programmer</p>
              <p style={bodyTextStyle}>Mobile Developer</p>
            </Card>
          </div>
        </section>
      </div>

      <aside className="h-100">
        <Footer />
      </aside>
    </section>
  );
}
