import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { StyleSheet, ScrollView, View } from 'react-native';
import { Card, Button, ActivityIndicator, TextInput } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { saveFormAction, resetFormAction, updateResetStatusAction } from '../actions';
import { code } from '../constants'
import { Question } from './components'

class CreationForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         title: 'Untitled Form',
         description: '',
         questions: [],
         questionsLayout: {},
         loading: true,
         lockAutoScroll: true,
      }
   }

   componentDidMount() {
      const { form } = this.props;
      this.setState({ ...form, loading: false })
   }

   componentDidUpdate(prevProps, prevState) {
      const { formIsReset, form, updateResetStatus } = this.props;
      const { questionsLayout, lockAutoScroll } = this.state;

      // make sure the form in props state is synced
      if (prevProps.formIsReset === false && formIsReset === true) {
         this.setState({ ...form });
         updateResetStatus();
      }

      // scroll to newly added question
      if (Object.keys(prevState.questionsLayout).length < Object.keys(questionsLayout).length && !lockAutoScroll) {
         this.executeScroll(Object.keys(questionsLayout).length - 1);
      }
   }

   addNewQuestion = () => {
      const { questions } = this.state;

      let newQuestions = [...questions];

      newQuestions.push({
         title: `Question ${questions.length + 1}`,
         inputDetail: { ...code.inputDetail[0] },
         isRequired: false,
      });
      this.setState({ questions: newQuestions, lockAutoScroll: false });
   }

   onDeleteQuestion = (questionIndex) => {
      const { questions, questionsLayout } = this.state;

      // update questions
      let newQuestions = [...questions];
      newQuestions.splice(questionIndex, 1)

      // update questionsLayout: remove the deleted questions in questinsLayout, and rename the key where key > question index
      let newQuestionsLayout = {};
      for (let [key, value] of Object.entries(questionsLayout)) {
         if (Number(key) < questionIndex) {
            newQuestionsLayout = {
               ...newQuestionsLayout,
               [key]: { ...value }
            }
         } else if (Number(key) > questionIndex) {
            newQuestionsLayout = {
               ...newQuestionsLayout,
               [Number(key) - 1]: { ...value }
            }
         }

      }

      this.setState({ questions: newQuestions, questionsLayout: newQuestionsLayout });
   }

   onChangeInputType = (inputDetail, questionIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      if (inputDetail.key === 1005) {
         newQuestions[questionIndex].inputDetail = { ...inputDetail, optionLabel: [''] };
      } else if (inputDetail.key === 1006) {
         newQuestions[questionIndex].inputDetail = { ...inputDetail, show: false };
      } else {
         newQuestions[questionIndex].inputDetail = { ...inputDetail };
      }
      this.setState({ questions: newQuestions });
   }

   onChangeQuestionTitle = (title, questionIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      newQuestions[questionIndex].title = title;
      this.setState({ questions: newQuestions });
   }

   onChangeIsRequired = (value, questionIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      newQuestions[questionIndex].isRequired = value;
      this.setState({ questions: newQuestions });
   }

   onChangeOptionLabel = (label, questionIndex, inputIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      newQuestions[questionIndex].inputDetail.optionLabel[inputIndex] = label;
      this.setState({ questions: newQuestions });
   }

   onAddOption = (questionIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      for (let i = 0; i < newQuestions[questionIndex].inputDetail.optionLabel.length; i++) {
         if (!newQuestions[questionIndex].inputDetail.optionLabel[i]) {
            newQuestions[questionIndex].inputDetail.optionLabel[i] = `Option ${i + 1}`;
         }
      }
      newQuestions[questionIndex].inputDetail.optionLabel.push('')
      this.setState({ questions: newQuestions });
   }

   onDeleteOption = (questionIndex, inputIndex) => {
      const { questions } = this.state;

      let newQuestions = [...questions];
      newQuestions[questionIndex].inputDetail.optionLabel.splice(inputIndex, 1);
      this.setState({ questions: newQuestions });
   }

   onSaveForm = async () => {
      const { saveForm } = this.props;
      const { title, description, questions, questionsLayout } = this.state;

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
      if (!title) {
         return alert(`Please fill in form's title`);
      }

      if (questions.length <= 0) {
         return alert(`Please add at least 1 question`);
      }

      for (let i = 0; i < questions.length; i++) {
         if (!questions[i].title) {
            this.executeScroll(i, true);
            return alert(`Please fill in question title for Question (${i + 1}.)`);
         }
         if (questions[i].inputDetail.key === 1005) {
            if (questions[i].inputDetail.optionLabel.length <= 0) {
               this.executeScroll(i, true);
               return alert(`Please add at least 1 option for Question (${i + 1}.)`);
            }
            let uniqueLabel = [];
            for (const optionLabel of questions[i].inputDetail.optionLabel) {
               if (!optionLabel) {
                  this.executeScroll(i, true);
                  return alert(`Please fill in all options' label in Question (${i + 1}.)`);
               }

               // check if options' label is duplicated
               if (uniqueLabel.includes(optionLabel)) {
                  this.executeScroll(i, true);
                  return alert(`You cannot have same option's label in Question ${i + 1}.`);
               } else {
                  uniqueLabel.push(optionLabel);
               }
            }
         }
      }

      saveForm({ title, description, questions });
   }

   onResetForm = () => {
      const { resetForm } = this.props;
      resetForm();
   }

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

   onAddLayout = (y, questionIndex) => {
      const { questionsLayout } = this.state;
      this.setState({ questionsLayout: { ...questionsLayout, [questionIndex]: { ...questionsLayout[questionIndex], y: y } } })
   }

   render() {
      const { title, description, questions, questionsLayout, loading } = this.state;
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
               <Card style={[styles.container, styles.shadow, styles.borderTop]}>
                  <TextInput
                     style={[styles.input, styles.inputFormTitle]}
                     label="Form Title"
                     placeholder="Form Title"
                     value={title}
                     onChangeText={text => this.setState({ title: text })}
                     selectTextOnFocus
                  />
                  <TextInput
                     style={styles.input}
                     label="Form Description"
                     placeholder="Form Description"
                     value={description}
                     onChangeText={text => this.setState({ description: text })}
                     multiline
                  />
               </Card>
               {questions.map((element, index) => (

                  <Question
                     key={`${element.inputDetail.key}${index}`}
                     questionDetail={element}
                     questionIndex={index}
                     questionLayout={questionsLayout[index] ? questionsLayout[index] : {}}
                     onChangeTitle={(title) => this.onChangeQuestionTitle(title, index)}
                     onChangeIsRequired={(value) => this.onChangeIsRequired(value, index)}
                     onChangeInputType={(inputDetail) => this.onChangeInputType(inputDetail, index)}
                     onDeleteQuestion={() => this.onDeleteQuestion(index)}
                     onChangeOptionLabel={(title, inputIndex) => this.onChangeOptionLabel(title, index, inputIndex)}
                     onAddOption={() => this.onAddOption(index)}
                     onDeleteOption={(inputIndex) => this.onDeleteOption(index, inputIndex)}
                     onAddLayout={(y) => this.onAddLayout(y, index)}
                     styles={{
                        ...styles
                     }}
                  />
               ))}

               <View style={styles.flexRowSpaceAround} ref={this.myRef} >
                  <Button
                     style={[styles.button, styles.shadow]}
                     mode="contained"
                     onPress={this.onResetForm}
                     uppercase={false}
                     labelStyle={{ color: '#66cccc' }}
                     icon='refresh'

                  >Reset</Button>
                  <Button
                     style={[styles.button, styles.shadow]}
                     mode="contained"
                     onPress={this.addNewQuestion}
                     uppercase={false}
                     icon='plus'
                     labelStyle={{ color: '#66cccc' }}
                  >Add Question</Button>
               </View>

               <Button
                  style={[styles.saveButton, styles.shadow]}
                  mode="contained"
                  onPress={this.onSaveForm}
                  labelStyle={{ color: '#fff' }}

               ><Ionicons name='document-text' color={'#fff'} size={15} />&nbsp;Save Form</Button>
            </ScrollView >
      )
   }
}

const mapStateToProps = state => {
   return ({
      count: state.app.count,
      form: state.app.form,
      formIsReset: state.app.formIsReset,
   });
}


const mapDispatchToProps = dispatch => ({
   saveForm: bindActionCreators(saveFormAction, dispatch),
   resetForm: bindActionCreators(resetFormAction, dispatch),
   updateResetStatus: bindActionCreators(updateResetStatusAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreationForm)

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
   inputFormTitle: {
      fontSize: 18,
      fontWeight: 'bold',
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
   saveButton: {
      flex: 1,
      margin: 10,
      // backgroundColor: '#fff',
   },
   button: {
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
      padding: 10
   },
});