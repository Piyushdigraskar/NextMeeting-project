import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";
import Head from "next/head";

import MeetupDetail from "../../components/meetups/MeetupDetail";
import { Fragment } from "react";

const MeetupDetails = (props) => {
    return (
        <Fragment>
            <Head>
            <title>{props.meetupdata.title}</title>
            <meta name="description" content={props.meetupdata.description}></meta>
        </Head>
            <MeetupDetail
                image={props.meetupdata.image}
                title={props.meetupdata.title}
                address={props.meetupdata.address}
                description={props.meetupdata.description}

            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect(`mongodb+srv://Apple:1234@cluster0.jizqfv7.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();
    const meetupCollections = db.collection('meetups');

    const meetups = await meetupCollections.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: false,
        paths: meetups.map(meetup => ({
            params: { meetupid: meetup._id.toString() }
        }))
    }
}

export async function getStaticProps(context) {

    const meetupId = context.params.meetupid;
    console.log(meetupId);

    const client = await MongoClient.connect(`mongodb+srv://Apple:1234@cluster0.jizqfv7.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();
    const meetupCollections = db.collection('meetups');

    const selectedMeetup = await meetupCollections.findOne({ _id: new ObjectId(meetupId) });

    client.close();

    return {
        props: {
            meetupdata: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.data.title,
                address: selectedMeetup.data.address,
                image: selectedMeetup.data.image,
                description: selectedMeetup.data.description
            }
        }
    }
}

export default MeetupDetails;