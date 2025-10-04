import { View, Text } from 'react-native';
import React from 'react';
import { Redirect } from 'expo-router';

export default function Home() {
  return (
    <View
      style={{
        backgroundColor: 'yellow',
        height: '100%',
        padding: 12,
      }}
    >
      <Text>Home</Text>
      <Redirect href="/login" />
    </View>
  );
}
