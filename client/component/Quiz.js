const Quiz = (props) => {
  
  let {handleClick} = props;
  let {counter} = props;
  let QuizView = () => {
    const { questions } = props;
    return questions.map((item) => {
        return(
          <div class = "card" onClick={() => handleClick(item.description)}>
              <img src= {item.img}/>
              <p>{item.description}</p> 
          </div>
        )
    })
}
  return (
    <div class = "container" >
      {QuizView()}
    </div>
  );
}

  
  export default Quiz;
  