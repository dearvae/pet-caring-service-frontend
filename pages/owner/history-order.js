import HistoryOrderView from '../../src/views/owner/HistoryOrder'

const HistoryOrder = (props) => HistoryOrderView(props);

const placeholderData = [
    {
      start_date: '2020-10-03T16:00:00.000Z',
      end_date: '2020-10-07T16:00:00.000Z',
      carer_name: 'zz',
      owner_name: 'dearvae',
      pname: 'kuaikuai',
      bid_date: '2020-09-19T16:00:00.000Z',
      daily_price: '55.5',
      is_successful: true,
      credit_card_num: null,
      payment_date: '2020-09-20T16:00:00.000Z',
      payment_mode: 'cash',
      delivery_method: 'pick up',
      review_rating: 4,
      review_content: 'very good',
      review_date: '2020-10-08T16:00:00.000Z'
    },
    {
      start_date: '2020-10-03T16:00:00.000Z',
      end_date: '2020-10-07T16:00:00.000Z',
      carer_name: 'zz',
      owner_name: 'dearvae',
      pname: 'doggo',
      bid_date: '2020-09-19T16:00:00.000Z',
      daily_price: '55.5',
      is_successful: true,
      credit_card_num: null,
      payment_date: '2020-09-20T16:00:00.000Z',
      payment_mode: 'cash',
      delivery_method: 'pick up',
      review_rating: null,
      review_content: null,
      review_date: null
    },
    {
      start_date: '2020-10-03T16:00:00.000Z',
      end_date: '2020-10-07T16:00:00.000Z',
      carer_name: 'zz',
      owner_name: 'dearvae',
      pname: 'manman',
      bid_date: '2020-09-19T16:00:00.000Z',
      daily_price: '55.5',
      is_successful: true,
      credit_card_num: null,
      payment_date: '2020-09-20T16:00:00.000Z',
      payment_mode: 'cash',
      delivery_method: 'pick up',
      review_rating: null,
      review_content: null,
      review_date: null
    },
    {
      start_date: '2020-09-16T16:00:00.000Z',
      end_date: '2020-09-19T16:00:00.000Z',
      carer_name: 'zz',
      owner_name: 'dearvae',
      pname: 'manman',
      bid_date: '2020-08-19T16:00:00.000Z',
      daily_price: '55.5',
      is_successful: false,
      credit_card_num: null,
      payment_date: '2020-08-20T16:00:00.000Z',
      payment_mode: 'cash',
      delivery_method: 'pick up',
      review_rating: null,
      review_content: null,
      review_date: null
    }
]

export async function getServerSideProps() {
    // Fetch data from external API
    try {
        const res = await fetch("http://localhost:5000/owners/bids/dearvae/");
        const data = await res.json();
        // Pass data to the page via props
        return { props: { data } };
    } catch (err) {
        return { props: { data: placeholderData } }
    }
}

export default HistoryOrder;