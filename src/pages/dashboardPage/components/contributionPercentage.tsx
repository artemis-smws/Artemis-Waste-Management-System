export default function ContributionPercentage() {
    const campus = localStorage.getItem('campus') || "Alangilan";
  return (
    <div className="w-full h-full flex flex-col justify-evenly items-center p-3">
      <h2>Top Performing Campus</h2>
      <h3>{campus}</h3>
      <p className="m-0">
        Percentage to overall waste production in the Philippines
      </p>
      <h1>{"0.0004%"}</h1>
      <p className="m-0">
        Based on 2.7M tons average of the Philippines in 2022
      </p>
    </div>
  );
}
