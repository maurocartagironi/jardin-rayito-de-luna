import admin from "firebase-admin";
import serviceAccount from "./firebase-key.json" assert { type: "json" };
import data from "./data.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const convertTimestamps = (obj) => {
  for (const key in obj) {
    if ((key === "createddate" || key === "modifieddate") && typeof obj[key] === "string") {
      obj[key] = admin.firestore.Timestamp.fromDate(new Date(obj[key]));
    }
    if (typeof obj[key] === "object" && obj[key] !== null) {
      convertTimestamps(obj[key]);
    }
  }
};

const importData = async () => {
  for (const collection in data) {
    const documents = data[collection];
    for (const docId in documents) {
      const docData = documents[docId];
      convertTimestamps(docData);
      await db.collection(collection).doc(docId).set(docData);
      console.log(`📥 Documento "${docId}" importado en colección "${collection}"`);
    }
  }

  console.log("✅ Importación completada.");
};

importData();
