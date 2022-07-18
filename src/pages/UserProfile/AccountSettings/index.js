import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Menu from "~/shared/components/Menu";

const AccountSettings = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Menu
        data={[
          {
            title: "Alterar senha",
            onPress: () => navigation.navigate("ChangePassword"),
          },
          {
            title: "Excluir conta",
            onPress: () =>
              navigation.navigate("DeleteAccountStep1", { step: 1 }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#18142F",
    flex: 1,
  },
});

export default AccountSettings;
