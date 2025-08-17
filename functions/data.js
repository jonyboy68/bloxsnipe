// functions/data.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using the environment variable
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    // Get the collection name from the query parameters, default to "Snipes"
    const collectionName = event.queryStringParameters.collection || 'Snipes';

    // Fetch data from the specified collection
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => doc.data());

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: `Failed to retrieve data from collection: ${collectionName}` })
    };
  }
};