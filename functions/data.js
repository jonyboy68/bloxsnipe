// functions/getData.js
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK using the environment variable
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
});

const db = admin.firestore();

exports.handler = async (event, context) => {
  try {
    const snapshot = await db.collection('your_collection').get();
    const data = snapshot.docs.map(doc => doc.data());
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to retrieve data' })
    };
  }
};