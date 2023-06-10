import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, GlobalStyles, WP } from '../constants';

let propsData = {};

export default ConfirmationDailog = React.forwardRef((props, ref) => {
  const [isVisible, ModalVisibility] = useState(false);
  const [message, setMessage] = useState('');

  React.useImperativeHandle(ref, () => ({
    isVisible(params) {
      propsData = params;
      ModalVisibility(true);
      setMessage(params.message);
    },
  }));

  const {header, NegText, NegPress, PosText, NegColor, PosPress, data} =
    propsData;
  return (
    <Modal
      style={{
        felx: 1,
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisible}
      animationIn="bounceIn"
      animationOut="bounceOut"
      backdropOpacity={0.5}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onBackdropPress={() => {
        ModalVisibility(false);
        // propsData = {}
      }}>
      <View style={styles.modalView}>
        {header && <Text style={styles.headingText}>{header}</Text>}
        <Text style={styles.msgText}>{message}</Text>

        <View style={{flexDirection: 'row'}}>
          {NegText && (
            <TouchableOpacity
              style={[
                styles.negBtn,
                {
                  marginRight: WP(3),
                  backgroundColor: Colors.boldBorderColor,
                  borderWidth: 1,
                  borderColor: Colors.gray,
                },
              ]}
              onPress={() => {
                ModalVisibility(false);
                NegPress && NegPress(data);
              }}>
              <Text style={[styles.okayText, {color: Colors.gray}]}>
                {NegText}
              </Text>
            </TouchableOpacity>
          )}

          {PosText && (
            <TouchableOpacity
              style={styles.okayBtn}
              onPress={() => {
                ModalVisibility(false);
                PosPress && PosPress(data);
              }}>
              <Text style={styles.okayText}>{PosText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalView: {
    width: WP(85),
    backgroundColor: 'white',
    borderRadius: WP(2),
    padding: WP(6),
    alignItems: 'center',
    ...GlobalStyles.topBorder,
  },

  limitedStockText: {
    fontSize: WP(5),

    color: Colors.primary,
  },
  headingText: {
    fontSize: WP(5),
    color: Colors.primary,
    marginBottom: WP(1),
    textAlign: 'center',
  },
  msgText: {
    fontSize: WP(4),
    color: 'black',
    marginTop: WP(2),
    marginBottom: WP(6),
  },
  negBtn: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: WP(1.5),
    borderRadius: WP(2),
  },
  okayBtn: {
    backgroundColor: Colors.secondary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: WP(1.5),
    borderRadius: WP(2),
  },
  okayText: {
    fontSize: WP(4.5),
    color: 'white',
  },
});
