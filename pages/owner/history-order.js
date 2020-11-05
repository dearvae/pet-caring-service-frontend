import HistoryOrder from '../../src/views/owner/HistoryOrder'

export default (props) => HistoryOrder(props)

export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch("http://localhost:5000/owners/bids/dearvae/")
    const data = await res.json()

    // Pass data to the page via props
    return { props: { data } }
}
