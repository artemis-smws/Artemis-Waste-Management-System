import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import db from "../services/firestore";

type TimeFilterOptions = "latest" | "sevenDays" | "thirtyDays"

export default async function webSocketFetchData(timeFilter: TimeFilterOptions) {
  let q: any;
  const wasteRef = collection(db, "waste");
  localStorage.clear()
  
  if (timeFilter == "latest") {
    q = query(wasteRef, orderBy("createdAt", "desc"), limit(1));
  }
  if (timeFilter == "sevenDays") {
    q = query(wasteRef, orderBy("createdAt", "desc"), limit(7));
  }
  if (timeFilter == "thirtyDays") {
    q = query(wasteRef, orderBy("createdAt", "desc"), limit(30));
  }

  const data : any = []
  try {
    const docsData = await getDocs(q)
    docsData.forEach(doc => {
      data.push({...doc.data() as object, id : doc.id})
    })
  } catch(e : any) {
    data.push({error : e.message})
  }
  
  console.log(data)
  
  return data
}
