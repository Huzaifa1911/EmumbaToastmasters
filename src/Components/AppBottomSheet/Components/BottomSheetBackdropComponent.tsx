import React from 'react';
import {BottomSheetBackdrop, BottomSheetBackdropProps} from '@gorhom/bottom-sheet';

interface IBottomSheetBackdropComponent extends BottomSheetBackdropProps {
  onBackdropPress?: () => void;
}

const BottomSheetBackdropComponent = (props: IBottomSheetBackdropComponent) => {
  const {onBackdropPress} = props;
  const onPress = () => {
    if (onBackdropPress) onBackdropPress();
  };

  return <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} onPress={onPress} />;
};

export default BottomSheetBackdropComponent;
