import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { Fragment } from "react";
import Head from "next/head";

const newMeetUpPage = () => {

    const router = useRouter();
    async function addMeetupHandler(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'content-type': 'application/json'
            }
        });

        const data = await response.json();

        console.log(data);
        router.push('/');
    }

    return <Fragment>
        <Head>
            <title>Add a new Meetup</title>
            <meta name="description" content="Add your own meetups create a new oportunity!"></meta>
        </Head>
        <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
}

export default newMeetUpPage;