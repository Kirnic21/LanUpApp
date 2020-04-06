import React from "react";
import { View, Text, Image } from "react-native";
import EmptyState from "~/shared/components/emptyState/EmptyState";
import Emptyimage from "~/assets/images/emptyAgency.png";
import dimensions, { calcWidth } from "~/assets/Dimensions";
import { ScrollView } from "react-native-gesture-handler";
import ModalAgency from "./ModalAgency";
import IconAgencia from "~/assets/images/icon_agencia.png";
import ActionButton from "~/shared/components/ActionButton";
import { codeAgency } from "~/shared/services/agency.http";
import { updateAgencies, decodeToken } from "~/shared/services/freela.http";
import AsyncStorage from "@react-native-community/async-storage";

class Agency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agencies: []
    };
    lastTimeout = setTimeout;
  }

  searchCode = event => {
    const txt = event.trim();
    this.setState({ code: [], loading: !!txt });
    if (!!txt) {
      clearTimeout(this.lastTimeout);
      this.lastTimeout = setTimeout(() => {
        codeAgency(txt)
          .then(({ data }) => data)
          .then(({ result }) => {
            this.setState({ code: result });
          })
          .finally(() => {
            this.setState({ loading: false });
          });
      }, 1000);
    }
  };

  button = async item => {
    const { agencies } = this.state;
    const token = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    console.log(token.id);
    updateAgencies({ agencyCode: item, id: token.id })
      .then(() => {
        debugger;
        this.setState({
          agencies: [...agencies, item],
          visible: false,
          code: ""
        });
      })
      .catch(error => {
        debugger;
        console.log(error);
      });
  };

  render() {
    const { visible, agencies, code, loading } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#18142F" }}>
        {agencies.length ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View
                style={{
                  marginHorizontal: calcWidth(6.1),
                  flexWrap: "wrap",
                  flexDirection: "row",
                  backgroundColor: "#FFF"
                }}
              >
                {agencies.map((c, i) => (
                  <View
                    key={i}
                    style={{
                      alignItems: "center",
                      backgroundColor: "green",
                      width: calcWidth(29.3)
                    }}
                  >
                    <Image source={IconAgencia} style={styles.logo} />
                    <Text style={styles.nameAgency}>{c}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View
              style={{
                alignItems: "flex-end",
                margin: calcWidth(5),
                justifyContent: "flex-end"
              }}
            >
              <ActionButton onPress={() => this.setState({ visible: true })} />
            </View>
          </View>
        ) : (
          <EmptyState
            title={`Não temos nenhuma${"\n"}agência para mostrar`}
            subtitle={`Adicione o código da sua agência${"\n"} e faça parte da equipe dela!`}
            image={Emptyimage}
            imageStyle={{ width: dimensions(120), height: dimensions(120) }}
            onPress={() => this.setState({ visible: true })}
          />
        )}
        <ModalAgency
          loading={loading}
          onChangeText={text => this.searchCode(text)}
          onPress={item => this.button(item)}
          visible={visible}
          code={code}
          onClose={() => this.setState({ visible: false, code: [] })}
        />
      </View>
    );
  }
}

const styles = {
  logo: {
    height: calcWidth(20),
    width: calcWidth(20),
    borderColor: "#865FC0",
    borderWidth: 2,
    borderRadius: calcWidth(10),
    marginBottom: calcWidth(1)
  },
  nameAgency: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: dimensions(10)
  }
};

export default Agency;
