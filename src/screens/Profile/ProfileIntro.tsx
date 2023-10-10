import * as React from 'react';
import {FlatList} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {
  StyleService,
  useStyleSheet,
  TopNavigation,
  Button,
} from '@ui-kitten/components';

import {Container, NavigationAction} from 'components';
import {ProfileStackParamList} from 'navigation/navigation-types';

interface ButtonProps {
  name: string;
  navigate: keyof ProfileStackParamList;
}

const ProfileIntro = React.memo(() => {
  const {navigate} = useNavigation<NavigationProp<ProfileStackParamList>>();

  const styles = useStyleSheet(themedStyles);

  const data: ButtonProps[] = [
    {name: '01', navigate: 'Profile01'},
    {name: '02', navigate: 'Profile02'},
    {name: '03', navigate: 'Profile03'},
    {name: '04', navigate: 'Profile04'},
    {name: '05', navigate: 'Profile05'},
    {name: '06', navigate: 'Profile06'},
    {name: '07', navigate: 'Profile07'},
    {name: '08', navigate: 'Profile08'},
    {name: '09', navigate: 'Profile09'},
    {name: '10', navigate: 'Profile10'},
  ];

  return (
    <Container style={styles.container}>
      <TopNavigation
        title={'Profile'}
        accessoryLeft={<NavigationAction status="placeholder" />}
      />
      <FlatList
        data={data}
        contentContainerStyle={styles.content}
        renderItem={({item}) => {
          return (
            <Button
              status="primary"
              size='large'
              children={item.name}
              style={styles.button}
              onPress={() => {
                navigate(item.navigate);
              }}
            />
          );
        }}
      />
    </Container>
  );
});

export default ProfileIntro;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 24,
  },
  button: {
    marginBottom: 16,
    borderRadius:16
  },
});
