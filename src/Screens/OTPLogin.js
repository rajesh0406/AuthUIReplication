import React,{useState,useRef,useEffect, useContext} from 'react'
import { View, Text,StyleSheet,TextInput } from 'react-native'
import Colors from '../Theme/Colors';
import PhoneInput from "react-native-phone-number-input";
import Button from '../Components/Button';
import auth from '@react-native-firebase/auth';
import { useForm, Controller } from "react-hook-form";
import storage from '../Services/AsyncStorage';
import AwesomeAlert from 'react-native-awesome-alerts';
import {AuthContext} from '../Store/Context';
const OTPLogin = ({navigation}) => {
   const {state,dispatch}=useContext(AuthContext)
    const [error,setError]=useState(false);
    const [required,setRequired]=useState(false);
    const [phone_number, setPhoneNumber] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [confirm, setConfirm] = useState(null);
    const [user, setUser] = useState();
    const ref = useRef(null);
    const phoneInput=useRef(null);
    const {control , handleSubmit, errors } = useForm();
    const [ErrorMessage,setErrorMessage]=useState("");
    const [ErrorAlert,setErrorAlert]=useState(false);
   useEffect(() => {
    auth().onAuthStateChanged((user) => {
        if(user) {
          dispatch({type:'SIGNIN'})
        }
      })
   }, [])
    const Submit=()=>{
        if(phone_number==="")
        {
        setRequired(true) 
        return
        }
         if(phoneInput.current.isValidNumber(phone_number))
         {
         setError(false)
        signInWithPhoneNumber();
         }
         else
         {
         setError(true);
         }
         
    }
    async function confirmCode(code) {
        try {
          await confirm.confirm(code)
          

        } catch (error) {
          setErrorMessage("Invalid code.Try again")
          setErrorAlert(true)
          setConfirm(null)
        }
      }
    async function signInWithPhoneNumber() {
        console.log("auth")
         await auth().signInWithPhoneNumber(formattedValue)
        .then(confirmation=>{
            setConfirm(confirmation)
            storage.save({
                key: 'user',
                data: {
                  token:confirmation,
                  user:confirmation,
                },
                expires:null
              })
            
        }).catch(()=>{
          setErrorMessage("Something went wrong")
              setErrorAlert(true)
        })
   
      }
     const onSubmit=(data)=>{
          console.log(data.otp)
          confirmCode(data.otp)
      }
    return (
        <>
        {
            (!confirm)?
            <View style={{flex:1,backgroundColor:Colors.white,justifyContent:'center',alignItems:'center'}}>
                      <PhoneInput
            ref={phoneInput}
            defaultValue={phone_number}
            defaultCode="IN"
            layout="second"
            onChangeText={(text) => {
              if(phone_number.length!==0)
              {
                  setRequired(false)
                  setError(false)
              }
              setPhoneNumber(text);
            }}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
            }}
            withDarkTheme={false}
            withShadow={false}
            autoFocus
            containerStyle={{borderColor:Colors.darkgrey,borderWidth:1,borderRadius:40,width:'85%',height:70}}
            textContainerStyle={{borderBottomRightRadius:40,borderTopRightRadius:40,}}

          />
          {error && (<Text style={styles.error}>Invalid Phone Number Format</Text>)}
          {required && (<Text style={styles.error}>This field is required</Text>)}
          <Button  text="Send OTP" ButtonStyle={styles.login_button} TextStyle={styles.login_text} onPress={()=>Submit()}/>
        </View>
        :
        <View style={{flex:1,backgroundColor:Colors.white,justifyContent:'center',alignItems:'center'}}>
        <Controller
                
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <TextInput
                  ref={ref}
                  placeholder="Enter OTP" placeholderTextColor={Colors.darkgrey} style={styles.input}
                  onBlur={onBlur}
                    onChangeText={(value) => {
                      onChange(value)
                      }}
                    value={value}
                  />
                )}
                name="otp"
                rules={{ 
                    required: true,
                    }}
                defaultValue=""
              />
              {errors.otp && errors.otp.type==='required' && (<Text style={styles.error}>This field is required.</Text>)}
        <Button  text="Verify OTP" ButtonStyle={styles.login_button} TextStyle={styles.login_text} onPress={handleSubmit(onSubmit)}/>
        </View>

        }
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
        </>
        
    )
}
const styles=StyleSheet.create({
    error:{
        textAlign:'center',
        marginVertical:5,
        fontSize:15,
        color:Colors.primaryRed,
        fontFamily:'Poppins-SemiBold'
    },
    input:{
        padding:12,
        borderColor:Colors.darkgrey,
        borderWidth:1,
        borderRadius:50,
        width:'80%',
        margin:10,
    },
    login_button:{
        width:'70%',
        backgroundColor:Colors.primaryRed,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:20,
        marginVertical:15,
        marginHorizontal:10,
    },
    login_text:{
        fontSize:15,
        color:Colors.white,
        fontFamily:'Poppins-SemiBold'
    },
})
export default OTPLogin;
