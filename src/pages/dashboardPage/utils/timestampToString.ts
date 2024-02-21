type Timestamp = {
    seconds: number;
    nanoseconds: number;
}
export default function TimestampToString(timestamp: Timestamp) {
    const returnData = new Date(timestamp.seconds * 1000)
    .toUTCString()
    .slice(5, 11);
    return returnData
}