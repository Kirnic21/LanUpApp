import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";

import EmptyState from "~/shared/components/emptyState/EmptyState";
import CertificateImg from "~/assets/images/certificate_img/certificate-img.png";
import { calcWidth } from "~/assets/Dimensions";
import SpinnerComponent from "~/shared/components/SpinnerComponent";
import ActionButton from "~/shared/components/ActionButton";

import Image from "react-native-fast-image";

import { getCertificate } from "~/shared/services/certificates.http";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { setCertificate } from "~/store/ducks/Certificate/certificate.actions";

const Certificates = ({ navigation, setCertificate, list, spinner }) => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    setCertificate();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableHighlight
      onPress={() => {
        navigation.navigate("CertificateModal", {
          viewCerticates: true,
          item,
        });
      }}
    >
      <Image
        source={{ uri: item.certificateImage }}
        style={styles.listItem}
        resizeMode="cover"
      />
    </TouchableHighlight>
  );

  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  };

  const loadCertificates = () => {
    if (loading) return;

    setLoading(true);

    getCertificate({ page, pageSize: 20 })
      .then(({ data }) => data)
      .then(({ result }) => {
        setList([...list, ...result.content]);
        setPage(page + 1);
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#18142F" }}>
      <SpinnerComponent loading={loading || spinner} />
      {list.length ? (
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ marginTop: 20 }}
            contentContainerStyle={styles.list}
            data={list}
            renderItem={renderItem}
            ListFooterComponent={renderFooter}
            horizontal={false}
            numColumns={2}
            onMomentumScrollEnd={loadCertificates}
            onEndReachedThreshold={0}
            keyExtractor={(item, index) => index.toString()}
          />
          <View style={styles.containerActionButton}>
            <ActionButton
              onPress={() => {
                navigation.navigate("CertificateModal", {
                  viewCerticates: false,
                });
              }}
            />
          </View>
        </View>
      ) : (
        <EmptyState
          onPress={() => {
            navigation.navigate("CertificateModal", {
              viewCerticates: false,
            });
          }}
          image={CertificateImg}
          imageStyle={{ width: calcWidth(50) }}
          title={`Adicione os seus certificados ${"\n"} para ajudar o contratante ${"\n"} a escolher seu perfil.`}
          subtitle={`Os certificados confirmam suas habilidades${"\n"}comprovadas para receber mais vagas.`}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
  },
  containerActionButton: {
    position: "absolute",
    width: "100%",
    alignItems: "flex-end",
    bottom: calcWidth(5),
    right: calcWidth(5),
  },
  listItem: {
    margin: calcWidth(5),
    borderRadius: 5,
    width: calcWidth(35),
    height: calcWidth(30),
  },
});

const mapStateToProps = (state) => {
  const { certificate: list, loading: spinner } = state.certificate;
  return {
    list,
    spinner,
  };
};

const mapActionToProps = (dispatch) =>
  bindActionCreators(
    {
      setCertificate,
    },
    dispatch
  );
export default connect(mapStateToProps, mapActionToProps)(Certificates);
