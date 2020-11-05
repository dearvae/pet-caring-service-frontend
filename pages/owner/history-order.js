import HistoryOrderView from '../../src/views/owner/HistoryOrder'

const HistoryOrder = (props) => HistoryOrderView(props);

export async function getServerSideProps() {
    // Fetch data from external API
    try {
        const res = await fetch("http://localhost:5000/owners/bids/dearvae/");
        const data = await res.json();
        // Pass data to the page via props
        return { props: { data } };
    } catch (err) {
        return { props: { data: [] } }
    }
}

export default HistoryOrder;