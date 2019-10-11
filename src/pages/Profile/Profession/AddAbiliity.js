import React, { Component } from 'react';

import {
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import add from '../../../assets/images/icon_add.png';
import ActionButton from '../../../shared/components/ActionButton';
import styles from './styles';

class AddAbiliity extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.ContainerJob}>
          <View style={{ paddingTop: '20%' }}>
            <Text style={{ color: '#FFF', fontSize: 37 }}>Habilidades</Text>
          </View>
        </View>

        <View style={[styles.ContainerText,
          { width: Dimensions.get('window').width - 10 },
        ]}
        >
          <Text style={styles.title}>
          Não há nenhuma habilidade{'\n'}para ser exibida
          </Text>
          <Text style={styles.subtitle}>
            Adicione usando o
            {' " '}<Image source={add} style={{ width: 20, height: 20 }} />{' " '}
              abaixo
          </Text>
        </View>

        <View style={styles.ContainerBtn}>
          <ActionButton style={styles.ActionButton} />
        </View>
      </View>
    );
  }
}

export default AddAbiliity;
