import React, {useEffect, useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {GenericTouchableProps} from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, ICONS, SIZES} from '../constants';

export function SignUp({navigation}: {navigation: any}) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <LinearGradient
        colors={[COLORS.lime, COLORS.emerald]}
        style={styles.container}>
        <ScrollView>
          <Header />
          <Logo />
          <Form />
          <Submit onPress={handleContinuePress} />
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );

  function handleContinuePress() {
    navigation.navigate('Main');
  }
}

export default SignUp;

function Header() {
  return (
    <TouchableOpacity style={styles.header} onPress={handleOnPress}>
      <Image source={ICONS.leftArrow} style={styles.headerBackIcon} />
      <Text style={styles.headerText}>Sign Up</Text>
    </TouchableOpacity>
  );

  function handleOnPress() {
    console.log('Sign Up');
  }
}

function Logo() {
  return (
    <View style={styles.logo}>
      <Text style={styles.logoText}>Wallie</Text>
    </View>
  );
}

function Form() {
  const [hidePass, setHidePass] = useState(true);
  const [areas, setAreas] = useState<AreaCode[]>([]);
  const [selectedArea, setSelectedArea] = useState<AreaCode>();
  const [openModal, setOpenModal] = useState(false);

  useEffect(loadAreas, []);

  return (
    <>
      <View style={styles.form}>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Full name</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Enter full name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.lime}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Phone number</Text>
          <View style={styles.formGroupComposite}>
            <TouchableOpacity
              style={styles.formControlBtn}
              onPress={handleCountryCodePress}>
              <View style={styles.formControlBtnContent}>
                <Image
                  source={ICONS.caretDown}
                  style={styles.formControlBtnCaret}
                />
                <Image
                  source={{uri: selectedArea?.flag}}
                  style={styles.formControlBtnIcon}
                />
                <Text style={styles.formControlBtnText}>
                  {selectedArea?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.formControl}
              placeholder="Enter phone number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.lime}
            />
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.formLabel}>Password</Text>
          <TextInput
            style={styles.formControl}
            placeholder="Enter password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.lime}
            secureTextEntry={hidePass}
          />
          <TouchableOpacity
            style={styles.showPasswordToggle}
            onPress={handleToggleShowPasswordPress}>
            <Image
              source={hidePass ? ICONS.eye : ICONS.hidden}
              style={styles.showPasswordToggleIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <AreaCodesModal open={openModal} onHide={handleModalHide}>
        <AreaCodes areas={areas} onItemPress={handleAreaCodePress} />
      </AreaCodesModal>
    </>
  );

  function loadAreas() {
    const url =
      'https://restcountries.com/v2/all?fields=name,alpha2Code,callingCodes';
    fetch(url).then(handleResponse).then(handleRawAreas).catch(handleError);
  }

  function handleResponse(response: Response): Promise<RawAreaCode[]> {
    return response.json();
  }

  function handleRawAreas(data: RawAreaCode[]): void {
    const areaCodes = data.map(function map({
      alpha2Code: code,
      name,
      callingCodes,
    }) {
      return {
        code,
        name,
        callingCode: `+${callingCodes[0]}`,
        flag: `https://flagcdn.com/w320/${code.toLowerCase()}.png`,
      };
    });
    setAreas(areaCodes);

    const defaultArea = areaCodes.find(function findUS({code}) {
      return code.toUpperCase() === 'US';
    });

    if (defaultArea) {
      setSelectedArea(defaultArea);
    }
  }

  function handleError(error: Error): void {
    setAreas([]);
    console.error(error);
  }

  function handleCountryCodePress() {
    setOpenModal(true);
  }

  function handleToggleShowPasswordPress() {
    setHidePass(function changeState(state) {
      return !state;
    });
  }

  function handleModalHide() {
    setOpenModal(false);
  }

  function handleAreaCodePress(item: AreaCode) {
    setSelectedArea(item);
    setOpenModal(false);
  }
}

function Submit({onPress}: GenericTouchableProps) {
  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

function AreaCodesModal({children, open, onHide}: AreaCodesModalProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={handleModalHide}>
      <TouchableWithoutFeedback onPress={handleModalHide}>
        <View style={styles.modalContainer}>
          <View style={styles.modalBody}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  function handleModalHide() {
    onHide && onHide();
  }
}

interface AreaCodesModalProps {
  children?: any;
  open: boolean;
  onHide?: () => void;
}

function AreaCodes({areas, onItemPress}: AreaCodesProps) {
  return (
    <FlatList
      data={areas}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
    />
  );

  function renderItem({item}: {item: AreaCode}) {
    return (
      <TouchableOpacity
        style={styles.areaCodesItem}
        onPress={handleItemPress(item)}>
        <Image source={{uri: item.flag}} style={styles.areaCodesItemIcon} />
        <Text style={styles.areaCodesItemText}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function keyExtractor(item: AreaCode) {
    return item.code;
  }

  function handleItemPress(item: AreaCode) {
    return function onPress() {
      onItemPress && onItemPress(item);
    };
  }
}

interface AreaCodesProps {
  areas: AreaCode[];
  onItemPress?: (item: AreaCode) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding * 3,
    paddingHorizontal: SIZES.padding * 2,
  },
  headerBackIcon: {
    tintColor: COLORS.white,
    width: 20,
    height: 20,
  },
  headerText: {color: COLORS.white, marginLeft: 10, ...FONTS.h4},
  logo: {
    marginTop: SIZES.padding * 5,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {color: COLORS.white, ...FONTS.largeTitle},
  form: {
    margin: SIZES.padding * 3,
  },
  formGroup: {
    marginTop: SIZES.padding * 3,
  },
  formGroupComposite: {
    flexDirection: 'row',
  },
  formLabel: {
    color: COLORS.lightGreen,
    ...FONTS.body3,
  },
  formControl: {
    flex: 1,
    marginBottom: SIZES.padding,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    color: COLORS.white,
    ...FONTS.body3,
  },
  formControlBtn: {
    width: 100,
    height: 50,
    marginHorizontal: 5,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 1,
    flexDirection: 'row',
    ...FONTS.body3,
  },
  formControlBtnContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  formControlBtnCaret: {
    tintColor: COLORS.white,
    resizeMode: 'contain',
    width: 12,
    height: 12,
    marginRight: 8,
  },
  formControlBtnIcon: {
    marginRight: 8,
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  formControlBtnText: {
    color: COLORS.white,
    ...FONTS.body3,
  },
  showPasswordToggle: {
    position: 'absolute',
    right: 0,
    bottom: 10,
    height: 30,
    width: 30,
  },
  showPasswordToggleIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  actions: {
    margin: SIZES.padding * 3,
  },
  btn: {
    height: 60,
    backgroundColor: COLORS.black,
    borderRadius: SIZES.radius / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    height: 400,
    width: SIZES.width * 0.8,
    backgroundColor: COLORS.lightGreen,
    borderRadius: SIZES.radius,
    padding: SIZES.padding * 2,
  },
  areaCodesItem: {padding: SIZES.padding, flexDirection: 'row'},
  areaCodesItemIcon: {width: 30, height: 30, marginRight: 10},
  areaCodesItemText: {color: COLORS.black, ...FONTS.body4},
});

interface RawAreaCode {
  alpha2Code: string;
  name: string;
  callingCodes: string[];
}

interface AreaCode {
  code: string;
  name: string;
  callingCode: string;
  flag: string;
}
