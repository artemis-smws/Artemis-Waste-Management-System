interface Props {
  className: string;
}

export default function About({ className }: Props) {
  const style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "50% 25% 25%",
    padding: "200px 10px",
  };
  return (
    <div id="about" style={style} className={className}>
      <div className="d-flex flex-column justify-content-start h-100 mt-5 px-5 ">
        <h1 style={{ fontSize: "60px" }} className="text-wrap">
          Sustainable <span id="inline-text-style"> environment </span> for a
          better world
        </h1>
      </div>
      <div className="d-flex flex-column justify-content-evenly h-100">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nibh
          et tellus lobortis volutpat at in elit. Aenean sed neque sapien.
          Pellentesque vulputate ipsum vitae ante mollis, vel pulvinar dui
          egestas. Fusce ipsum est, ornare ac purus vel, rutrum auctor sem.
          Aliquam erat volutpat
        </p>
        <h2>
          GAIA -{" "}
          <span id="inline-text-style"> Management Information System </span>
        </h2>
      </div>
      <div className="d-flex flex-column justify-content-evenly h-100 px-5 ">
        <img src="./about-img.png" alt="about img" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ut nibh
          et tellus lobortis volutpat at in elit. Aenean sed neque sapien.{" "}
        </p>
      </div>
    </div>
  );
}
