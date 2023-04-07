interface Props {
  className: string;
}

export default function Features({ className }: Props) {
  const style: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "50% 25% 25%",
    padding: "200px 10px",
  };
  return (
  <div id="about" style={style} className={className}>
    <h1>KEY FEATURES</h1>
  </div>);
}
