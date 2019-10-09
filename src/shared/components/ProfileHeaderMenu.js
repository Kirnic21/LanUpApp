import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View, Text } from 'react-native';
import {
  Menu, MenuOption, MenuOptions, MenuTrigger, MenuProvider,
} from 'react-native-popup-menu';

const ProfileHeaderMenu = ({ handleOnLogout, handleChangePassword, style }) => (
  <View style={style}>
    <MenuProvider style={{ left: 45, height: 90 }}>
      <Menu>
        <MenuTrigger
          style={{ left: '75%' }}
          children={<Icon name="more-vert" size={25} color="#FFF" />}
        />
        <MenuOptions>
          <MenuOption onSelect={() => alert('Save')} text="Save" />
          <MenuOption onSelect={() => alert('Delete')}>
            <Text style={{ color: 'red' }}>Delete</Text>
          </MenuOption>
          <MenuOption onSelect={() => alert('Not called')} disabled text="Disabled" />
        </MenuOptions>
      </Menu>
    </MenuProvider>
  </View>
);
export default ProfileHeaderMenu;
