import React,{useEffect,useState,useRef} from 'react'
import { View, Text,StyleSheet,TextInput,ScrollView,ActivityIndicator} from 'react-native'
import Colors from '../Theme/Colors';
import Button from '../Components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useForm, Controller } from "react-hook-form";
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AwesomeAlert from 'react-native-awesome-alerts';
import axios from 'axios';
import Modal from 'react-native-modal';
import crashlytics from '@react-native-firebase/crashlytics';
import storage from '../Services/AsyncStorage';
const LoginPage = ({navigation}) => {
  const ref = useRef(null);
    const [mail,setMail]=useState("");
    const [loader,setloader]=useState(false);
    const [ErrorMessage,setErrorMessage]=useState("");
    const [ErrorAlert,setErrorAlert]=useState(false);
    const [successAlert,setSuccessAlert]=useState(false);
    const [isIgnoreVisible, setIgnoreVisible] = useState(false);
    useEffect(() => {
            GoogleSignin.configure();
    }, [])
    const {control , handleSubmit, errors } = useForm();
    const onSubmit = (data) =>{
      setIgnoreVisible(true)
     
      const d={
        email_phoneNumber:data.email_phoneNumber,
        password:data.password
      }
     
      axios.post('https://uireplica.herokuapp.com/login',d,{
      headers:{
        "Content-Type":"application/json",
      }})
      .then(d=>{
        setIgnoreVisible(false) 
        if(d.data.code===200)
        {
          console.log(d.data.user)
          storage.save({
            key: 'user',
            data: {
              token:d.data.token,
              user: d.data.user,
            },
            expires:null
          }).then(()=>setSuccessAlert(true));
        }
        else
        {
          setErrorMessage(d.data.message)
          setErrorAlert(true)
        }

      })
      .catch(err=>{
        // crashlytics().recordError(err);
        setIgnoreVisible(false) 
        setErrorMessage("Something went wrong")
          setErrorAlert(true)
      })  
    }
    const checkPassword=(password)=>password.length>4
    const signIn = async () => {
      
        console.log("Google sign in")
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          setMail(userInfo.user.email+"   ")
          ref.current.focus()
        } catch (error) {
          crashlytics().recordError(error);
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
           
            console.log("User sign in cancel")
            return;
          } else if (error.code === statusCodes.IN_PROGRESS) {
              console.log("In progress")
              return;
            
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            
            setErrorMessage("Google play service outdated")
            setErrorAlert(true)
          } else {
            
              console.log(error)
              setErrorMessage("Something went wrong")
              setErrorAlert(true)
            
          }
        }
      };
    return (
        <KeyboardAwareScrollView style={styles.login_page}>
        <View style={styles.login_page}>
            <Text style={styles.signin_text}>Sign In</Text>
            <View style={{marginTop:20,flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <Controller
                
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          ref={ref}
          placeholder="Email or phone number" placeholderTextColor={Colors.darkgrey} style={styles.input}
          onBlur={onBlur}
            onChangeText={(value) => {
              onChange(value)
              setMail(value)
              }}
            value={mail}
          />
        )}
        name="email_phoneNumber"
        rules={{ 
            required: true,
            }}
        defaultValue={mail}
      />
      {errors.email_phoneNumber && errors.email_phoneNumber.type==='required' && (<Text style={styles.error_message}>This field is required.</Text>)}
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

                <Button  text="Log In" ButtonStyle={styles.login_button} TextStyle={styles.login_text} onPress={handleSubmit(onSubmit)}/>
                <Text style={{padding:20,fontFamily:'Poppins-SemiBold',fontSize:17,textAlign:'center'}}>OR</Text>
                <Button  text="Login with Google" ButtonStyle={styles.google_login_button} TextStyle={styles.login_text} onPress={()=>signIn()}/>
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
          message="Logged-In successfully"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText="No, cancel"
          confirmText="OK"
          confirmButtonColor={Colors.successgreen}
          
          onConfirmPressed={() => {
          
          setSuccessAlert(false)
          navigation.navigate('root',{screen:'All product'})  
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
    login_page:{
        flex:1,
        backgroundColor:Colors.white
    },
    signin_text:{
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
    login_button:{
        width:'70%',
        backgroundColor:Colors.primaryRed,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:20,
        margin:10
    },
    google_login_button:{
        width:'70%',
        backgroundColor:Colors.primaryBlue,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        borderRadius:20,
        margin:10

    },
    login_text:{
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
export default LoginPage
