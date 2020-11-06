import carerProfileView from '../../src/views/carer/Profile'

const carerProfile = (props) => carerProfileView(props);

const placeholderData = [
    {
        rating: '4.7',
        is_fulltime: true,
        phone: '83201231', 
        area: 'Jurong West'
    },
]
export async function getServerSideProps() {
    // Fetch data from external API
    try {
        const res = await fetch(`${process.env.API_PATH}/carers/gycc/`);
        const data = await res.json();
        // Pass data to the page via props
        return { props: { data } };
    } catch (err) {
        return { props: { data: placeholderData } }
    }
}
export default carerProfile;

