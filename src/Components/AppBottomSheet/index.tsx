/* eslint-disable react/no-unstable-nested-components */

import React, {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

import {IAppTextProps} from '../AppText';
import {TBottomSheetHandler} from 'Types';
import BottomSheetBackdropComponent from './Components/BottomSheetBackdropComponent';
import {BottomSheetBackgroundComponent, Content} from './styles';
import BottomSheetTitle from './Components/BottomSheetTitle';
import {Spacer} from 'Components';

interface IAppBottomSheetProps {
  title?: string;
  titleProps?: IAppTextProps;
  onCloseSheet?: () => void;
  onBackdropPress?: () => void;
  snapPoints?: (string | number)[];
}

const AppBottomSheet = forwardRef<
  TBottomSheetHandler,
  PropsWithChildren<IAppBottomSheetProps>
>((props, ref) => {
  const {
    onCloseSheet,
    onBackdropPress,
    title = '',
    snapPoints = ['60%', '90%'],

    titleProps,
    children,
  } = props;
  const sheetRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(
    ref,
    () => ({
      close: () => sheetRef.current?.close(),
      open: () => sheetRef.current?.present(),
    }),
    [],
  );

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        snapPoints={snapPoints}
        index={0}
        ref={sheetRef}
        onDismiss={onCloseSheet}
        backdropComponent={backdropProps => (
          <BottomSheetBackdropComponent
            onBackdropPress={onBackdropPress}
            {...backdropProps}
          />
        )}
        backgroundComponent={({style}) => (
          <BottomSheetBackgroundComponent style={style} />
        )}>
        <Content>
          <Spacer left={16} right={10} bottom={20}>
            <BottomSheetTitle
              title={title}
              onCloseSheet={onCloseSheet}
              titleProps={titleProps}
            />
          </Spacer>
          {children}
        </Content>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default AppBottomSheet;
