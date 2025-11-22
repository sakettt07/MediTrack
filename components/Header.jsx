import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getLocalStorage } from '../service/Storage'

const Header = () => {

    const[userInfo,setUserInfo]=useState("");
    const GetUserDetail=async()=>{
        const userInfo=await getLocalStorage('userDetail')
        console.log("this is the userinfo",userInfo);
    }
    useEffect(()=>{
        GetUserDetail()
    })
  return (
    <View style={{
        height:60,
        backgroundColor:"#fff",
        padding:3
    }}>
      <Text>Header</Text>
    </View>
  )
}

export default Header