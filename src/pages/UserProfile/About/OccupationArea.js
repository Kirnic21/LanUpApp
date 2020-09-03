import React from "react";
import { Text, View, TouchableOpacity, FlatList } from "react-native";
import InputSearch from "~/shared/components/InputSearch";
import axios from "axios";
import styles from "./styles";
import dimensions, { adjust } from "~/assets/Dimensions/index";
import Modal from "~/shared/components/ModalComponent";

export default class OccupationArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false, bottomModalAndTitle: true };
  }

  onSearch = (value) => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${value}&inputtype=textquery&fields=type,icon,place_id,formatted_address,name,geometry&key=AIzaSyB1QnZpLJnE-j8mL3f5uHDlCmV7jH_GRp0`
      )
      .then((response) =>
        this.setState({
          places: this.mapCandidatesToPlaces(response.data.candidates),
        })
      )
      .catch((message) => this.showMessage(message));
  };

  mapCandidatesToPlaces = (candidates) =>
    candidates.map((candidate) => ({
      address: candidate.formatted_address || candidate.vicinity,
      location: {
        latitude: candidate.geometry.location.lat,
        longitude: candidate.geometry.location.lng,
      },
      name: candidate.name,
      icon: candidate.icon,
      id: candidate.place_id,
      type: candidate.types[0],
    }));

  clear = () => {
    this.setState({ search: "" });
  };

  render() {
    const { address } = this.props;
    const { search, visible } = this.state;
    return (
      <View style={styles.containerLocation}>
        <Text style={[styles.TitleInformation, { paddingBottom: "5%" }]}>
          Coloque seu melhor endereço
        </Text>
        <Text
          onPress={() => {
            this.setState({ visible: true });
          }}
          style={{
            borderColor: "#fff",
            borderWidth: 2,
            paddingVertical: dimensions(12),
            borderRadius: 25,
            color: address ? "#FFF" : "rgba(255,255,255,0.5)",
            paddingLeft: "7%",
            textAlignVertical: "center",
            fontSize: adjust(10),
            fontFamily: "HelveticaNowMicro-Regular",
          }}
        >
          {address || "Coloque onde você mora"}
        </Text>
        <Modal
          onClose={() => this.setState({ visible: false })}
          visible={visible}
        >
          <View>
            <InputSearch handleOnSearch={this.onSearch} value={search} />
            <FlatList
              ListEmptyComponent={
                <View
                  style={{
                    backgroundColor: "#18142F",
                    paddingVertical: "10%",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "#FFF",
                      fontSize: adjust(12),
                      fontFamily: "HelveticaNowMicro-Regular",
                      textAlign: "center",
                    }}
                  >
                    "Nenhum endereço"
                  </Text>
                </View>
              }
              style={{ marginTop: "10%", marginBottom: "10%" }}
              extraData={this.state}
              keyExtractor={(place) => place.id}
              data={this.state.places}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={(e) => {
                    this.setState({ visible: false, place: "" });
                    this.props.onPress(item);
                  }}
                  style={{
                    backgroundColor: "#18142F",
                    paddingVertical: "10%",
                    borderRadius: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: adjust(12),
                      fontFamily: "HelveticaNowMicro-Regular",
                      textAlign: "center",
                    }}
                  >
                    {item.address}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
