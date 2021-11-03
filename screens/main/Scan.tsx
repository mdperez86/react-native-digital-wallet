import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {COLORS, FONTS, ICONS, SIZES} from '../../constants';

export function Scan({navigation}: any) {
  return (
    <SafeAreaView style={styles.container}>
      <RNCamera
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use Camera',
          message: 'Camera is required for QR Code scanning',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={handleCodeRead}
        style={styles.camera}>
        <Header onBackPress={handleBackPress} />
        <ScanFocus />
        <PaymentMethods />
      </RNCamera>
    </SafeAreaView>
  );

  function handleBackPress() {
    navigation.navigate('Home');
  }

  function handleCodeRead(result: any) {
    console.log(result);
  }
}

export default Scan;

function Header({onBackPress}: HeaderProps) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerBtn} onPress={onBackPress}>
        <Image source={ICONS.close} style={styles.headerBtnImg} />
      </TouchableOpacity>
      <View style={styles.headerTitle}>
        <Text style={styles.headerTitleText}>Scan for payment</Text>
      </View>
      <TouchableOpacity style={styles.headerInfoBtn} onPress={onBackPress}>
        <Image source={ICONS.info} style={styles.headerInfoBtnImg} />
      </TouchableOpacity>
    </View>
  );
}
interface HeaderProps {
  onBackPress?: () => void;
}

function ScanFocus() {
  return (
    <View style={styles.scan}>
      <Image source={ICONS.focus} resizeMode="contain" style={styles.scanImg} />
    </View>
  );
}

function PaymentMethods() {
  return (
    <View style={styles.payment}>
      <Text style={styles.paymentTitle}>Another payment methods</Text>
      <View style={styles.paymentActions}>
        <TouchableOpacity style={styles.paymentBtn}>
          <View style={styles.paymentBtnContainer}>
            <Image source={ICONS.info} style={styles.paymentBtnImg} />
          </View>
          <Text style={styles.paymentBtnText}>Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.paymentBtn}>
          <View
            style={[
              styles.paymentBtnContainer,
              {backgroundColor: COLORS.lightGreen},
            ]}>
            <Image
              source={ICONS.scan}
              style={[styles.paymentBtnImg, {tintColor: COLORS.primary}]}
            />
          </View>
          <Text style={styles.paymentBtnText}>Barcode</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparent,
  },
  camera: {flex: 1},
  header: {
    flexDirection: 'row',
    marginTop: SIZES.padding * 4,
    paddingHorizontal: SIZES.padding * 3,
  },
  headerBtn: {
    width: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnImg: {
    height: 20,
    width: 20,
    tintColor: COLORS.white,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  headerInfoBtn: {
    height: 45,
    width: 45,
    backgroundColor: COLORS.green,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerInfoBtnImg: {height: 25, width: 25, tintColor: COLORS.white},
  payment: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 220,
    padding: SIZES.padding * 3,
    borderTopLeftRadius: SIZES.radius,
    borderTopRightRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  paymentTitle: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  paymentActions: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SIZES.padding * 2,
  },
  paymentBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentBtnContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  paymentBtnImg: {
    height: 25,
    width: 25,
    tintColor: COLORS.purple,
  },
  paymentBtnText: {
    marginHorizontal: SIZES.padding,
    color: COLORS.black,
    ...FONTS.body4,
  },
  scan: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanImg: {
    width: 200,
    height: 300,
    marginTop: '-55%',
    tintColor: COLORS.white,
  },
});
