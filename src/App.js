import Header from './Header'
import PageManager from './PageManager'
import React from 'react'
import axios from 'axios'

import XMLData from './xml/surveyQuestions.xml'
import './mcstyle.css'


/*
  Problem:

    change page title

    Responder can comeback to edit choice

    collect survey on user feeling, send data to server

    ## change survey to a new module

    ## change state that's string but is supposed to be int to int

    ## create page manager
*/

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      questionsList: [],
      feedbackList: [], //xmlnode that contains feedback data
      surveyList: [], //

      questionNum: -1, //0 to total no. of question-1, 0 is the first question
      surveyNum: -1,
      value: 0,
      surveyResponse: [],

      selectedValue: -1,
      selectedAnswer: -1,
      pressSubmit: 0,
      dataSubmit: -1
    }
  }

  setDataSubmit = (state) => {
    this.setState({
      dataSubmit: state
    })
  }

  updateSurveyResponse = (response) => {
    this.setState({
      surveyResponse: [...this.state.surveyResponse, parseInt(response)]
    })
  }

  goToNextSurvey = () => {
    this.setState({
      surveyNum: this.state.surveyNum + 1,
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  skipQuestions = (questionNum) => {
    this.setState({
      questionNum: questionNum
    })
  }

  setSubmit = (state) => {
    this.setState({
      pressSubmit: state
    })
  }

  incrementValue = (value) => {
    this.setState({
      value: this.state.value + parseInt(value)
    })
  }

  setSelectedValue = (value) => {
    this.setState({
      selectedValue: parseInt(value)
    })
  }

  resetSelected = () => {
    this.setState({
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }

  goToNextQuestion = () => { 
    this.setState({
      questionNum : this.state.questionNum + 1,
      selectedAnswer: -1,
      pressSubmit: 0
    })
  }


  // goToPrevQuestion = () => { this.setState({
  //     questionNum : this.state.questionNum - 1, 
  //     selectedAnswer: -1,
  //     pressSubmit: 0
  //   })
  // }

  setSelectedAnswer = (answer) => { this.setState({
      selectedAnswer: parseInt(answer),
      pressSubmit: 0
     })
  }

  componentDidMount(){
    this.fetchQuestionsWithAxios()
  }

  fetchQuestionsWithAxios(){
    axios.get(XMLData,
      {"Content-Type":"application/xml; charset=utf-8"
    }).then((response)=>{
      const parser = new DOMParser()
      var xml = parser.parseFromString(response.data,"text/xml")

      var questionsList = Array.from(xml.getElementsByTagName("question"))
      var feedbackList = Array.from(xml.getElementsByTagName("feedbacks"))
      var surveyList = Array.from(xml.getElementsByTagName("surveyText"))
      console.log( surveyList )

      this.setState({
          questionsList: questionsList,
          feedbackList: feedbackList,
          surveyList: surveyList
      })
    }).catch( e => {
      console.log(e)
    })
  }

  render(){
    return (
      <div className="App">
        <Header/>
        <div id ="wrapper" data-role="content">
          <PageManager
            questionNum={this.state.questionNum}
            questionsList={this.state.questionsList}
            selectedAnswer={this.state.selectedAnswer}
            selectedValue={this.state.selectedValue}
            value={this.state.value}
            pressSubmit={this.state.pressSubmit}
            totalQuestions={this.state.questionsList.length}
            feedbackList={this.state.feedbackList}
            surveyNum={this.state.surveyNum}
            surveyList={this.state.surveyList}
            totalSurvey={this.state.surveyList.length}
            surveyResponse={this.state.surveyResponse}
            dataSubmit={this.state.dataSubmit}
            
            goToNextQuestion={this.goToNextQuestion}
            // goToPrevQuestion={this.goToPrevQuestion}
            setSelectedAnswer={this.setSelectedAnswer}
            resetSelected={this.resetSelected}
            incrementValue={this.incrementValue}
            setSelectedValue={this.setSelectedValue}
            setSubmit={this.setSubmit}
            skipQuestions={this.skipQuestions}
            goToNextSurvey={this.goToNextSurvey}
            updateSurveyResponse={this.updateSurveyResponse}
            setDataSubmit={this.setDataSubmit}
          />
        </div>
      </div>
    )
  }
}

export default App;
