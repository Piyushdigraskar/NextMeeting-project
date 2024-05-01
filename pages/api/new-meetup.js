//  /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const { title, image, address, description } = data;

        const client = await MongoClient.connect(`mongodb+srv://Apple:1234@cluster0.jizqfv7.mongodb.net/meetups?retryWrites=true&w=majority`)
        const db = client.db();

        const meetupCollections = db.collection('meetups');
        const result = await meetupCollections.insertOne({ title, image, address, description } );

        client.close();
        res.status(201).json({message: 'Meetup inserted successfully'});
    }
}

export default handler;