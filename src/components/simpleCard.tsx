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
      className="flex rounded-md py-3 bg-green-600 text-white flex-col justify-center items-center"
    >
      {children}
    </div>
  );
}
