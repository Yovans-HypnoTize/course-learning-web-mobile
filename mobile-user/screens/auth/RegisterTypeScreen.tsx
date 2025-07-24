import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const RegisterTypeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <LinearGradient
      colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      
      <Image
        source={require('../../assets/auth/registerScreenHeaderImg.png')}
        style={styles.registerHeaderImage}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.registerTextContainer}>
          <View>
            <Text style={[styles.registerText]}>
              Your journey to Japanese fluency
            </Text>
            <Text
              style={{ textAlign: 'center', fontSize: 16, fontWeight: 800 }}
            >
              STARTS HERE!
            </Text>
          </View>
        </View>
        {/* <View style={styles.registerHeaderImage2Container}>
          <Image
            source={require('../../assets/auth/registerScreenHeaderImage2.png')}
            style={styles.registerHeaderImage2}
          />
        </View> */}
        <View style={styles.btnContainer}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}
              style={[styles.courseCard, { marginRight: 20 }]}
            >
              <Image
                source={require('../../assets/auth/JoinIndividual.png')}
                style={{ height: 50, width: 40 }}
              />
              <Text
                style={{
                  color: '#B53133',
                  marginTop: 10,
                  paddingHorizontal: 5,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Join as Individual
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}
              style={styles.courseCard}
            >
              <Image
                source={require('../../assets/auth/JoinOrganization.png')}
                style={{ height: 50, width: 40 }}
              />
              <Text
                style={{
                  color: '#B53133',
                  marginTop: 10,
                  paddingHorizontal: 5,
                  fontWeight: 500,
                  textAlign: 'center',
                }}
              >
                Join as Organisation
              </Text>
            </TouchableOpacity>

            {/* <ReuGradientButton
              label="Join as Individual"
              onPress={() => {navigation.navigate("Register")}}
              gradientColors={['#D13D66', '#B53133', '#B53133', '#B53133']}
              startIcon={<FontAwesomeIcons name={"building"} size={20} color={"#ffffff"} />}
            /> */}
          </View>
          {/* <View style={styles.joinOrganizationTextContainer}>
            <ReuGradientButton
              label="Join as Organization"
               onPress={() => {navigation.navigate("Register")}}
              gradientColors={['#79A7DF', '#4672B6', '#4672B6', '#4672B6']}
              startIcon={<Ionicons name={"person"} size={20} color={"#ffffff"} />}
            />
          </View> */}
        </View>
        <View style={styles.loginTextContainer}>
          <View>
            <Text style={styles.accountText}>Already have an account?</Text>
            <Link
              screen="Login"
              params={{}}
              style={[styles.loginLinkText, { color: '#B53133' }]}
            >
              Sign In
            </Link>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default RegisterTypeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  topImage: {
    position: 'absolute',
    height: 150,
    width: 150,
    resizeMode: 'contain',
    top: '4%',
    right: '2%',
  },
  registerHeaderImage: {
    height: 100,
    width: 150,
    borderRadius: 50,
    // elevation: 3,
    marginTop: '40%',
  },
  registerHeaderImage2Container: {
    position: 'absolute',
    left: '43%',
    top: -20,
  },
  registerHeaderImage2: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  registerText: {
    fontSize: 18,
    // width: '90%',
    textAlign: 'center',
  },
  registerTextContainer: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  contentWrapper: {
    flex: 1,
    // backgroundColor: 'red',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // borderTopRightRadius: 45,
    // borderTopLeftRadius: 45,
    // paddingTop: 20,
    // marginTop: 20,
  },
  btnContainer: {
    // marginTop: 20,
    paddingHorizontal: 40,
  },
  joinOrganizationTextContainer: {
    marginTop: 20,
  },
  loginTextContainer: {
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  accountText: {
    textAlign: 'center',
  },
  loginLinkText: {
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 5,
  },

  courseCard: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 230, 237, 0.7)',
    boxShadow: '2px 2px 2px rgba(0,0,0,0.2)',
    borderRadius: 15,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 200,
    width: 150,
  },
});
