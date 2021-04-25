import React from 'react';
import { View, TouchableOpacity } from 'react-native'
import { Card, Text, TextInput, useTheme, Switch, Checkbox, Title } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { formatDate } from '../../helper';

const PreviewQuestion = ({
   styles,
   questionDetail, questionIndex, questionLayout, answer,
   onChangeAnswer, onChangeDateShow, onChangeDate, onClearDate, onUpdateLayout
}) => {
   const { colors } = useTheme();

   let inputExample = <></>

   // decide which type of input to display
   switch (questionDetail.inputDetail.key) {
      case 1000:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputDetail.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputDetail.keyboardType}
               />
            </>
         )
         break;
      case 1001:
         inputExample = (
            <>

               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputDetail.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputDetail.keyboardType}
                  multiline
               />
            </>
         )
         break;
      case 1002:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputDetail.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputDetail.keyboardType}
               />
            </>
         )
         break;
      case 1003:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputDetail.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputDetail.keyboardType}
               />
            </>
         )
         break;
      case 1004:
         inputExample = (
            <>
               <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
                  <Text style={!answer ? { fontWeight: 'bold' } : { color: 'gray' }}>No</Text>
                  <Switch value={answer} onValueChange={value => onChangeAnswer(value)} />
                  <Text style={answer ? { fontWeight: 'bold' } : { color: 'gray' }}>Yes</Text>
               </View>
            </>
         )
         break;
      case 1005:
         inputExample = (
            <>
               <View style={{ margin: 10, flexDirection: 'column' }}>
                  {questionDetail.inputDetail.optionLabel.map(((e, i) => (
                     <View key={`checkboxes${questionIndex}${i}`} style={{ flexDirection: 'row' }}>
                        <Checkbox
                           style={{ flex: 1 }}
                           status={answer && answer[i] ? 'checked' : 'unchecked'}
                           onPress={() => onChangeAnswer(!(answer && answer[i]), i)}
                        />
                        <Text style={{ marginTop: 8 }}>{e}</Text>
                     </View>
                  )))}
               </View>
            </>
         )
         break;
      case 1006:
         inputExample = (
            <>
               {questionDetail.show &&
                  <DateTimePicker
                     value={answer ? new Date(answer) : new Date()}
                     mode={'date'}
                     is24Hour={true}
                     display="default"
                     onChange={onChangeDate}
                     disabled
                  />
               }
               <View style={{ flexDirection: 'row', alignContent: 'space-between' }} >
                  <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'space-between', flex: 1 }} onPress={onChangeDateShow}>
                     <Ionicons
                        style={{ margin: 10, marginTop: 35 }}
                        size={25} name='calendar'
                        color={colors.primary}
                     />
                     <TextInput
                        style={[styles.input, styles.inputDisabled, { flex: 1 }]}
                        value={answer ? formatDate(new Date(answer)) : ''}
                        placeholder={questionDetail.inputDetail.name}
                        disabled
                     />
                  </TouchableOpacity>
                  <Ionicons
                     style={{ marginTop: 35 }}
                     name='close'
                     color={colors.primary}
                     size={20}
                     onPress={onClearDate}
                  />
               </View>
            </>
         )
         break;
      default:
         inputExample = <></>;
   }

   return (
      <Card
         style={[styles.container, styles.shadow, questionLayout.isError ? styles.isError : {}]}
         onLayout={event => {
            const { layout } = event.nativeEvent;
            onUpdateLayout(layout.y)
         }}
      >
         {/* Question Title*/}
         <Title style={{ ...styles.input, flex: 1 }}>{`${questionIndex + 1}. ${questionDetail.title}`}&nbsp;{questionDetail.isRequired && <Text style={styles.red}>*</Text>}</Title>

         {inputExample}
      </Card>
   )
}


export default PreviewQuestion;
