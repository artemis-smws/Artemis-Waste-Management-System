import Card from "../../components/card";
import Footer from "../../components/layout/footer";

interface Props {
  className?: string;
}
export default function Contact({ className }: Props) {
  const sectionStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "75% 30%",
  };
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
  };

  const cardBodyClassStyle = "bg-red";

  return (
    <section style={sectionStyle} className={"bg-temp-color2 " + className}>
      <div
        className="bg-temp-color h-100"
        style={{ borderRadius: "0 30px 30px 0" }}
      >
        <section className="d-flex flex-column justify-content-evenly align-items-center h-100 w-100">
          <h1>Arte<span style={{color: "#00cb6a"}}>MIS</span> Team</h1>
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
