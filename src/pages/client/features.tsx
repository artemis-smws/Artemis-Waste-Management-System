import Card from "../../components/card";
import SimpleCard from "../../components/simpleCard";

interface Props {
  className: string;
}

export default function Features({ className }: Props) {
  const divStyle: React.CSSProperties = {
    minHeight: "250px",
    maxHeight: "80%",
    minWidth: "80%",
  };

  return (
    <div
      id="features"
      style={{
        backgroundImage: "url(./assets/img/layered-peaks-border.svg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
      className={className + " py-5 bg-tertiary-grey"}
    >
      <h1 className="text-white" style={{ fontWeight: "bold" }}>
        KEY FEATURES
      </h1>
      <div className="row row-cols-3 g-3 w-100 h-100">
        <div className="d-flex flex-column justify-content-evenly align-items-center col h-100">
          <SimpleCard>
            <img
              className="mb-3"
              src="./assets/img/dashboard-icon.png"
              alt="bsu logo"
              style={{ maxHeight: "20%" }}
            />
            <h4>Web Dashboard</h4>
            <p className="w-75">
              Analyze waste management data through charts. Easily monitor waste
              management status through out the environment at the same time
              easily track reports.
            </p>
          </SimpleCard>
          <SimpleCard>
            <img
              className="mb-3"
              src="./assets/img/website-icon.png"
              alt="bsu logo"
              style={{ maxHeight: "20%" }}
            />
            <h4>Public Website</h4>
            <p className="w-75">
              Available for all to monitor the current waste management status
              of the campus.
            </p>
          </SimpleCard>
        </div>
        <div className="d-flex flex-column justify-content-evenly align-items-center col h-100">
          <SimpleCard>
            <img
              className="mb-3"
              src="./assets/img/playstore-icon.png"
              alt="bsu logo"
              style={{ maxHeight: "20%" }}
            />
            <h4>ArteMIS: Mobile</h4>
            <p className="w-75">
              Also accessible for everyone with ease. Send real-time reports to
              facility personals about ongoing problems in the environment. As
              an admin, easily input your data through the mobile's user
              interface.
            </p>
          </SimpleCard>
          <SimpleCard>
            <img
              className="mb-3"
              src="./assets/img/trash-bin-icon.png"
              alt="bsu logo"
              style={{ maxHeight: "20%" }}
            />
            <h4>ArteMIS: IoT Trashbin</h4>
            <p className="w-75">
              Trash bin that is connected to the ArteMIS ecosystem. The trashbin
              can gather information on its current status and send it realtime.
            </p>
          </SimpleCard>
        </div>
        <div className="d-flex flex-column justify-content-evenly align-items-center col h-100">
          <SimpleCard>
            <img
              className="mb-3"
              src="./assets/img/realtime-data-icon.png"
              alt="bsu logo"
              style={{ maxHeight: "20%" }}
            />
            <h4>Realtime Data Stream</h4>
            <p className="w-75">
              Monitor certain data realtime within the web dashboard or the
              mobile dashboard. Never bother calculating and checking on the
              daily logs again.
            </p>
          </SimpleCard>
          <SimpleCard>
            <img
              className="mb-3"
              src="./assets/img/maps-icon.png"
              alt="bsu logo"
              style={{ maxHeight: "20%" }}
            />
            <h4>Maps View</h4>
            <p className="w-75">
              See the ArteMIS ecosystem implemented within the surroundings.
              Overlook status of the trash bins in the area and interact with it physically.
            </p>
          </SimpleCard>
        </div>
      </div>
    </div>
  );
}
