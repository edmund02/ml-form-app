import React, { useState } from 'react';
import { View } from 'react-native'
import { Card, Button, Text, TextInput, Menu, useTheme, Switch, Checkbox, Title, Divider } from "react-native-paper";
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

const Question = ({
   styles,
   questionDetail, questionIndex, questionLayout,
   onChangeTitle, onChangeIsRequired, onChangeInputType, onDeleteQuestion, onChangeOptionLabel, onAddOption, onDeleteOption, onAddLayout
}) => {
   const { colors } = useTheme();
   const [menuVisibile, setMenuVisibile] = useState(false);

   let inputExample = <></>

   switch (questionDetail.inputType.key) {
      case 1000:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputType.name}
                  disabled
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
                  multiline
                  disabled
               />
            </>
         )
         break;
      case 1002:
         inputExample = (
            <>
               <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  placeholder={questionDetail.inputType.name}
                  disabled
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
                  disabled
               />
            </>
         )
         break;
      case 1004:
         inputExample = (
            <>
               <View style={{ flexDirection: 'row', justifyContent: 'flex-start', margin: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>No</Text>
                  <Switch value={false} disabled />
                  <Text style={{ color: 'gray' }}>Yes</Text>
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
                           status={'unchecked'}
                           disabled
                        />
                        <TextInput
                           style={{ ...styles.input, margin: 0, flex: 5 }}
                           placeholder='Label'
                           value={e}
                           onChangeText={text => onChangeOptionLabel(text, i)}
                        />
                        <Button
                           style={{ flex: 1 }}
                           mode="text"
                           onPress={() => onDeleteOption(i)}
                           uppercase={false}
                           compact
                        >
                           <Ionicons name='close' color={colors.primary} size={20} />
                        </Button>
                     </View>
                  )))}

                  <Button
                     mode="text"
                     onPress={onDeleteQuestion}
                     uppercase={false}
                     icon="plus"
                     onPress={onAddOption}
                  >
                     Add Option
                  </Button>
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
            onAddLayout(layout.y)
         }}
      >
         {/* Header */}
         <Header
            name={questionDetail.inputType.name}
            visible={menuVisibile}
            setMenuVisibile={(e) => setMenuVisibile(e)}
            onChangeInputType={onChangeInputType}
            onDeleteQuestion={onDeleteQuestion}
            styles={styles}
            questionIndex={questionIndex}
         />
         
         <Divider />

         {/* Question Title */}
         <TextInput
            style={{ ...styles.input, flex: 1 }}
            label={'Question Title'}
            value={questionDetail.title}
            onChangeText={text => onChangeTitle(text)}
            multiline
         />

         {/* Input example */}
         {inputExample}

         <Divider />

         {/* Footer */}
         <View style={{ flexDirection: 'row', justifyContent: 'flex-end', margin: 10 }}>
            <Text style={{ marginTop: 5 }}>Required</Text>
            <Switch value={questionDetail.isRequired} onValueChange={value => onChangeIsRequired(value)} />
         </View>
      </Card>
   )
}


export default Question;
