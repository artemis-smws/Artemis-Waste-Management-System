interface Props {
  children?: any;
  style?: any;
}

export default function SimpleCard({ style, children }: Props) {
  return (
    <div
      style={{
        ...style,
        objectFit: "contain",
        marginLeft: "auto",
        marginRight: "auto",
        height: '270px',
        width: '400px',
      }}
      className="d-flex rounded py-3 bg-green flex-column justify-content-center align-items-center"
    >
      {children}
    </div>
  );
}
