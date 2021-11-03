import React, {useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import featuresData from '../../api/featuresData';
import specialPromoData from '../../api/specialPromoData';
import {COLORS, FONTS, ICONS, IMAGES, SIZES} from '../../constants';

export function Home() {
  const [specialPromos] = useState(specialPromoData);

  return (
    <SafeAreaView style={styles.container}>
      <Promos promos={specialPromos} />
    </SafeAreaView>
  );
}

export default Home;

function Promos({promos, onItemPress}: PromosProps) {
  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      contentContainerStyle={styles.flatListContainer}
      columnWrapperStyle={styles.flatListWrapper}
      numColumns={2}
      data={promos}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
    />
  );

  function keyExtractor(item: any) {
    return `${item.id}`;
  }

  function renderItem({item}: any) {
    return (
      <TouchableOpacity
        style={styles.flatListItem}
        onPress={handleItemPress(item)}>
        <View style={styles.flatListItemContainer}>
          <Image
            source={item.img}
            resizeMode="cover"
            style={styles.flatListItemImg}
          />
        </View>
        <View style={styles.flatListItemDetails}>
          <Text style={styles.flatListItemTitle}>{item.title}</Text>
          <Text style={styles.flatListItemDescription}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function handleItemPress(item: any) {
    return function onPress() {
      onItemPress && onItemPress(item);
    };
  }
}

interface PromosProps {
  promos: any[];
  onItemPress?: (item: any) => void;
}

function ListHeader() {
  return (
    <View>
      <Header />
      <Banner />
      <Features />
      <PromoHeader />
    </View>
  );
}

function Header() {
  return (
    <View style={styles.flatListHeaderContainer}>
      <View style={styles.flatListHeaderText}>
        <Text style={styles.flatListHeaderHello}>Hello!</Text>
        <Text style={styles.flatListHeaderUser}>Lia Perez</Text>
      </View>
      <View style={styles.flatListHeaderNotificationContainer}>
        <TouchableOpacity style={styles.flatListHeaderNotificationButton}>
          <Image
            source={ICONS.bell}
            style={styles.flatListHeaderNotificationImg}
          />
          <View style={styles.flatListHeaderNotificationHint} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Banner() {
  return (
    <View style={styles.flatListHeaderBanner}>
      <Image
        source={IMAGES.promo}
        resizeMode="cover"
        style={styles.flatListHeaderBannerImg}
      />
    </View>
  );
}

function Features() {
  const [features] = useState(featuresData);

  return (
    <FlatList
      ListHeaderComponent={FeaturesListHeader}
      data={features}
      numColumns={4}
      columnWrapperStyle={styles.flatListHeaderFeaturesWrapper}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={styles.flatListHeaderFeatures}
    />
  );

  function keyExtractor(item: any): string {
    return `${item.id}`;
  }

  function renderItem({item}: any) {
    return (
      <TouchableOpacity
        style={styles.flatListHeaderFeaturesItem}
        onPress={handleItemPress(item)}>
        <View
          style={[
            styles.flatListHeaderFeaturesItemContainer,
            {backgroundColor: item.backgroundColor},
          ]}>
          <Image
            source={item.icon}
            resizeMode="contain"
            style={[
              styles.flatListHeaderFeaturesItemImg,
              {
                tintColor: item.color,
              },
            ]}
          />
        </View>
        <Text style={styles.flatListHeaderFeaturesItemText}>
          {item.description}
        </Text>
      </TouchableOpacity>
    );
  }

  function handleItemPress(item: any) {
    return function onPress() {
      console.log('handleItemPress', {item});
    };
  }
}

function FeaturesListHeader() {
  return (
    <View style={styles.flatListHeaderFeaturesTitle}>
      <Text style={styles.flatListHeaderFeaturesTitleText}>Features</Text>
    </View>
  );
}

function PromoHeader() {
  return (
    <View style={styles.promoHeader}>
      <View style={styles.promoHeaderTitle}>
        <Text style={styles.promoHeaderTitleText}>Special Promos</Text>
      </View>
      <TouchableOpacity
        style={styles.promoHeaderBtn}
        onPress={handleViewAllPress}>
        <Text style={styles.promoHeaderBtnText}>Vew all</Text>
      </TouchableOpacity>
    </View>
  );

  function handleViewAllPress() {
    console.log('handleViewAllPress');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  flatListContainer: {
    paddingHorizontal: SIZES.padding * 3,
    paddingBottom: SIZES.padding * 6,
  },
  flatListWrapper: {justifyContent: 'space-between'},
  flatListItem: {
    marginVertical: SIZES.base,
    width: SIZES.width / 2.5,
  },
  flatListItemContainer: {
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.primary,
    overflow: 'hidden',
  },
  flatListItemImg: {
    width: '100%',
    height: '100%',
  },
  flatListItemDetails: {
    padding: SIZES.padding,
    backgroundColor: COLORS.lightGray,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  flatListItemTitle: {
    ...FONTS.h4,
    color: COLORS.black,
  },
  flatListItemDescription: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  flatListHeaderContainer: {
    flexDirection: 'row',
    marginVertical: SIZES.padding * 2,
  },
  flatListHeaderText: {
    flex: 1,
  },
  flatListHeaderHello: {
    color: COLORS.black,
    ...FONTS.h1,
  },
  flatListHeaderUser: {
    color: COLORS.gray,
    ...FONTS.body2,
  },
  flatListHeaderNotificationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListHeaderNotificationButton: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
  },
  flatListHeaderNotificationImg: {
    width: 20,
    height: 20,
    tintColor: COLORS.secondary,
  },
  flatListHeaderNotificationHint: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 10,
    height: 10,
    backgroundColor: COLORS.red,
    borderRadius: 5,
  },
  flatListHeaderBanner: {
    height: 120,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  flatListHeaderBannerImg: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  flatListHeaderFeatures: {
    marginTop: SIZES.padding * 2,
  },
  flatListHeaderFeaturesWrapper: {justifyContent: 'space-between'},
  flatListHeaderFeaturesTitle: {marginBottom: SIZES.padding * 2},
  flatListHeaderFeaturesTitleText: {color: COLORS.black, ...FONTS.h3},
  flatListHeaderFeaturesItem: {
    marginBottom: SIZES.padding * 2,
    width: 60,
    alignItems: 'center',
  },
  flatListHeaderFeaturesItemContainer: {
    height: 50,
    width: 50,
    marginBottom: 5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListHeaderFeaturesItemImg: {
    height: 20,
    width: 20,
  },
  flatListHeaderFeaturesItemText: {
    color: COLORS.black,
    textAlign: 'center',
    flexWrap: 'wrap',
    ...FONTS.body5,
  },
  promoHeader: {
    flexDirection: 'row',
    marginBottom: SIZES.padding,
  },
  promoHeaderTitle: {
    flex: 1,
  },
  promoHeaderTitleText: {
    color: COLORS.black,
    ...FONTS.h3,
  },
  promoHeaderBtn: {},
  promoHeaderBtnText: {
    color: COLORS.gray,
    ...FONTS.body4,
  },
});
