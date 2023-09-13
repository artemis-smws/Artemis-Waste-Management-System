export async function fetchData() {
  const highestData: any = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/highest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const highestDataJSON = await highestData.json();
  localStorage.setItem("highest_weight", highestDataJSON[0].overall_weight);
  const date = new Date(highestDataJSON[0].createdAt.seconds * 1000)
    .toUTCString()
    .slice(5, 11);
  localStorage.setItem("highest_day", date);

  const lowestData: any = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/lowest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const lowestDataJSON = await lowestData.json();
  localStorage.setItem("lowest_weight", lowestDataJSON[0].overall_weight);
  const date1 = new Date(lowestDataJSON[0].createdAt.seconds * 1000)
    .toUTCString()
    .slice(5, 11);
  localStorage.setItem("lowest_day", date1);

  const monthlyData = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/status/monthly/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const monthlyDataJSON = await monthlyData.json();
  localStorage.setItem("average", monthlyDataJSON[0].average.toFixed(2));
  localStorage.setItem('monthly_food_waste', monthlyDataJSON[0].types.food_waste)
  localStorage.setItem('monthly_recyclable', monthlyDataJSON[0].types.recyclable)
  localStorage.setItem('monthly_residual', monthlyDataJSON[0].types.residual)
  localStorage.setItem('monthly_overall', monthlyDataJSON[0].types.overall_total)
  const buildingList = Object.keys(monthlyDataJSON[0].buildings)
  localStorage.setItem('buildingDataObj', JSON.stringify(monthlyDataJSON[0].buildings))
  localStorage.setItem('buildingList', JSON.stringify(buildingList))
  const totalWeightLast7Days = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/latest/7days",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const totalWeightLast7DaysJSON = await totalWeightLast7Days.json();
  const months_list = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'];
  const total_weights: any = [];
  const days_list: any = [];
  let overall_weight = 0;
  totalWeightLast7DaysJSON.forEach((doc: any) => {
    total_weights.push(doc.overall_weight);
    const timestamp = doc.createdAt;
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds)
    const day = date.getDate()
    const month = date.getMonth()
    days_list.push(`${months_list[month]} ${day}`);
  });
  total_weights.forEach((weight: any) => {
    overall_weight += weight;
  })
  localStorage.setItem("overall_weight", JSON.stringify(overall_weight));
  localStorage.setItem("total_weights", total_weights);
  localStorage.setItem("days_list", days_list);
  const latestDocData = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/waste/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const latestDocDataJSON = await latestDocData.json();
  localStorage.setItem("today_weight", latestDocDataJSON[0].overall_weight);

  const totalWeightPerTypes = await fetch(
    "https://us-central1-artemis-b18ae.cloudfunctions.net/server/status/latest",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const totalWeightPerTypesJSON = await totalWeightPerTypes.json();
  console.log(totalWeightPerTypesJSON)
  localStorage.setItem("overall_food_waste", totalWeightPerTypesJSON[0].overall_food_waste_weight);
  localStorage.setItem("overall_residual_waste", totalWeightPerTypesJSON[0].overall_residual_weight)
  localStorage.setItem("overall_recyclable_waste", totalWeightPerTypesJSON[0].overall_recyclable_weight)
  return true;
}