import carerHomeView from '../../src/views/carer/Home'

const carerHome = (props) => carerHomeView(props);

const placeholderData = [
    {
      start_date: '2020-11-23T16:00:00.000Z',
      end_date: '2020-12-07T16:00:00.000Z',
      carer_name: 'zz',
      owner_name: 'dearvae',
      pname: 'kuaikuai',
      bid_date: '2020-09-19T16:00:00.000Z',
      daily_price: '55.5',
      is_successful: true,
      credit_card_num: null,
      payment_date: '2020-11-23T16:00:00.000Z',
      payment_mode: 'cash',
      delivery_method: 'pick up',
    },
    {
        start_date: '2020-09-23T16:00:00.000Z',
        end_date: '2020-12-07T16:00:00.000Z',
        carer_name: 'zz',
        owner_name: 'dearvae',
        pname: 'kuaikuai',
        bid_date: '2020-09-19T16:00:00.000Z',
        daily_price: '55.5',
        is_successful: true,
        credit_card_num: null,
        payment_date: '2020-11-23T16:00:00.000Z',
        payment_mode: 'cash',
        delivery_method: 'pick up',
      },
      {
        start_date: '2020-08-23T16:00:00.000Z',
        end_date: '2020-12-07T16:00:00.000Z',
        carer_name: 'zz',
        owner_name: 'dearvae',
        pname: 'kuaikuai',
        bid_date: '2020-09-19T16:00:00.000Z',
        daily_price: '55.5',
        is_successful: true,
        credit_card_num: null,
        payment_date: '2020-11-23T16:00:00.000Z',
        payment_mode: 'cash',
        delivery_method: 'pick up',
      }
]

export async function getServerSideProps() {
    // Fetch data from external API
    try {
        const res = await fetch(`${process.env.API_PATH}/carers/bids/dearvae/`);
        const data = await res.json();
        // Pass data to the page via props
        return { props: { data } };
    } catch (err) {
        return { props: { data: placeholderData } }
    }
}

export default carerHome;
