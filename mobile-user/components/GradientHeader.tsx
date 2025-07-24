import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

type GradientHeaderProps = {
  title: string;
  returnPath: string;
  returnParams?: object;
  onBackPress?:() => void;
};

const GradientHeader = ({
  title,
  returnPath,
  returnParams,
  onBackPress
}: GradientHeaderProps) => {
  const navigation = useNavigation<any>();
  return (
    <LinearGradient
      colors={['#002147', '#002D62']}
      // colors={['#EC4899', '#B53133']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.header]}
    >
      <TouchableOpacity
      onPress={() =>
    typeof onBackPress === 'function'
      ? onBackPress()
      : navigation.navigate(returnPath, returnParams)
  }
        // onPress={() => navigation.navigate(returnPath, returnParams)}
      >
        <Entypo name="chevron-with-circle-left" size={25} color={'#fff'} style={styles.mt15}/>
        {/* <Ionicons name="arrow-back-outline" size={25} color={'#fff'} style={styles.mt10}/> */}
      </TouchableOpacity>

      <Text style={[styles.title, styles.mt10]}>
        {title.length > 30 ? `${title.slice(0, 27)}...` : title}
      </Text>
      <View style={styles.space_10_r} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    // height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
  space_10_r: {
    marginRight: 10,
  },
  mt10:{
    marginTop:10
  },
  mt15: {
    marginTop:15
  }
});

export default GradientHeader;
