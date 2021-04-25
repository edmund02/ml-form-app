import React from 'react';
import { View } from 'react-native'
import { Card, Button, Text, TextInput, Menu, useTheme, Switch, Checkbox, Title } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import { code } from '../../constants';



const Header = ({
   styles,
   name, visible, questionIndex,
   setMenuVisibile, onChangeInputType, onDeleteQuestion }) => {
   const { colors } = useTheme();
   return (
      <View style={{ ...styles.flexRowSpaceAround, margin: 10 }}>
         <Title style={{ marginRight: 15, flex: 1 }}>{questionIndex + 1}.</Title>
         <Menu
            visible={visible}
            onDismiss={() => setMenuVisibile(false)}
            anchor={
               <Button
                  style={{ flex: 1, marginRight: 10 }}
                  mode="outlined"
                  onPress={() => setMenuVisibile(true)}
                  uppercase={false}
               >
                  <Text color={colors.primary} ellipsizeMode='tail'>
                     {name}
                  </Text>
                  <Ionicons name='caret-down' color={colors.primary} />
               </Button>}
         >
            {
               code.inputType.map(e => (
                  <Menu.Item key={`dropdown${e.key}`} onPress={() => onChangeInputType({ ...e })} title={e.name} />
               ))
            }
         </Menu>
         <Button
            mode="text"
            onPress={onDeleteQuestion}
            uppercase={false}
            compact
         >
            <Ionicons name='trash' color={colors.primary} size={20} />
         </Button>
      </View>
   )
}

const PreviewQuestion = ({
   styles,
   questionDetail, questionIndex, questionLayout, answer,
   onChangeAnswer, onUpdateLayout
}) => {
   const { colors } = useTheme();

   let inputExample = <></>

   switch (questionDetail.inputType.key) {
      case 1000:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputType.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputType.keyboardType}
               />
            </>
         )
         break;
      case 1001:
         inputExample = (
            <>

               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputType.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputType.keyboardType}
                  multiline
               />
            </>
         )
         break;
      case 1002:
         console.log(answer)
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputType.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputType.keyboardType}
               />
            </>
         )
         break;
      case 1003:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputType.name}
                  value={answer}
                  onChangeText={value => onChangeAnswer(value)}
                  keyboardType={questionDetail.inputType.keyboardType}
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
                  {questionDetail.inputType.optionLabel.map(((e, i) => (
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
         <Title style={{ ...styles.input, flex: 1 }}>{`${questionIndex + 1}. ${questionDetail.title}`}</Title>

         {inputExample}
      </Card>
   )
}


export default PreviewQuestion;
