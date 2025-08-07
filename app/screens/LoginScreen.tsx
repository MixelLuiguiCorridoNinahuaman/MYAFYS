import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import {StatusBar} from 'expo-status-bar'
import Animated, { FadeIn, FadeInDown, FadeInUp, FadeOut } from 'react-native-reanimated'
import { useNavigation, NavigationProp, useFocusEffect } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { loginUser } from '@/services/authService'

export default function LoginScreen() {

    const navigate = useNavigation<NavigationProp<RootStackParamList>>();
    const [animationKey, setAnimationKey] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Reiniciar animaciones cuando la pantalla toma foco
    useFocusEffect(
      React.useCallback(() => {
        setAnimationKey(prev => prev + 1);
        setEmail('')
        setPassword('')
      }, [])
    );

    const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor completa todos los campos');
      return;
    }

    setLoading(true);
    const result = await loginUser(email, password);
    
    if (result.success) {
      console.log('User :', result.user);
      setEmail('')
      setPassword('')
      navigate.navigate('MainTabs');
    } else {
      alert(`Error: ${result.error}`);
    }
    setLoading(false);
  };
  return (
    <View className='bg-white h-full w-full'>
        <StatusBar style="light" />
        <Image source={require('../../assets/images/background.png')} className='h-full w-full absolute' />
      <View className='flex-row justify-around w-full absolute'>
        <Animated.Image 
          key={`light1-${animationKey}`}
          entering={FadeInUp.delay(200).duration(1000).springify().damping(3)}  
          source={require('../../assets/images/light.png')} 
          className='h-[225] w-[90]'  
        />
        <Animated.Image 
          key={`light2-${animationKey}`}
          entering={FadeInUp.delay(400).duration(1000).springify().damping(3)}  
          source={require('../../assets/images/light.png')} 
          className='h-[160] w-[65]'  
        />
      </View>
      <View className='h-full w-full flex justify-around pt-40 pb-10'>
        <View className='flex items-center'>
            <Animated.Text 
              key={`title-${animationKey}`}
              entering={FadeInUp.duration(1000).springify()} 
              className='text-white font-bold tracking-wider text-5xl'
            >
                MYAFYS
            </Animated.Text>
        </View>
        <View className='flex items-center mx-4 space-y-4'>
            <Animated.View 
              key={`email-${animationKey}`}
              entering={FadeInDown.duration(1000).springify()} 
              className='bg-black/5 p-5 rounded-2xl w-full'
            >
            <TextInput value={email} onChangeText={setEmail} placeholder='Email' placeholderTextColor='gray'/>

            </Animated.View>
            <Animated.View 
              key={`password-${animationKey}`}
              entering={FadeInDown.delay(200).duration(1000).springify()} 
              className='bg-black/5 p-5 rounded-2xl w-full'
            >
            <TextInput value={password} onChangeText={setPassword} placeholder='Password' placeholderTextColor='gray' secureTextEntry/>

            </Animated.View>

            {loading ? (<ActivityIndicator size="small" className='m-20' color="#0000ff" />) : (
            <>
              <Animated.View 
              key={`button-${animationKey}`}
              entering={FadeInDown.delay(400).duration(1000).springify()} 
              className='w-full'
            >
                <TouchableOpacity className='w-full bg-sky-400 p-3 rounded-2xl mb-3 mt-4'>
                    <Text className='text-xl font-bold text-white text-center ' onPress={handleLogin}>Iniciar Sesion</Text>
                </TouchableOpacity>
            </Animated.View>
            
            <Animated.View
              key={`google-${animationKey}`}
              entering={FadeInDown.delay(600).duration(1000).springify()}
              className='flex-row justify-center'
            >

                <TouchableOpacity className='w-full bg-gray-200 p-3 rounded-2xl flex-row items-center justify-center' onPress={() => navigate.navigate('SignUp')}>
                  <Image source={require('../../assets/images/google3.webp')} className='h-6 w-6'/>
                    <View className='flex-1'>
                  <Text className='text-gray-600 font-bold text-lg text-center mr-6'>
                    Continuar con Google
                  </Text>
                </View>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              key={`footer-${animationKey}`}
              entering={FadeInDown.delay(800).duration(1000).springify()} 
              className='flex-row justify-center mt-4'
            >
                <Text>No tienes una cuenta?</Text>
                <TouchableOpacity onPress={() => navigate.navigate('SignUp')}>
                    <Text className='text-sky-600'> Registrate</Text>
                </TouchableOpacity>
            </Animated.View>
            
            </>
            )}
            
        </View>
      </View>
      
    </View>
  )
}