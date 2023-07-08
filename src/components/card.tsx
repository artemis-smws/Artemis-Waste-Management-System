interface Props {
  img: string;
  cardHeader?: string;
  className?: string;
  style?: any;
  children ?: any;
}

export default function Card({
  img,
  cardHeader,
  className,
  style,
  children,
}: Props) {
  return (
    <div className={"card rounded " + className} style={style}>
      <div className="card-img-bg">
        <img src={img} alt="card image" />
      </div>
      <div className={"card-body"}>
        <h5 className="card-title">{cardHeader}</h5>
        <p className="card-text">{children}</p>
      </div>
    </div>
  );
}
