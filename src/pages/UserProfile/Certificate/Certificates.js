import React, { useState } from "react";
import { View, Text } from "react-native";
import EmptyState from "~/shared/components/emptyState/EmptyState";
import CertificateImg from "~/assets/images/certificate_img/certificate-img.png";
import { calcWidth } from "~/assets/Dimensions";
// import CertificateModal from "./CertificateModal";

const Certificates = ({ navigation }) => {
  const listCertificate = [{ nome: "bruno" }];
  const [visible, setvisible] = useState(false);
  return (
    <View style={{ flex: 1, backgroundColor: "#18142F" }}>
      <EmptyState
        onPress={() => {
          navigation.navigate("CertificateModal");
        }}
        image={CertificateImg}
        imageStyle={{ width: calcWidth(50) }}
        title={`Não temos nenhum${"\n"}certificado para mostrar`}
        subtitle={`Adicione as seus certificados${"\n"}e mostre suas competências`}
      />
      {/* <CertificateModal visible={visible} onclose={() => setvisible(false)} /> */}
    </View>
  );
};

export default Certificates;
