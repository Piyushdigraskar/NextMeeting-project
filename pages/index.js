
import MeetupList from "../components/meetups/MeetupList";

const Dummy_Array = [
    {
        id: 'm1',
        title: 'A first Mettup',
        image: 'https://cdn.pixabay.com/photo/2016/11/22/07/27/purdue-university-1848563_640.jpg',
        address: 'new Delhi ,2213432 ,new street',
        description: 'A First meet Here'
    },
    {
        id: 'm2',
        title: 'A second Mettup',
        image: 'https://cdn.pixabay.com/photo/2016/11/22/07/27/purdue-university-1848563_640.jpg',
        address: 'mumbai ,221312 ,new street',
        description: 'A second meet Here'
    },
    {
        id: 'm3',
        title: 'A Third Mettup',
        image: 'https://cdn.pixabay.com/photo/2016/11/22/07/27/purdue-university-1848563_640.jpg',
        address: 'old Delhi ,2213431 ,oldstreet',
        description: 'A third meet Here'
    }
]


const HomePage = (props) => {

    return <MeetupList meetups={props.meetups} />

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

export async function getStaticProps(){
    return {
        props: {
            meetups: Dummy_Array
        },
        revalidate: 10
    };
}

export default HomePage;