import React from "react";
import { View, Text, Image } from "react-native";
import EmptyState from "~/shared/components/emptyState/EmptyState";
import Emptyimage from "~/assets/images/emptyAgency.png";
import dimensions, { calcWidth, adjust } from "~/assets/Dimensions";
import { ScrollView } from "react-native-gesture-handler";
import ModalAgency from "./ModalAgency";
import IconAgencia from "~/assets/images/icon_agencia.png";
import ActionButton from "~/shared/components/ActionButton";
import { codeAgency } from "~/shared/services/agency.http";
import { updateAgencies, getAgencies } from "~/shared/services/freela.http";
import { decodeToken } from "~/shared/services/decode";
import AsyncStorage from '@react-native-async-storage/async-storage';;
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import { AlertHelper } from "~/shared/helpers/AlertHelper";
import { debounce } from "lodash";

class Agency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      agencies: [],
    };
    lastTimeout = setTimeout;
  }

  async componentDidMount() {
    const { id } = decodeToken(await AsyncStorage.getItem("API_TOKEN"));
    this.setState({ spinner: true, id });
    getAgencies(id)
      .then(({ data }) => data)
      .then(({ result }) => {
        const { value } = result;
        const listAgency = value === null ? [] : value;
        this.setState({ agencies: listAgency.map((c) => c.name), id });
      })
      .finally(() => {
        this.setState({ spinner: false });
      });
  }

  searchCode = (event) => {
    const txt = event.trim();
    this.setState({ code: [], loading: !!txt }, async () => {
      if (!!txt) {
        try {
          const {
            data: { result: code },
          } = await codeAgency(txt);
          this.setState({ code });
        } catch (error) {
          const {
            data: { errorMessage },
          } = error.response;
          AlertHelper.show("Error", "Erro", errorMessage);
        } finally {
          this.setState({ loading: false });
        }
      }
    });
    return;
  };

  addAgencies = async (nameCode, name) => {
    const { agencies, id } = this.state;
    updateAgencies({ id, agencyCode: nameCode })
      .then(() => {
        this.setState({
          agencies: [...agencies, name],
          visible: false,
          code: "",
        });
        AlertHelper.show(
          "success",
          "Sucesso",
          `Agora você faz parte da empresa: "${name}"`
        );
      })
      .catch((error) => {
        this.setState({ visible: false, code: [] });
        AlertHelper.show("error", "Erro", error.response.data.errorMessage);
      });
    return;
  };

  render() {
    const { visible, agencies, code, loading, spinner } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: "#18142F" }}>
        <SpinnerComponent loading={spinner} />
        {agencies.length ? (
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View style={styles.container}>
                {agencies.map((c, i) => (
                  <View key={i} style={styles.containerAgency}>
                    <Image source={IconAgencia} style={styles.logo} />
                    <Text style={styles.nameAgency}>{c}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
            <View style={styles.containerButton}>
              <ActionButton onPress={() => this.setState({ visible: true })} />
            </View>
          </View>
        ) : (
          <EmptyState
            title={`Não temos nenhuma${"\n"}empresa para mostrar`}
            subtitle={`Adicione o código da sua empresa${"\n"} e faça parte da equipe dela!`}
            image={Emptyimage}
            imageStyle={{ width: dimensions(120), height: dimensions(120) }}
            onPress={() => this.setState({ visible: true })}
          />
        )}
        <ModalAgency
          loading={loading}
          onChangeText={debounce((text) => {
            this.searchCode(text);
          }, 1000)}
          onPress={(nameCode, name) => this.addAgencies(nameCode, name)}
          visible={visible}
          code={code}
          onClose={() => this.setState({ visible: false, code: [] })}
        />
      </View>
    );
  }
}

const styles = {
  container: {
    marginHorizontal: calcWidth(4),
    flexWrap: "wrap",
    flexDirection: "row",
  },
  containerAgency: {
    flex: 1,
    minWidth: calcWidth(20),
    maxWidth: calcWidth(20),
    margin: calcWidth(1.5),
    marginBottom: calcWidth(3),
  },
  containerButton: {
    alignItems: "flex-end",
    margin: calcWidth(5),
    justifyContent: "flex-end",
  },
  logo: {
    height: calcWidth(20),
    width: calcWidth(20),
    borderColor: "#865FC0",
    borderWidth: 2,
    borderRadius: calcWidth(10),
    marginBottom: calcWidth(1),
  },
  nameAgency: {
    color: "#FFFFFF",
    fontFamily: "HelveticaNowMicro-Regular",
    fontSize: adjust(8),
    textAlign: "center",
  },
};

export default Agency;
