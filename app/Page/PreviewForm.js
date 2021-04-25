import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Button, ActivityIndicator, Title, Text } from "react-native-paper";
import { saveFormAction, resetFormAction, updateResetStatusAction } from '../../actions';
import { PreviewQuestion } from '../components'

class PreviewForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: '',
         description: '',
         questions: [],
         questionsLayout: {},
         answers: [],
         loading: true,
      }
   }

   componentDidMount() {
      this.onInitiateState();
   }

   // implemented this earlier before I find out that I can set trigger unmount in tab navigator
   // componentDidUpdate(prevProps) {
   //    const { formIsUpdated } = this.props;
   //    if (prevProps.formIsUpdated === false && formIsUpdated === true) {
   //       this.onInitiateState();
   //    }
   // }


   // bring in the form data from reducer and set to local state
   // define the default answer's value
   onInitiateState = async () => {
      const { form } = this.props;
      await this.setState({ loading: true });
      let newAnswers = [];
      for (const question of form.questions) {
         if (question.inputDetail.key === 1005) {
            let temp = [];
            for (const option of question.inputDetail.optionLabel) {
               temp.push(false);
            }
            newAnswers.push(temp);
         } else if (question.inputDetail.key === 1004) {
            newAnswers.push(false);
         } else {
            newAnswers.push('');
         }
      }
      await this.setState({ ...form, loading: false, answers: newAnswers });
   }

   onChangeAnswer = (answer, questionIndex, optionIndex) => {
      const { answers, questions } = this.state;

      let newAnswers = [...answers];
      if (questions[questionIndex].inputDetail.key === 1005) {
         newAnswers[questionIndex][optionIndex] = answer;
      } else {
         newAnswers[questionIndex] = answer;
      }
      this.setState({ answers: newAnswers });
   }

   onChangeDateShow = (questionIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      newQuestions[questionIndex].show = true;
      this.setState({ questions: newQuestions });
   }

   onChangeDate = (event, value, questionIndex) => {
      const { answers, questions } = this.state;

      let newQuestions = [...questions];
      newQuestions[questionIndex].show = false;

      let newAnswers = [...answers];
      const selectedDate = value || '';

      newAnswers[questionIndex] = selectedDate.toString();

      this.setState({ questions: newQuestions, answers: newAnswers });
   };

   onClearDate = (questionIndex) => {
      const { answers } = this.state;

      let newAnswers = [...answers];
      newAnswers[questionIndex] = '';

      this.setState({ answers: newAnswers });
   };

   onResetForm = () => {
      this.onInitiateState();
      alert(`Your form's answer(s) are reset!`);
   }

   onSubmit = async () => {
      const { answers, questions, questionsLayout } = this.state;

      // remove all error indicator
      let newQuestionsLayout = { ...questionsLayout };

      for (const key of Object.keys(newQuestionsLayout)) {
         newQuestionsLayout[key] = {
            ...newQuestionsLayout[key],
            isError: false
         }
      }

      await this.setState({ questionsLayout: newQuestionsLayout });

      // validation
      for (let i = 0; i < questions.length; i++) {

         // check for empty input
         if ([1000, 1001, 1002, 1003, 1006].includes(questions[i].inputDetail.key) && questions[i].isRequired && !answers[i]) {
            this.executeScroll(i, true);
            return alert(`Question ${i + 1}. is required to answer.`);
         }

         if (questions[i].inputDetail.key === 1005 && questions[i].isRequired && !answers[i].find(e => (e))) {
            this.executeScroll(i, true);
            return alert(`Question ${i + 1}. is required to answer.`);
         }

         // check numeric
         if (questions[i].inputDetail.regexp && answers[i] && !questions[i].inputDetail.regexp.test(answers[i])) {
            this.executeScroll(i, true);
            return alert(questions[i].inputDetail.errorMessage.replace('{q}', i + 1));
         }

      }

      alert('All inputs are valid, submitted!');
   }

   // scroll the screen to the designated position and add error indication if needed
   executeScroll = (index, isError) => {
      const { questionsLayout } = this.state;
      if (isError) {
         let newQuestionLayout = { ...questionsLayout };
         newQuestionLayout = {
            ...newQuestionLayout,
            [index]: { ...newQuestionLayout[index], isError: true }
         }
         this.setState({ questionsLayout: newQuestionLayout })
      }
      if (this.scrollViewRef) {
         this.scrollViewRef.scrollTo({
            animated: true,
            y: questionsLayout[index].y - 10
         })
      }
   };

   // set the Y coordinate for each question (to be used in scrolling)
   onUpdateLayout = (y, questionIndex) => {
      const { questionsLayout } = this.state;
      this.setState({ questionsLayout: { ...questionsLayout, [questionIndex]: { ...questionsLayout[questionIndex], y: y } } })
   }

   render() {
      const { formAvailable, navigation } = this.props;
      const { title, description, questions, questionsLayout, loading, answers } = this.state;
      return (
         loading ? 
            <View style={styles.loading}>
               <ActivityIndicator animating={true} />
            </View>
            :
            <ScrollView
               ref={ref => {
                  this.scrollViewRef = ref;
               }}
               keyboardShouldPersistTaps='handled'
            >
               {!formAvailable ?
                  <Card style={[styles.container, styles.shadow]}>
                     <Title>Form not found. Please create your form first.</Title>
                     <Button
                        style={[styles.buttonAdd, styles.shadow]}
                        mode="contained"
                        onPress={() => navigation.navigate('Create')}
                        uppercase={false}
                        icon='plus'
                        labelStyle={{ color: '#fff' }}
                     >Create Form</Button>
                  </Card>
                  :
                  <>
                     <Card style={[styles.container, styles.shadow, styles.borderTop]}>
                        <Title style={styles.title}>{title}</Title>
                        <Text>{description}</Text>

                        <Text style={{ color: 'red', marginTop: 15 }}>* Required</Text>
                     </Card>
                     {questions.map((element, index) => (
                        <PreviewQuestion
                           key={`${element.inputDetail.key}${index}`}
                           questionDetail={element}
                           answer={answers[index]}
                           questionIndex={index}
                           questionLayout={questionsLayout[index] ? questionsLayout[index] : {}}
                           onChangeAnswer={(value, optionIndex) => this.onChangeAnswer(value, index, optionIndex)}
                           onChangeDateShow={() => this.onChangeDateShow(index)}
                           onChangeDate={(event, selectedDate) => this.onChangeDate(event, selectedDate, index)}
                           onClearDate={() => this.onClearDate(index)}
                           onUpdateLayout={(y) => this.onUpdateLayout(y, index)}
                           styles={{
                              ...styles,
                           }}
                        />
                     ))
                     }

                     <View style={styles.flexRowSpaceAround} ref={this.myRef} >
                        <Button
                           style={[styles.buttonReset, styles.shadow]}
                           mode="contained"
                           onPress={this.onResetForm}
                           uppercase={false}
                           labelStyle={{ color: '#66cccc' }}
                           icon='refresh'

                        >Reset</Button>
                        <Button
                           style={[styles.buttonAdd, styles.shadow]}
                           mode="contained"
                           onPress={this.onSubmit}
                           uppercase={false}
                           icon='arrow-up'
                           labelStyle={{ color: '#fff' }}
                        >Submit</Button>
                     </View>
                  </>
               }
            </ScrollView>

      )
   }
}

const mapStateToProps = state => {
   return ({
      count: state.app.count,
      form: state.app.form,
      formAvailable: state.app.formAvailable,
   });
}


const mapDispatchToProps = dispatch => ({
   saveForm: bindActionCreators(saveFormAction, dispatch),
   resetForm: bindActionCreators(resetFormAction, dispatch),
   updateResetStatus: bindActionCreators(updateResetStatusAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreviewForm)

const styles = StyleSheet.create({
   container: {
      margin: 10,
      padding: 10,
   },
   shadow: {
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
   },
   borderTop: {
      borderTopWidth: 10,
      borderTopColor: '#66cccc',
   },
   input: {
      margin: 10,
      backgroundColor: '#fff',
   },
   title: {
      fontWeight: 'bold',
      fontSize: 25,
   },
   inputDisabled: {
      borderBottomWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.2)'
   },
   alignCenter: {
      textAlign: 'center'
   },
   flexRowSpaceAround: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   buttonAdd: {
      flex: 1,
      margin: 10,
      // backgroundColor: '#fff',
   },
   buttonReset: {
      flex: 1,
      margin: 10,
      backgroundColor: '#fff',
   },
   isError: {
      borderWidth: 1,
      borderColor: 'red'
   },
   loading: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-around",
   },
   red: {
      color: 'red',
   },
});