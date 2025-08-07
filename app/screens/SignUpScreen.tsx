import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import React, {useState} from 'react'
import {StatusBar} from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { registerUser } from '@/services/authService'


export default function SignUpScreen() {

  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // ...existing useFocusEffect...

  const handleSignUp = async () => {
    if (!nombre || !apellido || !email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    const result = await registerUser(email, password, nombre, apellido);

    if (result.success) {
      setLoading(false);
      alert('Registro exitoso');
      navigate.goBack();
    } else {
      alert(`Error: ${result.error}`);
      setLoading(false);
    }
  };

 const navigate = useNavigation<NavigationProp<RootStackParamList>>();
   return (
     <View className='bg-white h-full w-full'>
         <StatusBar style="light" />
         <Image source={require('../../assets/images/background.png')} className='h-full w-full absolute' />
       <View className='flex-row justify-around w-full absolute'>
         <Animated.Image entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}  source={require('../../assets/images/light.png')} className='h-[225] w-[90]'  />
         <Animated.Image entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}  source={require('../../assets/images/light.png')} className='h-[160] w-[65]'  />
       </View>
       <View className='h-full w-full flex justify-around pt-48'>
         <View className='flex items-center'>
             <Animated.Text entering={FadeInUp.duration(1000).springify()} className='text-white font-bold tracking-wider text-5xl mt-10'>
                 Registrate
                 </Animated.Text>
         </View>
         <View className='flex items-center mx-4  mt-40  space-y-4'>
                <Animated.View entering={FadeInDown.duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full'>
             <TextInput  value={nombre} onChangeText={setNombre} placeholder='Nombre' placeholderTextColor='gray'/>

             </Animated.View>
             <Animated.View entering={FadeInDown.delay(200).duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full'>
             <TextInput value={apellido} onChangeText={setApellido} placeholder='Apellido' placeholderTextColor='gray'/>

             </Animated.View>

             <Animated.View entering={FadeInDown.delay(400).duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full'>
             <TextInput keyboardType='email-address' value={email} onChangeText={setEmail} placeholder='Email' placeholderTextColor='gray'/>

             </Animated.View>
             <Animated.View entering={FadeInDown.delay(600).duration(1000).springify()} className='bg-black/5 p-5 rounded-2xl w-full'>
             <TextInput value={password} onChangeText={setPassword} placeholder='Password' placeholderTextColor='gray' secureTextEntry/>

             </Animated.View>
             {loading ? (<ActivityIndicator size="small" className='m-20' color="#0000ff" />) : (
                         <>
                  <Animated.View entering={FadeInDown.delay(800).duration(1000).springify()} className='w-full'>
                 <TouchableOpacity 
                 className='w-full bg-sky-400 p-3 rounded-2xl mb-3 mt-4'
                 onPress={handleSignUp}
                 >
                     <Text className='text-xl font-bold text-white text-center '>Registrarse</Text>
                 </TouchableOpacity>
             </Animated.View>
             <Animated.View entering={FadeInDown.delay(1000).duration(1000).springify()} className='flex-row justify-center pb-5'>
                 <Text>Ya tienes una cuenta?</Text>
                 <TouchableOpacity onPress={() => navigate.goBack()}>
                     <Text className='text-sky-600'> Iniciar Sesion</Text>
                 </TouchableOpacity>
             </Animated.View></>)}
             
         </View>
       </View>
       
     </View>
   )
}