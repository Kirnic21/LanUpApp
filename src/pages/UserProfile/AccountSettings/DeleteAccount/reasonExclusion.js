import React from "react";
import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";
import { CheckBox } from "react-native-elements";
import Card from "~/shared/components/Card";
import { adjust, calcWidth } from "~/assets/Dimensions";
import InputLabel from "~/shared/components/InputLabel";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ReasonExclusion = ({ navigation }) => {
  const reasons = [
    { title: "Não encontrei vagas para minha região" },
    { title: "O app não funciona direito" },
    { title: "Problemas com minha conta" },
    { title: "Não estou satisfeito com a minha experiência no app" },
    { title: "Outros motivos" },
  ];
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
      >
        <Card title="A LanUp se preocupa em tornar a nossa plataforma cada dia melhor. Conta para gente o motivo da sua exclusão.">
          <View>
            {reasons.map((x, i) => (
              <CheckBox
                key={i}
                title={x.title}
                textStyle={{
                  fontFamily: "HelveticaNowDisplay-Regular",
                  fontSize: adjust(12),
                  color: "#FFF",
                  fontWeight: "normal",
                }}
                checkedIcon="circle"
                uncheckedIcon="circle-thin"
                checkedColor="#46C5F3"
                uncheckedColor="#FFFFFF"
                size={calcWidth(8)}
                checked={false}
                containerStyle={{
                  backgroundColor: "transparent",
                  borderWidth: 0,
                  marginVertical: calcWidth(5),
                  marginLeft: 0,
                  padding: 0,

                  // width: "95%",
                }}
                // onPress={onPressCheck}
              />
            ))}
          </View>
          <View style={{ marginTop: calcWidth(10) }}>
            <InputLabel
              textStyle={styles.title}
              title={"Se quiser, nos conte o que aconteceu"}
              isfocused="#46C5F3"
              // onChangeText={onChangeText}
              style={{
                height: calcWidth(25),
                textAlignVertical: "top",
                paddingVertical: calcWidth(5),
                borderRadius: 10,
              }}
              // value={valueInput}
              multiline={true}
            />
          </View>
        </Card>
        <View style={[styles.wrapper, { marginTop: calcWidth(5) }]}>
          <RoundButton
            onPress={() => navigation.navigate("AccountSettings")}
            width="100%"
            style={styles.buttonCancel}
            name="Cancelar"
          />
          <RoundButton
            onPress={() =>
              navigation.navigate("DeleteAccountStep2", { step: 2 })
            }
            width="100%"
            style={styles.buttonNext}
            name="Próximo"
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ReasonExclusion;
