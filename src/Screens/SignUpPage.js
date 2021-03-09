import React,{useState} from 'react'
import { View, Text,StyleSheet,TextInput,ScrollView,ActivityIndicator} from 'react-native'
import Colors from '../Theme/Colors';
import Button from '../Components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from "react-hook-form";
import AwesomeAlert from 'react-native-awesome-alerts';
import Modal from 'react-native-modal';
import axios from 'axios';
import crashlytics from '@react-native-firebase/crashlytics';
const SignUp = () => {
    const {control , handleSubmit, errors } = useForm();
    const [ErrorMessage,setErrorMessage]=useState("");
    const [ErrorAlert,setErrorAlert]=useState(false);
    const [successAlert,setSuccessAlert]=useState(false);
    const [isIgnoreVisible, setIgnoreVisible] = useState(false);
    const onSubmit = data => {
     
      const d={
        full_name:data.FullName,
        mobile_number:data.PhoneNumber,
        email:data.Email,
        password:data.password
      }
  
      setIgnoreVisible(true)
      axios.post('https://uireplica.herokuapp.com/signup',d,{
        headers:{
          "Content-Type":"application/json",
        }}).then(res=>{
          setIgnoreVisible(false)
          
          if(res.data.code===200)
          {
            setSuccessAlert(true)
          }
          else
          {
            setErrorMessage(res.data.message)
            setErrorAlert(true)
          }
        })
        .catch(e=>{
          setIgnoreVisible(false)
          crashlytics().recordError(er);

          setErrorMessage("Something went wrong")
          setErrorAlert(true)
        })
     
    };
    const checkPassword=(password)=>password.length>4
    const CheckPhoneNumber=(PhoneNumber)=>/^[6-9][0-9]{9}$/.test(PhoneNumber)
    const CheckEmail=(Email)=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(Email)
    return (
        <KeyboardAwareScrollView style={styles.signup_page}>
        <View style={styles.signup_page}>
            <Text style={styles.signup_text}>Create new account</Text>
            <View style={{marginTop:20,flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          placeholder="Full Name" 
          placeholderTextColor={Colors.darkgrey} 
          style={styles.input}
          onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="FullName"
        rules={{ 
            required: true,
            }}
        defaultValue=""
      />
      {errors.FullName && errors.FullName.type==='required' && (<Text style={styles.error_message}>This field is required.</Text>)}
                <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          placeholder="Phone Number" 
          placeholderTextColor={Colors.darkgrey} 
          style={styles.input}
          onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="PhoneNumber"
        rules={{ 
            required: true,
            validate:CheckPhoneNumber
            }}
        defaultValue=""
      />
      {errors.PhoneNumber && errors.PhoneNumber.type==='required' && (<Text style={styles.error_message}>This field is required.</Text>)}
      {errors.PhoneNumber && errors.PhoneNumber.type==='validate' && (<Text style={styles.error_message}>Phone number must have 10 digits and can start with 6-9</Text>)}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          placeholder="E-mail Address"
           placeholderTextColor={Colors.darkgrey} 
           style={styles.input}
          onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Email"
        rules={{ 
            required: true,
            validate:CheckEmail
            }}
        defaultValue=""
      />
      {errors.Email && errors.Email.type==='required' && (<Text style={styles.error_message}>This field is required.</Text>)}
      {errors.Email && errors.Email.type==='validate' && (<Text style={styles.error_message}>Invalid Email-Id format</Text>)}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          placeholder="Password" 
          placeholderTextColor={Colors.darkgrey}
           style={styles.input}
          onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="password"
        rules={{ 
            required: true,
            validate:checkPassword
            }}
        defaultValue=""
      />
      {errors.password && errors.password.type==='required' && (<Text style={styles.error_message}>This field is required.</Text>)}
      {errors.password && errors.password.type==='validate' && (<Text style={styles.error_message}>Minimum password length is 5</Text>)}
                <Button  text="Sign Up" ButtonStyle={styles.signup_button} TextStyle={styles.signup_button_text} onPress={handleSubmit(onSubmit)}/>
            </View>
        </View>
        
        <AwesomeAlert
          show={ErrorAlert}
          showProgress={false}
          title="Error"
          progressColor={Colors.primaryRed}
          progressSize={30}
          message={ErrorMessage}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="Dismiss"
          confirmButtonColor="#DD6B55"
          
          onConfirmPressed={() => {
              setErrorAlert(false)
          }}
        />
        <AwesomeAlert
          show={successAlert}
          showProgress={false}
          title="Success"
          progressColor={Colors.primaryRed}
          progressSize={30}
          message="Sign-up successfull"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="OK"
          confirmButtonColor={Colors.successgreen}
          
          onConfirmPressed={() => {
           setSuccessAlert(false)  
          }}
        />
         <Modal 
            style={{justifyContent:'center',alignItems:'center'}}
            isVisible={isIgnoreVisible}
            backdropColor="#B4B3DB"
            backdropOpacity={0.8}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}
            onBackdropPress={()=>setIgnoreVisible(false)}
            >
         <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',width:'70%',height:65,padding:20,backgroundColor:'#fff',borderRadius:5}}>
           <ActivityIndicator color={Colors.primaryRed} size="large"/>
         <Text style={{fontSize:18,color:'#009999',marginLeft:10}}>Logging in...</Text>
         </View>
        </Modal>
        </KeyboardAwareScrollView>
    )
}
const styles=StyleSheet.create({
    signup_page:{
        flex:1,
        backgroundColor:Colors.white
    },
    signup_text:{
        color:Colors.primaryRed,
        fontSize:25,
        textAlign:'left',
        fontFamily:'Poppins-SemiBold',
        margin:15
    },
    input:{
        padding:12,
        borderColor:Colors.darkgrey,
        borderWidth:1,
        borderRadius:50,
        width:'90%',
        margin:10,
    },
    signup_button:{
        width:'70%',
        backgroundColor:Colors.primaryRed,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:20,
        margin:10
    },
    signup_button_text:{
        fontSize:15,
        color:Colors.white,
        fontFamily:'Poppins-SemiBold'
    },
    error_message:{
        fontSize:15,
        color:Colors.primaryRed,
        fontFamily:'Poppins-SemiBold'
    }
})
export default SignUp
