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
  className = "",
  style,
  children,
}: Props) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden flex flex-col ${className}`} style={style}>
      <div className="w-full aspect-video bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={img} alt="card image" className="object-cover w-full h-full" />
      </div>
      <div className="p-5 flex flex-col flex-1">
        {cardHeader && <h5 className="text-xl font-semibold mb-3">{cardHeader}</h5>}
        <p className="text-gray-600 text-base flex-1">{children}</p>
      </div>
    </div>
  );
}
