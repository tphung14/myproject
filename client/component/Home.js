

const Home = (props) => {
    console.log(props)
    let {server_data} = props;
      return (
        <p>{server_data}</p>
      );
      
  }
  
  export default Home;