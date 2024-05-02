import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

// const Dummy_Array = [
//     {
//         id: 'm1',
//         title: 'A first Mettup',
//         image: 'https://cdn.pixabay.com/photo/2016/11/22/07/27/purdue-university-1848563_640.jpg',
//         address: 'new Delhi ,2213432 ,new street',
//         description: 'A First meet Here'
//     },
//     {
//         id: 'm2',
//         title: 'A second Mettup',
//         image: 'https://cdn.pixabay.com/photo/2016/11/22/07/27/purdue-university-1848563_640.jpg',
//         address: 'mumbai ,221312 ,new street',
//         description: 'A second meet Here'
//     },
//     {
//         id: 'm3',
//         title: 'A Third Mettup',
//         image: 'https://cdn.pixabay.com/photo/2016/11/22/07/27/purdue-university-1848563_640.jpg',
//         address: 'old Delhi ,2213431 ,oldstreet',
//         description: 'A third meet Here'
//     }
// ]


const HomePage = (props) => {

    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of react meetups!"></meta>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    );

}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props: {
//             meetups: Dummy_Array
//         }
//     }
// }

export async function getStaticProps() {
    const client = await MongoClient.connect(`mongodb+srv://Apple:1234@cluster0.jizqfv7.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db();
    const meetupCollections = db.collection('meetups');

    const meetups = await meetupCollections.find().toArray();
    console.log(meetups);
    client.close();
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.data.title,
                address: meetup.data.address,
                image: meetup.data.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    };
}

export default HomePage;