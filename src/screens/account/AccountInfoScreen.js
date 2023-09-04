import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View} from 'react-native';

//Local imports
import AppText from '../../components/AppText';
import BackArrow from '../../components/BackArrow';
import ListItemSeparator from '../../components/lists/ListItemSeparator';

import styles from '../../config/styles';

function AccountInfoScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <BackArrow onPress={() => navigation.navigate('Account')} />
      </View>
      <View>
        <AppText style={styles.username}>Username</AppText>
        <AppText>Age</AppText>
      </View>
      {/*Bio*/}
      <View>
        <AppText>Bio</AppText>
      </View>
      <View>
        <AppText>Bio info</AppText>
      </View>
      <ListItemSeparator />
      {/*Native Language*/}
      <View>
        <AppText>Native Language</AppText>
      </View>
      <View>
        <AppText>Language info</AppText>
      </View>
      <ListItemSeparator />
      {/*Language Proficiency*/}
      <View>
        <AppText>Language Proficiency</AppText>
      </View>
      <View>
        <AppText>Language Prof info</AppText>
      </View>
      <ListItemSeparator />
      {/*Learning Goals*/}
      <View>
        <AppText>Learning Goals</AppText>
      </View>
      <View>
        <AppText>Learning Goals info</AppText>
      </View>
      <ListItemSeparator />
      {/* References*/}
      <View>
        <AppText>References</AppText>
      </View>
      <View>
        <AppText>References info</AppText>
      </View>
    </SafeAreaView>
  );
}

export default AccountInfoScreen;
