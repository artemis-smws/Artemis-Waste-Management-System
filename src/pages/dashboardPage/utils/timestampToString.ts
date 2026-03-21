type FirestoreTimestamp = { seconds: number; nanoseconds: number };

export default function TimestampToString(timestamp: FirestoreTimestamp | string | null | undefined): string {
    if (!timestamp) return "";

    let date: Date;
    if (typeof timestamp === "string") {
        // ISO string e.g. "2024-01-02T08:00:00Z"
        date = new Date(timestamp);
    } else {
        // Firestore Timestamp object { seconds, nanoseconds }
        date = new Date(timestamp.seconds * 1000);
    }

    if (Number.isNaN(date.getTime())) return "";

    // Returns e.g. "02 Jan" — matches original slice(5, 11) output of toUTCString
    return date.toUTCString().slice(5, 11);
}