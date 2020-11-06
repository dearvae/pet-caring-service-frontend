import Profile from '../../src/views/owner/Profile'
const placeholderData = [
    {
      username: 'jy',
      //password: '123456',
      name: 'Jiaying',
      phone: '91084982',
      area: 'South',
      address: 'PGP'
    }
]

export async function getServerSideProps() {
    // Fetch data from external API
    try {
        const res = await fetch("http://localhost:5000/owners/jy");
        const data = await res.json();
        // Pass data to the page via props
        return { props: { data } };
    } catch (err) {
        return { props: { data: placeholderData } }
    }
}

export default Profile
